# SpringCloud (Docker-Compose)微服务项目

> 使用项目地址：
>
> 链接：https://pan.baidu.com/s/1nYxMvR9or496BqSh219DCg 
>
> 提取码：yyds

项目结构图：

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683989038073-2b44053d-7193-40c0-8ac5-04742f9b2567.png)

## 部署流程

### 容器编排

docker-compose | docker-swarm

### Dockerfile编写

针对每一个服务都需要编写自定义的 Dockerfile，需要对所有服务的 Dockerfile 文件进行一个统一的管理。

### 网络问题

自定义网络，或者利用 links 属性，将两个容器连接起来，以上两种方案都可以实现基于容器名称的访问

### 日志收集问题

ELK：利用 `Lagstash` 或 `FileBeat` 进行数据收集，将数据存入 ES，通过 `Kibana` 进行统一的数据可视化展示

### 监控问题

应用/容器监控，健康状况、资源使用情况都需要进行监控，基于普罗米修斯实现各个类型的监控

### Cloud Toolkit 最佳实践

#### 项目代码列表

由于是微服务的架构，整体项目结构相对来说是更加复杂的；不可能像之前的单体项目一样，在每一个需要部署的项目里面，比如在 pom.xml 进行添加镜像构建的插件，然后在一边打包一边构建镜像。间接了`RuoYi若依`的开源项目。在真正公司开发的时候，更多的讲究效率，能够有现成的脚手架是很不错的选择。

#### Docker 构建项目结构规划解析

- 将项目的内容和 Docker 相关的 Dockerfile、Docker-Compose 配置文件进行分离。
- docker-compose.yml 是所有容器的一个应用编排管理
- 主要部署的基础设施：mysql（数据库）、nacos（注册中心 | 配置中心）、redis（缓存数据库）

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683989769026-d12ff665-c028-4c79-8f5b-2bea11844bd9.png)

范例：`website.conf.nginx.conf` 中的 `nginx.conf` 的文件内容解析

```shell
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        # 配置首页的访问路径
		location / {
            root   /home/trip/projects/trip-ui;
#			try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }

        # 配置接口的反向代理
		location /prod-api/{
			proxy_set_header Host $http_host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header REMOTE-HOST $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			# 所有的接口请求都是需要通过网关的
			# 所有前端发起请求以后还是请求在nginx上面，nginx基于一个请求路径的一个标识进行反向代理
			proxy_pass http://trip-gateway:9000/;
			# website 是依赖于 gateway 网关
		}

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

注意：

项目中的配置内容不是固定写法，而是需要结合实际的开发测试生产环境中的需求进行调整

范例：`docker-compose.yml` 内容的解析

```yaml
version: '2.4'
services:
  trip-nacos: # Nacos 的部署
    container_name: trip-nacos # 配置容器名称，方便通过名称来进行网络通信
    image: nacos/nacos-server  # 使用的镜像
    build:
      context: ./nacos  # 使用 Dockerfile 的上下文环境
    environment:
      - MODE=standalone # 配置容器的环境变量
    volumes: # 数据卷配置
      - ./nacos/logs/:/home/nacos/logs
      - ./nacos/conf/application.properties:/home/nacos/conf/application.properties
    ports:   # 暴露的端口(包括健康检测的端口)
      - "8848:8848"
      - "9848:9848"
      - "9849:9849"
    depends_on: # 依赖的服务
      - trip-mysql

  trip-mysql: # MySQL 的部署
    container_name: trip-mysql # 配置容器名称，方便通过名称来进行网络通信
    image: mysql:5.7           # 使用的镜像
    build:
      context: ./mysql # 使用 Dockerfile 的上下文环境
    ports:   # 暴露的端口
      - "3306:3306"
    volumes: # 数据卷配置
      - ./mysql/conf:/etc/mysql/conf.d
      - ./mysql/logs:/logs
      - ./mysql/data:/var/lib/mysql
    command: [ # 容器启动运行的命令
      'mysqld',
      '--innodb-buffer-pool-size=80M',
      '--character-set-server=utf8mb4',
      '--collation-server=utf8mb4_unicode_ci',
      '--default-time-zone=+8:00',
      '--lower-case-table-names=1'
    ]
    environment: # 配置容器的环境变量
      MYSQL_DATABASE: 'trip-cloud'
      MYSQL_ROOT_PASSWORD: 'admin'

  trip-redis:    # Redis 的部署
    container_name: trip-redis # 配置容器名称，方便通过名称来进行网络通信
    image: redis               # 使用的镜像
    build:
      context: ./redis # 使用 Dockerfile 的上下文环境
    ports:   # 暴露的端口
      - "6379:6379"
    volumes: # 数据卷配置
      - ./redis/conf/redis.conf:/home/trip/redis/redis.conf
      - ./redis/data:/data
    command: redis-server /home/trip/redis/redis.conf # 容器启动运行的命令

  trip-website: # Nginx 的部署
    container_name: trip-website # 配置容器名称，方便通过名称来进行网络通信
    image: nginx                 # 使用的镜像
    build:
      context: ./website # 使用 Dockerfile 的上下文环境
    ports:   # 暴露的端口
      - "80:80"
    volumes: # 数据卷配置
      - ./website/html/dist:/home/trip/projects/trip-ui
      - ./website/conf/nginx.conf:/etc/nginx/nginx.conf
      - ./website/logs:/var/log/nginx
      - ./website/conf.d:/etc/nginx/conf.d
    depends_on: # 依赖的服务
      - trip-gateway
    links:      # links 关联的服务，可以使用容器的主机名进行通信
      - trip-gateway

  trip-gateway: # 网关服务
    container_name: trip-gateway # 配置容器名称，方便通过名称来进行网络通信
    build: # 使用 Dockerfile 的上下文环境
      context: ./trip/gateway
      dockerfile: dockerfile
    ports: # 暴露的端口
      - "9000:9000"
    depends_on: # 依赖的服务
      - trip-redis
    links: # links 关联的服务，可以使用容器的主机名进行通信
      - trip-redis

  trip-user: # 用户服务
    container_name: trip-user # 配置容器名称，方便通过名称来进行网络通信
    build: # 使用 Dockerfile 的上下文环境
      context: ./trip/user
      dockerfile: dockerfile
    ports: # 暴露的端口
      - "9200:9200"
    depends_on: # 依赖的服务
      - trip-redis
      - trip-mysql
    links: # links 关联的服务，可以使用容器的主机名进行通信
      - trip-redis
      - trip-mysql

  trip-article: # 文章服务
    container_name: trip-article # 配置容器名称，方便通过名称来进行网络通信
    build: # 使用 Dockerfile 的上下文环境
      context: ./trip/article
      dockerfile: dockerfile
    ports: # 暴露的端口
      - "8060:8060"
    depends_on: # 依赖的服务
      - trip-redis
      - trip-mysql
      - trip-user
    links: # links 关联的服务，可以使用容器的主机名进行通信
      - trip-redis
      - trip-mysql
      - trip-user
```

`--link` 和 Docker-Compose 中的 `links` 的参数会在后期被 Docker 遗弃。

官方文档：https://docs.docker.com/compose/compose-file/compose-file-v3/#links

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1684035435864-0c293397-6f53-45a7-98d3-d2fa89358ffb.png)

## 部署微服务多模块

需要将整个项目的配置文件和资料要准备好

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1684035878557-c3ab6b9c-dde6-4153-9089-3080c82fc2b8.png)

微服务项目的部署流程：

- SpringBoot 的项目需要添加依赖

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1684040597587-1604a3fc-b421-4676-b7d6-4a709560ae8f.png)

- 使用 `Alibaba Cloud Toolkit` 插件上传项目代码

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1684041243272-b20de870-dce0-4f28-b694-bac704b163d0.png)

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1684041332930-9860e8f0-f2fd-496d-8455-861e3112a66c.png)

- 运行 `deploy.sh` 脚本信息

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1684041657695-ab1ff8df-2ecd-4b70-98ef-e0eae9f62bcd.png)

```shell
# 部署基础设施服务
$ sh deploy.sh base
$ docker-compose ps 
   Name                 Command               State                                                              Ports                                                            
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
trip-mysql   docker-entrypoint.sh mysql ...   Up      0.0.0.0:3306->3306/tcp,:::3306->3306/tcp, 33060/tcp                                                                         
trip-nacos   bin/docker-startup.sh            Up      0.0.0.0:8848->8848/tcp,:::8848->8848/tcp, 0.0.0.0:9848->9848/tcp,:::9848->9848/tcp, 0.0.0.0:9849->9849/tcp,:::9849->9849/tcp
trip-redis   docker-entrypoint.sh redis ...   Up      0.0.0.0:6379->6379/tcp,:::6379->6379/tcp

# 需要前提解压website中的html.zip的压缩包
$ unzip html.zip

# 部署启动应用程序模块
$ sh deploy.sh services
$ docker-compose ps 
    Name                  Command               State                                                              Ports                                                            
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
trip-article   java -jar trip-article.jar       Up      0.0.0.0:8060->8060/tcp,:::8060->8060/tcp                                                                                    
trip-gateway   java -jar trip-gateway.jar       Up      0.0.0.0:9000->9000/tcp,:::9000->9000/tcp                                                                                    
trip-mysql     docker-entrypoint.sh mysql ...   Up      0.0.0.0:3306->3306/tcp,:::3306->3306/tcp, 33060/tcp                                                                         
trip-nacos     bin/docker-startup.sh            Up      0.0.0.0:8848->8848/tcp,:::8848->8848/tcp, 0.0.0.0:9848->9848/tcp,:::9848->9848/tcp, 0.0.0.0:9849->9849/tcp,:::9849->9849/tcp
trip-redis     docker-entrypoint.sh redis ...   Up      0.0.0.0:6379->6379/tcp,:::6379->6379/tcp                                                                                    
trip-user      java -jar trip-user.jar          Up      0.0.0.0:9200->9200/tcp,:::9200->9200/tcp                                                                                    
trip-website   /docker-entrypoint.sh ngin ...   Up      0.0.0.0:80->80/tcp,:::80->80/tcp
```

通过浏览器访问`服务器IP地址`，就可以查看到相应的微服务项目

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1684042468203-fe18be21-d040-4983-ae35-3a8d3566982b.png)

## 查看远程日志

```shell
docker-compose logs [服务名]
docker-compose logs -f [服务名]
```