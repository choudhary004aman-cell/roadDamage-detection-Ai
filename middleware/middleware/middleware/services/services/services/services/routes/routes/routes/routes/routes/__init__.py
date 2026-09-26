from routes.health import health_bp
from routes.localization import (
    localization_bp,
)
from routes.prediction import (
    prediction_bp,
    legacy_prediction_bp,
)
from routes.system import system_bp


def register_routes(app):
    app.register_blueprint(
        health_bp
    )

    app.register_blueprint(
        system_bp
    )

    app.register_blueprint(
        localization_bp
    )

    app.register_blueprint(
        prediction_bp
    )

    app.register_blueprint(
        legacy_prediction_bp
    )