from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from django.conf import settings
import sys

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import (
    NewFeedSerializer, DetailNewFeedSerializer, ReMassSerializer, RegistrationSerializer, DailyGospelSerializer, ProvinceSerializer, AccountSerializer, MonthlyTopicBrefSerializer, MonthlyTopicSerializer, ChurchSerializer
)
from .producer import publish
from .permissions import IsOwner

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from adminapp.models import MonthlyTopic, NewFeed, Mass, DailyGospel, MassTime, Registration, Church, Province
from core.constants import *
from adminapp.common_messages import *

# Create your viewsets here.


class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'userID': request.user.id}, status=HTTP_200_OK)


# API Discription
# Name: MonthlyTopicViewSet
# Url:
# Detail:
# Requirements:
# Output:


class MonthlyTopicViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    def topic(self, request):  # /api/monthly-topic
        monthlyTopic = MonthlyTopic.objects.all().order_by(
            '-mt_date_edited')[0:1]  # Get the newest post
        serializer = MonthlyTopicBrefSerializer(monthlyTopic, many=True)
        return Response(serializer.data)

    # /api/monthly-topic/<str:month> for more detail.
    def detail(self, request, month=None):
        try:
            monthlyTopic = NewFeed.objects.get(mt_month=month, many=True)
            serializer = MonthlyTopicSerializer(monthlyTopic)
            return Response(serializer.data)
        except:
            print("End retrieve newfeed error: ", sys.exc_info()[0])
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # /api/monthly-topic/<str:month> update like, share ...

    def update(self, request, month=None):
        try:
            req_auth = request.auth
            monthlyTopic = NewFeed.objects.get(mt_month=month)
            if(req_auth):
                req_user = request.user
                req_type = request.data.get('type', '')
                if(req_type):
                    if(req_type == 'like'):
                        monthlyTopic.mt_post_like += 1
                        monthlyTopic.save()
            serializer = MonthlyTopicSerializer(monthlyTopic)
            return Response(serializer.data)
        except:
            print("End retrieve newfeed error: ", sys.exc_info()[0])
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API Discription
# Name: getNewFeed
# Url:
# Detail:
# Requirements:
# Output:


class MonthlyTopicViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    def topic(self, request):  # /api/monthly-topic
        monthlyTopic = MonthlyTopic.objects.all().order_by(
            '-mt_date_edited')[0:1]  # Get the newest post
        serializer = MonthlyTopicBrefSerializer(monthlyTopic, many=True)
        return Response(serializer.data)

    # /api/monthly-topic/<str:month> for more detail.
    def detail(self, request, month=None):
        try:
            monthlyTopic = NewFeed.objects.get(mt_month=month, many=True)
            serializer = MonthlyTopicSerializer(monthlyTopic)
            return Response(serializer.data)
        except:
            print("End retrieve newfeed error: ", sys.exc_info()[0])
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # /api/monthly-topic/<str:month> update like, share ...

    def update(self, request, month=None):
        try:
            req_auth = request.auth
            monthlyTopic = NewFeed.objects.get(mt_month=month)
            if(req_auth):
                req_user = request.user
                req_type = request.data.get('type', '')
                if(req_type):
                    if(req_type == 'like'):
                        monthlyTopic.mt_post_like += 1
                        monthlyTopic.save()
            serializer = MonthlyTopicSerializer(monthlyTopic)
            return Response(serializer.data)
        except:
            print("End retrieve newfeed error: ", sys.exc_info()[0])
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API Discription
# Name: getNewFeed
# Url:
# Detail:
# Requirements:
# Output:



class NewFeedViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    def getlist(self, request):  # /api/newfeed
        newfeeds = NewFeed.objects.all().order_by('-nf_date_edited')
        serializer = NewFeedSerializer(newfeeds, many=True)
        return Response(serializer.data)

    # /api/newfeed/<str:pk> for more detail.
    def retrieve(self, request, pk=None):
        try:
            newfeed = NewFeed.objects.get(id=pk)
            serializer = DetailNewFeedSerializer(newfeed)
            return Response(serializer.data)
        except:
            print("End retrieve newfeed error: ", sys.exc_info()[0])
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):  # /api/newfeed/<str:id>
        print("Start update newfeed")
        newfeed = NewFeed.objects.get(id=pk)
        serializer = NewFeedSerializer(instance=newfeed, data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("End update newfeed Successful")
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            print("End update newfeed error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API Discription
# Name: getChurch
# Url:
# Detail:
# Requirements:
# Output:


class ChurchViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    def getlist(self, request):  # /api/church
        churchs = Church.objects.all()
        serializer = ChurchSerializer(churchs, many=True)
        return Response(serializer.data)

    # /api/church/<str:pk>/detail for more detail.
    def retrieve(self, request, pk=None):
        try:
            church = Church.objects.get(id=pk)
            serializer = ChurchSerializer(church)
            return Response(serializer.data)
        except:
            print("End retrieve newfeed error: ", sys.exc_info()[0])
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):  # /api/newfeed/<str:id>
        print("Start update newfeed")
        newfeed = NewFeed.objects.get(id=pk)
        serializer = NewFeedSerializer(instance=newfeed, data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("End update newfeed Successful")
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            print("End update newfeed error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API Discription
# Name: ReMassListViewSet
# Serializer: ListRegistrationMassSerializer
# Url: /api/getMass
# Detail: Get list registration that are available
# Requirements:
# Output:


class ReMassListViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)

    def getlist(self, request):  # /api/getMass
        listmasses = Mass.objects.all().order_by(
            '-mass_date', '-mass_last_updated_date')
        serializer = ReMassSerializer(listmasses, many=True)
        return Response(serializer.data)

    # /api/getMass/<str:pk> for more detail.
    def retrieve(self, request, pk=None):
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
        STATUS: OK,
        CONTENT: BLANK,
    }
    permission_classes = (IsAuthenticated,)

    # /api/massregister/  get registration history of a user.
    def getlist(self, request, *args, **kwargs):
        try:
            request_user = request.user
            print("Start get "+request_user.username+" registration")
            registers = Registration.objects.filter(
                registration_user=request_user)
            serializer = RegistrationSerializer(registers, many=True)
            print("End get "+request_user.username+" registration")
            return Response(serializer.data)
        except:
            print("End get "+request_user.username +
                  " registration error: ", sys.exc_info()[0])
            return Response({ERROR: SYSTEM_QUERY_0001}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request):  # /api/massregister/   create a new registration for a mass
        print("Start create new massregister")
        try:
            from .controller import singleRegister
            request_user = request.user  # get requested user
            # get id of the Mass  (mid)
            mass_id = request.data.get(MASS_ID, None)
            print(request_user.username +
                  " request for registration of the Mass: "+str(mass_id))
            # get user condition confirmation [ucondi]
            user_condition = request.data[USERCONDITION]
            # get single register of a Mass for an User
            register = singleRegister(mass_id, user_condition, request_user)
            # status here maybe approved or waiting
            if register[STATUS] != ERROR:
                serializer = RegistrationSerializer(register[RESULT])
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:                # Register was error
                return Response(register, status=status.HTTP_400_BAD_REQUEST)
        except:
            print("End get user registration error: ", sys.exc_info()[0])
            return Response({ERROR: "System error"}, status=status.HTTP_404_NOT_FOUND)

    # /api/massregister/<int:rid>/   get registration detail of a user.
    def retrieve(self, request, rid=None):
        try:
            request_user = request.user
            registers = Registration.objects.get(
                id=rid, registration_user=request_user)
        except:
            print("End get user registration error: ", sys.exc_info()[0])
            return Response({ERROR: SYSTEM_QUERY_0001}, status=status.HTTP_404_NOT_FOUND)
        serializer = RegistrationSerializer(registers)
        print("End get user registration")
        return Response(serializer.data)

    def update(self, request, pk=None):  # /api/massregister/<str:id>
        print("Start update Province")
        province = Province.objects.get(id=pk)
        serializer = ProvinceSerializer(instance=province, data=request.data)
        if serializer.is_valid():
            serializer.save()
            # publish('Province_updated',serializer.data)
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

class GospelViewSet(viewsets.ViewSet):

    def getlist(self, request):  # /api/gospel   -- get gospel by next 4 days.
        gospels = DailyGospel.objects.all().order_by('-nf_date_edited')
        serializer = DailyGospelSerializer(gospels, many=True)
        return Response(serializer.data)

    # /api/gospel/<str:pdate> get gospel by date %Y-%m-%d
    def retrieve(self, request, pdate=None):
        date = timezone.today()
        if pdate:
            date = timezone.datetime.strptime(pdate, "%Y-%m-%d").date()
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



class MassTimeViewSet(viewsets.ViewSet):

    # /api/gospel   -- get all masstime available by country code, default = JP
    def getlist(self, request, country="jp"):
        listmasstime = MassTime.objects.all().order_by('-nf_date_edited')
        serializer = DailyGospelSerializer(listmasstime, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):  # /api/gospel/<str:date> get gospel by date
        pass


# API Template
class ProvinceViewSet(viewsets.ViewSet):
    print("ProvinceViewSet")

    def getlist(self, request):  # /api/province
        provinces = Province.objects.all()
        serializer = ProvinceSerializer(provinces, many=True)
        # publish('Province_gets',serializer.data)
        return Response(serializer.data)

    def create(self, request):  # /api/province
        print("Start create new Province")
        serializer = ProvinceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # publish('Province_created',serializer.data)
            print("End create new Province Successful")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("End create new error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):  # /api/province/<str:id>
        province = Province.objects.get(id=pk)
        serializer = ProvinceSerializer(province)
        return Response(serializer.data)

    def update(self, request, pk=None):  # /api/province/<str:id>
        print("Start update Province")
        province = Province.objects.get(id=pk)
        serializer = ProvinceSerializer(instance=province, data=request.data)
        if serializer.is_valid():
            serializer.save()
            # publish('Province_updated',serializer.data)
            print("End update Province Successful")
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            print("End update error")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):  # /api/province/<str:id>
        print("Start delete Province")
        if request.user.groups.filter(name=MANAGER).exists():
            province = Province.objects.get(id=pk)
            province.delete()
            # publish('Province_deleted',serializer.data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "You are not Authorized to do this task"}, status=status.HTTP_400_BAD_REQUEST)

# API Discription
# Name: UserCreate
# Serializer:
# Url:
# Detail:
# Requirements:
# Output:


class UserCreate(viewsets.ViewSet):

    permission_classes = (AllowAny,)

    def create(self, request):  # /api/account/
        print("Start create new account")
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            res = {
                'status': 'ok',
                'data': {
                    'token': token.key,
                    'user_id': user.pk,
                    'confirm': 0,
                    'email': user.email
                }
            }
            return Response(res, status=status.HTTP_202_ACCEPTED)
        else:
            res = {
                'status': 'error',
                'message': serializer.errors
            }
            return Response(res, status=status.HTTP_226_IM_USED)

    def requestPassword(self, request):
        res = {
            'status': 'error',
            'data': {
                'token': '',
                'user_id': '',
                'email': ''
            },
            'message': ''
        }
        try:
            req_email = request.data.get('email', '')
            user = User.objects.get(email=req_email)
            if user:
                from .controller import userRequestResetPass
                if(userRequestResetPass(user, user.username, req_email)):
                    res['status'] = 'ok'
                    res['message'] = 'Vui lòng kiểm tra hộp thư đến trong email của bạn để đổi mật khẩu.'
                    return Response(res, status=status.HTTP_200_OK)
            res['status'] = ERROR
            res['message'] = 'Email này chưa được đăng ký, xin vui lòng kiểm tra lại'
            return Response(res, status=status.HTTP_200_OK)
        except:
            print("End request reset password error: ", sys.exc_info()[0])
            res['status'] = ERROR
            res['message'] = SYSTEM_QUERY_0001
            return Response(res, status=status.HTTP_200_OK)

    def resetPassword(self, request):  #
        res = {
            'status': 'error',
            'data': {
                'token': '',
                'username': '',
                'email': ''
            },
            'message': ''
        }
        try:
            # If authenticated user request reset password.
            if(request.auth):
                auth_user = request.user
                old_password = request.data.get('oldPassword', '')
                new_password = request.data.get('newPassword', '')
                if(auth_user.check_password(old_password)):
                    auth_user.set_password(new_password)
                    auth_user.save()
                    # Remove security code
                    userprofile = auth_user.userprofile
                    userprofile.profile_code = ''
                    userprofile.save()
                    token, created = Token.objects.get_or_create(
                        user=auth_user)
                    res['status'] = 'ok'
                    res['data']['token'] = token.key
                    res['message'] = 'Đổi mật khẩu thành công'
                    return Response(res, status=status.HTTP_200_OK)
                else:
                    res['status'] = ERROR
                    res['message'] = 'Mật khẩu cũ không đúng.'
                    return Response(res, status=status.HTTP_200_OK)
            else:
                # Else Unauthenticated user request for reseting password from email.
                req_usename = request.data.get('username', '')
                req_pass = request.data.get('newPassword', '')
                re_code = request.data.get('code', '')
                user = User.objects.get(username=req_usename)
                if user:
                    userprofile = user.userprofile
                    if(userprofile.profile_code == re_code):
                        user.set_password(req_pass)
                        user.save()
                        # Remove security code
                        userprofile = user.userprofile
                        userprofile.profile_code = ''
                        userprofile.save()
                        token, created = Token.objects.get_or_create(user=user)
                        res['status'] = 'ok'
                        res['data']['token'] = token.key
                        res['data']['username'] = req_usename
                        res['data']['email'] = user.email
                        res['message'] = 'Đổi mật khẩu thành công'
                        return Response(res, status=status.HTTP_200_OK)
                    else:
                        raise Exception('password', 'Mã bảo mật không đúng')
                else:
                    raise Exception('password', 'Tài khoản không đúng')
        except:
            print("End request reset password error: ", sys.exc_info()[0])
            res['status'] = ERROR
            res['message'] = sys.exc_info()
            return Response(res, status=status.HTTP_200_OK)

    # confirm request api
    def confirm(self, request):  # /api/account/confirm
        res = {
            'status': 'error',
            'data': {
                'token': '',
                'username': '',
                'confirm': '',
                'redirect': ''
            },
            'message': ''
        }
        try:
            req_usename = request.data.get('username', '')
            re_code = request.data.get('code', '')
            user = User.objects.get(username=req_usename)
            if user:
                userprofile = user.userprofile
                if(userprofile.profile_code == re_code):
                    # Remove security code
                    userprofile = user.userprofile
                    userprofile.profile_code = ''
                    userprofile.profile_account_confimred = True
                    userprofile.save()
                    token, created = Token.objects.get_or_create(user=user)
                    res['status'] = 'ok'
                    res['data']['token'] = token.key
                    res['data']['username'] = req_usename
                    res['data']['confirm'] = 1
                    res['data']['redirect'] = '/account/profile'
                    res['message'] = 'Xác nhận tài khoản thành công.'
                    return Response(res, status=status.HTTP_200_OK)
                else:
                    raise Exception('code', 'Mã bảo mật không đúng')
            else:
                raise Exception('code', 'Tài khoản không đúng')
        except:
            print("End request reset password error: ", sys.exc_info()[0])
            res['status'] = ERROR
            res['message'] = sys.exc_info()
            return Response(res, status=status.HTTP_200_OK)

# API Discription
# Name: UserCreate
# Serializer:
# Url:
# Detail:
# Requirements:
# Output:


class UserAPIView(APIView):
    pass
