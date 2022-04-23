from django.urls import path
# from login.views import LoginInfo
from . import views
# from . import views

urlpatterns = [
	path('',views.LoginInfo.as_view(),name='login'),
]