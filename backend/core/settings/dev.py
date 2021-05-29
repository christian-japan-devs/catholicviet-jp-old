'''Use this for development'''

from .base import *



ALLOWED_HOSTS += ['127.0.0.1','0.0.0.0','localhost']

INSTALLED_APPS += ['debug_toolbar']


WSGI_APPLICATION = 'core.wsgi.dev.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:8000',
    'http://localhost:3000',
)

CORS_ALLOWED_ORIGINS = [
    "https://catholicviet.jp",
    "https://vietcatholicjp.com",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

# static assets that aren’t tied to a particular app
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'build/static')]

# Stripe
STRIPE_PUBLIC_KEY = config('STRIPE_TEST_PUBLIC_KEY')
STRIPE_SECRET_KEY = config('STRIPE_TEST_SECRET_KEY')