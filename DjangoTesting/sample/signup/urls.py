
from django.urls import path
# from login.views import LoginInfo
from . import views
# from . import views

urlpatterns = [
	path('',views.signupInfo.as_view(),name='sign-up'),
]