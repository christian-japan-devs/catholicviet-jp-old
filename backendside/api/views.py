from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken import views
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
import sys
import random

from django.contrib.auth.models import User
from .serializers import NewFeedSerializer, ReMassSerializer, RegistrationSerializer, DailyGospelSerializer,ProvinceSerializer
from adminapp.models import NewFeed, Mass, DailyGospel, MassTime, Registration, Province
from .producer import publish
from VietcatholicJP.constants import *
from .permissions import IsOwner


# Create your viewsets here.

# API Discription
# Name: getNewFeed
# Url: 
# Detail: 
# Requirements:
# Output:
#
#

class NewFeedViewSet(viewsets.ViewSet):
    #permission_classes = [IsOwner]
    def getlist(self,request):  #/api/newfeed
        newfeeds = NewFeed.objects.all().order_by('-nf_date_edited')
        serializer = NewFeedSerializer(newfeeds,many=True)
        return Response(serializer.data)

    def retrieve(self,request,pk=None): # /api/newfeed/<str:pk> for more detail.
        try:
            newfeed = NewFeed.objects.get(id=pk)
        except:
            print("End retrieve newfeed error: ",sys.exc_info()[0])
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = NewFeedSerializer(newfeed)
        return Response(serializer.data)

# API Discription
# Name: ReMassListViewSet
# Serializer: ListRegistrationMassSerializer
# Url: /api/getMass
# Detail: Get list registration that are available
# Requirements:
# Output:

class ReMassListViewSet(viewsets.ModelViewSet):

    def getlist(self,request):  #/api/getMass
        listmasses = Mass.objects.all().order_by('-mass_date','-mass_last_updated_date')
        serializer = ReMassSerializer(listmasses,many=True)
        return Response(serializer.data)
    
    def retrieve(self,request,pk=None): # /api/getMass/<str:pk> for more detail.
        mass = Mass.objects.get(id=pk)
        serializer = ReMassSerializer(mass)
        return Response(serializer.data)

# API Discription
# Name: ReMassListViewSet
# Serializer: ListRegistrationMassSerializer
# Url: /api/getMass
# Detail: Get list registration that are available
# Requirements:
# Output:


class MassRegister(viewsets.ViewSet):
    result = {
        STATUS:OK,
        CONTENT:BLANK,
    }
    permission_classes = [IsAuthenticated,IsOwner]
    #@login_required
    def getlist(self,request,uid=None):  #/api/massregister/  get registration history of a user.
        try:
            print("Start get user registration")
            request_user = request.user
            print(request_user.username)
            registers = Registration.objects.all()
        except:
            print("End get user registration error: ",sys.exc_info()[0])
            return Response({"error":"error"},status=status.HTTP_400_BAD_REQUEST)
        serializer = RegistrationSerializer(registers,many=True)
        return Response(serializer.data)
    
    @login_required
    def create(self,request): #/api/massregister
        print("Start create new Province")
        serializer = ProvinceSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            #publish('Province_created',serializer.data)
            print("End create new Province Successful")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("End create new error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @login_required
    def retrieve(self,request,pk=None): #/api/massregister/<int:uid>/   get registration detail of a user.
        mass = Mass.objects.get(id=pk)
        serializer = ReMassSerializer(mass)
        return Response(serializer.data)
    
    @login_required
    def update(self,request,pk=None): # /api/massregister/<str:id>
        print("Start update Province")
        province = Province.objects.get(id=pk)
        serializer = ProvinceSerializer(instance=province,data=request.data)
        if serializer.is_valid():
            serializer.save()
            #publish('Province_updated',serializer.data)
            print("End update Province Successful")
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            print("End update error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API Discription
# Name: reMassListViewSet
# Serializer: ListRegistrationMassSerializer
# Url: 
# Detail: Get list registration that are available
# Requirements:
# Output:
#
#

class GospelViewSet(viewsets.ViewSet):
    
    def getlist(self,request):  #/api/gospel   -- get gospel by next 4 days.
        gospels = DailyGospel.objects.all().order_by('-nf_date_edited')
        serializer = DailyGospelSerializer(gospels,many=True)
        return Response(serializer.data)
    
    def retrieve(self,request,pdate=None): # /api/gospel/<str:pdate> get gospel by date %Y-%m-%d
        date = datetime.today()
        if pdate:
            date = datetime.datetime.strptime(pdate, "%Y-%m-%d").date()
        newfeed = NewFeed.objects.get(daily_gospel_date=date)
        serializer = NewFeedSerializer(newfeed)
        return Response(serializer.data)

# API Discription
# Name: getMassTime
# Serializer: ListRegistrationMassSerializer
# Url: 
# Detail: Get list mass schedule
# Requirements:
# Output:
#
#

class MassTimeViewSet(viewsets.ViewSet):
    
    def getlist(self,request, country="jp"):  #/api/gospel   -- get all masstime available by country code, default = JP
        listmasstime = MassTime.objects.all().order_by('-nf_date_edited')
        serializer = DailyGospelSerializer(listmasstime,many=True)
        return Response(serializer.data)
    
    def retrieve(self,request,pk=None): # /api/gospel/<str:date> get gospel by date
        pass


## API Template
class ProvinceViewSet(viewsets.ViewSet):
    print("ProvinceViewSet")
    def getlist(self,request):  #/api/province
        provinces = Province.objects.all()
        serializer = ProvinceSerializer(provinces,many=True)
        #publish('Province_gets',serializer.data)
        return Response(serializer.data)

    def create(self,request): #/api/province
        print("Start create new Province")
        serializer = ProvinceSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            #publish('Province_created',serializer.data)
            print("End create new Province Successful")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("End create new error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None): # /api/province/<str:id>
        province = Province.objects.get(id=pk)
        serializer = ProvinceSerializer(province)
        return Response(serializer.data)

    def update(self,request,pk=None): # /api/province/<str:id>
        print("Start update Province")
        province = Province.objects.get(id=pk)
        serializer = ProvinceSerializer(instance=province,data=request.data)
        if serializer.is_valid():
            serializer.save()
            #publish('Province_updated',serializer.data)
            print("End update Province Successful")
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            print("End update error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self,request,pk=None): # /api/province/<str:id>
        print("Start delete Province")
        if request.user.groups.filter(name=MANAGER).exists():
            province = Province.objects.get(id=pk)
            province.delete()
            #publish('Province_deleted',serializer.data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error":"You are not Authorized to do this task"},status=status.HTTP_400_BAD_REQUEST)

class UserAPIView(APIView):
    def get(self,_):
        users = User.objects.all()
        user = random.choice(users)
        return Response({
            'id':user.id
        })