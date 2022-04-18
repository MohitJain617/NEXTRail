from django.urls import  path
from .views import index

urlpatterns = [
    path('', index),
    path('train/', index),
    path('search/', index),
    path('pnr/', index)
]
