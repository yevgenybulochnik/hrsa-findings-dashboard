import json
from sqlalchemy import func
from flask import jsonify
from app.database import db
from . import bp
from .models import Record
from .schemas import record_schema, records_schema


@bp.route("/")
def index():
    records = Record.query.all()
    return {"data": records_schema.dumps(records)}


@bp.route("/summary")
def summary():
    query = (
        db.session.query(Record.full_year, func.count(Record.id))
        .group_by(Record.full_year)
        .all()
    )
    return dict(query)
