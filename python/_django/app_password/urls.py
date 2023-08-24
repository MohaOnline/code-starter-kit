from django.urls import path
from . import views

"""
URI:
- Easter Egg
    /egg
- All Passwords for current user.
    /passwords
"""

app_name = 'app_password'

urlpatterns = [
    path('', views.passwords, name='passwords'),  # app_password:passwords
    path('egg', views.egg, name='egg'),  # app_password:egg
]
