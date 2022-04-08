from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.

class signupInfo(TemplateView):
	template_name = "signup/signuppage.html"