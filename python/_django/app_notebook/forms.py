from django import forms
from django.core.exceptions import ObjectDoesNotExist

from . import models


class EnglishChineseForm(forms.Form):
    # This class is used to create a form for
    word = forms.CharField()
    syllable = forms.CharField()
    accent = forms.CharField()
    phonetic_uk = forms.CharField()
    phonetic_us = forms.CharField()
    english_typescript = forms.CharField()
    part_of_speech = forms.CharField()
    chinese = forms.CharField()
    weight = forms.CharField()
    chinese_typescript = forms.CharField()

    # class Meta:
    #     model = models.EnglishChinese
    #     fields = ['translation', 'typescript']
    #     labels = {'translation': 'Translation'}

    def save(self, commit=True):
        try:
            english = models.English.objects.get(word=self.cleaned_data['word'])
        except ObjectDoesNotExist:
            # english with the given word does not exist
            english = models.English(
                word=self.cleaned_data['word'],
                syllable=self.cleaned_data['syllable']
            )
            # english.save()

            english_chinese = models.EnglishChinese(

            )
            # english_chinese.save()
        else:
            # english with the given word exists
            pass
