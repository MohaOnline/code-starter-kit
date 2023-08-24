# Python 项目说明

## 环境准备

```bash
# 虚拟环境创建在 ./python 目录下，Django 等 Python 应用共享使用
python3.11 -m venv .venv_3.11
. .venv_3.11/bin/activate

## Windows
.\.venv_3.11\Scripts\Activate.ps1

# 安装/升级第三方库
python -m pip install --upgrade -r requirements.txt
python -m pip install --upgrade -r requirements.txt -i https://pypi.douban.com/simple # 使用豆瓣镜像
## Proxy 后
python -m pip install --upgrade -r requirements.txt --proxy=http://192.168.1.166:7081 --use-pep517

# 确认某包版本
python -m pip show django
python -m pip list    # 确认当前环境安装的包
python -m pip freeze  # 确认当前环境安装的包
```

```shell



```