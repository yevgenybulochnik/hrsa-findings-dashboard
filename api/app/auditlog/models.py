from app.database import db, Model, Column, relationship

tags = db.Table('tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True),
    db.Column('record_id', db.Integer, db.ForeignKey('records.id'), primary_key=True)
)

class Tag(Model):
    __tablename__ = 'tag'
    id = Column(db.Integer, primary_key=True)
    title = Column(db.String())
    name = Column(db.String())

class State(Model):
    __tablename__ = 'states'
    id = Column(db.Integer, primary_key=True)
    abv = Column(db.String())
    name = Column(db.String())
    color = Column(db.String())
    records = relationship('Record', backref='state', lazy='dynamic')


class HrsaDesignation(Model):
    __tablename__ = 'hrsa_designations'
    id = Column(db.Integer, primary_key=True)
    designation = Column(db.String())
    abv = Column(db.String())
    records = relationship('Record', backref='hrsa_des', lazy='dynamic')


class Record(Model):
    __tablename__ = 'records'
    id = Column(db.Integer, primary_key=True)
    hrsa_id = Column(db.String())
    entity = Column(db.String())
    hrsa_designation_id = Column(db.Integer, db.ForeignKey('hrsa_designations.id'))
    state_id = Column(db.Integer, db.ForeignKey('states.id'))
    year = Column(db.String())
    full_year = Column(db.Integer)
    opa_findings = Column(db.String())
    sanction = Column(db.String())
    cap_status = Column(db.String())
    closure_date = Column(db.Date())
    entity_contact = Column(db.String())
    tags = relationship('Tag', secondary='tags', lazy='dynamic', backref=db.backref('records', lazy=True))
