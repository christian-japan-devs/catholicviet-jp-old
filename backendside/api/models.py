from django.db import models
from django.utils import timezone
import sys
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from tinymce.models import HTMLField
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from adminapp.models import Language

# Create your models here

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