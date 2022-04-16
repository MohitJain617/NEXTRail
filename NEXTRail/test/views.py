from html5lib import serialize
from rest_framework import generics, status
from .seralizers import StationSerializer, TrainSerializer, getTrainDetailsSerializer
from .models import Station, Train
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.


class TestView(generics.ListAPIView):
    queryset = Station.objects.raw('SELECT * FROM station WHERE st_code LIKE "A_J"')
    serializer_class = StationSerializer

class TrainDetailView(APIView):
    serializer_class = getTrainDetailsSerializer

    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        train_no = request.data.get('id')
        #Unsafe now safe from sql injection using params
        queryset = Train.objects.raw('SELECT * FROM train WHERE id = %s', [train_no])
        # print(queryset)
        if(len(queryset) == 1):
            return Response(TrainSerializer(queryset[0]).data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)