from django.db import models

class User(models.Model):  # If it's a fully custom model
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)

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