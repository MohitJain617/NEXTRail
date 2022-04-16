import imp
from rest_framework import serializers
from .models import Station, Train

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