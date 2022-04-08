from django.urls import path
from login.views import LoginInfo
# from . import views

urlpatterns = [
	path('login/',LoginInfo.as_view()),
]