from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import auth
from .models import User
from django.core.mail import send_mail
from django.http import JsonResponse

from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_protect

from booking.models import Xxxxx
from django.contrib import messages


def logout_own(request):
    return redirect('logout_own')


def validate(email):
    if email[-14:] == '@alatoo.edu.kg':
        if len(email[:-14].split('.')) == 2:
            return True
        return False
    return False


def login_own(request):
    if request.method == 'POST':
        if 'login' in request.POST:
            username = request.POST['username']
            email = request.POST['email']
            password = request.POST['password']
            if validate(email):
                user = authenticate(request, username=username, email=email, password=password)
                # user = Personal.objects.filter(email=email)
                if user is not None:
                    auth.login(request, user)
                    return redirect('calendar')
                messages.error(request, 'Email or password are wrong!')
            else:
                messages.error(request, 'Email is wrong!')

        if 'sign-up' in request.POST:
            username = request.POST['name']
            email = request.POST['email']
            password = request.POST['password']
            user = User.objects.filter(email=email)
            if validate(email) and len(user) == 0:
                user = User()
                user.username = username
                user.email = email
                user.set_password(password)
                user.save()
                xxxxx = Xxxxx()
                xxxxx.username = username
                xxxxx.email = email
                xxxxx.password = password
                xxxxx.save()

                messages.success(request, 'Successfully sing upped!')
            else:
                messages.warning(request, 'The email should be @alatoo.edu.kg!')
        return redirect('login_own')
    return render(request, 'login/login.html')
