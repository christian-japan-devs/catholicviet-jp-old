from rest_framework import serializers
from .models import NewFeed, Contact
from adminapp.models import Province

class GuessContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('contact_email','contact_content','contact_phone','created_at')


class UserContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('contact_email','contact_content','created_at')

class NewFeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewFeed
        fields = ('id','nf_title','nf_type','nf_image','nf_brief_content','nf_content','nf_language','nf_date_created')


class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = '__all__'