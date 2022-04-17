import imp
from django.urls import path
from .views import TestView, TrainDetailView

urlpatterns = [
    path('', TestView.as_view()),
    path('train', TrainDetailView.as_view()),
    path('train/<str:trainno>/', TrainDetailView.as_view())
]
