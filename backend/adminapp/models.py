from django.db import models
from django.utils import timezone
import sys
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO
from tinymce.models import HTMLField
from smart_selects.db_fields import ChainedForeignKey
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from core.constants import *
from core.constant_choice import *


class UserProfile(models.Model):
    profile_user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_first_name = models.CharField(
        _('Họ'), default='', max_length=30, help_text=_('Họ'))
    profile_last_name = models.CharField(
        _('Tên'), default='', max_length=30, help_text=_('Tên'))
    profile_full_name = models.CharField(
        _('Họ Tên'), default='', max_length=30, help_text=_('Họ tên đầy đủ'))
    profile_image = models.ImageField(_('Hình đại diện'), default='', blank=True,
                                      null=True, upload_to='media/profile_pics', help_text=_('Không bắt buộc'))
    profile_address = models.CharField(
        _('Địa chỉ'), default='', max_length=300, help_text=_('Xin nhập địa chỉ hiện tại của bạn'))
    profile_age = models.SmallIntegerField(
        _('Tuổi'), default=0, help_text=_('Xin nhập độ tuổi của bạn'))
    profile_phone_number = models.CharField(_('Số điện thoại'), default='', blank=True, max_length=12, help_text=_(
        'Xin nhập số điện thoại để liên lạc khi cần'))
    profile_language = models.CharField(_('Ngôn ngữ'), max_length=15, choices=language_choice,
                                        default="vi", help_text=_('Ngôn ngữ sử dụng trên trang web'))
    profile_access_num = models.IntegerField(
        _('Số lần truy cập'), default=0, help_text=_('Số lần truy cập trang web'))
    profile_reading_num = models.IntegerField(
        _('Số lần đọc'), default=0, help_text=_('Số lần đọc kinh thánh'))
    profile_health_status = models.CharField(
        _('Tình trạng'), max_length=15, choices=health_choice, default="GOOD", help_text=_('Tình trạng sức khoẻ của bạn hiện tại'))
    profile_last_check_tempture = models.SmallIntegerField(
        _('Nhiệt độ cơ thể'), default=36, help_text=_('Nhiệt độ cơ thể lần kiểm tra gần nhất'))
    profile_last_check_tempture_time = models.DateField(
        _('Kiểm tra ngày'), default=timezone.now, help_text=_('Ngày kiểm tra nhiệt độ'))
    profile_last_update_time = models.DateField(
        _('Lần cuối truy cập'), default=timezone.now, help_text=_('Lần cuối truy cập'))
    profile_account_confimred = models.BooleanField(
        _('Xác minh'), help_text=_('Tình trạng xác minh'), default=False)
    profile_code = models.CharField(
        _('Mã xác nhận'), default='', blank=True, max_length=20, help_text=_('Mã xác nhận'))
    profile_home_count = models.SmallIntegerField(
        default=1, blank=True, null=True)
    profile_registered_count = models.SmallIntegerField(
        default=1, blank=True, null=True)
    profile_gospel_count = models.SmallIntegerField(
        default=1, blank=True, null=True)
    profile_absented_count = models.SmallIntegerField(
        default=0, blank=True, null=True)
    profile_presented_count = models.SmallIntegerField(
        default=1, blank=True, null=True)

    class Meta:
        unique_together = (
            'profile_user', 'profile_full_name', 'profile_address')
        ordering = ('profile_user__username', 'profile_user__email',)

    def __str__(self):
        return f'{self.profile_user.username} : {self.profile_full_name} : {self.profile_user.email}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if (self.profile_image):
            img = Image.open(self.profile_image.path)
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                img.save(self.profile_image.path)


def generate_unique_code():
    length = 8
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


class Language(models.Model):
    language_name = models.CharField(_('Tên Ngôn ngữ'), help_text=_(
        'Ngôn ngữ của Quốc gia'), max_length=50)
    language_code = models.CharField(
        _('Mã'), help_text=_('Mã theo i18n'), max_length=3)
    language_en_name = models.CharField(
        _('Tên quốc tế'), help_text=_('Tên theo tiếng anh'), max_length=50)
    language_flag_small_url = models.ImageField(_('Hình ảnh'), help_text=_(
        'Hình ảnh minh hoạ'), null=True, blank=True, upload_to='flags')
    language_flag_medium_url = models.ImageField(_('Hình ảnh'), help_text=_(
        'Hình ảnh minh hoạ'), null=True, blank=True, upload_to='flags')

    def __str__(self):
        return self.language_name


class Country(models.Model):
    country_name = models.CharField(
        _('Name'), help_text=_('Country name'), max_length=50)
    country_code = models.CharField(
        _('Postal code'), help_text=_('Country code'), max_length=12)
    country_en_name = models.CharField(
        _('International Name'), help_text=_('International Name'), max_length=50)

    def __str__(self):
        return self.country_en_name

    class Meta:
        verbose_name = _("Country")
        verbose_name_plural = _("Countries")


class Province(models.Model):
    province_name = models.CharField(
        _('Name'), help_text=_('Province name'), max_length=50)
    province_code = models.CharField(
        _('Postal code'), help_text=_('Postal code'), max_length=12)
    province_en_name = models.CharField(
        _('International Name'), help_text=_('International Name'), max_length=50)
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, default=None, related_name='province')

    def __str__(self):
        return self.province_en_name

    class Meta:
        verbose_name = _("Province")
        verbose_name_plural = _("Provinces")


class District(models.Model):
    district_name = models.CharField(
        _('Name'), help_text=_('District name'), max_length=50)
    district_code = models.CharField(
        _('Postal code'), help_text=_('Postal code'), max_length=12)
    district_en_name = models.CharField(
        _('International Name'), help_text=_('International Name'), max_length=50)
    province = models.ForeignKey(
        Province, on_delete=models.CASCADE, default=None, related_name='province')

    def __str__(self):
        return self.district_en_name

    class Meta:
        verbose_name = _("District")
        verbose_name_plural = _("Districts")


class Church(models.Model):

    church_name = models.CharField(verbose_name=_(
        'Church Name'), help_text=_('Church Name'), max_length=120)
    church_sub_name = models.CharField(verbose_name=_(
        'Church Sub Name'), help_text=_('Church Sub Name'), max_length=120)
    church_brief_description = models.CharField(verbose_name=_(
        'Brief discription'), help_text=_('Brief discription'), default='', blank=True, max_length=500)
    church_image = models.ImageField(verbose_name=_('Profile image'), help_text=_(
        'Profile Image'), null=True, blank=True, upload_to='church_images')
    church_external_image = models.CharField(verbose_name=_('Image Link'), help_text=_(
        'External Image Link'), blank=True, default="", max_length=200)
    church_address = models.CharField(verbose_name=_(
        'Address'), help_text=_('Address'), max_length=255)
    church_map_link = models.CharField(verbose_name=_(
        'Map Link'), help_text=_('Map Link'), max_length=255)
    church_url = models.CharField(verbose_name=_('Web adress'), help_text=_(
        'Website adress'), max_length=100, default='', blank=True)
    church_phone = models.CharField(verbose_name=_('Phone number'), help_text=_(
        'Phone number'), max_length=15, default='', blank=True)
    church_email = models.CharField(verbose_name=_('Email'), help_text=_(
        'Email address'), max_length=50, default='', blank=True)
    church_language_main = models.CharField(_('Ngôn ngữ'), help_text=_(
        'Ngôn ngữ'), max_length=15, choices=language_choice)
    church_total_seats = models.SmallIntegerField(
        _('Total seats'), help_text=_('Chapel total seats capable'), default=50)
    church_country = models.ForeignKey(
        Country, blank=True, null=True,
        verbose_name=_('Country'),
        help_text=_('Belong to country'),
        on_delete=models.CASCADE,
        related_name="church_reversed"
    )
    church_province = ChainedForeignKey(
        Province,
        verbose_name=_('Province'),
        chained_field="country",
        chained_model_field="country",
        show_all=False,
        auto_choose=True,
        sort=True,
        blank=True,
        null=True,
        related_name="church_reversed",
        on_delete=models.CASCADE
    )
    church_district = ChainedForeignKey(
        District,
        verbose_name=_('District'),
        chained_field="province",
        chained_model_field="province",
        show_all=False,
        auto_choose=True,
        sort=True,
        blank=True,
        null=True,
        related_name="church_reversed",
        on_delete=models.CASCADE)
    church_notice_on_map = models.CharField(verbose_name=_('Brief inform on map'), help_text=_(
        'Brief inform on map'), blank=True, default="", max_length=500)
    church_lon = models.FloatField(verbose_name=_('Churchs longtitue'), help_text=_(
        'Churchs longtitue acorrding Google'), default=0.0, blank=True, null=True)
    church_lat = models.FloatField(verbose_name=_('Churchs latitue'), help_text=_(
        'Churchs latitue acorrding Google'), default=0.0, blank=True, null=True)
    church_geo_hash = models.CharField(verbose_name=_(
        'geo_hash'), max_length=30, default='', blank=True)
    church_register_user = models.ForeignKey(User, verbose_name=_(
        'Created User'), on_delete=models.CASCADE, default=None, blank=True, null=True)
    church_update_user = models.ForeignKey(User, verbose_name=_(
        'Last updated User'), on_delete=models.CASCADE, default=None, blank=True, null=True, related_name='church_update_user')
    church_update_date = models.DateTimeField(verbose_name=_(
        'Last updated date'), help_text=_('Last updated date'), default=timezone.now)

    def __str__(self):
        return self.church_name

    def save(self, *args, **kwargs):
        if not self.id:
            if(self.church_image):
                self.church_image = self.compressImage(self.church_image)
        super(Church, self).save(*args, **kwargs)

    def compressImage(self, church_image):
        imageTemproary = Image.open(church_image)
        outputIoStream = BytesIO()
        imageTemproaryResized = imageTemproary.resize((720, 420))
        imageTemproaryResized.save(outputIoStream, format='PNG', quality=60)
        outputIoStream.seek(0)
        mass_image = InMemoryUploadedFile(outputIoStream, 'ImageField', "%s.png" % church_image.name.split(
            '.')[0], 'image/png', sys.getsizeof(outputIoStream), None)
        return mass_image


class ChurchImages(models.Model):
    church_image_title = models.CharField(
        _('Image title'), help_text=_('Title for the image'), max_length=120)
    church_image_discription = models.CharField(_('Image discription'), help_text=_(
        'Brief discription for the image'), max_length=400)
    church_image = models.ImageField(_('Hình ảnh'), help_text=_(
        'Hình ảnh đại diện'), null=True, blank=True, upload_to='church_images')
    church_image_church = models.ForeignKey(Church, on_delete=models.CASCADE)
    church_image_user = models.ForeignKey(User, verbose_name=_(
        'UpLoaded User'), on_delete=models.CASCADE, default=None, blank=True, null=True)
    church_image_like = models.IntegerField(
        _('Post like'), help_text=_('Number of post liked'), default=0)
    church_image_share = models.IntegerField(
        _('Posted Shared'), help_text=_('Number of post shared'), default=0)
    church_image_clicked = models.IntegerField(
        _('View numbers'), help_text=_('View numbers'), default=0)

    def __str__(self):
        return f'{self.church_image_title} : {self.id}'

    def save(self, *args, **kwargs):
        if not self.id:
            if(self.church_image):
                self.church_image = self.compressImage(self.church_image)
        super(ChurchImages, self).save(*args, **kwargs)

    def compressImage(self, church_image):
        imageTemproary = Image.open(church_image)
        outputIoStream = BytesIO()
        imageTemproaryResized = imageTemproary.resize((720, 420))
        imageTemproaryResized.save(outputIoStream, format='PNG', quality=60)
        outputIoStream.seek(0)
        mass_image = InMemoryUploadedFile(outputIoStream, 'ImageField', "%s.png" % church_image.name.split(
            '.')[0], 'image/png', sys.getsizeof(outputIoStream), None)
        return mass_image


class ChurchPost(models.Model):
    church_post_title = models.CharField(verbose_name=_(
        'Post title'), help_text=_('Post title max length = 120'), max_length=120)
    church_post_image = models.ImageField(verbose_name=_('Image'), help_text=_(
        'Image for the title'), null=True, blank=True, upload_to='church_images')
    church_post_type = models.CharField(verbose_name=_(
        'Post type'), help_text=_('Type of this post'), max_length=120)
    church_post_language = models.CharField(
        _('Ngôn ngữ'), max_length=15, choices=language_choice, default="vi", help_text=_('Ngôn ngữ sử dụng'))
    church_post_content = HTMLField(verbose_name=_(
        'Content'), help_text=_('Content'), default='')
    church_post_church = models.ForeignKey(Church, verbose_name=_(
        'Belong to Church'), on_delete=models.CASCADE)
    church_post_date = models.DateTimeField(
        _('Posted date'), help_text=_('Posted date'), default=timezone.now)
    church_post_user = models.ForeignKey(User, verbose_name=_(
        'Posted User'), on_delete=models.CASCADE, default=None, blank=True, null=True, related_name='church_post_user')
    church_post_update_date = models.DateTimeField(
        _('Last updated date'), default=timezone.now)
    church_post_update_user = models.ForeignKey(User, verbose_name=_(
        'Last updated User'), on_delete=models.CASCADE, default=None, blank=True, null=True, related_name='church_post_update_user')
    church_post_like = models.IntegerField(
        _('Post like'), help_text=_('Number of post liked'), default=0)
    church_post_share = models.IntegerField(
        _('Posted Shared'), help_text=_('Number of post shared'), default=0)
    church_post_clicked = models.IntegerField(
        _('View numbers'), help_text=_('Viewed numbers'), default=0)
    church_post_status = models.BooleanField(_('Status'), help_text=_(
        'Approve status'), default=True, blank=True, null=True)

    def __str__(self):
        return f'{self.church_post_title}'

    class Meta:
        verbose_name = _('ChurchPost')
        verbose_name_plural = _('Church List Post')
        ordering = ('church_post_date',)


class ChurchSeat(models.Model):
    chapel_seat_no = models.CharField(
        _('Số ghế'), help_text=_('Số ghế'), max_length=4)
    chapel_seat_type = models.CharField(_('Kiểu ghế'), help_text=_(
        'Kiểu ghế'), max_length=30, choices=seat_choice, blank=False)
    chapel_seat_chapel = models.ForeignKey(
        Church, on_delete=models.SET_NULL, null=True, help_text=_('Select Church'))

    def __str__(self):
        return f'{self.chapel_seat_chapel.church_chapel_name} : {self.chapel_seat_no}'


class MassSchedule(models.Model):
    mass_church = models.ForeignKey(
        Church, on_delete=models.SET_NULL, null=True, help_text=_('Select Church'), related_name='massSchedules')
    mass_week_day = models.CharField(_('Ngày trong tuần'), help_text=_(
        'Ngày trong tuần (Mon-Sun)=(0-6)'), choices=week_day_choice, max_length=10)
    mass_time = models.TimeField(_('Giờ'), help_text=_('thời gian'))
    mass_language = models.CharField(_('Ngôn ngữ'), help_text=_(
        'Ngôn ngữ'), max_length=15, choices=language_choice)

    def __str__(self):
        return f'{self.mass_church.church_name}-{self.get_mass_week_day_display()}-{self.mass_time}-{self.get_mass_language_display()}'


class ConfessionSchedule(models.Model):
    con_church = models.ForeignKey(
        Church, on_delete=models.SET_NULL, null=True, help_text=_('Select Church'))
    con_week_day = models.CharField(_('Ngày trong tuần'), help_text=_(
        'Ngày trong tuần (Mon-Sun)=(0-6)'), choices=week_day_choice, max_length=10)
    con_start_time = models.TimeField(
        _('Bắt đầu'), help_text=_('thời gian bắt đầu'))
    con_end_time = models.TimeField(
        _('Kết thúc'), help_text=_('thời gian kết thúc'))
    con_language = models.CharField(_('Ngôn ngữ'), help_text=_(
        'Ngôn ngữ'), max_length=15, choices=language_choice)
    con_father = models.ForeignKey(User, verbose_name=_(
        'Cha giải tội'), on_delete=models.CASCADE, default=None, blank=True, null=True, related_name='con_father')
    con_update_date = models.DateTimeField(
        _('Last updated date'), default=timezone.now)
    con_status = models.BooleanField(_('Status'), help_text=_(
        'Active status'), default=True, blank=True, null=True)

    def __str__(self):
        return f'{self.con_church.church_name}-{self.get_con_week_day_display()}-{self.con_time}-{self.get_con_language_display()}'


class DailyGospel(models.Model):
    daily_gospel_title = models.CharField(
        _('Chủ đề'), help_text=_('Chủ đề của ngày '), max_length=50)
    daily_gospel_date = models.DateField(
        _('Ngày tháng'), help_text=_('Ngày tháng dương lịch'))
    daily_gospel_date_ordinary = models.CharField(
        _('Tuần phụng vụ'), help_text=_('Tuần phụng vụ'), max_length=3)
    daily_gosspel_content = HTMLField(_('Nội dung'), help_text=_(
        'Lời Chúa Nội dung'), default='', null=True, blank=True)
    daily_gospel_laguage = models.CharField(
        _('Ngôn ngữ'), max_length=15, choices=language_choice, default="vi", help_text=_('Ngôn ngữ sử dụng'))
    daily_gospel_readed = models.IntegerField(
        _('Số lượt đọc'), help_text=_('Số lượt đọc'), default=0)
    daily_gospel_created_date = models.DateTimeField(
        _('Ngày viết'), help_text=_('Ngày tạo'), default=timezone.now)
    daily_gospel_last_updated_date = models.DateTimeField(
        _('Ngày cập nhật'), help_text=_('Lần cuối cập nhật'), default=timezone.now)
    daily_gospel_created_user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    daily_gospel_like = models.IntegerField(
        _('Post like'), help_text=_('Number of post liked'), default=0)
    daily_gospel_share = models.IntegerField(
        _('Posted Shared'), help_text=_('Number of post shared'), default=0)
    daily_gospel_clicked = models.IntegerField(
        _('View numbers'), help_text=_('Viewed numbers'), default=0)
    daily_gospel_status = models.BooleanField(_('Status'), help_text=_(
        'Approve status'), default=True, blank=True, null=True)

    def __str__(self):
        return f'{self.daily_gospel_title} : {self.daily_gospel_date}'

    class meta:
        ordering = ["daily_gospel_title"]


class Mass(models.Model):
    mass_date = models.DateField(
        _('Ngày'), help_text=_('Ngày diễn ra Thánh Lễ'))
    mass_time = models.TimeField(_('Giờ'), help_text=_('thời gian'))
    mass_schedule = models.ForeignKey(MassSchedule, help_text=_(
        'Lựa chọn lịch xếp Lễ'), on_delete=models.SET_NULL, null=True)
    mass_title = models.CharField(_('Chủ đề'), help_text=_(
        'Tiêu đề của sự kiện'), max_length=50)
    mass_reading = models.ForeignKey(
        DailyGospel, on_delete=models.CASCADE, blank=True, null=True)
    mass_language = models.CharField(_('Ngôn ngữ'), help_text=_(
        'Ngôn ngữ'), max_length=15, choices=language_choice)
    mass_date_ordinary = models.CharField(
        _('Tuần phụng vụ'), help_text=_('Tuần phụng vụ'), max_length=3)
    mass_father_celebrant = models.ForeignKey(User, verbose_name=_('Cha chủ tế'), help_text=_(
        'Cha chủ tế'), on_delete=models.CASCADE, blank=True, null=True, related_name="mass_father")
    mass_church = models.ForeignKey(Church, on_delete=models.CASCADE, help_text=_(
        'chọn Nhà thờ'), blank=True, null=True)
    mass_slots = models.SmallIntegerField(
        _('Số chỗ'), help_text=_('Số chỗ'), default=50)
    mass_slots_registered = models.SmallIntegerField(_('Số đăng ký'), help_text=_(
        'Số người đăng ký'), default=0, blank=True, null=True)
    mass_slots_attended = models.SmallIntegerField(_('Số tham dự'), help_text=_(
        'Số người tham dự'), default=0, blank=True, null=True)
    mass_waiting = models.SmallIntegerField(_('Số người đang đợi'), help_text=_(
        'Số người đang đợi'), default=0, blank=True, null=True)
    mass_total_registered = models.SmallIntegerField(_('Tổng số đăng ký'), help_text=_(
        'Tổng số người đăng ký bao gồm cả người huỷ'), default=0, blank=True, null=True)
    mass_online_url = models.URLField(_('Link trực tuyến'), help_text=_(
        'Link trực tuyến'), blank=True, null=True)
    mass_image = models.ImageField(_('Hình ảnh'), help_text=_(
        'Hình ảnh minh hoạ'), null=True, blank=True, upload_to='mass_images')
    mass_last_updated_date = models.DateTimeField(_('Ngày cập nhật'), help_text=_(
        'Lần cuối cập nhật'), default=timezone.now, blank=True, null=True)
    mass_created_user = models.ForeignKey(User, on_delete=models.CASCADE, help_text=_(
        'Người cuối cập nhật'), blank=True, null=True, related_name="created_user")
    mass_require_flag = models.BooleanField(_('Yêu cầu đăng ký '), help_text=_(
        'Yêu cầu đăng'), default=True, blank=True, null=True)
    mass_active = models.BooleanField(_('Tình trạng'), help_text=_(
        'Cho phép đăng ký'), default=True, blank=True, null=True)
    mass_waiting_flag = models.BooleanField(_('Cho phép đăng ký '), help_text=_(
        'Cho phép đăng ký đợi'), default=False, blank=True, null=True)

    def __str__(self):
        return self.mass_date_ordinary + " : " + self.mass_language

    def save(self, *args, **kwargs):
        if not self.id:
            if(self.mmass_imagea):
                self.mass_image = self.compressImage(self.mass_image)
        super(Mass, self).save(*args, **kwargs)

    def compressImage(self, mass_image):
        imageTemproary = Image.open(mass_image)
        outputIoStream = BytesIO()
        imageTemproaryResized = imageTemproary.resize((720, 420))
        imageTemproaryResized.save(outputIoStream, format='PNG', quality=60)
        outputIoStream.seek(0)
        mass_image = InMemoryUploadedFile(outputIoStream, 'ImageField', "%s.png" % mass_image.name.split(
            '.')[0], 'image/png', sys.getsizeof(outputIoStream), None)
        return mass_image


class Seat(models.Model):
    seat_no = models.CharField(_('Số ghế'), help_text=_(
        'Số ghế'), max_length=4, null=True, blank=False)
    seat_type = models.CharField(_('Kiểu ghế'), help_text=_(
        'Kiểu ghế'), max_length=30, choices=seat_choice, blank=False)
    seat_mass_schedule = models.ForeignKey(MassSchedule, on_delete=models.SET_NULL, help_text=_(
        'Mass chapel schedule'), default=None, blank=True, null=True)
    seat_status = models.CharField(_('Tình trạng'), help_text=_(
        'Chọn tình trạng'), max_length=2, default='A', choices=seat_status_choice)

    # class Meta:
    #unique_together = ('seat_no','seat_mass','seat_type')

    def __str__(self):
        # :{self.seat_mass_schedule.mass_schedule_chapel.church_chapel_name}:{self.seat_mass_schedule.mass_time}'
        return f'{self.seat_no} : {self.seat_type}'


class MonthlyTopic(models.Model):
    mt_title = models.CharField(_('Chủ đề'), help_text=_(
        'Chủ đề của tháng. Dài tối đa 100 ký tự'), max_length=100)
    mt_month = models.CharField(_('Năm-Tháng-Ngày'), help_text=_(
        'Lưu ý điền vào theo mẫu yyyy-mm-dd, ví dụ ngày 21 tháng 01 năm 2021 là: 2021-01-21'), max_length=10)
    mt_image_main = models.ImageField(_('Ảnh bìa chính'), help_text=_(
        'Ảnh bìa của tháng, kích thước tiêu chuẩn 1080x400'), null=True, blank=True, upload_to='post_images')
    mt_image_main_text = models.CharField(_('Tên ảnh bìa'), help_text=_(
        'Tên ảnh bìa. Dài tối đa 100 ký tự'), max_length=100)
    mt_image = models.ImageField(_('Hình ảnh'), help_text=_(
        'Hình ảnh'), null=True, blank=True, upload_to='post_images')
    mt_brief_content = models.CharField(_('Tóm tắt'), help_text=_(
        'Nội dung tóm tắt dài tối đa 200 ký tự.'), max_length=200)
    mt_content = HTMLField(_('Nội dung'), help_text=_('Nội dung'))
    mt_language = models.CharField(_('Ngôn ngữ'), help_text=_(
        'Ngôn ngữ'), max_length=15, choices=language_choice)
    mt_user_created = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, blank=True, null=True, related_name="mt_user_created")
    mt_date_created = models.DateTimeField(
        _('Ngày tạo'), help_text=_('Ngày tạo'), default=timezone.now)
    mt_user_approved = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, blank=True, null=True, related_name="mt_user_approved")
    mt_date_approved = models.DateTimeField(
        _('Ngày chấp nhận'), help_text=_('Ngày chấp nhận'), default=timezone.now)
    mt_user_last_edit = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, blank=True, null=True, related_name="mt_user_last_edit")
    mt_date_edited = models.DateTimeField(
        _('Ngày sửa'), help_text=_('Ngày cuối sửa đổi'), default=timezone.now)
    mt_post_like = models.IntegerField(
        _('Post like'), help_text=_('Number of post liked'), default=0)
    mt_post_share = models.IntegerField(
        _('Posted Shared'), help_text=_('Number of post shared'), default=0)
    mt_post_clicked = models.IntegerField(
        _('View numbers'), help_text=_('Viewed numbers'), default=0)
    mt_status = models.CharField(_('Tình trạng'), help_text=_(
        'Tình trạng của bài viết'), max_length=10, choices=post_status_choice)
    mt_post_status = models.BooleanField(_('Status'), help_text=_(
        'Approve status'), default=True, blank=True, null=True)

    class Meta:
        verbose_name = _('Monthly Topic')
        verbose_name_plural = _('Monthly Topics')
        ordering = ('mt_date_edited',)

    def __str__(self):
        return self.mt_title + " : " + self.mt_month

    def save(self, *args, **kwargs):
        if not self.id:
            if(self.mt_image_main):
                self.mt_image_main = self.compressImage(self.mt_image_main)
        super(MonthlyTopic, self).save(*args, **kwargs)

    def compressImage(self, mt_image_main):
        imageTemproary = Image.open(mt_image_main)
        outputIoStream = BytesIO()
        imageTemproaryResized = imageTemproary.resize((720, 420))
        imageTemproaryResized.save(outputIoStream, format='PNG', quality=60)
        outputIoStream.seek(0)
        mt_image_main = InMemoryUploadedFile(outputIoStream, 'ImageField', "%s.png" % mt_image_main.name.split(
            '.')[0], 'image/png', sys.getsizeof(outputIoStream), None)
        return mt_image_main


class NewFeed(models.Model):
    nf_title = models.CharField(_('Chủ đề'), help_text=_(
        'Tiêu đề của sự kiện'), max_length=100)
    nf_type = models.CharField(_('Thể loại'), help_text=_(
        'Bài viết liên quan đến thể loại gì'), max_length=15, choices=new_feed_type)
    nf_image = models.ImageField(_('Hình ảnh'), help_text=_(
        'Hình ảnh'), null=True, blank=True, upload_to='post_images')
    nf_brief_content = HTMLField(_('Tóm tắt'), help_text=_('Nội dung tóm tắt'))
    nf_content = HTMLField(_('Nội dung'), help_text=_('Nội dung'))
    nf_language = models.CharField(_('Ngôn ngữ'), help_text=_(
        'Ngôn ngữ'), max_length=15, choices=language_choice)
    nf_user_created = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, blank=True, null=True, related_name="nf_user_created")
    nf_date_created = models.DateTimeField(
        _('Ngày tạo'), help_text=_('Ngày tạo'), default=timezone.now)
    nf_user_approved = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, blank=True, null=True, related_name="nf_user_approved")
    nf_date_approved = models.DateTimeField(
        _('Ngày chấp nhận'), help_text=_('Ngày chấp nhận'), default=timezone.now)
    nf_user_last_edit = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, blank=True, null=True, related_name="nf_user_last_edit")
    nf_date_edited = models.DateTimeField(
        _('Ngày sửa'), help_text=_('Ngày cuối sửa đổi'), default=timezone.now)
    nf_post_like = models.IntegerField(
        _('Post like'), help_text=_('Number of post liked'), default=0)
    nf_post_share = models.IntegerField(
        _('Posted Shared'), help_text=_('Number of post shared'), default=0)
    nf_post_clicked = models.IntegerField(
        _('View numbers'), help_text=_('Viewed numbers'), default=0)
    nf_priority_level = models.CharField(_('Độ ưu tiên'), help_text=_(
        'Mức độ ưu tiên của bài viết'), max_length=2, choices=post_priority_choice)
    nf_status = models.CharField(_('Tình trạng'), help_text=_(
        'Tình trạng duyệt của bài viết'), max_length=10, choices=post_status_choice)
    nf_post_status = models.BooleanField(_('trạng thái hoạt động'), help_text=_(
        'Cho phép truy vấn'), default=True, blank=True, null=True)

    class Meta:
        verbose_name = _('New Feed')
        verbose_name_plural = _('New Feeds')
        ordering = ('nf_date_edited',)

    def __str__(self):
        return self.nf_title

    def save(self, *args, **kwargs):
        if not self.id:
            if(self.nf_image):
                self.nf_image = self.compressImage(self.nf_image)
        super(NewFeed, self).save(*args, **kwargs)

    def compressImage(self, nf_image):
        imageTemproary = Image.open(nf_image)
        outputIoStream = BytesIO()
        imageTemproaryResized = imageTemproary.resize((720, 420))
        imageTemproaryResized.save(outputIoStream, format='PNG', quality=60)
        outputIoStream.seek(0)
        nf_image = InMemoryUploadedFile(outputIoStream, 'ImageField', "%s.png" % nf_image.name.split(
            '.')[0], 'image/png', sys.getsizeof(outputIoStream), None)
        return nf_image


class MassTime(models.Model):
    mass_type = (
        ('NORMAL', _('Weekday')),
        ('SUNDAY', _('Sunday')),
        ('SPECIAL', _('Special')),
        ('Ceremony', _('Ceremony')),
        ('OTHER', _('Others'))
    )
    mass_time_title = models.CharField(_('Tiêu đề'), help_text=_(
        'Tiêu đề'), max_length=255, null=True, blank=True)
    mass_date = models.DateTimeField(_('Thời gian'), help_text=_(
        'Thời điểm bắt đầu'), null=True, blank=True)
    mass_time = models.DateTimeField(_('Thời gian'), help_text=_(
        'Thời điểm kết thúc'), null=True, blank=True)
    mass_time_language = models.CharField(
        _('Ngôn ngữ'), max_length=15, choices=language_choice, default="vi", help_text=_('Ngôn ngữ sử dụng'))
    mass_time_type = models.CharField(
        _('Mass type'), max_length=15, choices=mass_type, default="NORMAL", help_text=_('Kiểu Thánh Lễ'))
    mass_time_date_ordinary = models.CharField(
        _('Tuần Phụng vụ'), help_text=_('Tuần phụng vụ'), max_length=4, default="0")
    mass_time_church = models.ForeignKey(
        Church, on_delete=models.CASCADE, help_text=_('Tên nhà thờ'))
    mass_time_created_user = models.ForeignKey(User, on_delete=models.CASCADE)
    mass_time_updated_user = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, blank=True, null=True, related_name='mass_time_updated_user')
    mass_time_last_updated_date = models.DateTimeField(
        _('Ngày cập nhật'), help_text=_('Lần cuối cập nhật'), default=timezone.now)
    mass_time_status = models.BooleanField(_('Status'), help_text=_(
        'Approve status'), default=True, blank=True, null=True)

    class Meta:
        verbose_name = _('MassTime')
        verbose_name_plural = _('MassTime')
        ordering = ('mass_date',)

    def __str__(self):
        return f'{self.mass_time_title} : {self.mass_time_language}'


class Registration(models.Model):
    registration_date = models.DateTimeField(
        default=timezone.now, null=True, blank=True)
    registration_user = models.ForeignKey(User, on_delete=models.CASCADE)
    registration_user_name = models.CharField(
        default='', null=True, blank=True, max_length=30)
    registration_user_age = models.SmallIntegerField(
        default=0, null=True, blank=True)
    registration_mass = models.ForeignKey(Mass, on_delete=models.CASCADE)
    registration_confirm_code = models.CharField(
        max_length=25, default='', blank=True)
    registration_code = models.CharField(
        max_length=200, default='', null=True, blank=True)
    registration_seat = models.ForeignKey(
        Seat, on_delete=models.SET_NULL, null=True, blank=True)
    registration_total_seats = models.SmallIntegerField(
        default=1, null=True, blank=True)
    registration_status = models.CharField(
        max_length=3, choices=status_choice, default=WAITING, null=True, blank=True)
    registration_approve_status = models.CharField(
        max_length=3, choices=status_choice, default=APPROVED, null=True, blank=True, help_text=_('Trạng thái được cập nhập sau khi đăng ký'))
    registration_last_update = models.DateTimeField(
        default=timezone.now, null=True, blank=True)
    registration_confirm_status = models.CharField(
        max_length=3, choices=cf_status_choice, default=NOTCONFIRM, null=True, blank=True)
    registration_last_updated_user = models.ForeignKey(User, on_delete=models.CASCADE, default=None, blank=True, null=True, help_text=_(
        'Người cuối cập nhật'), related_name='registration_last_updated_user')
    registration_last_update_time = models.DateTimeField(
        default=timezone.now, null=True, blank=True, help_text=_('Thời gian cập nhập lần cuối bởi quản lý'))

    class Meta:
        verbose_name = _('Registration')
        verbose_name_plural = _('Registration')
        ordering = ('-registration_date',)

    def __str__(self):
        # : {self.userregistration_seat}'
        return f'{self.registration_user.username}:{self.registration_user.userprofile.profile_full_name}:{self.registration_status}'


class Event(models.Model):
    event_date = models.DateTimeField(
        _('Ngày tháng'), help_text=_('Ngày tháng'))
    event_time = models.TimeField(
        _('Giờ'), help_text=_('thời gian diễn ra sự kiện'))
    event_time_length = models.SmallIntegerField(_('Khoảng thời gian'), help_text=_(
        'Khoảng thời gian diễn ra sự kiện'), blank=True, default=1)
    event_title = models.CharField(_('Chủ đề'), help_text=_(
        'Tiêu đề của sự kiện'), max_length=100)
    event_content = HTMLField(_('Nội dung'), help_text=_(
        'Nội dung của sự kiện'), blank=True)
    event_language = models.CharField(_('Ngôn ngữ'), help_text=_(
        'Ngôn ngữ'), max_length=15, choices=language_choice)
    event_date_ordinary = models.CharField(
        _('Tuần phụng vụ'), help_text=_('Tuần phụng vụ'), max_length=10)
    event_place = models.ForeignKey(Church, on_delete=models.CASCADE, help_text=_(
        'Nơi tổ chức'), blank=True, null=True)
    event_holder = models.CharField(
        _('Người tổ chức'), help_text=_('Người tổ chức'), max_length=40)
    event_slots = models.SmallIntegerField(
        _('Tổng số ghế'), help_text=_('Tổng số ghế'), default=125)
    event_slots_registered = models.SmallIntegerField(
        _('Số người đăng ký'), help_text=_('Số người đã đăng ký'), default=0)
    event_attended = models.SmallIntegerField(
        _('Số người tham dự'), help_text=_('Số người tham dự'), default=0)
    event_waiting = models.SmallIntegerField(
        _('Số người đang đợi'), help_text=_('Số người đang đợi'), default=0)
    event_online_url = models.URLField(
        _('Url trực tuyến'), help_text=_('Url trực tuyến'), blank=True)
    event_image = models.ImageField(_('Hình ảnh'), help_text=_(
        'Hình ảnh'), null=True, blank=True, upload_to='mass_images')
    event_active = models.BooleanField(
        _('Tình trạng'), help_text=_('Tình trạng sự kiện'), default=True)
    event_created_date = models.DateTimeField(
        _('Ngày tạo'), help_text=_('Ngày tạo'), default=timezone.now)
    event_last_updated_date = models.DateTimeField(
        _('Ngày cập nhật'), help_text=_('Ngày cập nhật'), default=timezone.now)
    event_created_user = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, blank=True, null=True)
    event_waiting_flag = models.BooleanField(
        _('Cho phép đăng ký '), help_text=_('Cho phép đăng ký đợi'), default=False)

    def __str__(self):
        return self.event_date_ordinary + " : " + self.event_language

    def save(self, *args, **kwargs):
        if not self.id:
            if(self.event_image):
                self.event_image = self.compressImage(self.event_image)
        super(Event, self).save(*args, **kwargs)

    def compressImage(self, event_image):
        imageTemproary = Image.open(event_image)
        outputIoStream = BytesIO()
        imageTemproaryResized = imageTemproary.resize((720, 420))
        imageTemproaryResized.save(outputIoStream, format='PNG', quality=60)
        outputIoStream.seek(0)
        event_image = InMemoryUploadedFile(outputIoStream, 'ImageField', "%s.png" % event_image.name.split('.')[
                                           0], 'image/png', sys.getsizeof(outputIoStream), None)
        return event_image
