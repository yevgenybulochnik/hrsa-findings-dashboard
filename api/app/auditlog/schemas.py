from app import ma
from .models import Record


class RecordSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Record

record_schema = RecordSchema()
records_schema = RecordSchema(many=True)
