from flask import (
    Blueprint,
    Response,
    current_app,
    g,
    request,
    send_from_directory,
)

from config import Config
from services.model_service import (
    ModelInferenceError,
    ModelUnavailableError,
)
from utils.response import error_response
from utils.image_validation import (
    validate_image,
)


prediction_bp = Blueprint(
    "prediction",
    __name__,
    url_prefix="/api/v1",
)


@prediction_bp.post("/predict")
def predict():
    image_file = request.files.get(
        "image"
    )

    image = validate_image(
        image_file
    )

    prediction_service = (
        current_app.extensions[
            "prediction_service"
        ]
    )

    try:
        result = prediction_service.predict(
            image=image,
            request_id=g.request_id,
            language=g.language,
        )

    except ModelUnavailableError:
        localization = (
            current_app.extensions[
                "localization"
            ]
        )

        return error_response(
            code="MODEL_UNAVAILABLE",
            message=localization.t(
                "errors.model_unavailable",
                g.language,
            ),
            request_id=g.request_id,
            language=g.language,
            status_code=503,
        )

    except ModelInferenceError:
        localization = (
            current_app.extensions[
                "localization"
            ]
        )

        return error_response(
            code="MODEL_INFERENCE_FAILED",
            message=localization.t(
                "errors.model_inference_failed",
                g.language,
            ),
            request_id=g.request_id,
            language=g.language,
            status_code=500,
        )

    # Compatibility with the existing frontend.
    #
    # The frontend expects fields such as:
    # detections, confidence, bbox, message, etc.
    return result


@prediction_bp.post("/predict")
def duplicate_predict():
    # This function will never be reached because
    # Flask does not allow duplicate endpoint mappings.
    return None


@prediction_bp.get(
    "/events/<request_id>"
)
def prediction_events(request_id):
    event_service = (
        current_app.extensions[
            "event_service"
        ]
    )

    def generate():
        yield from event_service.stream(
            request_id
        )

    return Response(
        generate(),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )


@prediction_bp.get(
    "/results/<filename>"
)
def result_image(filename):
    return send_from_directory(
        Config.OUTPUT_DIR,
        filename,
        as_attachment=False,
    )


# ------------------------------------------------
# Legacy compatibility endpoint
# Existing frontend uses POST /predict.
# ------------------------------------------------

legacy_prediction_bp = Blueprint(
    "legacy_prediction",
    __name__,
)


@legacy_prediction_bp.post("/predict")
def legacy_predict():
    image_file = request.files.get(
        "image"
    )

    image = validate_image(
        image_file
    )

    prediction_service = (
        current_app.extensions[
            "prediction_service"
        ]
    )

    try:
        return prediction_service.predict(
            image=image,
            request_id=g.request_id,
            language=g.language,
        )

    except ModelUnavailableError:
        localization = (
            current_app.extensions[
                "localization"
            ]
        )

        return error_response(
            code="MODEL_UNAVAILABLE",
            message=localization.t(
                "errors.model_unavailable",
                g.language,
            ),
            request_id=g.request_id,
            language=g.language,
            status_code=503,
        )

    except ModelInferenceError:
        localization = (
            current_app.extensions[
                "localization"
            ]
        )

        return error_response(
            code="MODEL_INFERENCE_FAILED",
            message=localization.t(
                "errors.model_inference_failed",
                g.language,
            ),
            request_id=g.request_id,
            language=g.language,
            status_code=500,
        )