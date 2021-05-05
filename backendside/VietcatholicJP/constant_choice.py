from django.utils.translation import ugettext_lazy as _
from .constants import *
#Booking status
status_choice = (
    (WAITING,_('Waiting')),
    (APPROVED,_('Approved')),
    (DENY,_('Denied')),
    (PRESENTED,_('Presented')),
    (ABSENTED,_('Absented')),
    (CANCEL,_('Cancel'))
)

cf_status_choice = (
    (CONFIRMED, _('confirmed')),
    (NOTCONFIRM,_('not confirmed yet'))
)
#language

language_choice = (
        (EN,_('English')),
        (JA,_('日本語')),
        (VI,_('Tiếng Việt')),
        (ES,_('Spanish'))
    )

event_choice = (
        (MASS,'Mass'),
        (EVENT,'Event')
    )

seat_status_choice = (
        (AVAILABEL,_('Availabel')),
        (REGISTERED,_('Registered')),
        (TAKEN,_('Taken')),
        (UNAVAILABEL,_('Unavailabel')),
    )

seat_choice = (
        (SEAT_20,_('Over 20')),
        (SEAT_32,_('Over 32')),
        (SEAT_50,_('Over 50')),
        (SEAT_PRI,_('Priority Seat'))
    )

week_day_choice  = (
    ('0',_('Thứ hai')),
    ('1',_('Thứ ba')),
    ('2',_('Thứ tư')),
    ('3',_('Thứ năm')),
    ('4',_('Thứ sáu')),
    ('5',_('Thứ bảy')),
    ('6',_('Chúa Nhật')),
)

family_choice = (
    ('FATHER',_('Cha')),
    ('MOTHER',_('Mẹ')),
    ('MOTHER',_('Con')),
    ('BROTHER',_('Anh Chị em')),
    ('FRIEND',_('Bạn')),
    ('OTHER',_('Khác'))
)

health_choice = (
    ('GOOD',_('Tốt')),
    ('NORM',_('Bình thường')),
    ('NGOOD',_('Không khoẻ lắm')),
    ('SICK',_('Bị ốm gần đây'))
)

new_feed_type = (
    ('letter',_('Letter')),
    ('Refl',_('Gospel Reflection')),
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