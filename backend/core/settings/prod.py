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
    # Running on production App Engine, so connect to Google Cloud SQL using
    # the unix socket at /cloudsql/<your-cloudsql-connection string>
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'HOST': env('DB_CLOUD_CONNECTION'),
            'USER': env('DB_USER'),
            'PASSWORD': env('DB_PASSWORD'),
            'NAME': env('DB_NAME'),
        }
    }
else:
    # Running locally so connect to either a local MySQL instance or connect to
    # Cloud SQL via the proxy. To start the proxy via command line:
    #
    #     $ cloud_sql_proxy -instances=[INSTANCE_CONNECTION_NAME]=tcp:3306
    #
    # See https://cloud.google.com/sql/docs/mysql-connect-proxy
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'HOST': env('DB_HOSTNAME'),
            'PORT': env('DB_PORT'),
            'NAME': env('DB_NAME'),
            'USER': env('DB_USER'),
            'PASSWORD': env('DB_PASSWORD'),
        }
    }
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


STRIPE_PUBLIC_KEY = env('STRIPE_TEST_PUBLIC_KEY')
STRIPE_SECRET_KEY = env('STRIPE_TEST_SECRET_KEY')

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = env('MEDIA_URL')

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = env('STATIC_URL')

# Run $ python3 manage.py collectstatic
# This will copy all files from your static folders into the ROOT directory.

STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'

# Google Cloud Storage configuration
GS_PROJECT_ID = env('GS_PROJECT_ID')
GS_STORAGE_BUCKET_NAME = env('GS_STORAGE_BUCKET_NAME')
GS_MEDIA_BUCKET_NAME = env('GS_MEDIA_BUCKET_NAME')
GS_AUTO_CREATE_BUCKET = env('GS_AUTO_CREATE_BUCKET')
GS_QUERYSTRING_AUTH = env('GS_QUERYSTRING_AUTH')
GS_DEFAULT_ACL = env('GS_DEFAULT_ACL')
GS_MEDIA_CUSTOM_ENDPOINT = env('GS_MEDIA_CUSTOM_ENDPOINT')
GS_EXPIRATION = env('GS_EXPIRATION')

# If GOOGLE_APPLICATION_CREDENTIALS is set there is no need to load OAuth token
# See https://django-storages.readthedocs.io/en/latest/backends/gcloud.html
if 'GOOGLE_APPLICATION_CREDENTIALS' not in os.environ:
    GS_CREDENTIALS = env('GS_CREDENTIALS')
