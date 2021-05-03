from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from tinymce.models import HTMLField
from django.contrib.auth.models import User
from adminapp.models import Language

# Create your models here.

class Provice(models.Model):
    province_nation = models.CharField(_('Quốc gia'),help_text=_('Tên Quốc gia'),max_length=50)
    province_code = models.CharField(_('Mã'),help_text=_('Mã theo i18n'),max_length=3)
    province_en_name = models.CharField(_('Tên quốc tế'),help_text=_('Tên theo tiếng anh'),max_length=50)
    
    def __str__(self):
        return self.province_en_name

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

class Contact(models.Model):
    contact_full_name = models.CharField(_('Họ Tên'),default='',max_length=30,help_text=_('Họ tên đầy đủ'))
    contact_email = models.CharField(_('Email'),max_length=100,help_text=_('Xin nhập địa chỉ email'))
    contact_content = models.TextField(_('Nội dung'),help_text=_('Nội dung liên hệ'))
    contact_phone = models.CharField(_('Số điện thoại'),default='',blank=True,max_length=12,help_text=_('Xin nhập số điện thoại để liên lạc khi cần'))
    contact_date = models.DateTimeField(_('Ngày liên hệ'),default=timezone.now,help_text=_('Ngày liên hệ'))
    contact_reply_status = models.BooleanField(_('Trạng thái'),help_text=_('Trạng thái phản hồi'),default=False)
    contact_reply_content = models.TextField(_('Nội dung phản hồi'),default='',help_text=_('Nội dung phản hồi'))

    def __str__(self):
        return f'{self.contact_email}'

class CarouselSlide(models.Model):
    carousel_title = models.CharField(max_length=100)
    carousel_url = models.ImageField(null=True,blank=True,upload_to='web_images/carousel')
    carousel_content = models.CharField(max_length=200)
    carousel_language = models.ForeignKey(Language,on_delete=models.CASCADE,help_text=_('Ngôn ngữ'),default=None,blank=True,null=True)
    carousel_active = models.CharField(max_length=10,default="",blank=True)
    def __str__(self):
        return f'{self.carousel_title}'

class Announcement(models.Model):
    announcement_title = models.CharField(max_length=100)
    announcement_url = models.ImageField(null=True,blank=True,upload_to='web_images/announ')
    announcement_content = HTMLField()
    announcement_language = models.ForeignKey(Language,on_delete=models.CASCADE,help_text=_('Ngôn ngữ'),default=None,blank=True,null=True)
    announcement_active = models.BooleanField(default=True,blank=True)
    announcement_create_date = models.DateTimeField(default=timezone.now)
    announcement_created_user = models.ForeignKey(User, on_delete=models.CASCADE,default=None,blank=True,null=True)

    class Meta:
        ordering = ['announcement_create_date']

    def __str__(self):
        return f'{self.announcement_title}:{self.announcement_create_date}'

class Aboutus(models.Model):
    aboutus_title = models.CharField(max_length=100)
    aboutus_url = models.ImageField(null=True,blank=True,upload_to='web_images/announ')
    aboutus_content = HTMLField()
    aboutus_language = models.ForeignKey(Language,on_delete=models.CASCADE,help_text=_('Ngôn ngữ'),default=None,blank=True,null=True)
    aboutus_active = models.BooleanField(default=True,blank=True)
    aboutus_create_date = models.DateTimeField(default=timezone.now)
    aboutus_created_user = models.ForeignKey(User, on_delete=models.CASCADE,default=None,blank=True,null=True)

    def __str__(self):
        return f'{self.aboutus_title}:{self.aboutus_create_date}'