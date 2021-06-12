from django.utils.translation import ugettext_lazy as _
from .constants import *
# Booking status
status_choice = (
    (WAITING, _('Chờ')),
    (APPROVED, _('Đã duyệt')),
    (DENY, _('Bị từ chối')),
    (PRESENTED, _('Hiện diện')),
    (ABSENTED, _('Vắng mặt')),
    (CANCEL, _('Huỷ'))
)

cf_status_choice = (
    (CONFIRMED, _('Xác nhận')),
    (NOTCONFIRM, _('Chưa xác nhận'))
)
# language

language_choice = (
    (EN, _('English')),
    (JA, _('日本語')),
    (VI, _('Tiếng Việt')),
    (ES, _('Spanish'))
)

event_choice = (
    (MASS, 'Mass'),
    (EVENT, 'Event')
)

seat_status_choice = (
    (AVAILABEL, _('Availabel')),
    (REGISTERED, _('Registered')),
    (TAKEN, _('Taken')),
    (UNAVAILABEL, _('Unavailabel')),
)

seat_choice = (
    (SEAT_20, _('Over 20')),
    (SEAT_32, _('Over 32')),
    (SEAT_50, _('Over 50')),
    (SEAT_PRI, _('Priority Seat'))
)

week_day_choice = (
    ('0', _('Thứ hai')),
    ('1', _('Thứ ba')),
    ('2', _('Thứ tư')),
    ('3', _('Thứ năm')),
    ('4', _('Thứ sáu')),
    ('5', _('Thứ bảy')),
    ('6', _('Chúa Nhật')),
)

family_choice = (
    ('FATHER', _('Cha')),
    ('MOTHER', _('Mẹ')),
    ('MOTHER', _('Con')),
    ('BROTHER', _('Anh Chị em')),
    ('FRIEND', _('Bạn')),
    ('OTHER', _('Khác'))
)

health_choice = (
    ('GOOD', _('Tốt')),
    ('NORM', _('Bình thường')),
    ('NGOOD', _('Không khoẻ lắm')),
    ('SICK', _('Bị ốm gần đây'))
)

new_feed_type = (
    ('Letter', _('Thư')),
    ('Reflection', _('Gospel Reflection')),
    ('Event', _('Event')),
    ('Inform', _('Inform')),
    ('News', _('News')),
    ('Youth', _('The Youth')),
)

post_status_choice = (
    ('E', _('Editing')),
    ('W', _('Waiting')),
    ('A', _('Approved')),
    ('R', _('Rejected')),
)

post_priority_choice = (
    ('0', _('Very Importance')),
    ('1', _('Importance')),
    ('2', _('Normal')),
    ('3', _('Rejected')),
)
