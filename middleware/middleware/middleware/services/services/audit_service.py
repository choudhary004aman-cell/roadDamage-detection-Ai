import logging
from datetime import datetime, timezone


class AuditService:

    def __init__(self, enabled=True):
        self.enabled = enabled

        self.logger = logging.getLogger(
            "roadguard.audit"
        )

    def record(
        self,
        *,
        request_id,
        event,
        status,
        language,
        model_version=None,
        processing_time_ms=None,
        success=None,
        error_code=None,
    ):
        if not self.enabled:
            return

        payload = {
            "timestamp": datetime.now(
                timezone.utc
            ).isoformat(),
            "request_id": request_id,
            "event": event,
            "status": status,
            "language": language,
            "model_version": model_version,
            "processing_time_ms": (
                processing_time_ms
            ),
            "success": success,
            "error_code": error_code,
        }

        self.logger.info(
            "AUDIT_EVENT %s",
            payload,
            extra={
                "request_id": request_id,
                "event": event,
            },
        )