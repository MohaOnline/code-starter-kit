```shell

django-admin startproject __d .

# 初始化 django 数据表，在 _django 下运行，初始状态生成 SQLite 数据库。
python manage.py migrate 

# 需要在命令行下运行
python manage.py createsuperuser

# Control + Shift + Click URL to JavaScript in pycharm after lunching application.
python manage.py runserver

# 
python manage.py startapp app_notebook

# 为当前 app 生成 DB 迁移文件，用于服务器 DB 结构更新
python manage.py makemigrations app_notebook
python manage.py migrate app_notebook

# 联机调试 Django API。
# Tune Django API on the fly.
python manage.py shell
```

```python
from app_notebook.models import Record

for o in Record.objects.all():
  print(o.id, o.title)

```