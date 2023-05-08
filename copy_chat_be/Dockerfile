FROM python:3.10.11-bullseye

COPY . /app/copy_chat_be

WORKDIR /app/copy_chat_be

RUN pip install -r requirement.txt

EXPOSE 8000

CMD ["uvicorn","--host","0.0.0.0","--log-level","trace","root.asgi:application"]
