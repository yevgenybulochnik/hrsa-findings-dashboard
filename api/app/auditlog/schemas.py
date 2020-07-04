from app import ma
from .models import Record, State, HrsaDesignation, Tag


class TagSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tag

class HrsaDesignationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = HrsaDesignation

class StateSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = State

class RecordSchema(ma.SQLAlchemyAutoSchema):
    state = ma.Pluck(StateSchema, 'abv')
    hrsa_des = ma.Pluck(HrsaDesignationSchema, 'abv')
    tags = ma.Pluck(TagSchema, 'title', many=True)
    class Meta:
        model = Record

tags_schema = TagSchema(many=True)
hrsa_designations_schema = HrsaDesignationSchema(many=True)
states_schema = StateSchema(many=True)
record_schema = RecordSchema()
records_schema = RecordSchema(many=True)
