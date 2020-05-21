#/bin/sh

VERSION=0.0.0
[ -n "$1" ] && VERSION=$1

npm run tsc

sed -i "" "s/1.0.0/${VERSION}/" k8s/package.json

docker build -f k8s/Dockerfile -t hub.mlamp.cn/tuice/wb-msg:${VERSION} .

git checkout k8s/package.json

docker push hub.mlamp.cn/tuice/wb-msg:${VERSION}
