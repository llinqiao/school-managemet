cd `dirname  $0`
rsync  -vzrt --progress   ../dist/index.html  root@47.99.208.28:/data/wwwroot/xgj-teacher
rsync  -vzrt --progress   ../dist/static  root@47.99.208.28:/data/wwwroot/xgj-teacher