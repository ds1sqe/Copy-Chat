FROM python:3.10.11-bullseye


RUN adduser --disabled-login copy_chat

USER copy_chat

WORKDIR /home/copy_chat/app/copy_chat_be

COPY . /home/copy_chat/app/copy_chat_be

RUN apt-get update && \
  apt-get -y upgrade && \
  pip install --upgrade pip && \
  pip install -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "4", "copy_chat_be.wsgi:application"]
