from django.contrib.auth import get_user
from django.shortcuts import render
from django.db.models import Q
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
    """List all English words with Chinese of a notebook."""
    if notebook_id == 0:
        raise ValueError("Invalid notebook_id value. Specified notebook doesn't exist.")

    chinese = models.NotebookEnglishChinese.objects.filter(notebook_id=notebook_id).order_by('-status', 'weight')
    # chinese = [obj.chinese for obj in chinese]
    # queue = []
    # for obj in chinese:
    #     obj.chinese.status = obj.status
    #     queue.append(obj.chinese)

    return render(request, 'english-chinese-notebook.html', {
        'chinese': chinese,
        'Status': models.Status
    })


def list_english_word_chinese(request):
    """List all English words with Chinese."""
    chinese = models.EnglishChinese.objects.all().order_by('english__word')
    return render(request, 'english-chinese-list.html', {
        'chinese': chinese,
    })


def new_english_word_chinese(request):
    """Create a new English word/phase with Chinese."""
    error = []
    if request.method != 'POST':
        form = forms.EnglishForm()
        formset = forms.EnglishChineseFormSet(prefix='translation', instance=English())
    else:
        form = forms.EnglishForm(request.POST)
        formset = forms.EnglishChineseFormSet(request.POST, instance=form)
        if form.is_valid():
            word = form.cleaned_data['word']
            if models.English.objects.filter(word=word).exists():
                error.append("Same word already exists.")

    return render(request, 'english-word-translation.html', {'form': form, 'formset': formset, 'error': error})


def edit_english_word_chinese(request, english_id=0):
    """Edit an English word/phase with Chinese."""
    if english_id == 0:
        raise ValueError("Invalid english_id value. english_id cannot be 0.")

    english = models.English.objects.get(id=english_id)

    if request.method != 'POST':
        form = forms.EnglishForm(instance=english)
        formset = forms.EnglishChineseFormSet(instance=english, prefix='translation')
    else:
        form = forms.EnglishForm(instance=english, data=request.POST)
        if form.is_valid():
            form.save()

        formset = forms.EnglishChineseFormSet(data=request.POST, instance=english, prefix='translation')
        if formset.is_valid():
            formset.save()

    # TODO 初始化 weight
    for f in formset.forms:
        pass

    return render(request, 'english-word-translation.html', {'form': form, 'formset': formset})
