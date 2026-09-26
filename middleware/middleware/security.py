from flask import request

from config import Config


SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Cache-Control": "no-store",
}


def init_security(app):

    app.config[
        "MAX_CONTENT_LENGTH"
    ] = Config.MAX_UPLOAD_BYTES

    @app.after_request
    def add_security_headers(response):
        for name, value in SECURITY_HEADERS.items():
            response.headers[name] = value

        return response

    @app.before_request
    def reject_unexpected_methods():
        # Flask itself handles unsupported methods.
        # This hook intentionally stays lightweight.
        return None