from itertools import chain
import json
from webargs import fields
from webargs.flaskparser import use_args, use_kwargs
from sqlalchemy import func
from flask import jsonify
from app.database import db
from . import bp
from .models import Record
from .schemas import record_schema, records_schema


@bp.route("/records/", methods=['GET'])
@use_kwargs({
    "states": fields.DelimitedList(fields.Str()),
    "hrsa_designations": fields.DelimitedList(fields.Str()),
    "years": fields.DelimitedList(fields.Str()),
    "findings_keywords": fields.Str(),
    "entity_keywords": fields.Str()
}, location='query')
def records(states=None, hrsa_designations=None, years=None, findings_keywords=None, entity_keywords=None):
    query = Record.query
    if (states):
        query = query.filter(Record.state.in_(states))

    if (hrsa_designations):
        query = query.filter(Record.entity_abv.in_(hrsa_designations))
    if (years):
        query = query.filter(Record.full_year.in_(years))
    if (findings_keywords):
        query = query.filter(Record.opa_findings.like('%' + findings_keywords + '%'))
    if (entity_keywords):
        print(entity_keywords)
        query = query.filter(Record.entity.like('%' + entity_keywords + '%'))
    return records_schema.dumps(query.all())

@bp.route("/states/")
def states():
    states = Record.query.with_entities(Record.state).distinct().all()
    return jsonify(list(chain(*states)))


@bp.route("/summary")
def summary():
    query = (
        db.session.query(Record.full_year, func.count(Record.id))
        .group_by(Record.full_year)
        .all()
    )
    result = []
    for year, count in query:
        result.append({'year': year, 'count': count})
    return jsonify(result) 
