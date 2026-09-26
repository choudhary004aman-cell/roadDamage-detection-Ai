import logging
import time
from pathlib import Path

from PIL import Image

from config import Config


class ModelUnavailableError(Exception):
    pass


class ModelInferenceError(Exception):
    pass


class ModelService:

    def __init__(
        self,
        model_path: Path,
        confidence_threshold: float,
        model_name: str,
        model_version: str,
    ):
        self.model_path = Path(
            model_path
        )

        self.confidence_threshold = (
            confidence_threshold
        )

        self.model_name = model_name
        self.model_version = model_version

        self.model = None
        self.status = "unavailable"
        self.load_error = None

        self.logger = logging.getLogger(
            "roadguard.model"
        )

        self._load_model()

    @property
    def loaded(self):
        return self.model is not None

    def _load_model(self):
        if not self.model_path.exists():
            self.status = "unavailable"

            self.logger.warning(
                "Model file does not exist: %s",
                self.model_path,
            )

            return

        try:
            from ultralytics import YOLO

            self.status = "loading"

            self.model = YOLO(
                str(self.model_path)
            )

            self.status = "ready"
            self.load_error = None

            self.logger.info(
                "YOLO model loaded successfully."
            )

        except Exception as exc:
            self.model = None
            self.status = "error"
            self.load_error = str(exc)

            self.logger.exception(
                "Failed to load YOLO model."
            )

    def reload(self):
        self.model = None
        self.status = "loading"
        self.load_error = None

        self._load_model()

    def status_info(self):
        return {
            "name": self.model_name,
            "version": self.model_version,
            "status": self.status,
            "loaded": self.loaded,
        }

    def predict(
        self,
        image: Image.Image,
    ):
        if not self.loaded:
            raise ModelUnavailableError(
                "The AI model is not loaded."
            )

        started = time.perf_counter()

        try:
            results = self.model.predict(
                source=image,
                conf=self.confidence_threshold,
                verbose=False,
            )

            if not results:
                results = []

            result = results[0]

            detections = []

            names = getattr(
                result,
                "names",
                {},
            )

            boxes = getattr(
                result,
                "boxes",
                None,
            )

            if boxes is not None:
                xyxy = boxes.xyxy.cpu().tolist()
                confidences = (
                    boxes.conf.cpu().tolist()
                )
                classes = (
                    boxes.cls.cpu().tolist()
                )

                for index, (
                    coordinates,
                    confidence,
                    class_index,
                ) in enumerate(
                    zip(
                        xyxy,
                        confidences,
                        classes,
                    ),
                    start=1,
                ):
                    class_index = int(
                        class_index
                    )

                    class_name = (
                        names.get(
                            class_index,
                            str(class_index),
                        )
                        if isinstance(
                            names,
                            dict,
                        )
                        else str(
                            class_index
                        )
                    )

                    class_code = (
                        self._resolve_class_code(
                            class_index,
                            class_name,
                        )
                    )

                    detections.append(
                        {
                            "id": index,
                            "class_name": class_name,
                            "class_code": class_code,
                            "confidence": round(
                                float(
                                    confidence
                                ),
                                4,
                            ),
                            "severity": None,
                            "bbox": {
                                "x1": round(
                                    float(
                                        coordinates[0]
                                    ),
                                    2,
                                ),
                                "y1": round(
                                    float(
                                        coordinates[1]
                                    ),
                                    2,
                                ),
                                "x2": round(
                                    float(
                                        coordinates[2]
                                    ),
                                    2,
                                ),
                                "y2": round(
                                    float(
                                        coordinates[3]
                                    ),
                                    2,
                                ),
                            },
                        }
                    )

            processing_time_ms = round(
                (
                    time.perf_counter()
                    - started
                )
                * 1000
            )

            annotated_array = result.plot()

            return {
                "detections": detections,
                "processing_time_ms": (
                    processing_time_ms
                ),
                "annotated_array": (
                    annotated_array
                ),
            }

        except Exception as exc:
            self.logger.exception(
                "Model inference failed."
            )

            raise ModelInferenceError(
                str(exc)
            ) from exc

    @staticmethod
    def _resolve_class_code(
        class_index,
        class_name,
    ):
        normalized_name = (
            str(class_name)
            .strip()
        )

        # If model already exposes D00 etc.
        if normalized_name in Config.CLASS_CODES:
            return normalized_name

        # Otherwise assume the trained
        # model follows RDD2022 class order.
        if (
            0
            <= class_index
            < len(Config.CLASS_CODES)
        ):
            return Config.CLASS_CODES[
                class_index
            ]

        return normalized_name