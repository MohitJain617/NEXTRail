from typing import Any, Dict
from colorama import Back
from html5lib import serialize
from rest_framework import generics, status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from datetime import date, datetime,timedelta

from django.db import connection
# Create your views here.

from datetime import datetime,timedelta
import random
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
        
    def getDuration(src,dest):
        src_time = src["departure"]
        dest_time = dest["arrival"]
        todaydate = datetime.date(datetime.today())
        src_time = datetime.combine(todaydate,src_time)
        dest_time = datetime.combine(todaydate,dest_time)
        src_time += timedelta(days=src["day_no"])
        dest_time += timedelta(days=dest["day_no"])
        timediff = str(dest_time-src_time)
        timediff = timediff.split(":")
        timediff = str(timediff[0]+" hrs "+timediff[1]+" mins")
        timediff = timediff.replace(",","")
        return timediff
        

def generatePnr():
    while(True):
        pnr = ""
        for i in range(10):
            pnr += str(random.randint(0,9))

        temp =BackEndQuerier.cursor_querier("select distinct pnr from ticket where pnr = %s",[pnr])
        if(len(temp) == 0):
            break

    return pnr

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
        srcdate = datetime.strptime(doj,'%Y-%m-%d')
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
        queryClasses = """select distinct class_type as class_type from struct where train_no = %s;"""
        queryStationTime = """select arrival,departure,day_no,dist,st_code from time_table where train_no = %s and st_code=%s;"""
        queryTrainName = """select train_name from train where id = %s;"""
        queryTrips = """select trip_no from sched where train_no = %s;"""
        
        # appending required values
        for i in range(len(queryset)):
            #train name
            currId = queryset[i]["train_no"]
            queryset[i]["train_name"] = BackEndQuerier.cursor_querier(queryTrainName,[currId])[0]["train_name"]

            # classes in this train:
            varclasses = BackEndQuerier.cursor_querier(queryClasses,[currId])
            queryset[i]["class_types"] = varclasses

            # station timings
            varTimes = BackEndQuerier.cursor_querier(queryStationTime,[currId,src])[0]
            queryset[i]["src"] = varTimes
            varTimes = BackEndQuerier.cursor_querier(queryStationTime,[currId,dest])[0]
            queryset[i]["dest"] = varTimes

            queryset[i]["dist"] = queryset[i]["dest"]["dist"]-queryset[i]["src"]["dist"]
            queryset[i]["duration"] = DateFunctions.getDuration(queryset[i]["src"],queryset[i]["dest"])

            destdate = srcdate + timedelta(days=queryset[i]["dest"]["day_no"] - queryset[i]["src"]["day_no"])
            queryset[i]["src"]["date"] = srcdate
            queryset[i]["dest"]["date"] = destdate

            # days(trip nos) at which this train starts from actual source
            varDays = BackEndQuerier.cursor_querier(queryTrips,[currId])
            for j in range(len(varDays)):
                temp = varDays[i]
                # offset for current source
                x = (temp["trip_no"]+queryset[i]["src"]["day_no"]-1) % 7
                x = 7 if(x == 0) else x;
                varDays[i]["trip_no"] = x

            queryset[i]["trip_nos"] = varDays

        # print(queryset)

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
                queryTT = """select st_code,st_name,arrival,departure,dist,day_no from time_table natural join station where train_no = %s order by dist ;"""

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
                queryset["stops"] = len(queryset["time_table"])
                queryset["distance"] = queryset["time_table"][int(queryset["stops"])-1]["dist"]
                queryset["duration"] = DateFunctions.getDuration(queryset["time_table"][0],queryset["time_table"][int(queryset["stops"])-1])
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
                # print(user)
                # print(user_name,email,password,sep='\n')
                return Response({"success":"User Registered"},status=status.HTTP_200_OK)
            return Response({"error":"Email in Use"},status=status.HTTP_409_CONFLICT)

        return Response({"error":"User Name in Use"},status=status.HTTP_409_CONFLICT)
        
class SeatAvailibility(APIView):

    def post(self,request,format=None):
        dest = request.data.get('dest')
        src = request.data.get('src')
        doj = request.data.get('doj')
        trainNo = request.data.get('train_no')
        dist = request.data.get('dist')
        pcount = request.data.get('pcount')
        queryClasses = """select distinct class_type from struct where train_no = %s;"""
        querySrcDayNo = """select day_no from time_table where train_no=%s and st_code=%s"""
        #calculation
        dayNo = BackEndQuerier.cursor_querier(querySrcDayNo,[trainNo,src])[0]["day_no"]
        tripNo = DateFunctions.getDayNo(doj) - 1 + dayNo
        if(tripNo < 1):
            tripNo = tripNo + 7
        
        weekNo = DateFunctions.getWeekNo(doj)
        if(tripNo + dayNo - 1 > 7):
            weekNo = weekNo - 1

        #Write your queries here
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
        queryFare = """select  %s*%s*(select distinct cost_per_km from class_layout as C where C.class_type=%s) + 
            (SELECT DISTINCT FL.additional_cost FROM fare_lookup as FL, train as T WHERE T.id=%s AND T.train_type=FL.train_type) as fare;
            """
        paramsAvail = [trainNo, trainNo, tripNo, weekNo, dest, src]


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
        
        for i in range(len(queryset)):
            queryset[i]["fare"] = BackEndQuerier(queryFare,[pcount,dist,queryset[i]["class_type"],trainNo])[0]["fare"]

        if(len(queryset) >= 1):
            return Response(queryset,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    
class TicketsView(APIView):
    def post(self, request,format=None):
        queryPastTickets = """select T.pnr, T.train_no,
        (select train_name from train as T2 where T2.id = T.train_no) as train_name,
        ((select dist from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)-
    	(select dist from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.boarding_from)) as dist,
        TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
    	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.boarding_from)-1) day) ,
    	(select departure from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.boarding_from)) as srctime,
        TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
    	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.going_to)-1) day),
        (select arrival from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)) as desttime,
        T.boarding_from, T.going_to, T.fare
        from ticket as T
        where T.username = %s
        AND (TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.going_to)-1) day),
    (select arrival from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)) < %s)"""

        queryFutureTickets = """select T.pnr, T.train_no,
        (select train_name from train as T2 where T2.id = T.train_no) as train_name,
        ((select dist from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)-
    	(select dist from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.boarding_from)) as dist,
        TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
    	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.boarding_from)-1) day) ,
    	(select departure from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.boarding_from)) as srctime,
        TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
    	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.going_to)-1) day),
        (select arrival from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)) as desttime,
        T.boarding_from, T.going_to, T.fare
        from ticket as T
        where T.username = %s
        AND (TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.going_to)-1) day),
    (select arrival from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)) >= %s)"""

        past = request.data.get('past')

        # create sql time stamp:
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        # get current user please
        current_user = request.data.get('username')

        if(past == 'false'):
            queryset = BackEndQuerier.cursor_querier(queryFutureTickets,[current_user,current_time])
        else:
            queryset = BackEndQuerier.cursor_querier(queryPastTickets,[current_user,current_time])

        queryPassengers = """select * from passenger where pnr = %s"""
        queryReserve = """select * from reserve where pnr = %s"""
        queryWaitlist = """SELECT count(*) as WL
            FROM waiting_list as W, waiting_list as W2
            WHERE W.train_no = W2.train_no
                AND W.week_no = W2.week_no
                AND W.trip_no = W2.trip_no
                AND W.class_type = W2.class_type
                AND W2.pid = %s
                AND ((W2.priority > W.priority) or ((W2.priority = W.priority) and (W2.pid >= W.pid)))
                AND NOT(
                    (
                        (SELECT dist FROM time_table as TT1 
                        WHERE TT1.train_no = W.train_no 
                        AND TT1.st_code = W2.going_to) 
                        <=
                        (SELECT dist FROM time_table as TT2 
                        WHERE TT2.train_no =W.train_no 
                        AND TT2.st_code = W.boarding_from)
                    ) 
                    OR
                    (
                        (SELECT dist FROM time_table as TT1 
                        WHERE TT1.train_no = W.train_no 
                        AND TT1.st_code = W2.boarding_from) 
                        >=
                        (SELECT dist FROM time_table as TT2 
                        WHERE TT2.train_no = W.train_no 
                        AND TT2.st_code = W.going_to)
                    )
                );
        """
        # append details of passengers and calc time
        for i in range(len(queryset)):
            srctime = queryset[i]["srctime"]
            desttime = queryset[i]["desttime"]
            tdelta = desttime - srctime 
            duration = str(int(tdelta.total_seconds()//3600))+"h "+str(int((tdelta.total_seconds()%3600)//60))+"m"
            queryset[i]["duration"] = duration
            pnr = queryset[i]["pnr"]
            passengers = BackEndQuerier.cursor_querier(queryPassengers,[pnr])
            seats = BackEndQuerier.cursor_querier(queryReserve,[pnr])
            j = min(len(passengers),len(seats))
            for x in range(j):
                passengers[x]["coach_no"] = seats[x]["coach_no"]
                passengers[x]["seat_no"] = seats[x]["seat_no"]
            while j < len(passengers):
                passengers[j]["coach_no"] = '-'
                passengers[j]["seat_no"] = '-'
                if(passengers[j]["stat"] == "WL"):
                    ctr = BackEndQuerier.cursor_querier(queryWaitlist,[passengers[j]["pid"]])[0]["WL"]
                    passengers[j]["stat"] = "WL" + str(ctr)
                j = j+1
            
            queryset[i]["passengers"] = passengers
        # print(queryset)
        if(len(queryset) >= 1):
            return Response(queryset,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PnrView(APIView):
    def get(self, request,format=None):
        queryPnrTicket = """select T.pnr, T.train_no,
        (select train_name from train as T2 where T2.id = T.train_no) as train_name,
        ((select dist from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)-
    	(select dist from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.boarding_from)) as dist,
        TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
    	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.boarding_from)-1) day) ,
    	(select departure from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.boarding_from)) as srctime,
        TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
    	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.going_to)-1) day),
        (select arrival from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)) as desttime,
        T.boarding_from, T.going_to, T.fare
        from ticket as T
        where T.pnr = %s"""

        pnr = request.GET.get('pnr')

        queryset = BackEndQuerier.cursor_querier(queryPnrTicket,[pnr])

        queryPassengers = """select * from passenger where pnr = %s"""
        queryReserve = """select * from reserve where pnr = %s"""
        queryWaitlist = """SELECT count(*) as WL
            FROM waiting_list as W, waiting_list as W2
            WHERE W.train_no = W2.train_no
                AND W.week_no = W2.week_no
                AND W.trip_no = W2.trip_no
                AND W.class_type = W2.class_type
                AND W2.pid = %s
                AND ((W2.priority > W.priority) or ((W2.priority = W.priority) and (W2.pid >= W.pid)))
                AND NOT(
                    (
                        (SELECT dist FROM time_table as TT1 
                        WHERE TT1.train_no = W.train_no 
                        AND TT1.st_code = W2.going_to) 
                        <=
                        (SELECT dist FROM time_table as TT2 
                        WHERE TT2.train_no =W.train_no 
                        AND TT2.st_code = W.boarding_from)
                    ) 
                    OR
                    (
                        (SELECT dist FROM time_table as TT1 
                        WHERE TT1.train_no = W.train_no 
                        AND TT1.st_code = W2.boarding_from) 
                        >=
                        (SELECT dist FROM time_table as TT2 
                        WHERE TT2.train_no = W.train_no 
                        AND TT2.st_code = W.going_to)
                    )
                );
        """
        # append details of passengers and calc time
        for i in range(len(queryset)):
            srctime = queryset[i]["srctime"]
            desttime = queryset[i]["desttime"]
            tdelta = desttime - srctime 
            duration = str(int(tdelta.total_seconds()//3600))+"h "+str(int((tdelta.total_seconds()%3600)//60))+"m"
            queryset[i]["duration"] = duration
            pnr = queryset[i]["pnr"]
            passengers = BackEndQuerier.cursor_querier(queryPassengers,[pnr])
            seats = BackEndQuerier.cursor_querier(queryReserve,[pnr])
            j = min(len(passengers),len(seats))
            for x in range(j):
                passengers[x]["coach_no"] = seats[x]["coach_no"]
                passengers[x]["seat_no"] = seats[x]["seat_no"]
            while j < len(passengers):
                passengers[j]["coach_no"] = '-'
                passengers[j]["seat_no"] = '-'
                if(passengers[j]["stat"] == "WL"):
                    ctr = BackEndQuerier.cursor_querier(queryWaitlist,[passengers[j]["pid"]])[0]["WL"]
                    passengers[j]["stat"] = "WL" + str(ctr)
                j = j+1
            
            queryset[i]["passengers"] = passengers
        # print(queryset)
        if(len(queryset) >= 1):
            queryset = queryset[0]
            return Response(queryset,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)



class BookTickets(APIView):
    def post(self, request,format=None):

        class_type = request.data.get('class_type')
        trainNo = request.data.get('train_no')
        src = request.data.get('src')
        dest = request.data.get('dest')
        doj = request.data.get('doj')
        username = request.data.get('username')
        passengers = request.data.get('passengers') #pname, age, gender, meal

        querySrcDayNo = """select day_no from time_table where train_no=%s and st_code=%s"""
        #calculation
        dayNo = BackEndQuerier.cursor_querier(querySrcDayNo,[trainNo,src])[0]["day_no"]
        tripNo = DateFunctions.getDayNo(doj) - 1 + dayNo


        if(tripNo < 1):
            tripNo = tripNo + 7
        
        weekNo = DateFunctions.getWeekNo(doj)
        if(tripNo + dayNo - 1 > 7):
            weekNo = weekNo - 1

        pnr = generatePnr()
        bookTicket = """ insert into ticket values
                    (%s,%s,%s,%s,%s,%s,%s,%s,%s)"""

        # really book ticket
        BackEndQuerier(bookTicket,[pnr,username,trainNo,tripNo,weekNo,src,dest,0,"details"])
        booked = False
        if(len(BackEndQuerier("select * from ticket where pnr = %s"),[pnr]) >= 1):
            booked = True

        # book passengers
        bookPassenger = """INSERT INTO passenger(pnr, pname, gender, age, stat, meal_option, class_type) VALUES
            (%s, %s, %s, %s, %s, %s,%s)"""

        for passenger in passengers:
            BackEndQuerier(bookPassenger,[pnr,passenger["pname"],passenger["gender"],passenger["age"],"CNF",passenger["meal"],class_type])

        if(booked == True):
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)