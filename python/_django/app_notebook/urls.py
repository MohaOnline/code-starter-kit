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
    path('', views.notebooks, name='notebooks'),  # app_notebook:notebooks
    path('user/<int:user_id>', views.notebooks, name='user_notebooks'),  # app_notebook:user_notebooks

    # Records of certain Notebook.
    path('<int:notebook_id>', views.notebook, name='notebook'),  # app_notebook:notebook
    # app_notebook:user_notebook
    path('user/<int:user_id>/<int:notebook_id>', views.notebook_user, name='user_notebook'),

    # Details of certain Record.
    path('record/<int:record_id>', views.record, name='record'),

    # Create a new English word translation.
    path('english-chinese-word/new', views.new_english_chinese_word, name="english_chinese_word_new"),

    # English words with Chinese translation - List.
    path('english-word-chinese/all', views.list_english_word_chinese, name="english_word_chinese_list"),
    # English words with Chinese translation - Create. Base on formset.
    path('english-word-chinese/new', views.new_english_word_chinese, name="english_word_chinese_new"),
    # English words with Chinese translation - Edit.
    path('english-word-chinese/edit/<int:english_id>',
         views.edit_english_word_chinese, name="english_word_chinese_edit"),

    # English words with Chinese translation - notebook.
    path('english-word-chinese/<int:notebook_id>', views.list_english_word_chinese_notebook,
         name="english_word_chinese_notebook"),
    # TODO 列出所有当前用户的单词本
    path('english-word-chinese/', views.list_english_word_chinese_notebook,
         name="english_word_chinese_notebook"),
]
