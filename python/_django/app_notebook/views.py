from django.contrib.auth import get_user
from django.shortcuts import render
from .models import Record, Notebook
from . import forms


def notebooks(request):
    """View of all notebooks for certain user."""
    return render(request, 'notebooks.html')    # templates/index.html


def notebook(request, user_id, notebook_id):
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
        form = forms.EnglishChineseForm()
    else:
        form = forms.EnglishChineseForm()

    context = {'form': form}
    return render(request, 'english-chinese-form.html', context)
