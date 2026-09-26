import io
import os

os.environ["DEMO_MODE"] = "true"

from PIL import Image

from app import create_app


def create_test_image():
    image = Image.new(
        "RGB",
        (200, 200),
        "white",
    )

    buffer = io.BytesIO()

    image.save(
        buffer,
        format="JPEG",
    )

    buffer.seek(0)

    return buffer


def test_missing_image():
    app = create_app()

    client = app.test_client()

    response = client.post(
        "/predict"
    )

    assert response.status_code == 422

    data = response.get_json()

    assert (
        data["error"]["code"]
        == "IMAGE_REQUIRED"
    )


def test_invalid_image():
    app = create_app()

    client = app.test_client()

    response = client.post(
        "/predict",
        data={
            "image": (
                io.BytesIO(
                    b"not an image"
                ),
                "test.jpg",
            )
        },
        content_type="multipart/form-data",
    )

    assert response.status_code == 422

    data = response.get_json()

    assert (
        data["error"]["code"]
        == "INVALID_IMAGE"
    )


def test_valid_image_demo_mode():
    app = create_app()

    client = app.test_client()

    image = create_test_image()

    response = client.post(
        "/predict",
        data={
            "image": (
                image,
                "road.jpg",
            )
        },
        content_type="multipart/form-data",
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert data["demo"] is True