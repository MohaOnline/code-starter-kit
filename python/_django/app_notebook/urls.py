"""Defines URL patterns for learning_logs."""

from django.urls import path

from . import views

# URI:
# All notebooks:
#       /notebooks                      # 这个 Path 定义在 __d/urls.py 中
#       /notebooks/user/1xx
# One notebook:
#       /notebooks/uid
#       /notebooks/user/uid/notebook_id
# Certain record:
#       /notebooks/record/record_id
app_name = 'app_notebook'
urlpatterns = [
    # Certain user's Notebooks.
    path('', views.notebooks, name='notebooks'),                            # app_notebook:notebooks
    path('user/<int:user_id>', views.notebooks, name='user_notebooks'),     # app_notebook:user_notebooks

    # Records of certain Notebook.
    path('<int:notebook_id>', views.notebook, name='notebook'),             # app_notebook:notebook
    path('user/<int:user_id>/<int:notebook_id>', views.notebook, name='user_notebook'),  # app_notebook:user_notebook

    # Details of certain Record.
    path('record/<int:record_id>', views.record, name='record'),

    # Create a new English word translation.
    path('english-chinese-word/new', views.new_english_chinese_word, name="new_english_chinese_word"),
]
