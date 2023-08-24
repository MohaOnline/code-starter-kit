# _django 说明

## 项目由来

```shell
# 初始化根项目
django-admin startproject __d .

# 初始化 django 数据表，在 _django 下运行，初始状态生成 SQLite 数据库。
python manage.py migrate 

# 需要在命令行下运行，创建管理员
python manage.py createsuperuser

# Control + Shift + Click URL to JavaScript in pycharm after lunching application.
python manage.py runserver

# 
python manage.py startapp __common
python manage.py startapp app_notebook

# 生成 password 应用
python manage.py startapp app_password

# 为当前 app 生成 DB 迁移文件，用于服务器 DB 结构更新
python manage.py makemigrations app_notebook
python manage.py migrate app_notebook

python manage.py migrate --help
python manage.py migrate --fake app_notebook zero
python manage.py migrate --fake-initial app_notebook

# 联机调试 Django API, 读取 App Model 之类，参考下面的 Python 代码：
# Tune Django API on the fly.
python manage.py shell
```

```python
# 获取密码的 Hash
from django.contrib.auth.hashers import make_password

make_password('password')
```

```python
# 修整收录 NotebookEnglishChinese 的 weight
from app_notebook import forms, models

chinese = models.NotebookEnglishChinese.objects.filter(notebook_id=1).order_by('weight')
i = 0
for obj in chinese:
    obj.weight = i
    i += 1
    obj.save()

```

```python
from app_notebook.models import Record

for o in Record.objects.all():
    print(o.id, o.title)
```

```python
# Fetch all users and their uid.
from django.contrib.auth.models import User

for u in User.objects.all():
    print(u.username, u.id)

```

```mysql
# Migrate old data.
INSERT INTO app_notebook_english(id, word, syllable, accent, phonetic_uk, phonetic_us, typescript, created, updated)
SELECT id,
       word,
       word_syllable,
       word_accent,
       word_phonetic,
       word_phonetic_america,
       `word_pronounce_script`,
       now(),
       now()
FROM english_words;

INSERT INTO app_notebook_english_chinese(english_id, weight, part_of_speech, translation, typescript, created, updated)
SELECT word_id, weight, part_of_speech, translation, typescript, now(), now()
FROM english_words_chinese
WHERE english_words_chinese.`word_id` in (select id from `app_notebook_english`);

INSERT INTO app_notebook_book(id, name, weight, publishing_house, published_date, created, updated)
select id, name, weight, publishing_house, published_date, now(), now()
from english_words_sources;

INSERT INTO app_notebook_english_chinese_books(chinese_id, book_id, page)
SELECT id, source_id, source_number
FROM english_words_chinese
WHERE source_id IS NOT NULL;

# 为重新生成数据库迁移记录准备
DELETE
FROM `django_migrations`
WHERE app = 'app_notebook';
```