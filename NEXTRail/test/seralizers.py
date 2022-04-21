import imp
from rest_framework import serializers
from .models import Station, Train, ClassLayout, TimeTable, Sched, SeatNo, Struct

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ('st_code','st_name')

class TrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Train
        fields = ('id','train_name','src','dest','train_type')

#Handling the GET request
class getTrainDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Train
        #Payload
        fields = ('id',)

class TimeTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeTable
        fields = ('id','train_no','st_code','arrival','departure','dist','day_no')

class SchedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sched
        fields = ('id','train_no','trip_no')

class SeatNoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeTable
        fields = ('id', 'num')

class StructSerializer(serializers.ModelSerializer):
    class Meta:
        model = Struct
        fields = ('id','train_no','class_type','size')
    
class ClassLayoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassLayout
        fields = ('id','class_type','class_name','capacity','cost_per_km')

class AllSeatsSerializer(serializers.Serializer):
    tno = serializers.CharField(max_length = 20)
    ct = serializers.CharField(max_length = 10)
    coach_no = serializers.DecimalField
    seat_no = serializers.DecimalField

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ('st_code','st_name')

