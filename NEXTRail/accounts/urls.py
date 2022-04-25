from django.urls import path, include
from .views import  LoginView, RegisterUserView, getUserView
from knox import views as knox_views

urlpatterns = [
    path('auth',include('knox.urls')),
    path('register/', RegisterUserView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', getUserView.as_view()),
    path('logout/', knox_views.LogoutView.as_view())
]
