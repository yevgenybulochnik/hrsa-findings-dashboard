from app.database import db, Model, Column


class Record(Model):
    __tablename__ = 'records'
    id = Column(db.Integer, primary_key=True)
    hrsa_id = Column(db.String(32))
    entity = Column(db.String(32))
    entity_abv = Column(db.String(32))
    state = Column(db.String(32))
    year = Column(db.String(32))
    full_year = Column(db.Integer)
    opa_findings = Column(db.String())
    sanction = Column(db.String())
    cap_status = Column(db.String())
    closure_date = Column(db.Date())
    entity_contact = Column(db.String())
