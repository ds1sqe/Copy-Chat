FROM node:19-bullseye AS builder

WORKDIR /app/copy_chat_fe

COPY . /app/copy_chat_fe

RUN npm install
RUN npm run build

FROM nginx:1.21.4-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/copy_chat_fe/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
