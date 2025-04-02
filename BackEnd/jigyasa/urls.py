from django.urls import path
from jigyasa.views import SurveyCreateView
from .views import SurveyCreateView, SurveyDetailView

urlpatterns = [
    path('create-survey/', SurveyCreateView.as_view(), name='create-survey'),
    path('survey/<int:id>/', SurveyDetailView.as_view(), name='survey-detail'),
]
