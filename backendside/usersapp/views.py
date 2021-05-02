from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.views import APIView


from .models import DailyReading, Provice
from django.contrib.auth.models import User
from .serializers import DailyReadingSerializer, ProviceSerializer
from VietcatholicJP.constants import *
from .producer import publish
import random

# Create your views here.
class DailyReadingViewSet(viewsets.ViewSet):
    def list(self,request):  #/api/dailyReading
        dailyreadings = DailyReading.objects.all()
        serializer = DailyReadingSerializer(dailyreadings,many=True)
        return Response(serializer.data)

    def create(self,request): #/api/dailyReading
        pass

    def retrieve(self,request,pk=None): # /api/dailyReading/<str:id>
        pass

    def update(self,request,pk=None): # /api/dailyReading/<str:id>
        pass

    def destroy(self,request,pk=None): # /api/dailyReading/<str:id>
        pass


class ProviceViewSet(viewsets.ViewSet):
    print("ProviceViewSet")
    def list(self,request):  #/api/province
        provinces = Provice.objects.all()
        serializer = ProviceSerializer(provinces,many=True)
        #publish('provice_gets',serializer.data)
        return Response(serializer.data)

    def create(self,request): #/api/province
        print("Start create new Provice")
        serializer = ProviceSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            #publish('provice_created',serializer.data)
            print("End create new Provice Successful")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("End create new error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None): # /api/province/<str:id>
        province = Provice.objects.get(id=pk)
        serializer = ProviceSerializer(province)
        return Response(serializer.data)

    def update(self,request,pk=None): # /api/province/<str:id>
        print("Start update Provice")
        province = Provice.objects.get(id=pk)
        serializer = ProviceSerializer(instance=province,data=request.data)
        if serializer.is_valid():
            serializer.save()
            #publish('provice_updated',serializer.data)
            print("End update Provice Successful")
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            print("End update error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self,request,pk=None): # /api/province/<str:id>
        print("Start delete Provice")
        if request.user.groups.filter(name=MANAGER).exists():
            province = Provice.objects.get(id=pk)
            province.delete()
            #publish('provice_deleted',serializer.data)
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