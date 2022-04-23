from django.urls import path
from .views import TrainDetailView, TrainSeatsView, StationView
from django.contrib.auth import views as auth_views
urlpatterns = [
    path('', StationView.as_view()),
    path('train/', TrainDetailView.as_view()),
    path('train/seats', TrainSeatsView.as_view()),
    path('stations', StationView.as_view()),
]
