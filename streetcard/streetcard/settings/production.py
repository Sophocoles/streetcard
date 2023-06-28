from .base import *

DEBUG = False

ALLOWED_HOSTS=['streetcard.org']

try:
    from .local import *
except ImportError:
    pass
