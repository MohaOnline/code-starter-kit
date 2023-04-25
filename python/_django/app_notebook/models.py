# https://docs.djangoproject.com/en/4.1/ref/models/fields/
# Model 中可配置项目
# https://docs.djangoproject.com/en/4.2/ref/models/options/
from django.contrib.auth.models import User
from django.db import models  # models: module name
from django.utils.translation import gettext_lazy as _


class Notebook(models.Model):
    """Notebook contains related Records."""
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return a string representation of the model."""
        return self.title


# Delegating Model to Admin Panel needs register in admin.py.
class Record(models.Model):
    """A Record the user is working on."""
    title = models.CharField(max_length=255)

    class Status(models.IntegerChoices):
        DROPPED = -1, 'Dropped'
        PENDING = 0, 'Pending'
        PLANNING = 1, 'Planning'
        WORKING = 2, 'Working'
        DONE = 3, 'Done'
        PUBLISHED = 4, 'Published'

    status = models.IntegerField(choices=Status.choices, default=Status.PENDING)

    class Type(models.IntegerChoices):
        NA = 0, 'No Type'
        NOTE = 1, 'Note'
        TASK = 2, 'Task'
        EXCERPT = 3, 'Excerpt'
        REFERENCE = 4, 'Reference'

    type = models.IntegerField(choices=Type.choices, default=Type.NOTE)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    # Additional fields.
    detail = models.TextField(null=True, blank=True)
    weight = models.IntegerField()
    ref_id = models.IntegerField()
    ref_obj = models.CharField(max_length=255)

    # Users who could access Record
    # user = models.ForeignKey('self', null=True, blank=True)

    notebooks = models.ManyToManyField(Notebook)

    def __str__(self):
        """Return a string representation of the model."""
        return self.title


class Question(models.Model):
    class Type(models.IntegerChoices):
        FILLING = 0, _("Filling")
        CHOICE = 1, _("Choice")
        PASSAGE_CHOICE = 2, _("Passage Choice")
        QUESTION = 3, _("Question")
        INITIAL = 4, _("Initial")

    type = models.IntegerField(choices=Type.choices)

    class Subject(models.IntegerChoices):
        CHINESE = 0, _("Chinese Languages")
        MATH = 1, _("Mathematics")
        ENGLISH = 2, _("English")
        PHYSICS = 3, _("Physics")
        CHEMISTRY = 4, _("chemistry")
        MORALITY = 5, _("Morality")

    subject = models.IntegerField(choices=Type.choices)

    detail = models.TextField(null=True, blank=True)

    # Used for passage choice questions.
    passage = models.ForeignKey(Record, on_delete=models.CASCADE)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class Option(models.Model):
    question = models.ForeignKey(Question, null=True, blank=True, on_delete=models.CASCADE)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class Solution(models.Model):
    detail = models.TextField(null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class Answer(models.Model):
    correct = models.BooleanField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    detail = models.TextField(null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class Book(models.Model):
    """Where do English words come from?"""
    name = models.CharField(max_length=255)
    weight = models.IntegerField()
    publishing_house = models.CharField(max_length=255, null=True, blank=True)
    published_date = models.DateField()

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return a string representation of the model."""
        return self.name


class Example(models.Model):
    sentence = models.CharField(max_length=1023)
    chinese = models.CharField(max_length=1023)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class English(models.Model):
    word = models.CharField(max_length=255)
    syllable = models.CharField(max_length=255, null=True)
    accent = models.CharField(max_length=255, null=True)
    phonetic_uk = models.CharField(max_length=255, null=True)
    phonetic_us = models.CharField(max_length=255, null=True)
    typescript = models.CharField(max_length=255, null=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "English"

    def __str__(self):
        """Return a string representation of the model."""
        return self.word


class EnglishChinese(models.Model):
    english = models.ForeignKey(English, null=True, blank=True, on_delete=models.SET_NULL)
    weight = models.IntegerField(null=True)
    part_of_speech = models.CharField(max_length=63, null=True, blank=True)
    translation = models.CharField(max_length=255)
    typescript = models.CharField(max_length=511, null=True, blank=True)
    examples = models.ManyToManyField(Example)
    books = models.ManyToManyField(Book, through='EnglishChineseBooks')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "English - Chinese"
        db_table = "app_notebook_english_chinese"

    def __str__(self):
        """Return a string representation of the model."""
        return self.translation


class EnglishChineseBooks(models.Model):
    chinese = models.ForeignKey(EnglishChinese, null=True, blank=True, on_delete=models.DO_NOTHING)
    book = models.ForeignKey(Book, null=True, blank=True, on_delete=models.DO_NOTHING)
    page = models.CharField(max_length=15, null=True, blank=True)

    class Meta:
        db_table = "app_notebook_english_chinese_books"
