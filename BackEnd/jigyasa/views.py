from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import SurveySerializer, QuestionSerializer
from rest_framework import generics
from rest_framework.generics import RetrieveAPIView
from .models import Survey, Question
from .serializers import SurveySerializer
from django.shortcuts import render
# from jigyasa_survey.models import Survey, Question  # Replace with your actual app name
from rest_framework.response import Response
from rest_framework import status

class SurveyCreateView(generics.CreateAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SurveyDetailView(RetrieveAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        survey = self.get_object()
        questions = Question.objects.filter(survey=survey)
        survey_data = self.get_serializer(survey).data
        survey_data['questions'] = QuestionSerializer(questions, many=True).data
        return Response(survey_data)
