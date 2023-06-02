from rest_framework import serializers
from .models import VaccinationCenter, VaccinationSlot

class VaccinationCenterSerializer(serializers.ModelSerializer):
    creater_name = serializers.CharField(source = 'created_by.username')
    class Meta:
        model = VaccinationCenter 
        fields = ['center_name', 'starting_date', 'end_date', 'created_by' , 'creater_name']
        
class VaccinationSlotSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source = 'user.username')
    class Meta:
        model = VaccinationSlot
        fields = [ 'date', 'slotNumber', 'user']