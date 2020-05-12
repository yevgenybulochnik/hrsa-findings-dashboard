from app.database import db, Model, Column


class Record(Model):
    __tablename__ = 'records'
    id = Column(db.Integer, primary_key=True)
    entity = Column(db.String(32))
