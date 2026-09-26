from flask import Blueprint, current_app, g

from config import Config
from utils.response import success_response


system_bp = Blueprint(
    "system",
    __name__,
    url_prefix="/api/v1/system",
)


@system_bp.get("/status")
def system_status():
    model_service = current_app.extensions[
        "model_service"
    ]

    localization = current_app.extensions[
        "localization"
    ]

    model_info = (
        model_service.status_info()
    )

    if model_info["status"] == "ready":
        backend_status = (
            localization.t(
                "messages.backend_online",
                g.language,
            )
        )

    else:
        backend_status = (
            localization.t(
                "messages.model_pending",
                g.language,
            )
        )

    return success_response(
        data={
            "backend": {
                "status": "online",
                "message": backend_status,
            },
            "model": model_info,
            "demo_mode": (
                Config.DEMO_MODE
            ),
            "realtime": {
                "enabled": (
                    Config.ENABLE_REALTIME
                ),
                "transport": "SSE",
            },
        },
        request_id=g.request_id,
        language=g.language,
    )


@system_bp.get("/accessibility")
def accessibility_status():
    localization = current_app.extensions[
        "localization"
    ]

    return success_response(
        data={
            "features": {
                "high_contrast": True,
                "reduced_motion": True,
                "large_text": True,
                "screen_reader_summaries": True,
            },
            "labels": {
                "high_contrast": localization.t(
                    "system.high_contrast",
                    g.language,
                ),
                "reduced_motion": localization.t(
                    "system.reduced_motion",
                    g.language,
                ),
                "large_text": localization.t(
                    "system.large_text",
                    g.language,
                ),
                "screen_reader": localization.t(
                    "system.screen_reader",
                    g.language,
                ),
            },
        },
        request_id=g.request_id,
        language=g.language,
    )