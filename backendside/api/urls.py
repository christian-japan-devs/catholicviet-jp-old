from django.urls import path
from .views import NewFeedViewSet,ReMassListViewSet,MassRegister, GospelViewSet, ProvinceViewSet

urlpatterns = [
    path('newfeed',NewFeedViewSet.as_view({
        'get': 'getlist'
    })),
    path('newfeed/<str:pk>',NewFeedViewSet.as_view({
        'get': 'retrieve',
        'put':'update'
    })),
    path('getmass/',ReMassListViewSet.as_view({
        'get': 'getlist'
    })),
    path('getmass/<str:pk>',ReMassListViewSet.as_view({
        'get': 'retrieve'
    })),
    path('massregister/',MassRegister.as_view({
        'get': 'getlist',
        'post': 'create'
    })),
    path('massregister/<str:pk>',MassRegister.as_view({
        'get': 'retrieve'
    })),
    path('province',ProvinceViewSet.as_view({
        'get': 'list',
        'post':'create'
    })),
    path('province/<str:pk>',ProvinceViewSet.as_view({
        'get': 'retrieve',
        'put':'update',
        'delete':'destroy'
    })),
]
