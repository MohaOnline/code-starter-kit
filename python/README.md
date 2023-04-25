```bash
# 环境
python3.11 -m venv .venv_3.11
. .venv_3.11/bin/activate

## Windows
.\.venv_3.11\Scripts\Activate.ps1

# 安装/升级第三方库
python -m pip install --upgrade -r requirements.txt
## Proxy 后
python -m pip install --upgrade -r requirements.txt --proxy=http://192.168.1.166:7081 --use-pep517
```

```shell



```