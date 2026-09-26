from flask import Flask
from flask_cors import CORS

from config import Config
from middleware.error_handler import (
    init_error_handlers,
)
from middleware.localization import (
    init_localization,
)
from middleware.request_context import (
    init_request_context,
)
from middleware.security import (
    init_security,
)
from routes import register_routes
from services.audit_service import (
    AuditService,
)
from services.event_service import (
    EventService,
)
from services.localization_service import (
    LocalizationService,
)
from services.model_service import (
    ModelService,
)
from services.prediction_service import (
    PredictionService,
)
from utils.logging import (
    configure_logging,
)


def create_app():
    Config.ensure_directories()

    configure_logging()

    app = Flask(
        __name__
    )

    app.config[
        "MAX_CONTENT_LENGTH"
    ] = Config.MAX_UPLOAD_BYTES

    app.config[
        "MAX_UPLOAD_MB"
    ] = Config.MAX_UPLOAD_MB

    app.config[
        "APP_NAME"
    ] = Config.APP_NAME

    app.config[
        "APP_VERSION"
    ] = Config.APP_VERSION

    # -----------------------------
    # CORS
    # -----------------------------
    CORS(
        app,
        resources={
            r"/*": {
                "origins": (
                    Config.CORS_ORIGINS
                )
            }
        },
        supports_credentials=False,
        expose_headers=[
            "X-Request-ID",
            "X-Response-Time-Ms",
        ],
    )

    # -----------------------------
    # Services
    # -----------------------------
    localization_service = (
        LocalizationService(
            directory=Config.I18N_DIR,
            supported_languages=(
                Config.SUPPORTED_LANGUAGES
            ),
            default_language=(
                Config.DEFAULT_LANGUAGE
            ),
        )
    )

    model_service = ModelService(
        model_path=Config.MODEL_PATH,
        confidence_threshold=(
            Config.MODEL_CONFIDENCE_THRESHOLD
        ),
        model_name=Config.MODEL_NAME,
        model_version=Config.MODEL_VERSION,
    )

    event_service = EventService()

    audit_service = AuditService(
        enabled=Config.ENABLE_AUDIT_LOG
    )

    prediction_service = (
        PredictionService(
            model_service=model_service,
            localization_service=(
                localization_service
            ),
            event_service=event_service,
            audit_service=audit_service,
        )
    )

    # -----------------------------
    # Flask extensions
    # -----------------------------
    app.extensions[
        "localization"
    ] = localization_service

    app.extensions[
        "model_service"
    ] = model_service

    app.extensions[
        "event_service"
    ] = event_service

    app.extensions[
        "audit_service"
    ] = audit_service

    app.extensions[
        "prediction_service"
    ] = prediction_service

    # -----------------------------
    # Middleware
    # -----------------------------
    init_request_context(app)
    init_localization(app)
    init_security(app)
    init_error_handlers(app)

    # -----------------------------
    # Routes
    # -----------------------------
    register_routes(app)

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=Config.PORT,
        debug=Config.DEBUG,
        threaded=True,
    )