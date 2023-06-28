from .base import *

DEBUG = False

ALLOWED_HOSTS=['streetcard.org', '164.92.73.2']

try:
    from .local import *
except ImportError:
    pass
