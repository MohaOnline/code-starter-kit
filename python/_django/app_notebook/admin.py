from django.contrib import admin

# Register your models here.
from .models import Record, Notebook

admin.site.register(Record)
admin.site.register(Notebook)


