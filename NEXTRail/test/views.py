from rest_framework import generics
from .seralizers import StationSerializer
from .models import Station
# Create your views here.


class TestView(generics.ListAPIView):
    queryset = Station.objects.raw('SELECT * FROM station WHERE st_code LIKE "A_J"')
    serializer_class = StationSerializer


    