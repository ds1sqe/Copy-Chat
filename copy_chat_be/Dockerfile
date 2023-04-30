FROM python:3.10.11-bullseye

COPY . /app/copy_chat_be

WORKDIR /app/copy_chat_be

RUN pip install -r requirement.txt

EXPOSE 8000

CMD ["daphne", "-b", "0.0.0.0","-p","8000", "root.asgi:application"]
