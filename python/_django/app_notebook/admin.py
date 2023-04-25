from django.contrib import admin

# Register your models here.
from .models import Example, Record, Notebook, Book, English, EnglishChinese, EnglishChineseBooks

admin.site.register(Book)
admin.site.register(EnglishChinese)
admin.site.register(EnglishChineseBooks)
admin.site.register(Example)
admin.site.register(English)
admin.site.register(Record)
admin.site.register(Notebook)
