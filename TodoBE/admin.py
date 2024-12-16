from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext, gettext_lazy as _
# from rangefilter.filter import DateRangeFilter

from TodoBE.models import *

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'description', 'completed', 'due_date', 'priority', 'category', 'created_at', 'updated_at')
    list_filter = ('name',)
    search_fields = ('name', 'user')
    ordering = ('created_at',)

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'is_read', 'created_at')
    list_filter = ('user',)
    search_fields = ('user', 'message')
    ordering = ('created_at',)