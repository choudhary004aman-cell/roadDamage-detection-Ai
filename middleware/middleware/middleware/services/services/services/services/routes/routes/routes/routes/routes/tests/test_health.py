import os

os.environ["DEMO_MODE"] = "true"

from app import create_app


def test_health():
    app = create_app()

    client = app.test_client()

    response = client.get(
        "/health"
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert data["data"]["status"] == "healthy"