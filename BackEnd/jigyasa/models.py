from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

class Survey(models.Model):
    survey_name = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Question(models.Model):
    QUESTION_TYPES = [
        ('text', 'Text'),
        ('paragraph', 'Paragraph'),
        ('email', 'Email'),
        ('phone', 'Phone'),
        ('date', 'Date'),
        ('time', 'Time'),
        ('choice', 'Single Choice'),
        ('multiChoice', 'Multiple Choice'),  # Note: frontend uses 'multiChoice'
        ('rating', 'Rating'),
        ('scale', 'Scale'),
        ('matrix', 'Matrix'),
        ('file', 'File Upload')
    ]
    
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name="question_set")
    question_text = models.TextField()
    question_type = models.CharField(max_length=50, choices=QUESTION_TYPES)