from typing import Any, Dict
from html5lib import serialize
from rest_framework import generics, status
from .seralizers import StationSerializer, TrainSerializer, getTrainDetailsSerializer, AllSeatsSerializer
from .models import Station, Train
from rest_framework.views import APIView
from rest_framework.response import Response

from django.db import connection
# Create your views here.

class BackEndQuerier():

    def dictfetchall(cursor):
        "Return all rows from a cursor as a dict"
        columns = [col[0] for col in cursor.description]
        return [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]
    
    def cursor_querier(query,params):
        with connection.cursor() as cursor:
            cursor.execute(query, params)
            row = BackEndQuerier.dictfetchall(cursor)
    # print(row)
        return row

class TestView(generics.ListAPIView):
    queryset = Station.objects.raw('SELECT * FROM station WHERE st_code LIKE "A_J"')
    serializer_class = StationSerializer

class TrainDetailView(APIView):

    def post(self,request,format=None):
        classType = request.data.get('classType')
        #classType is empty string for all classes
        dest = request.data.get('dest')
        src = request.data.get('src')
        doj = request.data.get('doj')
        print(classType,dest,src,doj,sep='\n')
        #Write your queries here

        return Response(status=status.HTTP_200_OK)


    def get(self,request,format=None):
        train_no = request.GET.get('id')
        if train_no != None:
            query = 'SELECT * FROM train WHERE id = %s'
            queryset = BackEndQuerier.cursor_querier(query,[train_no])
            if(len(queryset) == 1):
                return Response(queryset,status=status.HTTP_200_OK)
            else:
                return Response({"Train not Found!":"Cannot find the train."},
                status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request":"Invalid train no."},status=status.HTTP_400_BAD_REQUEST)

class TrainSeatsView(APIView):


    def post(self,request,format=None):
        print("post called")
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        train_no = request.data.get('id')
        print(train_no)
        # train_no = '22210'
        query = """SELECT S.train_no,
         S.class_type as coach, SN2.num as coach_no, SN.num as seat_no FROM struct AS S,  
        class_layout as C, seat_no AS SN2, seat_no as SN 
        WHERE S.train_no = %s AND S.class_type = C.class_type AND SN2.num <= S.size 
        AND SN.num <= C.capacity;"""

        queryset = BackEndQuerier.cursor_querier(query,[train_no])

        if(len(queryset) >= 1):
            return Response(queryset,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class StationView(APIView):
    serializer_class = StationSerializer

    def get(self,request,format=None):
        
        queryset = Station.objects.raw('SELECT * FROM station')        
        if(len(queryset) >= 1):
            data = StationSerializer(queryset,many=True).data
            return Response(data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)