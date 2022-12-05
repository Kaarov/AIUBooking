from django.shortcuts import render
from django.views.generic import View
from rest_framework.permissions import BasePermission, AllowAny, SAFE_METHODS
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.http import JsonResponse

from booking.models import *
from booking.serializers import *


class AjaxHandler(View):
    def get(self, request):

        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            time = BookingItem.objects.all()
            bookingpole = BookingPole.objects.all()
            # time = '4'
            return JsonResponse({'time': time, 'bookingpole': bookingpole})
        return render(request, 'index.html')


# Rest Api

# ---------

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


# AboutService
class BookingItemViewSet(ModelViewSet):
    serializer_class = BookingItemSerializer
    queryset = BookingItem.objects.all()
    permission_classes = [AllowAny]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny | ReadOnly]
        elif self.action in ['list', 'retrieve', 'create', 'update']:
            self.permission_classes = [AllowAny | ReadOnly]
        else:
            self.permission_classes = [AllowAny | ReadOnly]
        return super(BookingItemViewSet, self).get_permissions()

    def list(self, request, *args, **kwargs):
        queryset = BookingItem.objects.all()
        serializer = BookingItemSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def retrieve(self, request, *args, **kwargs):
        check = BookingItem.objects.filter(pk=kwargs.get('id'))
        if check:
            instance = BookingItem.objects.get(pk=kwargs.get('id'))
            serializer = BookingItemSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
        else:
            return Response("error: Not found", status=200)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        check = BookingItem.objects.filter(pk=kwargs.get('id'))
        if check:
            instance = BookingItem.objects.get(pk=kwargs.get('id'))
            serializer = BookingItemSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            return Response("error: Not found", status=200)
        return Response(serializer.data, status=200)

    def destroy(self, request, *args, **kwargs):
        check = BookingItem.objects.filter(pk=kwargs.get('id'))
        if check:
            instance = BookingItem.objects.get(pk=kwargs.get('id'))
            self.perform_destroy(instance)
        else:
            return Response("error: Not found", status=200)
        return Response("success: Destroyed", status=200)
# ---------


# Booking Pole
class BookingPoleViewSet(ModelViewSet):
    serializer_class = BookingPoleSerializer
    queryset = BookingPole.objects.all()
    permission_classes = [AllowAny]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny | ReadOnly]
        elif self.action in ['list', 'retrieve', 'create', 'update']:
            self.permission_classes = [AllowAny | ReadOnly]
        else:
            self.permission_classes = [AllowAny | ReadOnly]
        return super(BookingPoleViewSet, self).get_permissions()

    def list(self, request, *args, **kwargs):
        queryset = BookingPole.objects.all()
        serializer = BookingPoleSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def retrieve(self, request, *args, **kwargs):
        check = BookingPole.objects.filter(pk=kwargs.get('id'))
        if check:
            instance = BookingPole.objects.get(pk=kwargs.get('id'))
            serializer = BookingPoleSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
        else:
            return Response("error: Not found", status=200)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        check = BookingPole.objects.filter(pk=kwargs.get('id'))
        if check:
            instance = BookingPole.objects.get(pk=kwargs.get('id'))
            serializer = BookingPoleSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            return Response("error: Not found", status=200)
        return Response(serializer.data, status=200)

    def destroy(self, request, *args, **kwargs):
        check = BookingPole.objects.filter(pk=kwargs.get('id'))
        if check:
            instance = BookingPole.objects.get(pk=kwargs.get('id'))
            self.perform_destroy(instance)
        else:
            return Response("error: Not found", status=200)
        return Response("success: Destroyed", status=200)


# AboutService
class BookingPolePutViewSet(ModelViewSet):
    serializer_class = BookingItemSerializer
    queryset = BookingItem.objects.all()
    permission_classes = [AllowAny]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        elif self.action in ['list', 'retrieve', 'create', 'update']:
            self.permission_classes = [AllowAny | ReadOnly]
        else:
            self.permission_classes = [AllowAny | ReadOnly]
        return super(BookingPolePutViewSet, self).get_permissions()

    # def retrieve(self, request, *args, **kwargs):
    #     dmy = f"{kwargs.get('id')}"
    #     print(dmy)
    #     check = BookingItem.objects.filter(booking_day='2022-12-04')
    #     if check:
    #         instance = BookingItem.objects.get(booking_day='2022-12-04')
    #         serializer = BookingItemSerializer(instance, data=request.data, partial=True)
    #         serializer.is_valid(raise_exception=True)
    #     else:
    #         return Response("error: Not found", status=200)
    #     return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        ymd = f"{kwargs.get('year')}-{kwargs.get('month')}-{kwargs.get('day')}"
        queryset = BookingItem.objects.filter(booking_day=ymd)
        serializer = BookingItemSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    # def update(self, request, *args, **kwargs):
    #     ymd = f"{kwargs.get('year')}-{kwargs.get('month')}-{kwargs.get('day')}"
    #     check = BookingItem.objects.filter(booking_day=ymd)
    #     if check:
    #         instance = BookingItem.objects.filter(booking_day=ymd)
    #         serializer = BookingPolePutViewSetSerializer(instance, data=request.data, partial=True)
    #         serializer.is_valid(raise_exception=True)
    #         serializer.save()
    #     else:
    #         return Response("error: Not found", status=200)
    #     return Response(serializer.data, status=200)
