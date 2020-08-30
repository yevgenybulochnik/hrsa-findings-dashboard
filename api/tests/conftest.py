import pytest
from pathlib import Path
from flask_migrate import upgrade, downgrade
import yaml


from app import create_app
from app.database import db as _db
from app.auditlog.models import Record
from config import TestConfig


@pytest.fixture(scope='session')
def app():
    flask_app = create_app(TestConfig)
    ctx = flask_app.app_context()
    ctx.push()

    yield flask_app

    ctx.pop()


@pytest.fixture(scope='session')
def client(app):
    test_client = app.test_client()

    yield test_client


@pytest.fixture(scope='session')
def db(app):

    project_root = Path(app.root_path)
    migrations_dir = project_root / '..' /'migrations'

    upgrade(directory=migrations_dir.absolute())
    mock_data_file = project_root / '..' / 'tests' / 'mockData.yaml'

    data = yaml.load(mock_data_file.read_text(), Loader=yaml.FullLoader)

    for record in data['records']:
        r = Record(**record)
        _db.session.add(r)
        _db.session.commit()

    yield _db

    _db.session.close()
    _db.drop_all()
    _db.engine.execute("DROP TABLE alembic_version")
