import imp
from django.urls import path
from .views import TestView, TrainAvlView, TrainDetailView, TrainSeatsView, StationView

urlpatterns = [
    path('', TestView.as_view()),
    path('train', TrainAvlView.as_view()),
    path('train/<str:trainno>/', TrainDetailView.as_view()),
    path('train/seats', TrainSeatsView.as_view()),
    path('stations', StationView.as_view()),
]
