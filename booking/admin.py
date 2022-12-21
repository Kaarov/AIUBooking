from django.contrib import admin

from booking.models import BookingPole, BookingItem, BookingTime


# @admin.register(Personal)
# class PersonalAdmin(admin.ModelAdmin):
#     list_display = ['name', ]


@admin.register(BookingItem)
class BookingItemAdmin(admin.ModelAdmin):
    list_per_page = 10

    # def has_delete_permission(self, request, obj=None):
    #     return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(BookingTime)
class BookingTime(admin.ModelAdmin):
    list_display = ['time_from', 'time_to', ]

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(BookingPole)
class BookingPoleAdmin(admin.ModelAdmin):
    list_display = ['name', ]

    def has_delete_permission(self, request, obj=None):
        return False

