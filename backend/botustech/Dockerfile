# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /backend

# Install the required system packages for building MySQL client
RUN apt-get update \
    && apt-get install -y default-libmysqlclient-dev build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file to the working directory
COPY requirements.txt .

COPY entrypoint.sh .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt


# Copy the project code to the working directory
COPY . .

# Set the DJANGO_ENV environment variable
ARG DJANGO_ENV
ENV DJANGO_ENV=${DJANGO_ENV}


ENV REDIS_HOST=redis
ENV REDIS_PORT=6379

# Expose the port for the backend service
EXPOSE 8000


# Run the Django server
RUN python manage.py makemigrations botustech 

# Start the Celery worker and the backend server
CMD gunicorn botustech.wsgi:application --bind 0.0.0.0:8000

