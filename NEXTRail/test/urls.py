from django.urls import path
from .views import  TrainDetailView, TrainSeatsView, StationView

urlpatterns = [
    path('', StationView.as_view()),
    path('train/', TrainDetailView.as_view()),
    path('train/seats', TrainSeatsView.as_view()),
    path('stations', StationView.as_view()),
]
