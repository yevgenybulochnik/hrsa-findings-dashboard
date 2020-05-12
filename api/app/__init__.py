from flask import Flask
from config import Config
from app.database import db


def create_app(config=Config):
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)

    from . import auditlog
    app.register_blueprint(auditlog.bp)

    with app.app_context():
        db.create_all()

    return app
