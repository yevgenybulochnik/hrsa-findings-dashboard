import os
from pathlib import Path

basedir = Path(__file__).parent


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI', f'sqlite:///{basedir}/hrsa.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class TestConfig(object):
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@db:5432/test_hrsa"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
