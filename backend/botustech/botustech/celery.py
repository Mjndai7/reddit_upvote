from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# set the default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'botustech.settings')

_celery_app = Celery('botustech')

# using a string here means the worker will not have to
# pickle the object when using Windows.
_celery_app.config_from_object('django.conf:settings', namespace='CELERY')

# load task modules from all registered Django _celery_app configs.
_celery_app.autodiscover_tasks()
