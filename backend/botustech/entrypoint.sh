#!/bin/sh

set -e
python manage.py makemigrations botustech &

sleep 5
python manage.py migrate &

sleep 5
gunicorn botustech.wsgi:application --bind 0.0.0.0:8000 & 

sleep 5

celery -A botustech worker --loglevel=INFO
