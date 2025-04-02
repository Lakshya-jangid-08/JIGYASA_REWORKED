from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import User, Survey, Question

User = get_user_model()

# Question Serializer
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
        extra_kwargs = {"survey": {"required": False}}  # Avoid requiring survey initially

# Survey Serializer
class SurveySerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True, source='question_set')
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Fix here

    class Meta:
        model = Survey
        fields = '__all__'

    def create(self, validated_data):
        questions_data = validated_data.pop("questions", [])

        # Create the survey directly
        survey = Survey.objects.create(**validated_data)

        # Create related questions if provided
        if questions_data:
            question_objects = [
                Question(survey=survey, **question_data) for question_data in questions_data
            ]
            Question.objects.bulk_create(question_objects)

        return survey

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'phone_number', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2', 'phone_number')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
