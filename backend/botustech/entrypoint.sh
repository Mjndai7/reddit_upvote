#!/bin/sh

set -e
python manage.py migrate &

sleep 5
gunicorn botustech.wsgi:application --bind 0.0.0.0:8000 &

sleep 5

celery -A botustech worker --loglevel=INFO
