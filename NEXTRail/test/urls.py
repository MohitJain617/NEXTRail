from django.urls import path
from .views import PnrView, SeatAvailibility, TrainDetailView, TrainSeatsView, StationView, TicketsView, BookTickets
from django.contrib.auth import views as auth_views
urlpatterns = [
    path('', StationView.as_view()),
    path('train/', TrainDetailView.as_view()),
    path('classdetails/', SeatAvailibility.as_view()),
    path('tickets/', TicketsView.as_view()),
    path('book/', BookTickets.as_view()),
    path('train/seats', TrainSeatsView.as_view()),
    path('stations', StationView.as_view()),
    path('pnr/', PnrView.as_view()),
]
