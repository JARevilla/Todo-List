from django.utils import timezone
from rest_framework import serializers # type: ignore
from .models import Task, Notification
from django.contrib.auth.models import User


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # fields = '__all__'
        fields = ['id', 'user', 'name', 'description', 'completed', 'due_date', 'priority', 'category', 'created_at', 'updated_at']

    def validate_due_date(self, value):
        if value and value < timezone.now().date():
            raise serializers.ValidationError("Due date cannot be in the past.")
        return value

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id','message', 'created_at', 'is_read']

    def update(self, instance, validated_data):
        # You can handle additional validation or manipulation if necessary
        instance.is_read = validated_data.get('is_read', instance.is_read)
        instance.save()
        return instance