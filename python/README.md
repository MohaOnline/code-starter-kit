```bash
# 环境
python3.11 -m venv .venv_3.11
. .venv_3.11/bin/activate
## Windows
.\.venv_3.11\Scripts\Activate.ps1

# 安装/升级第三方库
python -m pip install --upgrade -r requirements.txt
## Windows
python -m pip install --upgrade -r requirements.txt --proxy=http://192.168.1.166:7081
```

```shell

cd _django
django-admin startproject __d .
python manage.py migrate # 初始化 django 数据表，在 _django 下运行，初始状态生成 SQLite 数据库。

# Control + Shift + Click URL to JavaScript in pycharm after lunching application.
python manage.py runserver

```