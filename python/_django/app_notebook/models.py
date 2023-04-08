# https://docs.djangoproject.com/en/4.1/ref/models/fields/
from django.db import models  # models: module name
from django.utils.translation import gettext_lazy as _


class Notebook(models.Model):
    """Book contains related Records."""
    title = models.CharField(max_length=255)

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
        NO = 0, 'No Type'
        NOTE = 1, 'Note'
        TASK = 2, 'Task'

    type = models.IntegerField(choices=Type.choices, default=Type.NOTE)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    # Additional fields.
    detail = models.TextField(null=True, blank=True)

    # Users who could access Record
    # user = models.ForeignKey('self', null=True, blank=True)

    notebooks = models.ManyToManyField(Notebook)

    def __str__(self):
        """Return a string representation of the model."""
        return self.title


class Option(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


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

    # Used for choice questions.
    options = models.ManyToManyField(Option)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class Solution(models.Model):
    detail = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class Answer(models.Model):
    correct = models.BooleanField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

