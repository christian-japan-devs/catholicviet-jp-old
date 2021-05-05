from rest_framework import serializers
from .models import Contact
from adminapp.models import NewFeed,Mass,DailyGospel,Province,Country,District,MassTime,Registration

class NewFeedSerializer(serializers.ModelSerializer):
    nf_user_created = serializers.ReadOnlyField(source='nf_user_created.userprofile.profile_full_name')
    class Meta:
        model = NewFeed
        fields = ('id','nf_title','nf_user_created','nf_type','nf_image','nf_brief_content','nf_language','nf_date_created','nf_post_clicked','nf_post_share','nf_post_like')

class ReMassSerializer(serializers.ModelSerializer):
    mass_reading = serializers.ReadOnlyField(source='mass_reading.id')
    mass_father_celebrant = serializers.ReadOnlyField(source='mass_father_celebrant.userprofile.profile_full_name')
    mass_church = serializers.ReadOnlyField(source='mass_church.church_name')
    class Meta:
        model = Mass
        fields = ('id','mass_date','mass_time','mass_title','mass_reading','mass_language','mass_father_celebrant','mass_church','mass_slots','mass_slots_registered','mass_waiting','mass_online_url','mass_image','mass_waiting_flag','mass_active')

class DetailMassSerializer(serializers.ModelSerializer):
    mass_reading = serializers.ReadOnlyField(source='mass_reading.id')
    mass_father_celebrant = serializers.ReadOnlyField(source='mass_father_celebrant.userprofile.profile_full_name')
    mass_church = serializers.ReadOnlyField(source='mass_church.church_name')
    class Meta:
        model = Mass
        fields = ('id','mass_date','mass_time','mass_title','mass_reading','mass_language','mass_father_celebrant','mass_church','mass_online_url','mass_image')

class RegistrationSerializer(serializers.ModelSerializer):
    registration_user = serializers.ReadOnlyField(source='registration_user.userprofile.profile_full_name')
    registration_mass = DetailMassSerializer()
    class Meta:
        model = Registration
        fields = ('id','registration_mass','registration_date','registration_user','registration_confirm_code','registration_status','registration_approve_status','registration_confirm_status')

class DailyGospelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyGospel
        fields = ('id','daily_gospel_title','daily_gospel_date','daily_gospel_date_ordinary','daily_gosspel_content','daily_gospel_laguage','daily_gospel_like','daily_gospel_share','daily_gospel_clicked')

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = '__all__'

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = '__all__'

class MassTimeSerializer(serializers.ModelSerializer):
    mass_time_church = serializers.ReadOnlyField(source='mass_time_church.church_name')
    class Meta:
        model = MassTime
        fields = ('id','mass_time_title','mass_date','mass_time','mass_time_church','mass_time_language')
