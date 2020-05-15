import click
from app.auditlog.models import Record


@click.command()
@click.argument('filepath', type=click.Path(exists=True))
def seed(filepath):
    print(filepath)
