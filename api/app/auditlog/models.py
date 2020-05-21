from app.database import db, Model, Column


class Record(Model):
    __tablename__ = 'records'
    id = Column(db.Integer, primary_key=True)
    hrsa_id = Column(db.String())
    entity = Column(db.String())
    entity_abv = Column(db.String())
    state = Column(db.String())
    year = Column(db.String())
    full_year = Column(db.Integer)
    opa_findings = Column(db.String())
    sanction = Column(db.String())
    cap_status = Column(db.String())
    closure_date = Column(db.Date())
    entity_contact = Column(db.String())
