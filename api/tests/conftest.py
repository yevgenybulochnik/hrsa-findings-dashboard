import pytest


from app import create_app
from app.database import db
from config import TestConfig


@pytest.fixture(scope='module')
def test_client():
    flask_app = create_app(TestConfig)

    test_client = flask_app.test_client()

    ctx = flask_app.app_context()
    ctx.push()

    yield test_client

    ctx.pop()

@pytest.fixture(scope='module')
def init_database():
    db.create_all()

    yield db

    db.session.close()

    db.drop_all()
