from rest_framework import serializers

from booking.models import *


# ----------
# Booking Item

class BookingItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingItem
        fields = '__all__'


# Booking Pole
class BookingPoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingPole
        fields = '__all__'


class BookingPolePutViewSetSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField('get_products')

    class Meta:
        model = BookingItem
        fields = '__all__'

    def get_products(self, obj):
        products = BookingItem.objects.filter(booking_day=obj)
        return BookingItemSerializer(products, many=True).data