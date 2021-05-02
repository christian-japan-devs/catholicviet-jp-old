from rest_framework import serializers
from .models import Room, DailyReading, Provice


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id','code','host','guest_can_pause','votes_to_skip','created_at')
    
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause','votes_to_skip')

class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('guest_can_pause','votes_to_skip','code')

class DailyReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyReading
        fields = '__all__'

class ProviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provice
        fields = '__all__'