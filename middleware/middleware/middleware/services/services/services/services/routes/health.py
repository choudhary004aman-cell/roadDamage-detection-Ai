from flask import Blueprint

from config import Config
from utils.response import success_response


health_bp = Blueprint(
    "health",
    __name__,
)


@health_bp.get("/health")
def health():
    return success_response(
        data={
            "status": "healthy",
            "service": Config.APP_NAME,
            "version": Config.APP_VERSION,
        },
        status_code=200,
    )