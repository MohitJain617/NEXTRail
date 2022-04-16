from django.shortcuts import render

# Create your views here.
def index(request, *args, **kwargs):
    #Make django render index.html
    return render(request, 'frontend/index.html')