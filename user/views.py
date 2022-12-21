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


# def contact(request):
#     if not request.user.is_authenticated:
#         return redirect('home')
#     if request.method == 'POST':
#         username = request.POST['name']
#         email = request.POST['email']
#         subject = request.POST['subject']
#         message = request.POST['message']
#         send_mail(
#                 subject=subject,
#                 message=f'{message}\n'
#                         f''
#                         f'From {username}: email {email}',
#                 from_email=settings.EMAIL_HOST_USER,
#                 recipient_list=['anasbinkurban@gmail.com']
#             )
#         return redirect('contact')
#     return render(request, 'user/contact.html')


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
                print(user)
                if user is not None:
                    print("passed")
                    auth.login(request, user)
                    return redirect('home')
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
    # else:
    #     if request.user.is_authenticated:
    #         return render(request, 'login/login.html')
    return render(request, 'login/login.html')


# def after_register(request):
#     if request.method == 'POST':
#         if 'login' in request.POST:
#             username = request.POST['name']
#             password = request.POST['password']
#             user = authenticate(request, username=username, password=password)
#             if user is not None:
#                 login(request, user)
#                 return render(request, 'base.html')
#             else:
#                 return redirect('error_login')
#     else:
#         if request.user.is_authenticated:
#             return render(request, 'base.html')
#     return render(request, 'after_register.html')
