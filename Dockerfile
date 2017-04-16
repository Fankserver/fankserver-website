FROM nginx:stable-alpine

COPY dist/ /usr/share/nginx/html/

RUN apk add --no-cache curl
