from rest_framework import serializers
from .models import Contact, DailyReading, Provice


class GuessContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('contact_email','contact_content','contact_phone','created_at')


class UserContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('contact_email','contact_content','created_at')


class DailyReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyReading
        fields = '__all__'

class ProviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provice
        fields = '__all__'