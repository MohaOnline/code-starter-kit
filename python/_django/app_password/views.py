from django.http import HttpResponse
from django.shortcuts import render
from . import __common


def egg(request):
    """Easter egg"""
    __common.greeting()
    return HttpResponse("Hello, World!")


def passwords(request):
    """View of all passwords for current user."""
    return render(request, 'passwords.html', {

    })
