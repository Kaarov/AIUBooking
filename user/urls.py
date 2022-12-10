from django.urls import path, include
from user.views import *

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    # path('contact/', contact, name='contact'),
    path('logout/', logout_own, name='logout_own'),
    path('register/', register, name='register'),
    path('login_aiu/', login_own, name='login_own'),
    path('after_register/', after_register, name='after_register'),
    # path('error_login/', error_login, name='error_login'),
]
