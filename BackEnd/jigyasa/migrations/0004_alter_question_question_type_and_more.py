# Generated by Django 5.1.7 on 2025-03-24 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jigyasa', '0003_alter_question_file_types_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='question_type',
            field=models.CharField(choices=[('text', 'Text'), ('paragraph', 'Paragraph'), ('email', 'Email'), ('phone', 'Phone'), ('date', 'Date'), ('time', 'Time'), ('choice', 'Single Choice'), ('multiChoice', 'Multiple Choice'), ('rating', 'Rating'), ('scale', 'Scale'), ('matrix', 'Matrix'), ('file', 'File Upload')], max_length=50),
        ),
        migrations.AlterField(
            model_name='question',
            name='scale_labels',
            field=models.JSONField(blank=True, default=dict),
        ),
    ]
