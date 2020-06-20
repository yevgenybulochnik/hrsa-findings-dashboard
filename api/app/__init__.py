from flask import Flask
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from config import Config
from app.database import db

ma = Marshmallow()
migrate = Migrate()


def create_app(config=Config):
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    ma.init_app(ma)
    migrate.init_app(app, db)

    from . import auditlog
    app.register_blueprint(auditlog.bp, url_prefix='/api')

    return app
