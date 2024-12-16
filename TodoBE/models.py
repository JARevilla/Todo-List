from django.db import models
from django.contrib.auth.models import User
# from .models import Task, Notification

# libraries for notification
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class Task(models.Model):
    PRIORITY_CHOICES = [
        ('L', 'Low'),
        ('M', 'Medium'),
        ('H', 'High'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)
    priority = models.CharField(
        max_length=1,
        choices=PRIORITY_CHOICES,
        default='L'
    )
    category = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name



# Async Notification
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message
    
@receiver(post_save, sender=Task)
def task_due_date_notification(sender, instance, **kwargs):
    if instance.due_date and instance.due_date <= timezone.now() + timezone.timedelta(hours=1) and not instance.completed:
        # Create a notification for the user
        Notification.objects.create(
            user=instance.user,
            message=f"Reminder: Your task '{instance.name}' is due soon!"
        )
