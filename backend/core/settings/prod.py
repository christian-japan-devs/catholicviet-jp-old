'''Use this for development'''
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

from .base import *

DEBUG = False
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
USE_X_FORWARDED_PORT = True

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

AH = env('ALLOWED_HOSTS')

if AH:
    ALLOWED_HOSTS = AH.split(' ')

WSGI_APPLICATION = 'core.wsgi.prod.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

# [START db_setup]
if os.getenv('GAE_APPLICATION', None):
    pass
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'PORT': env('DB_PORT'),
            'NAME': env('DB_NAME'),
            'USER': env('DB_USER'),
            'PASSWORD': env('DB_PASSWORD'),
        }
    }

DATABASES['default']['HOST'] = env('DB_HOST')
if os.getenv('GAE_APPLICATION'):
    pass
else:
    DATABASES['default']['HOST'] = '127.0.0.1'
# [END db_setup]

# Django CORS Headers

CORS_ORIGIN_WHITELIST = [
    'https://catholicviet.jp',
    'https://www.catholicviet.jp',
]

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

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

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

# Run $ python3 manage.py collectstatic
# This will copy all files from your static folders into the ROOT directory.

STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'

# Google Cloud Storage configuration
GS_PROJECT_ID = env('GS_PROJECT_ID')
GS_STORAGE_BUCKET_NAME = env('GS_BUCKET_NAME')
GS_MEDIA_BUCKET_NAME = env('GS_BUCKET_NAME')
GS_DEFAULT_ACL = 'publicRead'

# If GOOGLE_APPLICATION_CREDENTIALS is set there is no need to load OAuth token
# See https://django-storages.readthedocs.io/en/latest/backends/gcloud.html
if 'GOOGLE_APPLICATION_CREDENTIALS' not in os.environ:
    GS_CREDENTIALS = env('GS_CREDENTIALS')
