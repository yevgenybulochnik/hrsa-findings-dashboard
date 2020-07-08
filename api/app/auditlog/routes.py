from itertools import chain
import json
from webargs import fields
from webargs.flaskparser import use_args, use_kwargs
from sqlalchemy import func
from flask import jsonify
from app.database import db
from . import bp
from .models import Record, State, HrsaDesignation, Tag, tags
from .schemas import record_schema, records_schema, states_schema, hrsa_designations_schema, tags_schema


@bp.route("/records/", methods=['GET'])
@use_kwargs({
    "states": fields.DelimitedList(fields.Str()),
    "hrsa_designations": fields.DelimitedList(fields.Str()),
    "years": fields.DelimitedList(fields.Str()),
    "findings_keywords": fields.Str(),
    "entity_keywords": fields.Str(),
    "tags": fields.DelimitedList(fields.Str()),
}, location='query')
def records(states=None, hrsa_designations=None, years=None, findings_keywords=None, entity_keywords=None, tags=None):
    query = Record.query.join(State).join(HrsaDesignation)
    if (states):
        query = query.filter(State.abv.in_(states))
    if (hrsa_designations):
        query = query.filter(HrsaDesignation.abv.in_(hrsa_designations))
    if (years):
        query = query.filter(Record.full_year.in_(years))
    if (tags):
        query = query.filter(Record.tags.any(Tag.name.in_(tags)))
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
    tags = Tag.query.all()
    result = {
        'state_items': states_schema.dump(states),
        'hrsa_designation_items': hrsa_designations_schema.dump(hrsa_designations),
        'tag_items': tags_schema.dump(tags),
        'year_items': [ {'id': i, 'year': str(year)} for i, year in  enumerate(sorted(list(chain(*years)))) ],
    }
    return result


@bp.route("/summary/", methods=['GET'])
@use_kwargs({
    "states": fields.DelimitedList(fields.Str()),
    "hrsa_designations": fields.DelimitedList(fields.Str()),
}, location='query')
def summary(states=None, hrsa_designations=None):
    fields = [Record.full_year]
    group_by = [Record.full_year]
    filters = []
    total_filters = []


    if states:
        fields.append(State.abv)
        group_by.append(State.abv)
        filters.append(State.abv.in_(states))

    if hrsa_designations:
        filters.append(HrsaDesignation.abv.in_(hrsa_designations))
        total_filters.append(HrsaDesignation.abv.in_(hrsa_designations))

    summary_query = (
        db.session.query(*fields, func.count(Record.id))
        .join(State)
        .join(HrsaDesignation)
        .filter(*filters)
        .group_by(*group_by)
        .order_by(Record.full_year)
    )

    total_query = (
        db.session.query(Record.full_year, func.count(Record.id))
        .join(HrsaDesignation)
        .filter(*total_filters)
        .group_by(Record.full_year)
        .order_by(Record.full_year)
    )

    total_counts = [{'year': year, 'count': count} for year, count in total_query]

    if not states:
        return jsonify(total_counts)
    else:
        for year, state, count in summary_query:
            datum = {'year': year}
            datum[state] = count
            total_counts.append(datum)

        dct ={}

        for datum in total_counts:
            if datum['year'] not in dct:
                dct[datum['year']] = datum
            else:
                dct[datum['year']].update(datum)

        result = [values for _, values in dct.items()]
        return jsonify(result)


@bp.route('/summary/findings/', methods=['GET'])
@use_kwargs({
    "states": fields.DelimitedList(fields.Str()),
    "hrsa_designations": fields.DelimitedList(fields.Str()),
    "years": fields.DelimitedList(fields.Str()),
}, location='query')
def summary_findings(states=None, hrsa_designations=None, years=None):
    query = db.session.query(Tag.title, Tag.color, func.count(Tag.id)).join(tags).join(Record).join(State).join(HrsaDesignation).group_by(Tag.id)
    total_query = (
        db.session.query(tags.c.record_id)
        .join(Tag)
        .join(Record)
        .join(State)
        .join(HrsaDesignation)
        .filter(~Tag.name.in_(['no_findings']))
        .distinct()
    )
    if states:
        query = query.filter(State.abv.in_(states))
        total_query = total_query.filter(State.abv.in_(states))
    if hrsa_designations:
        query = query.filter(HrsaDesignation.abv.in_(hrsa_designations))
        total_query = total_query.filter(HrsaDesignation.abv.in_(hrsa_designations))
    if years:
        query = query.filter(Record.full_year.in_(years))
        total_query = total_query.filter(Record.full_year.in_(years))

    result = [{'name': name, 'color': color ,'value': value} for name, color, value in query.all()]
    result.append({'name': 'Findings', 'color': '#DB3737', 'value': len(total_query.all())})
    return jsonify(result)
