"""
Django settings for botustech project.

Generated by 'django-admin startproject' using Django 3.2.16.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-o!)be$28grk#q0#i_*v789v@w-hsa50&+wvhb%i0ws!_%pn&$2'

# STRIPE
STRIPE_SECRET_KEY = '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'
STRIPE_WEBHOOK_SECRET = 'whsec_2bXx4va9fbYH3pAX7PndR3XXO3v4vck5'
STRIPE_LOCAL_CLI_WEBHOOK = 'whsec_cee17aeea6d2011e2074bb1af56f3a910fc3ad1ebeedd5df5dcc48b7be1b1df5'
# COINBASE
COINBASE_COMMERCE_API_KEY = '85f63c13-ea67-4d5e-aa7a-4294570775cf'
COINBASE_COMMERCE_WEBHOOK_SHARED_SECRET = '9f1fb166-ab79-4a12-8e30-ff54c370f73a'
COINBASE_CHECKOUT_ID = '7211092c-58f0-449f-af10-9fec7dd1acbd'


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
EMAIL_FROM_ADDRESS = "support@maxupvote.com"
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.privateemail.com'
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_PORT = 587
EMAIL_HOST_USER = "support@maxupvote.com"
EMAIL_HOST_PASSWORD ="botusmail@1$"

ALLOWED_HOSTS = ["*"]
CORS_ALLOW_CREDENTIALS = False

CORS_ALLOW_METHODS = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
]

CORS_ORIGIN_WHITELIST = [
    "https://172.60.0.4:3000",
    "http://172.60.0.4:3000",
    "http://172.60.0.5:3000",
    "https://172.60.0.5:3000",
    'http://maxupvote.com/' ,
]

CSRF_TRUSTED_ORIGINS = [
    "https://172.60.0.4:3000",
    "http://172.60.0.4:3000",
    "http://172.60.0.5:3000",
    "https://172.60.0.5:3000",
    'http://localhost:3000',
    'http://maxupvote.com/'
    ]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'botustech',
    'graphene_django',
    'django_filters',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    'subscriptions',
    'crypto',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'botustech.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'botustech.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'Botustech',
        'USER': 'botus',
        'PASSWORD': 'botus1234',
        'HOST': 'db',
        'PORT': '3306',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = "/root/botus/backend/botustech/static/"

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

#frontend
SUBSCRIPTION_SUCCESS_URL = 'http://maxupvote.com/'
SUBSCRIPTION_FAILED_URL = 'http://maxupvote.com/'
SUBSCRIPTION_REDIRECT_URL = 'http://maxupvote.com/coinbase-beta/'

#celery
REDIS_HOST = '172.60.0.7'
CELERY_BROKER_URL = 'redis://' + REDIS_HOST + ':6379'
CELERY_RESULT_BACKEND = 'redis://' + REDIS_HOST + ':6379'
FRONTEND_URL = 'http://maxupvote.com/'