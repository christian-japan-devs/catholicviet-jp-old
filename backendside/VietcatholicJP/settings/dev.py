'''Use this for development'''

from .base import *



ALLOWED_HOSTS += ['127.0.0.1','0.0.0.0','localhost']
DEBUG = True

WSGI_APPLICATION = 'VietcatholicJP.wsgi.dev.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'admin',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': 'db',
        'PORT': '3306'
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:8000',
)