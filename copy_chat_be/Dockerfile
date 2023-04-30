FROM python:3.10.11-bullseye


RUN adduser --disabled-login copy_chat_be

USER copy_chat_be

WORKDIR /home/copy_chat/app/copy_chat_be

COPY . /home/copy_chat/app/copy_chat_be

RUN pip install -r requirement.txt

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "4", "copy_chat_be.wsgi:application"]
