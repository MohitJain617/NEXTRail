from html5lib import serialize
from rest_framework import generics, status
from .seralizers import StationSerializer, TrainSerializer, getTrainDetailsSerializer, AllSeatsSerializer
from .models import Station, Train
from rest_framework.views import APIView
from rest_framework.response import Response

from django.db import connection
# Create your views here.

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

def get_all_seats(tno):
    with connection.cursor() as cursor:
        cursor.execute("SELECT S.train_no, S.class_type as coach, SN2.num as coach_no, SN.num as seat_no FROM struct AS S,  class_layout as C, seat_no AS SN2, seat_no as SN WHERE S.train_no = %s AND S.class_type = C.class_type AND SN2.num <= S.size AND SN.num <= C.capacity;", [tno])
        row = dictfetchall(cursor)
        

    # print(row)
    return row

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
        
    def get(self,request,trainno,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        print("got get request")
        # train_no = self.request.query_params.get('trainno')
        train_no = trainno
        queryset = Train.objects.raw('SELECT * FROM train WHERE id = %s', [train_no])
        if(len(queryset) == 1):
            return Response(TrainSerializer(queryset[0]).data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class TrainSeatsView(APIView):
    def post(self,request,format=None):
        print("post called")
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        train_no = request.data.get('id')
        print(train_no)
        # train_no = '22210'

        queryset = get_all_seats(train_no)

        # print(queryset[0])
        print(len(queryset))

        if(len(queryset) >= 1):
            return Response(queryset,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)