from itertools import chain
import json
from webargs import fields
from webargs.flaskparser import use_args, use_kwargs
from sqlalchemy import func
from flask import jsonify
from app.database import db
from . import bp
from .models import Record, State, HrsaDesignation
from .schemas import record_schema, records_schema, states_schema, hrsa_designations_schema


@bp.route("/records/", methods=['GET'])
@use_kwargs({
    "states": fields.DelimitedList(fields.Str()),
    "hrsa_designations": fields.DelimitedList(fields.Str()),
    "years": fields.DelimitedList(fields.Str()),
    "findings_keywords": fields.Str(),
    "entity_keywords": fields.Str()
}, location='query')
def records(states=None, hrsa_designations=None, years=None, findings_keywords=None, entity_keywords=None):
    query = Record.query.join(State).join(HrsaDesignation)
    if (states):
        query = query.filter(State.abv.in_(states))
    if (hrsa_designations):
        query = query.filter(HrsaDesignation.abv.in_(hrsa_designations))
    if (years):
        query = query.filter(Record.full_year.in_(years))
    if (findings_keywords):
        query = query.filter(Record.opa_findings.like('%' + findings_keywords + '%'))
    if (entity_keywords):
        query = query.filter(Record.entity.like('%' + entity_keywords + '%'))
    return records_schema.dumps(query.all())

@bp.route("/filteritems/", methods=['GET'])
def states():
    states = State.query.all()
    hrsa_designations = HrsaDesignation.query.all()
    years = Record.query.with_entities(Record.full_year).distinct().all()
    result = {
        'state_items': states_schema.dump(states),
        'hrsa_designation_items': hrsa_designations_schema.dump(hrsa_designations),
        'year_items': [ {'id': i, 'year': str(year)} for i, year in  enumerate(sorted(list(chain(*years)))) ]
    }
    return result


@bp.route("/summary/", methods=['GET'])
@use_kwargs({
    "states": fields.DelimitedList(fields.Str()),
}, location='query')
def summary(states=None):
    if states:
        query = (
            db.session.query(Record.full_year, State.abv, func.count(Record.id))
            .join(State)
            .filter(State.abv.in_(states))
            .group_by(Record.full_year, State.abv)
            .order_by(Record.full_year)
            .all()
        )

        adj_list = []
        for year, state, count in query:
            datum = {'year': year}
            datum[state] = count
            adj_list.append(datum)

        dct ={}

        for datum in adj_list:
            if datum['year'] not in dct:
                dct[datum['year']] = datum
            else:
                dct[datum['year']].update(datum)

        result = [values for _, values in dct.items()]

    else:
        query = (
            db.session.query(Record.full_year, func.count(Record.id))
            .group_by(Record.full_year)
            .order_by(Record.full_year)
            .all()
        )

        result = [{'year': year, 'count': count} for year, count in query]
    return jsonify(result)
