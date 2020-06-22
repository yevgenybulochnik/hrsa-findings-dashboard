import json
import datetime
import click
from pathlib import Path
from flask.cli import with_appcontext
from app.auditlog.models import Record, State, HrsaDesignation
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

            enity_abv_data = record_data.pop('entity_abv')
            state_data = record_data.pop('state')

            state = State.query.filter_by(abv=state_data).first()
            hrsa_designation = HrsaDesignation.query.filter_by(abv=enity_abv_data).first()
            objs.append(
                Record(
                    **record_data,
                    state_id = state.id,
                    hrsa_designation_id=hrsa_designation.id,
                    closure_date=closure_date,
                )
            )

        db.session.add_all(objs)
        db.session.commit()


@click.command()
@with_appcontext
def ipython():
    """Open Ipython session"""
    from app.database import db
    from app.auditlog.models import Record
    from IPython import embed
    from traitlets.config import get_config
    config = get_config()
    config.InteractiveShellEmbed.colors = 'Linux'
    embed(
        user_ns={
            'db': db,
            'Record': Record
        },
        config=config
    )

