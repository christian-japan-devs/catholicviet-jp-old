from django.urls import path
from . import views
from django.conf.urls import url
from .linkname import *

urlpatterns = [
    path('', views.home, name=VCTJ_HOME),
]