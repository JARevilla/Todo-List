from celery import shared_task
from django.core.mail import send_mail # type: ignore
from .models import Task

@shared_task
def update_task_status(task_id, new_status):
    # Fetch task by ID
    task = Task.objects.get(id=task_id)

    # Update task status (this could be completion or other status changes)
    task.completed = new_status
    task.save()

    # Send an email after the task status is updated (optional)
    send_mail(
        'Task Status Updated',
        f'The status of your task "{task.name}" has been updated to "{new_status}".',
        'wendyrevilla.default@gmail.com',
        [task.user.email],
        fail_silently=False,
    )
    return f"Task {task.name} status updated to {new_status}"
