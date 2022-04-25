from typing import Any, Dict
from html5lib import serialize
from rest_framework import generics, status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response

from django.db import connection
# Create your views here.

from datetime import datetime,timedelta
class DateFunctions():

    def getDayNo(doj):
        return datetime.strptime(doj,'%Y-%m-%d').weekday()+1
    
    def getWeekNo(doj):
        sdate = datetime(1970,1,5).date()
        ndate = datetime.strptime(doj,"%Y-%m-%d").date()
        days = abs(ndate-sdate).days 
        return days//7
    
    def getDate(weeks, days):
        x = datetime.strptime("1970-01-05","%Y-%m-%d")
        d = timedelta(days = (weeks*7)+days-1)
        x = x + d
        return x
        

class BackEndQuerier():

    def dictfetchall(cursor):
        "Return all rows from a cursor as a dict"
        columns = [col[0] for col in cursor.description]
        return [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]
    
    def cursor_querier(query,params=[]):
        with connection.cursor() as cursor:
            cursor.execute(query, params)
            row = BackEndQuerier.dictfetchall(cursor)
        # print(row)
        return row

class TrainDetailView(APIView):

    def post(self,request,format=None):
        classType = request.data.get('classType')
        classReq = 'FALSE' if(classType == '') else 'TRUE'
        #classType is empty string for all classes
        dest = request.data.get('dest')
        src = request.data.get('src')
        doj = request.data.get('doj')
        doja = DateFunctions.getDayNo(doj)
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


        if(len(queryset) >= 1):
            return Response(queryset,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def get(self,request,format=None):
        train_no = request.GET.get('id')
        if train_no != None:
            query = 'SELECT * FROM train WHERE id = %s'
            queryset = BackEndQuerier.cursor_querier(query,[train_no])
            if len(queryset) >= 1:
                queryset = queryset[0]
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
                return Response(queryset,status=status.HTTP_200_OK)
            else:
                return Response({"Train not Found!":"Cannot find the train."},
                status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request":"Invalid train no."},status=status.HTTP_400_BAD_REQUEST)

class TrainSeatsView(APIView):

    def post(self,request,format=None):
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

    def get(self,request,format=None):
        query = 'SELECT * FROM station'
        queryset = BackEndQuerier.cursor_querier(query)        
        if(len(queryset) >= 1):
            return Response(queryset,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class RegisterUserView(APIView):

    def post(self,request,format=None):
        user_name = request.data.get('userName')
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        
        try:
            match = User.objects.get(username=user_name)
        except User.DoesNotExist:
            try:
                match = User.objects.get(email=email)
            except User.DoesNotExist:
                #Unique
                user = User.objects.create_user(user_name,email,password)
                user.first_name = first_name
                user.last_name = last_name
                user.save()
                print(user)
                print(user_name,email,password,sep='\n')
                return Response({"success":"User Registered"},status=status.HTTP_200_OK)
            return Response({"error":"Email in Use"},status=status.HTTP_409_CONFLICT)

        return Response({"error":"User Name in Use"},status=status.HTTP_409_CONFLICT)
        
class SeatAvailibility(APIView):

    def post(self,request,format=None):
        dest = request.data.get('dest')
        src = request.data.get('src')
        doj = request.data.get('doj')
        trainNo = request.data.get('train_no')

        #Write your queries here
        queryClasses = """select distinct class_type from struct where train_no = %s;"""
        querySrcDayNo = """select day_no from time_table where train_no=%s and st_code=%s"""
        queryWL = """
            SELECT count(*) as WL, W.class_type
            FROM waiting_list as W
            WHERE W.train_no = %s
                AND W.week_no = %s
                AND W.trip_no = %s
                AND NOT(
                    (
                        (SELECT dist FROM time_table as TT1 
                        WHERE TT1.train_no = W.train_no 
                        AND TT1.st_code = %s) 
                        <=
                        (SELECT dist FROM time_table as TT2 
                        WHERE TT2.train_no =W.train_no 
                        AND TT2.st_code = W.boarding_from)
                    ) 
                    OR
                    (
                        (SELECT dist FROM time_table as TT1 
                        WHERE TT1.train_no = W.train_no 
                        AND TT1.st_code = %s) 
                        >=
                        (SELECT dist FROM time_table as TT2 
                        WHERE TT2.train_no = W.train_no 
                        AND TT2.st_code = W.going_to)
                    )
                ) GROUP BY class_type;
        """
        paramsWL = [trainNo, weekNo, tripNo, dest, src]
        queryAvail = """
            SELECT count(*) as Avail, S.class_type as class_type
            FROM struct AS S,  class_layout as C, seat_no AS SN2, seat_no as SN
            WHERE S.train_no = %s
                AND S.class_type = C.class_type
                AND SN2.num <= S.size
                AND SN.num <= C.capacity
                AND NOT EXISTS (
                    SELECT * FROM reserve as R, ticket as T, passenger as P
                    WHERE T.train_no = S.train_no AND R.class_type = S.class_type AND R.coach_no = SN2.num AND R.seat_no = SN.num
                    AND R.pnr = T.pnr 
                    AND T.pnr = P.pnr AND P.stat='CNF'
                    AND T.train_no = %s
                    AND T.trip_no = %s
                    AND T.week_no = %s
                    AND NOT(
                        (
                            (SELECT dist FROM time_table as TT1 
                            WHERE TT1.train_no = T.train_no 
                            AND TT1.st_code = %s) 
                            <=
                            (SELECT dist FROM time_table as TT2 
                            WHERE TT2.train_no = T.train_no 
                            AND TT2.st_code = T.boarding_from)
                        ) 
                        OR
                        (
                            (SELECT dist FROM time_table as TT1 
                            WHERE TT1.train_no = T.train_no 
                            AND TT1.st_code = %s) 
                            >=
                            (SELECT dist FROM time_table as TT2 
                            WHERE TT2.train_no = T.train_no 
                            AND TT2.st_code = T.going_to)
                        )
                    )
                ) GROUP BY S.class_type;
        """
        paramsAvail = [trainNo, trainNo, tripNo, weekNo, dest, src]

        #calculation
        dayNo = BackEndQuerier.cursor_querier(querySrcDayNo,[trainNo,src])[0]["day_no"]
        tripNo = DateFunctions.getDayNo(doj) - 1 + dayNo
        if(tripNo < 1):
            tripNo = tripNo + 7
        
        weekNo = DateFunctions.getWeekNo(doj)
        if(tripNo + dayNo - 1 > 7):
            weekNo = weekNo - 1

        queryset = BackEndQuerier.cursor_querier(queryClasses,[trainNo])
        queryWaitlist = BackEndQuerier.cursor_querier(queryWL,paramsWL)
        queryAvaillist = BackEndQuerier.cursor_querier(queryAvail,paramsAvail)

        for vals in queryWaitlist:
            idx = next((i for i, item in enumerate(queryset) if item["class_type"] == vals["class_type"]), None)
            queryset[idx]["stat"] = "WL"
            queryset[idx]["num"] = vals["WL"]+1

        for vals in queryAvaillist:
            idx = next((i for i, item in enumerate(queryset) if item["class_type"] == vals["class_type"]), None)
            queryset[idx]["stat"] = "AV"
            queryset[idx]["num"] = vals["Avail"]
        
        for i in range(len(queryset)):
            if("stat" not in queryset[i].keys()):
                queryset[i]["stat"] = "WL"
                queryset[i]["num"] = 1
        
        if(len(queryset) >= 1):
            return Response(queryset,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

        