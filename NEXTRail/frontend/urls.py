from django.urls import  path
from .views import index

urlpatterns = [
    path('', index),
    path('train/', index),
    path('results/', index),
    path('pnr/', index),
    path('login/',index),
    path('signup/',index),
    path('payment/',index),
    path('pnr/success', index),
    path('login/', index),
    path('signup/', index),
    path('bookings/', index),
]
