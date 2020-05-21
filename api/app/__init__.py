from flask import Flask
from flask_marshmallow import Marshmallow
from config import Config
from app.database import db

ma = Marshmallow()


def create_app(config=Config):
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    ma.init_app(ma)

    from . import auditlog
    app.register_blueprint(auditlog.bp, url_prefix='/api')

    with app.app_context():
        db.create_all()

    return app
