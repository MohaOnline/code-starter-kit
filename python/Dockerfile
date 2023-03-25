# image: ma3310/web-starter-kit:dev-python
# Build CMD: docker buildx build -t ma3310/web-starter-kit:dev-python .

FROM ma3310/ubuntu:22.04-python

# Display the Python output through the terminal
ENV PYTHONUNBUFFERED: 1

# Set work directory
# WORKDIR /usr/src/app
WORKDIR /root

## Copy requirements
COPY requirements.txt ./requirements.txt

# Add Python dependencies
### RUN python3.11 -m venv .venv_11 && . .venv_3.11/bin/activate

## Install requirements
RUN python3.11 -m pip install -r requirements.txt
RUN python3.12 -m pip install -r requirements.txt

