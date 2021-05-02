from django.db import models
from django.utils import timezone
import sys
from PIL import Image
from io import BytesIO
from tinymce.models import HTMLField
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from VietcatholicJP.constants import *



class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


# Create your models here.
def generate_unique_code():
    length = 8
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

class Room(models.Model):
    code = models.CharField(max_length=10, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    current_song = models.CharField(max_length=50, null=True)

class Provice(models.Model):
    province_nation = models.CharField(_('Quốc gia'),help_text=_('Tên Quốc gia'),max_length=50)
    province_code = models.CharField(_('Mã'),help_text=_('Mã theo i18n'),max_length=3)
    province_en_name = models.CharField(_('Tên quốc tế'),help_text=_('Tên theo tiếng anh'),max_length=50)
    
    def __str__(self):
        return self.province_en_name

class Place(models.Model):
    from VietcatholicJP.constant_choice import  jp_provices_choice ,jp_region_choice

    place_name = models.CharField(_('Tiêu đề'),help_text=_('Tiêu đề'),max_length=255,null=True,blank=True)
    place_address = models.CharField(_('Địa chỉ'),help_text=_('Địa chỉ'),max_length=255)
    place_url = models.CharField(_('URL'),help_text=_('Link liên kết'),max_length=100, default='',null=True,blank=True)
    place_phone = models.CharField(_('Điện thoại'),help_text=_('Số điện thoại'),max_length=15, default='',null=True,blank=True)
    place_email = models.CharField(_('Email'),help_text=_('Địa chỉ email'),max_length=50, default='',null=True,blank=True)
    place_province = models.ForeignKey(Provice,on_delete=models.CASCADE,help_text=_('Tỉnh thành'),null=True,blank=True)
    place_lon = models.FloatField(_('Vĩ độ'),help_text=_('Vĩ độ theo bản đồ Google'),null=True,blank=True)
    place_lat = models.FloatField(_('Kinh độ'),help_text=_('Kinh độ theo bản đồ Google'),null=True,blank=True)
    place_created_user = models.ForeignKey(User, on_delete=models.CASCADE,null=True,default=None,blank=True)
    place_updated_user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,default=None,blank=True,related_name='place_updated_user')
    place_last_updated_date = models.DateTimeField(_('Ngày cập nhật'),help_text=_('Lần cuối cập nhật'),default=timezone.now)
    

    def __str__(self):
        return self.place_name

class Language(models.Model):
    language_name = models.CharField(_('Tên Ngôn ngữ'),help_text=_('Ngôn ngữ của Quốc gia'),max_length=50)
    language_code = models.CharField(_('Mã'),help_text=_('Mã theo i18n'),max_length=3)
    language_en_name = models.CharField(_('Tên quốc tế'),help_text=_('Tên theo tiếng anh'),max_length=50)
    language_flag_small_url = models.ImageField(_('Hình ảnh'),help_text=_('Hình ảnh minh hoạ'),null=True,blank=True,upload_to='flags')
    language_flag_medium_url = models.ImageField(_('Hình ảnh'),help_text=_('Hình ảnh minh hoạ'),null=True,blank=True,upload_to='flags')

    def __str__(self):
        return self.language_name

class DailyReading(models.Model):
    daily_reading_title = models.CharField(_('Chủ đề'),help_text=_('Chủ đề của ngày '),max_length=50)
    daily_reading_date = models.DateField(_('Ngày tháng'),help_text=_('Ngày tháng dương lịch'))
    daily_date_ordinary = models.CharField(_('Tuần phụng vụ'),help_text=_('Tuần phụng vụ'),max_length=3)
    daily_reading_first_reading_ref = models.CharField(_('Tham chiếu 1'),help_text=_('Bài đọc 1 tham chiếu'),default='',max_length=100)
    daily_reading_first_reading_title = models.CharField(_('Chủ đề 1'),help_text=_('Bài đọc 1 Chủ đề'),default='',blank=True,max_length=100)
    daily_reading_first_reading_according = models.CharField(_('Người viết'),help_text=_('Bài đọc 1 người viết'),default='',max_length=100)
    daily_reading_first_reading_content = HTMLField(_('Nội dung'),help_text=_('Bài đọc 1 Nội dung'),default='')
    daily_reading_responsorial_ref = models.CharField(_('Đáp ca Tham chiếu'),help_text=_('Bài đọc 1 tham chiếu'),blank=True,default='',max_length=100)
    daily_reading_responsorial_res = models.CharField(_('Cộng đoàn'),help_text=_('Cộng đoàn đáp'),default='',blank=True,max_length=200)
    daily_reading_responsorial_content = HTMLField(_('Đáp ca'),help_text=_('Nội dung đáp ca'),blank=True,default='')
    daily_reading_second_reading_ref = models.CharField(_('Tham chiếu 2'),help_text=_('Bài đọc 2 tham chiếu'),blank=True,default='',max_length=100)
    daily_reading_second_reading_title = models.CharField(_('Chủ đề 2'),help_text=_('Bài đọc 2 Chủ đề'),blank=True,default='',max_length=100)
    daily_reading_second_reading_according = models.CharField(_('Người viết'),help_text=_('Bài đọc 2 người viết'),blank=True,default='',max_length=100)
    daily_reading_second_reading_content = HTMLField(_('Nội dung'),help_text=_('Bài đọc 2 Nội dung'),blank=True,default='')
    daily_reading_acclamation_res = models.CharField(_('Tung hô tin mừng'),help_text=_('Tham chiếu'),default='',blank=True,max_length=300)
    daily_reading_acclamation_content = models.CharField(_('Tung hô tin mừng'),help_text=_('Nội dung'),default='',blank=True,max_length=500)
    daily_reading_gosspel_ref = models.CharField(_('Tham chiếu 3'),help_text=_('Lời Chúa tham chiếu'),default='',max_length=100)
    daily_reading_gosspel_title = models.CharField(_('Chủ đề 3'),help_text=_('Lời Chúa Chủ đề'),default='',blank=True,max_length=100)
    daily_reading_gosspel_according = models.CharField(_('Người viết'),help_text=_('Lời Chúa người viết'),default='',max_length=100)
    daily_reading_gosspel_content = HTMLField(_('Nội dung'),help_text=_('Lời Chúa Nội dung'),default='',null=True,blank=True)
    daily_reading_readed = models.IntegerField(_('Số lượt đọc'),help_text=_('Số lượt đọc'),default=0)
    daily_reading_reading_laguage = models.ForeignKey(Language,on_delete=models.CASCADE,help_text=_('Ngôn ngữ chính'))
    daily_reading_created_date = models.DateTimeField(_('Ngày viết'),help_text=_('Ngày tạo'),default=timezone.now)
    daily_reading_last_updated_date = models.DateTimeField(_('Ngày cập nhật'),help_text=_('Lần cuối cập nhật'),default=timezone.now)
    daily_reading_created_user = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    

    def __str__(self):
        return f'{self.daily_date_ordinary} : {str(self.id)} : {self.daily_reading_title}'
    
    class meta:
        ordering = ["daily_reading_created_date"]

class Church(models.Model):
    from VietcatholicJP.constant_choice import  jp_provices_choice ,jp_region_choice

    church_name = models.CharField(_('Tên Nhà thờ'),help_text=_('Tên Nhà thờ'),max_length=120)
    church_describe = HTMLField(_('Mô tả'),help_text=_('Mô tả sơ lược về Nhà thờ'),blank=True)
    church_image = models.ImageField(_('Hình ảnh'),help_text=_('Hình ảnh đại diện'),null=True,blank=True,upload_to='church_images')
    church_address = models.CharField(_('Địa chỉ'),help_text=_('Địa chỉ'),max_length=255)
    church_url = models.CharField(_('URL'),help_text=_('Link liên kết'),max_length=100, default='',blank=True)
    church_phone = models.CharField(_('Điện thoại'),help_text=_('Số điện thoại'),max_length=15, default='',blank=True)
    church_email = models.CharField(_('Email'),help_text=_('Địa chỉ email'),max_length=50, default='',blank=True)
    church_language = models.ForeignKey(Language,on_delete=models.CASCADE,help_text=_('Ngôn ngữ chính'),related_name='Church')
    church_language_1 = models.ForeignKey(Language,on_delete=models.CASCADE,help_text=_('Ngôn ngữ 1'),null=True,blank=True,related_name='church_language_1')
    church_language_2 = models.ForeignKey(Language,on_delete=models.CASCADE,help_text=_('Ngôn ngữ 2'),null=True,blank=True,related_name='church_language_2')
    church_language_3 = models.ForeignKey(Language,on_delete=models.CASCADE,help_text=_('Ngôn ngữ 3'),null=True,blank=True,related_name='church_language_3')
    church_language_4 = models.ForeignKey(Language,on_delete=models.CASCADE,help_text=_('Ngôn ngữ 4'),null=True,blank=True,related_name='church_language_4')
    #church_province = models.SmallIntegerField(_('Tỉnh'),help_text=_('Tỉnh thành'),max_length=10,choices= jp_provices_choice,blank=True,default=1)
    church_province = models.ForeignKey(Provice,verbose_name=_('Tỉnh'),help_text=_('Tỉnh'),default=None,blank=True,null=True,on_delete=models.SET_NULL)
    church_notice_on_map = HTMLField(_('Thông báo'),help_text=_('Nội dung hiển thị trên Map'),blank=True,default = "")
    church_lon = models.FloatField(_('Kinh độ'),help_text=_('Kinh độ theo bản đồ Google'),default=0.0,blank=True,null=True)
    church_lat = models.FloatField(_('Vĩ độ'),help_text=_('Vĩ độ theo bản đồ Google'),default=0.0,blank=True,null=True)
    church_geo_hash = models.CharField('geo_hash',max_length=30, default='',blank=True)
    church_register_user = models.ForeignKey(User,on_delete=models.CASCADE,help_text=_('Người tạo'),default=None,blank=True,null=True)
    church_update_user = models.ForeignKey(User,on_delete=models.CASCADE,default=None,blank=True,null=True,help_text=_('Người cuối cập nhật'),related_name='church_update_user')
    church_update_date = models.DateTimeField(_('Ngày cập nhật'),help_text=_('Lần cuối cập nhật'),default=timezone.now)

    def __str__(self):
        return self.church_name

class ChurchImages(models.Model):
    church_image_title = models.CharField(_('image title'),help_text=_('Tiêu đề cho hình ảnh'),max_length=120)
    church_image = models.ImageField(_('Hình ảnh'),help_text=_('Hình ảnh đại diện'),null=True,blank=True,upload_to='church_images')
    church_image_church = models.ForeignKey(Church, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.church_image_title} : {self.id}'

class MassTime(models.Model):
    mass_type = (
        ('NORMAL',_('Ngày thường')),
        ('SUNDAY',_('Chúa Nhật')),
        ('SPECIAL',_('Lễ Trọng')),
        ('OTHER',_('Khác'))
    )
    mass_time_title = models.CharField(_('Tiêu đề'),help_text=_('Tiêu đề'),max_length=255,null=True,blank=True)
    mass_time_start = models.DateTimeField(_('Thời gian'),help_text=_('Thời điểm bắt đầu'),null=True,blank=True)
    mass_time_end = models.DateTimeField(_('Thời gian'),help_text=_('Thời điểm kết thúc'),null=True,blank=True)
    mass_time_language = models.ForeignKey(Language,on_delete=models.CASCADE,help_text=_('Ngôn ngữ'))
    mass_time_type = models.CharField(_('Mass type'),max_length=15,choices=mass_type,default="NORMAL",help_text=_('Kiểu Thánh Lễ'))
    mass_time_date_ordinary = models.CharField(_('Tuần Phụng vụ'),help_text=_('Tuần phụng vụ'),max_length=4,default="0")
    mass_time_church = models.ForeignKey(Church, on_delete=models.CASCADE,help_text=_('Tên nhà thờ'))
    mass_time_reading = models.ForeignKey(DailyReading,on_delete=models.CASCADE,help_text=_('Bài đọc'))
    mass_time_created_user = models.ForeignKey(User,on_delete=models.CASCADE)
    mass_time_updated_user = models.ForeignKey(User,on_delete=models.CASCADE,default=None,blank=True,null=True,related_name='mass_time_updated_user')
    mass_time_last_updated_date = models.DateTimeField(_('Ngày cập nhật'),help_text=_('Lần cuối cập nhật'),default=timezone.now)
    

    def __str__(self):
        return f'{self.mass_time_title} : {self.mass_time_language}'

class ChurchChapel(models.Model):
    church_chapel_name = models.CharField(_('Chapel name'),help_text=_('Chapel name'),max_length=50)
    church_chapel_church = models.ForeignKey(Church, on_delete=models.CASCADE,help_text=_('Select Church'))
    church_chapel_discrible = HTMLField(_('Chapel discription'),help_text=_('Chapel discription'))
    church_chapel_total_seats =  models.SmallIntegerField(_('Chapel total seats'),help_text=_('Chapel total seats capable'),default=1)
    
    def __str__(self):
        return f'{self.church_chapel_church.church_name} : {self.church_chapel_name}'

class ChurchChapelSeat(models.Model):
    from VietcatholicJP.constant_choice import seat_choice
    chapel_seat_no = models.CharField(_('Số ghế'),help_text=_('Số ghế'),max_length=4)
    chapel_seat_type = models.CharField(_('Kiểu ghế'),help_text=_('Kiểu ghế'),max_length=30,choices=seat_choice, blank=False)
    chapel_seat_chapel = models.ForeignKey(ChurchChapel, on_delete=models.SET_NULL, null = True,help_text=_('Select Church'))
    
    def __str__(self):
        return f'{self.chapel_seat_chapel.church_chapel_name} : {self.chapel_seat_no}'

class MassSchedule(models.Model):
    from VietcatholicJP.constant_choice import week_day_choice 
    mass_schedule_chapel = models.ForeignKey(ChurchChapel, on_delete=models.SET_NULL, null = True,help_text=_('Select Church'))
    mass_week_day = models.CharField(_('Ngày trong tuần'),help_text=_('Ngày trong tuần ra Thánh Lễ (0-6)'),choices=week_day_choice,max_length=10)
    mass_time = models.TimeField(_('Giờ'),help_text=_('thời gian'))

    def __str__(self):
        return f'{self.mass_schedule_chapel.church_chapel_name} : {self.mass_week_day}:{self.mass_time}'

class Mass(models.Model):
    from VietcatholicJP.constant_choice import language_choice 

    mass_date = models.DateField(_('Ngày'),help_text=_('Ngày diễn ra Thánh Lễ'))
    mass_time = models.TimeField(_('Giờ'),help_text=_('thời gian'))
    mass_schedule = models.ForeignKey(MassSchedule,help_text=_('Lựa chọn lịch xếp Lễ'),on_delete=models.SET_NULL, null=True)
    mass_title = models.CharField(_('Chủ đề'),help_text=_('Tiêu đề của sự kiện'),max_length=50)
    mass_reading = models.ForeignKey(DailyReading, on_delete=models.CASCADE,blank=True,null=True)
    mass_language = models.CharField(_('Ngôn ngữ'),help_text=_('Ngôn ngữ'),max_length=15,choices=language_choice)
    mass_date_ordinary = models.CharField(_('Tuần phụng vụ'),help_text=_('Tuần phụng vụ'),max_length=3)
    mass_VietcatholicJP_celebrant = models.CharField(_('Cha chủ tế'),help_text=_('Cha chủ tế'),max_length=40,blank=True,null=True)
    mass_church = models.ForeignKey(Church, on_delete=models.CASCADE,help_text=_('chọn Nhà thờ'),blank=True,null=True)
    mass_church_chapel = models.ForeignKey(ChurchChapel, on_delete=models.SET_NULL,help_text=_('chọn Nhà thờ'),blank=True,null=True)
    mass_slots = models.SmallIntegerField(_('Số chỗ'),help_text=_('Số chỗ'),default=0)
    mass_slots_registered = models.SmallIntegerField(_('Số đăng ký'),help_text=_('Số người đăng ký'),default=0,blank=True,null=True)
    mass_slots_attended = models.SmallIntegerField(_('Số tham dự'),help_text=_('Số người tham dự'),default=0,blank=True,null=True)
    mass_waiting = models.SmallIntegerField(_('Số người đang đợi'),help_text=_('Số người đang đợi'),default=0,blank=True,null=True)
    mass_total_registered = models.SmallIntegerField(_('Tổng số đăng ký'),help_text=_('Tổng số người đăng ký'),default=0,blank=True,null=True)
    mass_online_url = models.URLField(_('Link trực tuyến'),help_text=_('Link trực tuyến'),blank=True,null=True)
    mass_image = models.ImageField(_('Hình ảnh'),help_text=_('Hình ảnh minh hoạ'),null=True,blank=True,upload_to='mass_images')
    mass_last_updated_date = models.DateTimeField(_('Ngày cập nhật'),help_text=_('Lần cuối cập nhật'),default=timezone.now,blank=True,null=True)
    mass_created_user = models.ForeignKey(User, on_delete=models.CASCADE,help_text=_('Người cuối cập nhật'),blank=True,null=True)
    mass_active = models.BooleanField(_('Tình trạng'),help_text=_('Tình trạng'),default=True,blank=True,null=True)
    mass_waiting_flag = models.BooleanField(_('Cho phép đăng ký '),help_text=_('Cho phép đăng ký đợi'),default=False,blank=True,null=True)

    def __str__(self):
        return self.mass_date_ordinary +" : "+ self.mass_language
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.mass_image = self.compressImage(self.mass_image)
        super(Mass, self).save(*args, **kwargs)

    def compressImage(self,mass_image):
        imageTemproary = Image.open(mass_image)
        outputIoStream = BytesIO()
        imageTemproaryResized = imageTemproary.resize( (720,420) ) 
        imageTemproaryResized.save(outputIoStream , format='PNG', quality=60)
        outputIoStream.seek(0)
        mass_image = InMemoryUploadedFile(outputIoStream,'ImageField', "%s.png" % mass_image.name.split('.')[0], 'image/png', sys.getsizeof(outputIoStream), None)
        return mass_image

class Event(models.Model):
    from VietcatholicJP.constant_choice import language_choice 

    event_date = models.DateTimeField(_('Ngày tháng'),help_text=_('Ngày tháng'))
    event_time = models.TimeField(_('Giờ'),help_text=_('thời gian diễn ra sự kiện'))
    event_time_length = models.SmallIntegerField(_('Khoảng thời gian'),help_text=_('Khoảng thời gian diễn ra sự kiện'),blank=True,default=1)
    event_title = models.CharField(_('Chủ đề'),help_text=_('Tiêu đề của sự kiện'),max_length=100)
    event_content = HTMLField(_('Nội dung'),help_text=_('Nội dung của sự kiện'),blank=True)
    event_language = models.CharField(_('Ngôn ngữ'),help_text=_('Ngôn ngữ'),max_length=15,choices=language_choice)
    event_date_ordinary = models.CharField(_('Tuần phụng vụ'),help_text=_('Tuần phụng vụ'),max_length=10)
    event_place = models.ForeignKey(Place,on_delete=models.CASCADE, help_text=_('Nơi tổ chức'),blank=True,null=True)
    event_holder = models.CharField(_('Người tổ chức'),help_text=_('Người tổ chức'),max_length=40)
    event_slots = models.SmallIntegerField(_('Tổng số ghế'),help_text=_('Tổng số ghế'),default=125)
    event_slots_registered = models.SmallIntegerField(_('Số người đăng ký'),help_text=_('Số người đã đăng ký'),default=0)
    event_attended = models.SmallIntegerField(_('Số người tham dự'),help_text=_('Số người tham dự'),default=0)
    event_waiting = models.SmallIntegerField(_('Số người đang đợi'),help_text=_('Số người đang đợi'),default=0)
    event_online_url = models.URLField(_('Url trực tuyến'),help_text=_('Url trực tuyến'),blank=True)
    event_image = models.ImageField(_('Hình ảnh'),help_text=_('Hình ảnh'),null=True,blank=True,upload_to='mass_images')
    event_active = models.BooleanField(_('Tình trạng'),help_text=_('Tình trạng sự kiện'),default=True)
    event_created_date = models.DateTimeField(_('Ngày tạo'),help_text=_('Ngày tạo'),default=timezone.now)
    event_last_updated_date = models.DateTimeField(_('Ngày cập nhật'),help_text=_('Ngày cập nhật'),default=timezone.now)
    event_created_user = models.ForeignKey(User, on_delete=models.CASCADE,default=None,blank=True,null=True)
    event_waiting_flag = models.BooleanField(_('Cho phép đăng ký '),help_text=_('Cho phép đăng ký đợi'),default=False)

    def __str__(self):
        return self.event_date_ordinary +" : "+ self.event_language

    def save(self, *args, **kwargs):
        if not self.id:
            self.event_image = self.compressImage(self.event_image)
        super(Event, self).save(*args, **kwargs)
    def compressImage(self,event_image):
        imageTemproary = Image.open(event_image)
        outputIoStream = BytesIO()
        imageTemproaryResized = imageTemproary.resize( (720,420) ) 
        imageTemproaryResized.save(outputIoStream , format='PNG', quality=60)
        outputIoStream.seek(0)
        event_image = InMemoryUploadedFile(outputIoStream,'ImageField', "%s.png" % event_image.name.split('.')[0], 'image/png', sys.getsizeof(outputIoStream), None)
        return event_image

class Seat(models.Model):
    from VietcatholicJP.constant_choice import seat_choice, seat_status_choice
    
    seat_no = models.CharField(_('Số ghế'),help_text=_('Số ghế'),max_length=4,null=True,blank=False)
    seat_type = models.CharField(_('Kiểu ghế'),help_text=_('Kiểu ghế'),max_length=30,choices=seat_choice, blank=False)
    seat_mass_schedule = models.ForeignKey(MassSchedule, on_delete=models.SET_NULL,help_text=_('Mass chapel schedule'),default=None,blank=True,null=True)
    seat_status = models.CharField(_('Tình trạng'),help_text=_('Chọn tình trạng'),max_length=2,default='A',choices=seat_status_choice)

    #class Meta:
        #unique_together = ('seat_no','seat_mass','seat_type')

    def __str__(self):
        return f'{self.seat_no} : {self.seat_type}' #:{self.seat_mass_schedule.mass_schedule_chapel.church_chapel_name}:{self.seat_mass_schedule.mass_time}'

class Registration(models.Model):
    from VietcatholicJP.constant_choice import status_choice, cf_status_choice
    registration_date = models.DateTimeField(default=timezone.now,null=True,blank=True)
    registration_user = models.ForeignKey(User, on_delete=models.CASCADE)
    registration_user_name = models.CharField(default='',null=True, blank=True,max_length=30)
    registration_user_age = models.SmallIntegerField(default=0,null=True, blank=True)
    #registration_relationship = models.ForeignKey(Relationships,on_delete=models.SET_NULL,null=True,blank=True)
    registration_mass = models.ForeignKey(Mass, on_delete=models.CASCADE)
    registration_confirm_code = models.CharField(max_length=25,default='',blank=True)
    registration_code = models.CharField(max_length=200,default='',null=True,blank=True)
    registration_seat = models.ForeignKey(Seat, on_delete=models.SET_NULL,null=True)
    registration_total_seats = models.SmallIntegerField(default=1,null=True,blank=True)
    registration_status = models.CharField(max_length=3,choices=status_choice,default=WAITING,null=True,blank=True)
    registration_approve_status = models.CharField(max_length=3,choices=status_choice,default=APPROVED,null=True,blank=True,help_text=_('Trạng thái được cập nhập sau khi đăng ký'))
    registration_last_update = models.DateTimeField(default=timezone.now,null=True,blank=True)
    registration_confirm_status = models.CharField(max_length=3,choices=cf_status_choice,default=NOTCONFIRM,null=True,blank=True)
    registration_last_updated_user = models.ForeignKey(User,on_delete=models.CASCADE,default=None,blank=True,null=True,help_text=_('Người cuối cập nhật'),related_name='registration_last_updated_user')
    registration_last_update_time = models.DateTimeField(default=timezone.now,null=True,blank=True,help_text=_('Thời gian cập nhập lần cuối bởi quản lý'))

    def __str__(self):
        return f'{self.registration_user.username}:{self.registration_user.profile.profile_full_name}:{self.registration_status}' #: {self.userregistration_seat}'

class UnRegister(models.Model):
    unregister_name =  models.CharField(_('Họ Tên'),default='',max_length=30,help_text=_('Họ tên đầy đủ'))
    unregister_phone = models.CharField(_('Số điện thoại'),default='',blank=True,max_length=12,help_text=_('Xin nhập số điện thoại'))
    unregister_email = models.CharField(_('Email'),default='',max_length=150,help_text=_('Xin nhập địa chỉ email cá nhân.'))
    unregister_seat = models.CharField(verbose_name=_('Số ghế'), max_length=4,default='',null=True)
    unregister_mass = models.ForeignKey(Mass, on_delete=models.CASCADE,default=None,blank=True,null=True)
    unregister_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.unregister_name +" : "+ self.unregister_seat