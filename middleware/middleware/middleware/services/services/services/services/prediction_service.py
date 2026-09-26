import logging
import time
from pathlib import Path
from uuid import uuid4

from PIL import Image

from config import Config
from schemas.common import (
    accessibility_schema,
    location_schema,
    model_schema,
    processing_schema,
    road_information_schema,
)
from services.model_service import (
    ModelInferenceError,
    ModelService,
    ModelUnavailableError,
)


class PredictionService:

    def __init__(
        self,
        *,
        model_service: ModelService,
        localization_service,
        event_service,
        audit_service,
    ):
        self.model_service = model_service
        self.localization = localization_service
        self.events = event_service
        self.audit = audit_service

        self.logger = logging.getLogger(
            "roadguard.prediction"
        )

    def predict(
        self,
        *,
        image: Image.Image,
        request_id: str,
        language: str,
    ):
        started = time.perf_counter()

        self.audit.record(
            request_id=request_id,
            event="REQUEST_RECEIVED",
            status="received",
            language=language,
            model_version=Config.MODEL_VERSION,
        )

        self.events.publish(
            request_id,
            "queued",
            {
                "request_id": request_id,
                "status": "queued",
                "message": self.localization.t(
                    "messages.analysis_queued",
                    language,
                ),
            },
        )

        self.audit.record(
            request_id=request_id,
            event="VALIDATION_PASSED",
            status="validated",
            language=language,
            model_version=Config.MODEL_VERSION,
        )

        self.events.publish(
            request_id,
            "processing",
            {
                "request_id": request_id,
                "status": "processing",
                "message": self.localization.t(
                    "messages.analysis_processing",
                    language,
                ),
            },
        )

        self.audit.record(
            request_id=request_id,
            event="PREDICTION_STARTED",
            status="processing",
            language=language,
            model_version=Config.MODEL_VERSION,
        )

        # -------------------------------------
        # DEMO MODE
        # -------------------------------------
        if (
            Config.DEMO_MODE
            and not self.model_service.loaded
        ):
            result = self._demo_result(
                language=language
            )

            processing_time_ms = round(
                (
                    time.perf_counter()
                    - started
                )
                * 1000
            )

            result[
                "processing"
            ]["processing_time_ms"] = (
                processing_time_ms
            )

            self._complete_events(
                request_id=request_id,
                language=language,
                processing_time_ms=processing_time_ms,
                success=True,
            )

            return result

        # -------------------------------------
        # REAL MODEL
        # -------------------------------------
        try:
            model_result = (
                self.model_service.predict(
                    image
                )
            )

        except ModelUnavailableError:
            self.audit.record(
                request_id=request_id,
                event="PREDICTION_FAILED",
                status="failed",
                language=language,
                model_version=Config.MODEL_VERSION,
                success=False,
                error_code="MODEL_UNAVAILABLE",
            )

            self.events.publish(
                request_id,
                "failed",
                {
                    "request_id": request_id,
                    "status": "failed",
                    "message": self.localization.t(
                        "errors.model_unavailable",
                        language,
                    ),
                },
            )

            raise

        except ModelInferenceError:
            self.audit.record(
                request_id=request_id,
                event="PREDICTION_FAILED",
                status="failed",
                language=language,
                model_version=Config.MODEL_VERSION,
                success=False,
                error_code="MODEL_INFERENCE_FAILED",
            )

            self.events.publish(
                request_id,
                "failed",
                {
                    "request_id": request_id,
                    "status": "failed",
                    "message": self.localization.t(
                        "errors.model_inference_failed",
                        language,
                    ),
                },
            )

            raise

        processing_time_ms = round(
            (
                time.perf_counter()
                - started
            )
            * 1000
        )

        detections = []

        for detection in model_result[
            "detections"
        ]:
            class_code = detection[
                "class_code"
            ]

            class_name = (
                self.localization.t(
                    f"classes.{class_code}",
                    language,
                )
            )

            # If translation doesn't exist,
            # preserve model class name.
            if class_name.startswith(
                "classes."
            ):
                class_name = detection[
                    "class_name"
                ]

            confidence_percent = round(
                detection[
                    "confidence"
                ]
                * 100,
                2,
            )

            detection = {
                **detection,
                "class": class_name,
                "class_name": class_name,
                "confidence": round(
                    float(
                        detection[
                            "confidence"
                        ]
                    ),
                    4,
                ),
                "confidence_percent": (
                    confidence_percent
                ),
            }

            detections.append(
                detection
            )

        annotated_url = self._save_annotated_image(
            model_result.get(
                "annotated_array"
            ),
            request_id,
        )

        if not detections:
            message = self.localization.t(
                "messages.no_damage",
                language,
            )

            announcement = self.localization.t(
                "accessibility.no_damage",
                language,
            )

        elif len(detections) == 1:
            message = self.localization.t(
                "messages.damage_detected",
                language,
            )

            detection = detections[0]

            announcement = self.localization.t(
                "accessibility.damage_summary",
                language,
                class_name=detection[
                    "class_name"
                ],
                confidence=detection[
                    "confidence_percent"
                ],
            )

        else:
            message = self.localization.t(
                "messages.multiple_damage",
                language,
                count=len(detections),
            )

            announcement = self.localization.t(
                "accessibility.multiple_damage_summary",
                language,
                count=len(detections),
            )

        response = {
            "success": True,
            "request_id": request_id,
            "demo": False,
            "language": language,
            "message": self.localization.t(
                "messages.analysis_completed",
                language,
            ),
            "processing": processing_schema(
                status="completed",
                processing_time_ms=(
                    processing_time_ms
                ),
            ),
            "image": {
                "annotated_image": (
                    annotated_url
                ),
            },
            "detections": detections,
            "location": location_schema(),
            "road_information": (
                road_information_schema()
            ),
            "model": model_schema(
                name=Config.MODEL_NAME,
                version=Config.MODEL_VERSION,
                status="ready",
                loaded=True,
            ),
            "accessibility": (
                accessibility_schema(
                    status_label=self.localization.t(
                        "accessibility.analysis_completed",
                        language,
                    ),
                    announcement=announcement,
                    table_label=self.localization.t(
                        "accessibility.results_table",
                        language,
                    ),
                    empty_state_label=self.localization.t(
                        "accessibility.no_damage",
                        language,
                    ),
                    summary=announcement,
                )
            ),
            "result_message": message,
            "meta": {
                "request_id": request_id,
                "language": language,
            },
        }

        self._complete_events(
            request_id=request_id,
            language=language,
            processing_time_ms=processing_time_ms,
            success=True,
        )

        return response

    def _demo_result(
        self,
        *,
        language,
    ):
        message = self.localization.t(
            "messages.demo_analysis",
            language,
        )

        announcement = self.localization.t(
            "accessibility.analysis_completed",
            language,
        )

        return {
            "success": True,
            "request_id": None,
            "demo": True,
            "language": language,
            "message": message,
            "processing": processing_schema(
                status="completed",
                processing_time_ms=None,
            ),
            "image": {
                "annotated_image": None,
            },
            "detections": [],
            "location": location_schema(),
            "road_information": (
                road_information_schema()
            ),
            "model": {
                "name": Config.MODEL_NAME,
                "version": Config.MODEL_VERSION,
                "status": "demo",
                "loaded": False,
            },
            "accessibility": (
                accessibility_schema(
                    status_label=announcement,
                    announcement=message,
                    table_label=self.localization.t(
                        "accessibility.results_table",
                        language,
                    ),
                    empty_state_label=self.localization.t(
                        "accessibility.no_damage",
                        language,
                    ),
                    summary=message,
                )
            ),
            "meta": {
                "language": language,
            },
        }

    def _complete_events(
        self,
        *,
        request_id,
        language,
        processing_time_ms,
        success,
    ):
        self.audit.record(
            request_id=request_id,
            event="PREDICTION_COMPLETED",
            status="completed",
            language=language,
            model_version=Config.MODEL_VERSION,
            processing_time_ms=processing_time_ms,
            success=success,
        )

        self.events.publish(
            request_id,
            "completed",
            {
                "request_id": request_id,
                "status": "completed",
                "message": self.localization.t(
                    "messages.analysis_completed",
                    language,
                ),
                "processing_time_ms": (
                    processing_time_ms
                ),
            },
        )

    @staticmethod
    def _save_annotated_image(
        annotated_array,
        request_id,
    ):
        if annotated_array is None:
            return None

        output_name = (
            f"{request_id}_{uuid4().hex}.jpg"
        )

        output_path = (
            Config.OUTPUT_DIR
            / output_name
        )

        try:
            image = Image.fromarray(
                annotated_array[:, :, ::-1]
            )

            image.save(
                output_path,
                format="JPEG",
                quality=90,
            )

        except Exception:
            logging.getLogger(
                "roadguard.prediction"
            ).exception(
                "Failed to save annotated image."
            )

            return None

        return (
            f"/api/v1/results/{output_name}"
        )