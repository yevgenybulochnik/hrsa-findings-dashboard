"""Tag data migration

Revision ID: 598ee65d9b42
Revises: 7097281d233d
Create Date: 2020-07-03 07:14:11.616259

"""
import json
from pathlib import Path
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column
from sqlalchemy import String
from flask import current_app


# revision identifiers, used by Alembic.
revision = '598ee65d9b42'
down_revision = '7097281d233d'
branch_labels = None
depends_on = None

MIGRATIONS_DIR = Path(current_app.root_path).parent / 'migrations'

with open(MIGRATIONS_DIR / 'fixtures' / 'tags.json') as f:
    data = json.load(f)


def upgrade():
    tags = table('tag',
        column('title', String),
        column('name', String),
        column('color', String)
    )

    op.bulk_insert(tags, data)


def downgrade():
    op.execute('DELETE FROM tag')
