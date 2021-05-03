from django.contrib import admin
from admin_numeric_filter.admin import NumericFilterModelAdmin, \
    SliderNumericFilter
from django_admin_listfilter_dropdown.filters import ChoiceDropdownFilter, RelatedDropdownFilter
from admin_auto_filters.filters import AutocompleteFilter

from .models import NewFeed

PAGE_SIZE = 30

class NewFeedAdmin(admin.ModelAdmin):
    list_per_page = PAGE_SIZE
    search_fields = ('nf_title','nf_status')

admin.site.register(NewFeed, NewFeedAdmin)