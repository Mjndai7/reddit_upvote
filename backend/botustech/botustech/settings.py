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
STRIPE_SECRET_KEY = 'sk_test_51Lc84CDTMi1SAp13nQ049H6S612ZRMLUe59soxZZleOT4HFTTT9kKpqni8XCrgbu7DdQdd0BTl1BCgmUerENnhr900Wbni7Xnj'
STRIPE_WEBHOOK_SECRET = 'whsec_e6fb9e740bfa6b76a29b7b890e11854593efa6b447c8b582cecd5081035ea1da'

# COINBASE
COINBASE_COMMERCE_API_KEY = '0033fe47-39a9-440d-b513-4917d6cd3f49'
COINBASE_COMMERCE_WEBHOOK_SHARED_SECRET = 'da0a52f8-b214-4308-aafb-23f511a58951'
COINBASE_CHECKOUT_ID = '9416d7a2-6850-4fd1-a85f-e6abab8ec4e7'


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
EMAIL_FROM_ADDRESS = "asidohsidney254@gmail.com"

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = "asidohsidney254@gmail.com"
EMAIL_HOST_PASSWORD ="abfgkljuxuqbrvod"

ALLOWED_HOSTS = ["*"]
CORS_ALLOW_CREDENTIALS = False
CORS_ORIGIN_WHITELIST = [
    "https://172.60.0.4:3000",
    "http://172.60.0.4:3000",
    "http://167.71.45.71:3000",
]

CSRF_TRUSTED_ORIGINS = [
    "https://172.60.0.4:3000",
    "http://172.60.0.4:3000",
    "http://167.71.45.71:3000",
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
SUBSCRIPTION_SUCCESS_URL = 'https://172.60.0.4:3000'
SUBSCRIPTION_FAILED_URL = 'https://172.60.0.4:3000'
SUBSCRIPTION_REDIRECT_URL = 'https://172.60.0.4:3000/coinbase-beta/'

#celery
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
FRONTEND_URL = "https://172.60.0.4:3000"