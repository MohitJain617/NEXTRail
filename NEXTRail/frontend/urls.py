from django.urls import  path
from .views import index

urlpatterns = [
    path('', index),
    path('train/', index),
    path('search/', index),
    path('pnr/', index),
<<<<<<< HEAD
    path('login/',index),
    path('signup/',index),
    path('payment/',index),

=======
    path('login/', index),
    path('signup/', index),
    path('bookings/', index),
>>>>>>> 176196104c025e62d281f6bbb8f1adeaa53112d8
]
