'''Use this for development'''

from .base import *



ALLOWED_HOSTS += ['127.0.0.1','0.0.0.0','localhost']
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

WSGI_APPLICATION = 'VietcatholicJP.wsgi.dev.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOSTNAME'),
        'PORT': env('DB_PORT'),
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:8000',
)