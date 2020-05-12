from . import bp
from .models import Record

@bp.route('/')
def index():
    return 'Hello world'
