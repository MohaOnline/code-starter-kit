"""Defines URL patterns for learning_logs."""

from django.urls import path

from . import views

# URI:
# All notebooks:
#       /notebook/
#       /notebook/user/1xx
# One notebook:
#       /notebook/uid
#       /notebook/user/uid/notebook_id
# Certain record:
#       /notebook/record/record_id
app_name = 'app_notebook'
urlpatterns = [
    # Certain user's Notebooks.
    path('', views.notebooks, name='notebooks'),                            # app_notebook:notebooks
    path('user/<int:user_id>', views.notebooks, name='user_notebooks'),     # app_notebook:user_notebooks

    # Records of certain Notebook.
    path('<int:notebook_id>', views.notebook, name='notebook'),                             # app_notebook:notebook
    path('user/<int:user_id>/<int:notebook_id>', views.notebook, name='user_notebook'),     # app_notebook:user_notebook

    # Details of certain Record.
]
