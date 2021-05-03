from django.contrib import admin
from admin_numeric_filter.admin import NumericFilterModelAdmin, \
    SliderNumericFilter
from django_admin_listfilter_dropdown.filters import ChoiceDropdownFilter, RelatedDropdownFilter
from admin_auto_filters.filters import AutocompleteFilter
from .models import Country, Province, District, Church


admin.site.site_header = 'VietCatholicJP'
admin.site.site_title = 'Vietcatholic JP Admintration side'
admin.index_title = 'VietCatholicJP'
admin.site_url = '/admin'


# Register your models here.
PAGE_SIZE = 30
# Helper classes
class PeopleNumericFilter(SliderNumericFilter):
    STEP = 1


class StatusAdminFilter(AutocompleteFilter):
    title = 'Status Fitler'
    field_name = 'status'


class CountryAdminFilter(AutocompleteFilter):
    title = 'Country Filter'
    field_name = 'country'

class ProvinceAdminFilter(AutocompleteFilter):
    title = 'Province Filter'
    field_name = 'province'


class DistrictAdminFilter(AutocompleteFilter):
    title = 'District Filter'
    field_name = 'district'


class ChurchBase(admin.ModelAdmin):
    class Meta:
        abstract = True

    list_display = ('church_name', 'church_brief_description', 'church_country')
    search_fields = ('name__unaccent', )
    list_per_page = PAGE_SIZE

class CountryAdmin(admin.ModelAdmin):
    URL_CUSTOM_TAG = 'country'
    list_per_page = PAGE_SIZE


class ProvinceAdmin(admin.ModelAdmin):
    list_filter = (
        CountryAdminFilter,
    )
    URL_CUSTOM_TAG = 'province'
    list_per_page = PAGE_SIZE


class DistrictAdmin(admin.ModelAdmin):
    list_filter = (
        ('province__country', RelatedDropdownFilter),
        ProvinceAdminFilter,
    )
    URL_CUSTOM_TAG = 'district'
    list_per_page=PAGE_SIZE



admin.site.register(Country, CountryAdmin)
admin.site.register(Province, ProvinceAdmin)
admin.site.register(District, DistrictAdmin)