from . import views
from django.urls import path, include
from .views import TaskDetailView, TaskListCreateView, NotificationListView
from rest_framework.authtoken.views import obtain_auth_token



urlpatterns = [
    # path("", views.home, name = 'home'),
    # path('api-auth/', include('rest_framework.urls')),  # Login for browsable API
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('register/', views.register_user, name="register_user"),
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:pk>/read/', views.mark_notification_as_read, name='mark-notification-read'),
]

