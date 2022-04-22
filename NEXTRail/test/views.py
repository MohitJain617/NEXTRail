from typing import Any, Dict
from datetime import datetime
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
        classReq = 'FALSE' if(classType == '') else 'TRUE'
        #classType is empty string for all classes
        dest = request.data.get('dest')
        src = request.data.get('src')
        doj = request.data.get('doj')
        doja = datetime.strptime(doj,'%Y-%m-%d').weekday()+1
        print(classType,dest,src,doja,classReq,sep=' ')
        #Write your queries here

        query = """SELECT T.train_no FROM time_table as T NATURAL JOIN sched as S
            WHERE T.st_code = %s
                AND (T.day_no+S.trip_no-1) = %s
                AND EXISTS (
                    SELECT * FROM time_table as T2 NATURAL JOIN sched as S2
                    WHERE S2.trip_no = S.trip_no
                        AND S2.train_no = S.train_no
                        AND (T.dist) < (T2.dist)
                        AND T2.st_code = %s 
                )
                AND (
                (%s="FALSE") OR EXISTS (
                    SELECT * FROM struct as STR
                    WHERE STR.train_no = S.train_no
                    AND STR.class_type = %s
                )
            )"""
            
        params = [src,doja,dest,classReq,classType]

        queryset = BackEndQuerier.cursor_querier(query,params)
        queryClasses = """select distinct class_type from struct where train_no = %s;"""
        queryStationTime = """select arrival,departure,day_no from time_table where train_no = %s and st_code=%s;"""
        queryTrainName = """select train_name from train where id = %s;"""
        queryTrips = """select trip_no from sched where train_no = %s;"""
        
        # appending required values
        for i in range(len(queryset)):
            #train name
            currId = queryset[i]["train_no"]
            queryset[i]["train_name"] = BackEndQuerier.cursor_querier(queryTrainName,[currId])[0]["train_name"]

            # classes in this train:
            varclasses = BackEndQuerier.cursor_querier(queryClasses,[currId])
            # making comma seperated string
            varString=""
            for temp in varclasses:
                varString = varString + temp["class_type"]+','
            varString = varString[:-1]
            queryset[i]["class_types"] = varString

            # station timings
            varTimes = BackEndQuerier.cursor_querier(queryStationTime,[currId,src])[0]
            queryset[i]["src_arrival"] = varTimes["arrival"]
            queryset[i]["src_departure"] = varTimes["departure"]
            queryset[i]["src_day_no"] = varTimes["day_no"]

            varTimes = BackEndQuerier.cursor_querier(queryStationTime,[currId,dest])[0]
            queryset[i]["dest_arrival"] = varTimes["arrival"]
            queryset[i]["dest_departure"] = varTimes["departure"]
            queryset[i]["dest_day_no"] = varTimes["day_no"]

            # days(trip nos) at which this train starts from actual source
            varDays = BackEndQuerier.cursor_querier(queryTrips,[currId])
            varString = ""
            for temp in varDays:
                # offset for current source
                x = (temp["trip_no"]+queryset[i]["src_day_no"]-1) % 7
                x = 7 if(x == 0) else x;
                varString = varString + str(x)+","
            varString = varString[:-1]
            queryset[i]["trip_nos"] = varString

        print(queryset)

        if(len(queryset) >= 1):
            return Response(queryset,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def get(self,request,format=None):
        train_no = request.GET.get('id')
        if train_no != None:
            query = 'SELECT * FROM train WHERE id = %s'
            queryset = BackEndQuerier.cursor_querier(query,[train_no])[0]
            queryClasses = """select distinct class_type from struct where train_no = %s;"""
            queryTrips = """select trip_no from sched where train_no = %s;"""
            queryTT = """select st_code,arrival,departure,dist,day_no from time_table where train_no = %s order by dist ;"""

            # appending required values
            # classes in this train:
            varclasses = BackEndQuerier.cursor_querier(queryClasses,[train_no])
            # making comma seperated string
            varString=""
            for temp in varclasses:
                varString = varString + temp["class_type"]+','
            varString = varString[:-1]
            queryset["class_types"] = varString

            # days(trip nos) at which this train starts from actual source
            varDays = BackEndQuerier.cursor_querier(queryTrips,[train_no])
            varString = ""
            for temp in varDays:
                x = temp["trip_no"]
                varString = varString + str(x)+","
            varString = varString[:-1]
            queryset["trip_nos"] = varString
            queryset["time_table"] = BackEndQuerier.cursor_querier(queryTT,[train_no])

            if(len(queryset) >= 1):
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