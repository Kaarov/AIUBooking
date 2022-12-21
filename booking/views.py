from django.shortcuts import render, redirect
from django.views.generic import View
from rest_framework.permissions import BasePermission, AllowAny, SAFE_METHODS
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse

from booking.models import *
from booking.serializers import *

from django.views.decorators.csrf import csrf_protect


@csrf_protect
def bookingpost(request):
    body = str(request.body)[2:-1].split()
    print(body)
    booking, is_booking_created = BookingItem.objects.get_or_create(name_id=int(body[4]),
                                                                    booking_day=f"{body[0]}-{body[1]}-{body[2]}",
                                                                    booking_item_id=1,
                                                                    booking_time_id=body[3])
    if is_booking_created:
        booking.booking_day = f"{body[0]}-{body[1]}-{body[2]}"
        booking.booking_item_id = 1
        booking.booking_time_id = int(body[3])
        print("Done")
    else:
        pass
    booking.save()
    return redirect('home')


def home(request):
    field = BookingPole.objects.all()
    context = {
        'field': field,
    }
    return render(request, 'main.html', context=context)


class AjaxHandler(View):
    def get(self, request, id):
        if not request.user.is_authenticated:
            return redirect('home')
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            time = BookingItem.objects.all()
            bookingpole = BookingPole.objects.all()
            return JsonResponse({'time': time, 'bookingpole': bookingpole})
        field = BookingPole.objects.get(id=id)
        context = {
            'field': field,
        }
        return render(request, 'calendar.html', context=context)


class AddBooking(View):
    def post(self, request):
        if not request.user.is_authenticated:
            return render(request, 'calendar.html')
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            time = BookingItem.objects.all()
            bookingpole = BookingPole.objects.all()
            return JsonResponse({'time': time, 'bookingpole': bookingpole})
        return render(request, 'calendar.html')


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

    def list(self, request, *args, **kwargs):
        ymd = f"{kwargs.get('year')}-{kwargs.get('month')}-{kwargs.get('day')}"
        queryset = BookingItem.objects.filter(booking_day=ymd)
        serializer = BookingItemSerializer(queryset, many=True)
        return Response(serializer.data, status=200)
