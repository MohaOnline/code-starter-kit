from django.shortcuts import render
from .models import Record


def notebooks(request):
    """View of all notebooks for certain user."""
    return render(request, 'notebooks.html')    # templates/index.html


def notebook(request, user_id, notebook_id):
    """Contents(Records) of certain notebook."""
    records = Record.objects.order_by('-created')
    return render(request, 'notebook.html', {
        'records': records,
    })
