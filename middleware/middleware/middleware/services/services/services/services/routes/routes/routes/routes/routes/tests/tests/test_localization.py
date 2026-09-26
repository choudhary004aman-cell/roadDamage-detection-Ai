import os

os.environ["DEMO_MODE"] = "true"

from app import create_app


def test_hindi_localization():
    app = create_app()

    client = app.test_client()

    response = client.get(
        "/api/v1/i18n?lang=hi"
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["meta"]["language"] == "hi"

    assert (
        data["data"]["language"]
        == "hi"
    )


def test_english_localization():
    app = create_app()

    client = app.test_client()

    response = client.get(
        "/api/v1/i18n?lang=en"
    )

    assert response.status_code == 200

    data = response.get_json()

    assert (
        data["meta"]["language"]
        == "en"
    )