FROM node:10.15.3-alpine
# 根正式 可以访问https
RUN apk --no-cache add ca-certificates curl
# fix /etc/hosts 失效
RUN echo "hosts: files dns" > /etc/nsswitch.conf

WORKDIR /srv/

RUN npm --registry=https://registry.npm.taobao.org install axios@0.18 egg@2.6 egg-scripts@2.11 kue@0.11 moment@2.24 fast-xml-parser@3

VOLUME /var/log

COPY *.js /srv/
COPY app /srv/app/
COPY bin /srv/bin/
COPY config /srv/config/
COPY model /srv/model/
COPY worker /srv/worker/

COPY k8s/package.json /srv/

EXPOSE 8000
