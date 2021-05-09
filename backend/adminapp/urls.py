from django.urls import path
from .views import ProviceViewSet

urlpatterns = [
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
