from django.urls import path
from .views import (
    MonthlyTopicViewSet, NewFeedViewSet, ReMassListViewSet, MassRegister, GospelViewSet, ProvinceViewSet, UserCreate
)

app_name = 'api'

urlpatterns = [
    path('monthly-topic', MonthlyTopicViewSet.as_view({
        'get': 'topic'
    })),
    path('monthly-topic/<str:month>/', MonthlyTopicViewSet.as_view({
        'get': 'detail',
        'put': 'update'
    })),
    path('newfeed', NewFeedViewSet.as_view({
        'get': 'getlist'
    })),
    path('newfeed/<str:pk>', NewFeedViewSet.as_view({
        'get': 'retrieve',
        'put': 'update'
    })),
    path('getmass/', ReMassListViewSet.as_view({
        'get': 'getlist'
    })),
    path('getmass/<str:pk>', ReMassListViewSet.as_view({
        'get': 'retrieve'
    })),
    path('massregister/', MassRegister.as_view({
        'get': 'getlist',
        'post': 'create'
    })),
    path('massregister/<str:rid>', MassRegister.as_view({
        'get': 'retrieve'
    })),
    path('province', ProvinceViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('province/<str:pk>', ProvinceViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('account/create', UserCreate.as_view({
        'post': 'create',
    })),
    path('account/confirm', UserCreate.as_view({
        'post': 'confirm',
    })),
    path('account/request-password', UserCreate.as_view({
        'post': 'requestPassword',
    })),
    path('account/reset-password', UserCreate.as_view({
        'post': 'resetPassword',
    })),
]
