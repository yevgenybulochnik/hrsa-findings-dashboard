from flask import Blueprint


bp = Blueprint(
    'auditlog', __name__,
)

from app.auditlog import routes
