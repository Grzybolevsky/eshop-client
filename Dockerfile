FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY ./build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
