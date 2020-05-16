import json
import datetime
import click
from pathlib import Path
from flask.cli import with_appcontext
from app.auditlog.models import Record
from app.database import db


@click.command()
@with_appcontext
@click.argument('filepath', type=click.Path(exists=True))
def seed(filepath):
    """Seed database given specific json data file"""
    f = Path(filepath).resolve()
    objs = []
    with f.open() as data:
        records = json.loads(data.read())
        for index, record_data in enumerate(records):
            closure_date = record_data.pop('closure_date')
            try:
                closure_date = datetime.datetime.strptime(closure_date, '%B %d, %Y').date()
            except:
                closure_date = None
            objs.append(
                Record(**record_data, closure_date=closure_date)
            )

        db.session.add_all(objs)
        db.session.commit()
