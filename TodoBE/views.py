from django.shortcuts import render
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .tasks import update_task_status # type: ignore

# async libraries
from .models import Notification
from .serializers import NotificationSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response()

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return tasks only for the logged-in user
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Assign the task to the logged-in user
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        super().perform_update(serializer)
        serializer.save()


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Ensure users can only retrieve their own tasks
        return Task.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        # print("Request data:", self.request.data)
        # super().perform_update(serializer)
        # serializer.save()
        
        # Get the original task object
        task = serializer.instance
        
        # Get the new status from the request data (e.g., 'Completed')
        new_status = self.request.data.get('completed', None)
        
        # Save the updated task
        super().perform_update(serializer)
        serializer.save()

        # If the status has been updated, trigger the Celery task asynchronously
        if new_status and task.completed != new_status:
            task.completed = new_status
            task.save()  # Ensure the task is saved with the new status
            update_task_status.apply_async(args=[task.id, new_status])  # Trigger the background task


class ObtainAuthToken(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


# Async View
class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user, is_read=False)
    

@api_view(['PATCH'])
def mark_notification_as_read(request, pk):
    try:
        notification = Notification.objects.get(pk=pk, user=request.user)
        notification.is_read = True  # Mark as read
        notification.save()

        # Serialize and return updated notification
        serializer = NotificationSerializer(notification)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Notification.DoesNotExist:
        return Response({"error": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)