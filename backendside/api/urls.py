from django.urls import path
from .views import DailyReadingViewSet,ProviceViewSet, UserAPIView

urlpatterns = [
    path('dailyreading',DailyReadingViewSet.as_view({
        'get': 'list',
        'post':'create'
    })),
    path('dailyreading/<str:pk>',DailyReadingViewSet.as_view({
        'get': 'retrieve',
        'put':'update',
        'delete':'destroy'
    })),
    path('province',ProviceViewSet.as_view({
        'get': 'list',
        'post':'create'
    })),
    path('province/<str:pk>',ProviceViewSet.as_view({
        'get': 'retrieve',
        'put':'update',
        'delete':'destroy'
    })),
    path('user',UserAPIView.as_view()),
]
