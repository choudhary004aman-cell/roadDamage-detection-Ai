from flask import Blueprint, g, request

from utils.response import success_response


localization_bp = Blueprint(
    "localization",
    __name__,
    url_prefix="/api/v1",
)


@localization_bp.get("/i18n")
def translations():
    service = (
        localization_bp
        ._app_ctx_globals_class
        if False
        else None
    )

    # The actual service is stored on Flask app.extensions.
    from flask import current_app

    localization = current_app.extensions[
        "localization"
    ]

    language = g.language

    return success_response(
        data={
            "language": language,
            "languages": (
                localization.get_language_info()
            ),
            "translations": (
                localization.get_namespace(
                    "messages",
                    language,
                )
            ),
            "errors": (
                localization.get_namespace(
                    "errors",
                    language,
                )
            ),
            "accessibility": (
                localization.get_namespace(
                    "accessibility",
                    language,
                )
            ),
        },
        request_id=g.request_id,
        language=language,
    )