from app import ma
from .models import Record, State, HrsaDesignation


class HrsaDesignationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = HrsaDesignation

class StateSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = State

class RecordSchema(ma.SQLAlchemyAutoSchema):
    state = ma.Pluck(StateSchema, 'abv')
    hrsa_des = ma.Pluck(HrsaDesignationSchema, 'abv')
    class Meta:
        model = Record

record_schema = RecordSchema()
records_schema = RecordSchema(many=True)
