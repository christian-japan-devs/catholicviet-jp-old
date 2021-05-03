from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.paginator import Paginator
from django.contrib.auth.models import User
import random
from .serializers import NewFeedSerializer
from .models import NewFeed
from .producer import publish
from VietcatholicJP.constants import *


# Create your views here.
class NewFeedViewSet(viewsets.ViewSet):
    def list(self,request):  #/api/newfeed
        newfeeds = NewFeed.objects.all().order_by('-nf_date_edited')
        serializer = NewFeedSerializer(newfeeds,many=True)
        return Response(serializer.data)

    def create(self,request): #/api/newfeed
        print("Start create newfeed")
        serializer = NewFeedSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            #publish('provice_created',serializer.data)
            print("End create newfeed Successful")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("End create newfeed error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None): # /api/newfeed/<str:id> for more detail.
        newfeed = NewFeed.objects.get(id=pk)
        serializer = NewFeedSerializer(newfeed)
        return Response(serializer.data)

    def update(self,request,pk=None): # /api/newfeed/<str:id> #update liked, share...
        print("Start update newfeed")
        newfeed = NewFeed.objects.get(id=pk)
        serializer = NewFeedSerializer(instance=newfeed,data=request.data)
        if serializer.is_valid():
            serializer.save()
            #publish('provice_updated',serializer.data)
            print("End update newfeed Successful")
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            print("End update newfeed error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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