from django.conf.urls import url
from django.urls import path, include
from booking.views import *

urlpatterns = [

    # Ajax API
    path('', AjaxHandler.as_view(), name="home"),

    # Booking API
    path('bookingitem/', BookingItemViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('bookingitem/<int:id>/', BookingItemViewSet.as_view({'get': 'list', 'patch': 'retrieve',
                                                              'put': 'update', 'delete': 'destroy'})),
    # Booking Pole API
    path('bookingpole/', BookingPoleViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('bookingpole/<int:id>/', BookingPoleViewSet.as_view({'get': 'list', 'patch': 'retrieve',
                                                              'put': 'update', 'delete': 'destroy'})),

    path('bookingpoleput/<int:year>/<int:month>/<int:day>/', BookingPolePutViewSet.as_view({'get': 'list'})),

    path('bookingpost/', bookingpost),
]
