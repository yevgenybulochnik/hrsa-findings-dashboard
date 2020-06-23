"""State data migration

Revision ID: 60527b68fb7e
Revises: e002a00998a6
Create Date: 2020-06-22 09:53:42.135246

"""
import json
from pathlib import Path
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column
from sqlalchemy import String
from flask import current_app


# revision identifiers, used by Alembic.
revision = '60527b68fb7e'
down_revision = 'e002a00998a6'
branch_labels = None
depends_on = None

MIGRATIONS_DIR = Path(current_app.root_path).parent / 'migrations'

with open(MIGRATIONS_DIR / 'fixtures' / 'states.json') as f:
    data = json.load(f)

def upgrade():
    states = table('states',
        column('abv', String),
        column('name', String),
        column('color', String)
    )

    op.bulk_insert(states, data)


def downgrade():
    op.execute('DELETE FROM states')
