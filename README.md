# rank

爬取感兴趣的 github 项目

```bash
# 启动 mongo 数据库
mkdir data
docker run -d --name mongo -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret -v `pwd`/data:/data/db -p 27017:27017 mongo
```