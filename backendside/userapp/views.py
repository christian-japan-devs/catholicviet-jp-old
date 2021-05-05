from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib import messages
import json
import sys
from VietcatholicJP.constants import *
from .linkname import *

# Create your views here.

def home(request):
    try:
        context = {
            "title":"Vietcatholicjp",
            CONTENT:"",
            STATUS:OK
        }
        return render(request,VCTJ_TEMP_HOME,context)
    except:
        print("main-views-inform error: ", sys.exc_info()[0])
        messages.warning(request, SYSTEM_ERROR_0001)
        return redirect(VCTJ_TEMP_HOME)

def login(request):
    if request.user:
        from django.utils import translation
        profile = request.user.profile
        cur_language_code = translation.get_language()
        profile.profile_language = cur_language_code
        profile.save()
        if request.user.profile.profile_full_name == BLANK or request.user.profile.profile_address == BLANK :
            messages.warning(request, MESS_REQUIRE_00001)
            return redirect(PROFILE)
    return redirect(NESSEI_HOME)

def getNewFeed(request):
    context = {
        CONTENT:"",
        STATUS:OK
    }
    try:

        return HttpResponse(json.dumps(context), content_type="application/json")
    except:
        print("userapp-views-calendar error: ", sys.exc_info()[0])
        context[STATUS]=ERROR
        context[CONTENT]=str(SYSTEM_ERROR_0001)
        return HttpResponse(json.dumps(context), content_type="application/json")

def getCalendar(request):
    context = {
        CONTENT:"",
        STATUS:OK
    }
    try:

        return HttpResponse(json.dumps(context), content_type="application/json")
    except:
        print("userapp-views-calendar error: ", sys.exc_info()[0])
        context[STATUS]=ERROR
        context[CONTENT]=str(SYSTEM_ERROR_0001)
        return HttpResponse(json.dumps(context), content_type="application/json")