"""HRSA Des data migration

Revision ID: d06e045a2507
Revises: 60527b68fb7e
Create Date: 2020-06-22 09:53:48.497988

"""
import json
from pathlib import Path
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column
from sqlalchemy import String
from flask import current_app


# revision identifiers, used by Alembic.
revision = 'd06e045a2507'
down_revision = '60527b68fb7e'
branch_labels = None
depends_on = None

MIGRATIONS_DIR = Path(current_app.root_path).parent / 'migrations'

with open(MIGRATIONS_DIR / 'fixtures' / 'hrsa_abv.json') as f:
    data = json.load(f)

def upgrade():
    hrsa_des = table('hrsa_designations',
        column('designation', String),
        column('abv', String),
    )

    op.bulk_insert(hrsa_des, data)


def downgrade():
    op.execute('DELETE FROM hrsa_designations')
