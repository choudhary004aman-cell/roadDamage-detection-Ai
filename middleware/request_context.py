import logging
import time

from flask import g, request

from utils.ids import (
    generate_request_id,
    sanitize_request_id,
)


def init_request_context(app):
    @app.before_request
    def start_request():
        incoming_id = sanitize_request_id(
            request.headers.get(
                "X-Request-ID"
            )
        )

        g.request_id = (
            incoming_id
            or generate_request_id()
        )

        g.request_started_at = time.perf_counter()

    @app.after_request
    def finish_request(response):
        started = getattr(
            g,
            "request_started_at",
            None,
        )

        duration_ms = None

        if started is not None:
            duration_ms = round(
                (
                    time.perf_counter()
                    - started
                )
                * 1000,
                2,
            )

        response.headers[
            "X-Request-ID"
        ] = g.request_id

        if duration_ms is not None:
            response.headers[
                "X-Response-Time-Ms"
            ] = str(duration_ms)

        logging.getLogger(
            "roadguard.request"
        ).info(
            f"{request.method} {request.path} "
            f"{response.status_code} "
            f"{duration_ms}ms",
            extra={
                "request_id": g.request_id,
                "event": "RESPONSE_SENT",
            },
        )

        return response