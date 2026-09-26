import logging

from flask import g, jsonify

from utils.image_validation import (
    ImageValidationError,
)
from utils.response import error_response


def init_error_handlers(app):

    @app.errorhandler(
        ImageValidationError
    )
    def handle_image_error(error):
        translator = app.extensions[
            "localization"
        ]

        message = translator.t(
            error.message_key,
            language=getattr(
                g,
                "language",
                "en",
            ),
            size=app.config[
                "MAX_UPLOAD_MB"
            ],
        )

        return error_response(
            code=error.code,
            message=message,
            request_id=getattr(
                g,
                "request_id",
                None,
            ),
            language=getattr(
                g,
                "language",
                "en",
            ),
            status_code=error.status_code,
        )

    @app.errorhandler(413)
    def handle_413(_error):
        translator = app.extensions[
            "localization"
        ]

        language = getattr(
            g,
            "language",
            "en",
        )

        message = translator.t(
            "errors.file_too_large",
            language=language,
            size=app.config[
                "MAX_UPLOAD_MB"
            ],
        )

        return error_response(
            code="FILE_TOO_LARGE",
            message=message,
            request_id=getattr(
                g,
                "request_id",
                None,
            ),
            language=language,
            status_code=413,
        )

    @app.errorhandler(404)
    def handle_404(_error):
        language = getattr(
            g,
            "language",
            "en",
        )

        return error_response(
            code="NOT_FOUND",
            message="Resource not found.",
            request_id=getattr(
                g,
                "request_id",
                None,
            ),
            language=language,
            status_code=404,
        )

    @app.errorhandler(405)
    def handle_405(_error):
        language = getattr(
            g,
            "language",
            "en",
        )

        return error_response(
            code="METHOD_NOT_ALLOWED",
            message="Method not allowed.",
            request_id=getattr(
                g,
                "request_id",
                None,
            ),
            language=language,
            status_code=405,
        )

    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        logging.getLogger(
            "roadguard.errors"
        ).exception(
            "Unhandled server error",
            extra={
                "request_id": getattr(
                    g,
                    "request_id",
                    None,
                ),
                "event": "INTERNAL_ERROR",
            },
        )

        language = getattr(
            g,
            "language",
            "en",
        )

        translator = app.extensions[
            "localization"
        ]

        message = translator.t(
            "errors.internal_server_error",
            language=language,
        )

        return error_response(
            code="INTERNAL_SERVER_ERROR",
            message=message,
            request_id=getattr(
                g,
                "request_id",
                None,
            ),
            language=language,
            status_code=500,
        )