import io
import os

os.environ["DEMO_MODE"] = "true"

from PIL import Image

from app import create_app


def make_image():
    image = Image.new(
        "RGB",
        (300, 300),
        "white",
    )

    buffer = io.BytesIO()

    image.save(
        buffer,
        format="JPEG",
    )

    buffer.seek(0)

    return buffer


def test_prediction_endpoint():
    app = create_app()

    client = app.test_client()

    response = client.post(
        "/api/v1/predict",
        data={
            "image": (
                make_image(),
                "road.jpg",
            )
        },
        content_type="multipart/form-data",
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert "detections" in data
    assert "model" in data
    assert "accessibility" in data
    assert "location" in data
    assert "road_information" in data
    assert "request_id" in data