from django.contrib.auth import get_user
from django.shortcuts import render
from .models import Record, Notebook, English
from . import forms, models


def notebooks(request):
    """View of all notebooks for certain user."""
    return render(request, 'notebooks.html')  # templates/index.html


def notebook_user(request, user_id, notebook_id):
    return notebook(request, notebook_id)
    pass


def notebook(request, notebook_id=0):
    """Contents(Records) of certain notebook."""
    records = Record.objects.filter(notebooks__id=notebook_id).order_by('-created')
    current_notebook = Notebook.objects.get(id=notebook_id)
    return render(request, 'notebook.html', {
        'notebook': current_notebook,
        'records': records,
    })


def record(request, record_id):
    """Contents of certain record."""
    u = get_user(request)
    if not u.is_authenticated:
        raise Exception('Not for anonymous users.')

    r = Record.objects.get(id=record_id)
    nbs = r.notebooks.all()
    return render(request, 'record.html', {
        'user': u,
        'record': r,
        'notebooks': nbs
    })


def new_english_chinese_word(request):
    """Create a new translation."""
    if request.method != 'POST':
        form = forms.EnglishChineseManualForm()
    else:
        form = forms.EnglishChineseManualForm()

    context = {'form': form}
    return render(request, 'english-chinese-form.html', context)


def list_english_word_chinese_notebook(request, notebook_id=0):
    """List all English words with Chinese in notebook."""
    if notebook_id == 0:
        raise ValueError("Invalid notebook_id value. Specified notebook doesn't exist.")

    chinese = models.NotebookEnglishChinese.objects.filter(notebook_id=notebook_id).order_by('weight')
    chinese = [obj.chinese for obj in chinese]
    return render(request, 'english-chinese-list.html', {
        'chinese': chinese,
    })


def list_english_word_chinese(request):
    """List all English words with Chinese."""
    chinese = models.EnglishChinese.objects.all()
    return render(request, 'english-chinese-list.html', {
        'chinese': chinese,
    })


def new_english_word_chinese(request):
    """Create a new English word/phase with Chinese."""
    form = forms.EnglishForm()
    formset = forms.EnglishChineseFormSet(prefix='translation', instance=English())
    return render(request, 'english-word-translation.html', {'form': form, 'formset': formset})


def edit_english_word_chinese(request, english_id=0):
    """Edit an English word/phase with Chinese."""
    if english_id == 0:
        raise ValueError("Invalid english_id value. english_id cannot be 0.")

    english = models.English.objects.get(id=english_id)
    form = forms.EnglishForm(instance=english)
    formset = forms.EnglishChineseFormSet(instance=english, prefix='translation')
    return render(request, 'english-word-translation.html', {'form': form, 'formset': formset})
