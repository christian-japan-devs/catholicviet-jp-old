from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib import messages
import json
from django.contrib import messages
from django.utils import timezone
from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.conf import settings
import sys
from django.db.models import Q
from django.utils.translation import ugettext_lazy as _
from core.constants import *
from .common_messages import *
from .messages import *
from .models import Mass, Event, Registration

# Create your views here.
#Description
#
#
#
@login_required
def home(request):
    context = {
        TITLE:"Member-home",
        MASSES:""
    }
    try:
        if request.user.groups.filter(name=MANAGER).exists() or request.user.groups.filter(name=STAFF).exists() :
            from kanri.controller import getActiveMassByLanguage
            if request.user.groups.filter(name=EN).exists():
                masses = getActiveMassByLanguage(EN,True)
                context[MASSES]=masses
            elif request.user.groups.filter(name=VI).exists():
                masses = getActiveMassByLanguage(VI,True)
                context[MASSES]=masses
            return render(request,'staff/home.html',context)
        else:
            messages.warning(request,SYSTEM_ERROR_0002)
            return render(request, 'staff/info.html')
    except:
        print("staff listbooking error: ", sys.exc_info()[0])
        messages.warning(request,SYSTEM_ERROR_0001)
        return render(request, 'staff/info.html')


@login_required
def autoCheckin(request):
    context = {
        TITLE:"Member-home",
        MASSES:""
    }
    try:
        if request.user.groups.filter(name=STAFF).exists() :
            from kanri.controller import getActiveMassByLanguage
            if request.user.groups.filter(name=EN).exists():
                masses = getActiveMassByLanguage(EN,True)
                context[MASSES]=masses
            elif request.user.groups.filter(name=VI).exists():
                masses = getActiveMassByLanguage(VI,True)
                context[MASSES]=masses
            return render(request,'staff/home.html',context)
        else:
            messages.warning(request,SYSTEM_ERROR_0002)
            return render(request, 'staff/info.html')
    except:
        print("staff listbooking error: ", sys.exc_info()[0])
        messages.warning(request,SYSTEM_ERROR_0001)
        return render(request, 'staff/info.html')
# Description
#
#
#
@login_required
def listbooking(request):
    context = {
        "title":"Danh sách vắng mặt",
        "listbooking":"",
        "card_header":_("Đã đăng ký: ")
    }
    try:
        if request.user.groups.filter(name=MANAGER).exists() or request.user.groups.filter(name=STAFF).exists() :
            from kanri.controller import getMassByLanguage, getListRegisterByStatus
            if request.user.groups.filter(name=EN).exists():
                mass = getMassByLanguage(EN,True)
                listbooking = getListRegisterByStatus(status)
                context["listbooking"]=listbooking
            elif request.user.groups.filter(name=VI).exists():
                status = request.GET.get("status","P")
                maxNum = int(request.GET.get('max',"200"))
                listbooking = getListRegisterByStatus(status,maxNum)
                context["listbooking"]=listbooking
            context['card_header'] = context['card_header']+str(len(listbooking))
            return HttpResponse(json.dumps(context), content_type="application/json")
        else:
            messages.warning(request, SYSTEM_ERROR_0002)
            context["status"]="error"
            context["message"]=str(SYSTEM_ERROR_0002)
            return HttpResponse(json.dumps(context), content_type="application/json")
    except:
        print("staff listbooking error: ", sys.exc_info()[0])
        messages.warning(request, SYSTEM_ERROR_0001)
        context["status"]="error"
        context["message"]=str(SYSTEM_ERROR_0001)
        return HttpResponse(json.dumps(context), content_type="application/json")
# Description
#
#
#
@login_required
def getAllList(request):
    context = {
        "status":"ok",
        "title":"Đăng ký thành công",
        "listbooking":"",
        "message":"ok",
        "card_header":_("Đã có mặt: ")
    }
    try:
        if request.user.groups.filter(name=MANAGER).exists() or request.user.groups.filter(name=STAFF).exists() :
            from kanri.controller import getMassByLanguage, getListRegister
            if request.user.groups.filter(name=EN).exists():
                status = request.GET.get("status","A")
                mass = getMassByLanguage(EN,True)
                listbooking = getListRegister(mass,status)
                context["listbooking"]=listbooking
            elif request.user.groups.filter(name=VI).exists():
                mass = getMassByLanguage(VI,True)
                status = request.GET.get("status","A")
                listbooking = getListRegister(mass,status)
                context["listbooking"]=listbooking
            context['card_header'] = context['card_header']+str(len(listbooking))
            return HttpResponse(json.dumps(context), content_type="application/json")
        else:
            messages.warning(request, SYSTEM_ERROR_0002)
            context["status"]="error"
            context["message"]=str(SYSTEM_ERROR_0002)
            return HttpResponse(json.dumps(context), content_type="application/json")
    except:
        messages.warning(request, SYSTEM_ERROR_0001)
        context["status"]="error"
        context["message"]=str(SYSTEM_ERROR_0001)
        return HttpResponse(json.dumps(context), content_type="application/json")


@login_required
def searchbyseat(request):
    context = {
        "title":"Danh sách hiện diện",
        "listbooking":"",
        "card_header":_("Đã có mặt: ")
    }
    try:
        if request.user.groups.filter(name=MANAGER).exists() or request.user.groups.filter(name=STAFF).exists() :
            from kanri.controller import getMassByLanguage, getListRegister
            if request.user.groups.filter(name=EN).exists():
                mass = getMassByLanguage(EN,True)
                listbooking = getListRegister(mass,PRESENTED)
                context["listbooking"]=listbooking
            elif request.user.groups.filter(name=VI).exists():
                mass = getMassByLanguage(VI,True)
                listbooking = getListRegister(mass,PRESENTED)
                context["listbooking"]=listbooking
            context['card_header'] = context['card_header']+str(len(listbooking))
            return render(request,'staff/listpresent.html',context)
        else:
            messages.warning(request, SYSTEM_ERROR_0002)
            return render(request,'staff/info.html',context)
    except:
        print("staff listpresent error: ", sys.exc_info()[0])
        messages.warning(request, SYSTEM_ERROR_0001)
        return render(request, 'staff/info.html')

# Description
#
#
#
@login_required
def listpresent(request):
    context = {
        "status":"ok",
        "title":"Danh sách hiện diện",
        "listbooking":"",
        "message":"ok",
        "card_header":_("Đã có mặt: ")
    }
    try:
        if request.user.groups.filter(name=MANAGER).exists() or request.user.groups.filter(name=STAFF).exists() :
            from kanri.controller import getMassByLanguage, getListRegister
            if request.user.groups.filter(name=EN).exists():
                mass = getMassByLanguage(EN,True)
                listbooking = getListRegister(mass,PRESENTED)
                context["listbooking"]=listbooking
            elif request.user.groups.filter(name=VI).exists():
                mass = getMassByLanguage(VI,True)
                listbooking = getListRegister(mass,PRESENTED)
                context["listbooking"]=listbooking
            context['card_header'] = context['card_header']+str(len(listbooking))
            return HttpResponse(json.dumps(context), content_type="application/json")
        else:
            messages.warning(request, SYSTEM_ERROR_0002)
            context["status"]="error"
            context["message"]=str(SYSTEM_ERROR_0002)
            return HttpResponse(json.dumps(context), content_type="application/json")
    except:
        print("staff listpresent error: ", sys.exc_info()[0])
        messages.warning(request, SYSTEM_ERROR_0001)
        return render(request, 'staff/info.html')

# Description
#
#
#
@login_required
def listabsent(request):
    context = {
        "title":"Danh sách vắng mặt",
        "listbooking":"",
        "card_header":_("Vắng mặt: ")
    }
    try:
        if request.user.groups.filter(name=MANAGER).exists() or request.user.groups.filter(name=STAFF).exists() :
            from kanri.controller import getMassByLanguage, getListRegister
            if request.user.groups.filter(name=EN).exists():
                mass = getMassByLanguage(EN,True)
                listbooking = getListRegister(mass,ABSENTED)
                context["listbooking"]=listbooking
            elif request.user.groups.filter(name=VI).exists():
                mass = getMassByLanguage(VI,True)
                listbooking = getListRegister(mass,ABSENTED)
                context["listbooking"]=listbooking
            context['card_header'] = context['card_header']+str(len(listbooking))
            return render(request,'staff/listabsent.html',context)
        else:
            messages.warning(request, SYSTEM_ERROR_0002)
            return render(request,'staff/info.html',context)
    except:
        print("staff listabsent error: ", sys.exc_info()[0])
        messages.warning(request, SYSTEM_ERROR_0001)
        return render(request, 'staff/info.html')

# Description
#
#
#
@login_required
def listwaiting(request):
    context = {
        "title":"Danh sách dang đợi",
        "listbooking":"",
        "card_header":_("Đang đợi: ")
    }
    try:
        if request.user.groups.filter(name=MANAGER).exists() or request.user.groups.filter(name=STAFF).exists() :
            from kanri.controller import getActiveMassByLanguage, getListRegister
            if request.user.groups.filter(name=EN).exists():
                mass = getMassByLanguage(EN,True)
                listbooking = getListRegister(mass,WAITING)
                context["listbooking"]=listbooking
            elif request.user.groups.filter(name=VI).exists():
                mass = getMassByLanguage(VI,True)
                listbooking = getListRegister(mass,WAITING)
                context["listbooking"]=listbooking
            context['card_header'] = context['card_header']+str(len(listbooking))
            return render(request,'staff/listwaiting.html',context)
        else:
            messages.warning(request, SYSTEM_ERROR_0002)
            return render(request,'staff/info.html',context)
    except:
        print("staff listbooking error: ", sys.exc_info()[0])
        messages.warning(request, SYSTEM_ERROR_0001)
        return render(request, 'staff/info.html')

# Description
#
#
#
@login_required
def sundayregister(request):
    context = {
        "title":"home"
    }
    try:
        return render(request,'kanri/base.html',context)
    except:
        print("staff sundayregister error: ", sys.exc_info()[0])
        messages.warning(request, SYSTEM_ERROR_0001)
        return render(request, 'staff/info.html')

# Description
#
#
#
@login_required
def profile(request):
    context = {
        "title":"home"
    }
    try:

        return render(request,'staff/animate.html',context)
    except:
        print("staff profile error: ", sys.exc_info()[0])
        messages.warning(request,SYSTEM_ERROR_0001)
        return render(request, 'staff/info.html')

@login_required
def createunregister(request):
    from kanri.models import UnRegister, Seat
    from kanri.controller import getMassByLanguage
    mass = getMassByLanguage(VI,True)
    mass_schedule = mass.mass_schedule
    from .forms import createUnRegisterFormForGuess
    if request.method == 'POST':
        unbooking_fr = createUnRegisterFormForGuess(request.POST)
        context = {'title':_('Chưa đặt trước')}
        if unbooking_fr.is_valid():
            try:
                seat_no = unbooking_fr.cleaned_data['unregister_seat']
                unregister = UnRegister(unregister_date=timezone.now()
                                    ,unregister_mass=mass
                                    ,unregister_name=unbooking_fr.cleaned_data['unregister_name']
                                    ,unregister_seat = seat_no
                                    ,unregister_email=unbooking_fr.cleaned_data['unregister_email']
                                    ,unregister_phone=unbooking_fr.cleaned_data['unregister_phone'])
                unregister.save()
                seat = Seat.objects.filter(seat_mass_schedule=mass_schedule,seat_no=seat_no).first()
                seat.seat_status = TAKEN
                seat.save()
                mass.mass_slots_registered += 1
                mass.save()
                messages.success(request, _('Đăng ký đã được chấp nhận, số ghế của bạn là : ')+seat_no)
                return render(request, 'staff/info.html',context)
            except:
                print("Unexpected error: ", sys.exc_info()[0])
                messages.warning(request, _('Xin vui lòng kiểm tra lại thông tin đã nhập.'))
                return render(request, 'staff/unbooking.html',context)
        else:
            messages.warning(request, _('Xin vui lòng kiểm tra lại thông tin đã nhập.'))
            return render(request, 'staff/unbooking.html',context)
    else:
        
        f_unregister = createUnRegisterFormForGuess()
        seat = Seat.objects.filter(seat_mass_schedule=mass_schedule,seat_status=AVAILABEL).order_by('seat_no').first()
        if seat:
            ins_unregister = UnRegister(unregister_seat=seat.seat_no)
            f_unregister = createUnRegisterFormForGuess(instance = ins_unregister)
        context = {'f_unregister': f_unregister,
                    'title':_('Chưa có tài khoản & chưa đặt trước')}
        return render(request, 'staff/unbooking.html', context)

#
#
#
#

@login_required
def updateStatus(request):
    try:
        context = {
            "status":"error"
            ,"message":""
            ,"data":[]
        }
        if request.user.groups.filter(name=MANAGER).exists():
            from kanri.controller import updateRegistrationAll,getMassByLanguage
            from datetime import datetime
            mass = getMassByLanguage(VI,True)
            today = datetime.today()
            mass_day = mass.mass_date.day
            mass_time = mass.mass_time.hour
            mass_hour = mass_time + (mass.mass_time.minute / 60)
            time_now = today.hour + today.minute / 60
            if today.day == mass_day:
                if time_now >= mass_hour :
                    totalupdate = updateRegistrationAll(mass,APPROVED,ABSENTED)
                    #data = [{"user_name": "ABC", "title": "aaa","seat_type":"10","seat_no":"seat_no","status":"A"}, {"user_name": "ABC", "title": "aaa","seat_type":"10","seat_no":"seat_no","status":"A"}]
                    #table = BookingTable([])
                    #table.paginate(page=request.GET.get("page", 1), per_page=20)
                    if totalupdate >= 0:
                        context["status"]= OK
                        context["message"]="Cập nhật thành công: "+str(totalupdate)
                        #messages.success(request, MESSAGE_KANRI_0002)
                    else:
                        context["status"]= WARNING
                        context["message"]="Cập nhật thành công: "+str(totalupdate)
            else:
                context["status"]= WARNING
                context["message"]="Chỉ có thể cập nhật sau khi Thánh Lễ bắt đầu"
        print(context["message"])
        return HttpResponse(json.dumps(context), content_type="application/json")
    except:
        print("error-views-staff-updateStatus: ", sys.exc_info()[0])
        context["status"]= ERROR
        context["message"]=str(SYSTEM_ERROR_0001)
        return HttpResponse(json.dumps(context), content_type="application/json")


@login_required
def updateRegister(request):
    context = {
        "status":"error"
        ,"message":"Type error"
        ,"data":[]
    }
    try:
        if request.user.groups.filter(name=MANAGER).exists():
            r_id = request.GET.get(BOOKING_ID,0)
            code = request.GET.get(CODE,BLANK)
            uid = request.GET.get(USER_ID,0)
            rdcode = request.GET.get(RDCODE,BLANK)
            updateType = request.GET.get("type","")
            if updateType == "email":
                from kanri.controller import sendConfirmEmail
                result = sendConfirmEmail(r_id,code,uid,rdcode)
                if result >= 0:
                    context["status"]= OK
                    context["message"]="Cập nhật thành công: "+str(result)
                else:
                    context["status"]= WARNING
                    context["message"]=str(SYSTEM_ERROR_0001)
                return HttpResponse(json.dumps(context), content_type="application/json")
            elif updateType == "deny":
                from kanri.controller import denyRegistration
                deny_result = denyRegistration(r_id,code,uid,rdcode)
                if deny_result[STATUS] == OK :
                    context["status"]= OK
                    context["message"]="Cập nhật thành công"
                else:
                    context["status"]= WARNING
                    context["message"]=str(SYSTEM_ERROR_0001)
                return HttpResponse(json.dumps(context), content_type="application/json")
            else:
                from register.controller import checkIn
                from register.models import Registration
                registration = Registration.objects.get(pk=r_id)
                mass = registration.registration_mass
                today = datetime.today()
                mass_day = mass.mass_date.day
                mass_time = mass.mass_time.hour
                mass_hour = mass_time - MINUS_MINUTE + (mass.mass_time.minute / 60)
                time_now = today.hour + today.minute / 60
                if today.day == mass_day:
                    if time_now >= mass_hour and today.hour <= mass_time:
                        check_re = checkIn(r_id,code)
                        if check_re[STATUS]==OK:
                            context["status"]= OK
                            context["message"]=str(check_re[CONTENT])
                        else:
                            context["status"]= check_re[STATUS]
                            context["message"]= str(check_re[CONTENT])
                        return HttpResponse(json.dumps(context), content_type="application/json")
                context["message"]=str(MESS_REGISTER_CKIN_008)
                return HttpResponse(json.dumps(context), content_type="application/json")
        else:
            messages.warning(request, SYSTEM_ERROR_0001)
            return HttpResponse(json.dumps(context), content_type="application/json")
    except:
        print("error-views-staff-updateRegister: ", sys.exc_info()[0])
        context["status"]= ERROR
        context["message"]=str(SYSTEM_ERROR_0001)
        return HttpResponse(json.dumps(context), content_type="application/json")

def getMassInfo(request):
    return_result = {
        TITLE:"Member-home",
        "status":"ok",
        "register":"",
    }
    try:
        if request.user.groups.filter(name=MANAGER).exists() or request.user.groups.filter(name=STAFF).exists() :
            from kanri.controller import getActiveMassByLanguage
            if request.user.groups.filter(name=EN).exists():
                masses = getActiveMassByLanguage(EN,True)
                return_result={
                    "status":"ok"
                    ,"register":{
                        "title":masses[0].mass_title
                        ,"registered":masses[0].mass_slots_registered
                        ,"presented":masses[0].mass_slots_attended
                        ,"waiting":masses[0].mass_waiting
                    }
                }
            elif request.user.groups.filter(name=VI).exists():
                masses = getActiveMassByLanguage(VI,True)
                return_result={
                    "status":"ok"
                    ,"register":{
                        "title":masses[0].mass_title
                        ,"registered":masses[0].mass_slots_registered
                        ,"presented":masses[0].mass_slots_attended
                        ,"waiting":masses[0].mass_waiting
                    }
                }
            return HttpResponse(json.dumps(return_result), content_type="application/json")
        else:
            messages.warning(request,SYSTEM_ERROR_0002)
            return_result={
                    "status":"warning"
                    ,"message":"Authorized"}
            return HttpResponse(json.dumps(return_result), content_type="application/json")
    except:
        print("staff listbooking error: ", sys.exc_info()[0])
        messages.warning(request,SYSTEM_ERROR_0001)
        return_result={
                    "status":"error"
                    ,"message":"System error"}
        return HttpResponse(json.dumps(return_result), content_type="application/json")


@login_required
def checkin(request):
    search_result = {'status':"",
                    'content':""}
    if request.user.groups.filter(name=STAFF).exists():
        regis_id = request.GET.get(BOOKING_ID,0)
        mass_id = int(request.GET.get(MASS_ID,0))
        code = request.GET.get(CODE,BLANK)
        try:
            from register.controller import checkIn
            from kanri.models import Mass
            mass = Mass.objects.get(pk=mass_id)
            today = datetime.today()
            mass_day = mass.mass_date.day
            mass_time = mass.mass_time.hour
            mass_hour = mass_time - MINUS_MINUTE + (mass.mass_time.minute / 60)
            time_now = today.hour + today.minute / 60
            if today.day == mass_day:
                if time_now >= mass_hour and today.hour <= mass_time:
                    check_re = checkIn(regis_id,code)
                    print(check_re[CONTENT]['message'])
                    message=str(check_re[CONTENT]['message'])
                    search_result = {
                        'status':check_re[STATUS],
                        'content':{
                            "result":{"message":message
                                    ,"username":check_re[CONTENT]['user']['username']
                                    ,"seat":check_re[CONTENT]['user']['seat']
                                    ,"status":check_re[STATUS]
                                    }
                            ,'register':check_re[CONTENT]['register']
                        }
                    }
                    return HttpResponse(json.dumps(search_result), content_type="application/json")

            print("today-error")
            search_result = {'status':'error',
                            'content':{"result":{'message':str(MESS_REGISTER_CKIN_008)
                                            ,"username":""
                                            ,"seat":""
                                            ,'status':'error'}
                                        ,"register":""}}
            return HttpResponse(json.dumps(search_result), content_type="application/json")
        except:
            print("checkin error: ", sys.exc_info()[0])
            search_result = {'status':'error',
                             'content':{"result":{"message":str(SYSTEM_ERROR_0001)
                                            ,"username":""
                                            ,"seat":""
                                            ,'status':'error'}
                                        ,"register":""}}
            return HttpResponse(json.dumps(search_result), content_type="application/json")

    else:
        print("else-error")
        search_result = {'status':'error',
                             'content':{"result":{"message":str(MESS_REGISTER_CKIN_006)
                                                    ,"username":""
                                                    ,"seat":""
                                                    ,'status':'error'}
                                        ,"register":""}}
        return HttpResponse(json.dumps(search_result), content_type="application/json")


@login_required
def createunbooking(request):
    from booking.models import UnBooking, Seat
    from .forms import createUnbookingFormForGuess
    if request.method == 'POST':
        unbooking_fr = createUnbookingFormForGuess(request.POST)
        context = {'title':_('Chưa đặt trước')}
        if unbooking_fr.is_valid():
            try:
                from .controller import get_active_event
                event = get_active_event()
                seat_no = unbooking_fr.cleaned_data['unbooking_seat_num']
                unbooking = UnBooking(unbooking_date=timezone.now()
                                    ,unbooking_event=event
                                    ,unbooking_full_name=unbooking_fr.cleaned_data['unbooking_full_name']
                                    ,unbooking_seat_num = seat_no
                                    ,unbooking_email=unbooking_fr.cleaned_data['unbooking_email']
                                    ,unbooking_address=unbooking_fr.cleaned_data['unbooking_address']
                                    ,unbooking_age=unbooking_fr.cleaned_data['unbooking_age']
                                    ,unbooking_phone_number=unbooking_fr.cleaned_data['unbooking_phone_number'])
                unbooking.save()
                seat = Seat.objects.get(seat_no=seat_no)
                seat.seat_status = TAKEN
                seat.save()
                event.event_slots_registered += 1
                event.save()
                messages.success(request, _('Đăng ký đã được chấp nhận, số ghế của bạn là : ')+seat_no)
                return render(request, 'staff/info.html',context)
            except:
                print("Unexpected error: ", sys.exc_info()[0])
                messages.warning(request, _('Xin vui lòng kiểm tra lại thông tin đã nhập.'))
                return render(request, 'staff/unbooking.html',context)
        else:
            messages.warning(request, _('Xin vui lòng kiểm tra lại thông tin đã nhập.'))
            return render(request, 'staff/unbooking.html',context)
    else:
        
        unbooking = createUnbookingFormForGuess()
        event_type = "MASS"
        seats = Seat.objects.filter(seat_event=event_type,seat_status=AVAILABEL).first()
        if seats:
            ounBooking = UnBooking(unbooking_seat_num=seats.seat_no)
            unbooking = createUnbookingFormForGuess(instance = ounBooking)
        context = {'unbooking': unbooking,
                    'title':_('Chưa có tài khoản & chưa đặt trước')}
        return render(request, 'staff/unbooking.html', context)