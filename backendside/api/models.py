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

# Create your models here.
class NewFeed(models.Model):
    new_feed_type = (
        ('Mass',_('Mass')),
        ('Event',_('Event')),
        ('Inform',_('Inform')),
        ('News',_('News')),
        
    )

    post_status_choice = (
        ('E',_('Editing')),
        ('W',_('Waiting')),
        ('A',_('Approved')),
        ('R',_('Rejected')),
    )

    post_priority_choice = (
        ('0',_('Very Importance')),
        ('1',_('Importance')),
        ('2',_('Normal')),
        ('3',_('Rejected')),
    )

    language_choice = (
        ('ja',_('日本語')),
        ('en',_('English')),
        ('es',_('Spanish')),
        ('vi',_('Tiếng Việt'))
    )

    nf_title = models.CharField(_('Chủ đề'),help_text=_('Tiêu đề của sự kiện'),max_length=100)
    nf_type =  models.CharField(_('Thể loại'),help_text=_('Bài viết liên quan đến thể loại gì'),max_length=15,choices=new_feed_type)
    nf_image = models.ImageField(_('Hình ảnh'),help_text=_('Hình ảnh'),null=True,blank=True,upload_to='post_images')
    nf_brief_content = HTMLField(_('Tóm tắt'),help_text=_('Nội dung tóm tắt'))
    nf_content = HTMLField(_('Nội dung'),help_text=_('Nội dung'))
    nf_language = models.CharField(_('Ngôn ngữ'),help_text=_('Ngôn ngữ'),max_length=15,choices=language_choice)
    nf_user_created = models.ForeignKey(User, on_delete=models.CASCADE,default=None,blank=True,null=True,related_name="nf_user_created")
    nf_date_created = models.DateTimeField(_('Ngày tạo'),help_text=_('Ngày tạo'),default=timezone.now)
    nf_user_approved = models.ForeignKey(User, on_delete=models.CASCADE,default=None,blank=True,null=True,related_name="nf_user_approved")
    nf_date_approved = models.DateTimeField(_('Ngày chấp nhận'),help_text=_('Ngày chấp nhận'),default=timezone.now)
    nf_user_last_edit = models.ForeignKey(User, on_delete=models.CASCADE,default=None,blank=True,null=True,related_name="nf_user_last_edit")
    nf_date_edited = models.DateTimeField(_('Ngày sửa'),help_text=_('Ngày cuối sửa đổi'),default=timezone.now)
    nf_post_like = models.IntegerField(_('Post like'),help_text=_('Number of post liked'),default=0)
    nf_post_share = models.IntegerField(_('Posted Shared'),help_text=_('Number of post shared'),default=0)
    nf_post_clicked = models.IntegerField(_('View numbers'),help_text=_('Viewed numbers'),default=0)
    nf_priority_level = models.CharField(_('Độ ưu tiên'),help_text=_('Mức độ ưu tiên của bài viết'),max_length=2,choices=post_priority_choice)
    nf_status = models.CharField(_('Tình trạng'),help_text=_('Tình trạng của bài viết'),max_length=10,choices=post_status_choice)
    nf_post_status = models.BooleanField(_('Status'),help_text=_('Approve status'),default=True,blank=True,null=True)

    class Meta:
        verbose_name = _('New Feed')
        verbose_name_plural = _('New Feeds')
        ordering = ('nf_date_edited',)
    
    def __str__(self):
        return self.nf_title

    def save(self, *args, **kwargs):
        if not self.id:
            self.nf_image = self.compressImage(self.nf_image)
        super(NewFeed, self).save(*args, **kwargs)
    def compressImage(self,nf_image):
        imageTemproary = Image.open(nf_image)
        outputIoStream = BytesIO()
        imageTemproaryResized = imageTemproary.resize( (720,420) ) 
        imageTemproaryResized.save(outputIoStream , format='PNG', quality=60)
        outputIoStream.seek(0)
        nf_image = InMemoryUploadedFile(outputIoStream,'ImageField', "%s.png" % nf_image.name.split('.')[0], 'image/png', sys.getsizeof(outputIoStream), None)
        return nf_image


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