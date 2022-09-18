FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY build/ .
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]
