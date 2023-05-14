# Spring Boot (Docker) 项目

## Spotify 的 dockerfile-maven-plugin

专门基于 Dockerfile 构建镜像的插件，也是目前市面上用的比较多的镜像构建方式之一。[ 国内使用插件较多，是使用开发人员编写的Dockerfile文件进行构建 ]

```xml
<plugin>
    <groupId>com.spotify</groupId>
    <artifactId>dockerfile-maven-plugin</artifactId>
    <version>1.4.13</version>
    <executions>
        <execution>
            <id>default</id>
            <!-- 自定义构建、推送命令 -->
            <goals>
                <goal>build</goal>
                <goal>push</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <!-- 打包后的完整镜像名：仓库路径/组织/镜像名 -->
        <repository>10.0.0.51:5000/wolfcode/${project.artifactId}</repository>
        <!-- 镜像版本号 -->
        <tag>${project.version}</tag>
        <!-- 读取 settings.xml 文件中的认证信息 -->
        <useMavenSettingsForAuth>true</useMavenSettingsForAuth>
        <buildArgs>
            <!-- jar 所在目录 -->
            <JAR_FILE>target/${project.artifactId}-${project.version}.jar</JAR_FILE>
        </buildArgs>
    </configuration>
</plugin>
```

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683974112116-c8035145-9d10-422d-b952-56ae31a55a5c.png)

- 查看 Maven 的`settings.xml`配置文件中的连接镜像仓库的配置

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683974389443-55843b3b-785e-4b22-8192-1c1701908524.png)

## Dockerfile 配置

```dockerfile
## 基础镜像
## AdoptOpenJDK 停止发布 OpenJDK 二进制，而 Eclipse Temurin 是它的延伸，提供更好的稳定性
FROM eclipse-temurin:8-jre

## 作者
MAINTAINER xiaoliu <liugang@wolfcode.cn>

## 定义参数
ARG JAR_FILE

## 创建并进入工作目录
RUN mkdir -p /wolfcode
WORKDIR /wolfcode

## maven 插件构建时得到 buildArgs 种的值
COPY ${JAR_FILE} app.jar

## 设置 TZ 时区
## 设置 JAVA_OPTS 环境变量，可通过 docker run -e "JAVA_OPTS=" 进行覆盖
ENV TZ=Asia/Shanghai JAVA_OPTS="-Xms256m -Xmx256m"

## 暴露端口
EXPOSE 8080

## 容器启动命令
## CMD 第一个参数之后的命令可以在运行时被替换
CMD java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar app.jar
```

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683973421964-f682416b-7240-4c2e-9e59-06a48db5913e.png)

在 Dockerfile 中 `CMD` 比 `ENTRYPOINT` 的扩展性要高得多，因为 `CMD` 可以被 `docker run` 后面的参数进行替换。可以实现相应的功能。

查看本地开发环境的 Docker Image 镜像

```shell
$ docker images         
REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
eclipse-temurin   8-jre     50d0169500d4   9 days ago      221MB
tomcat            9.0       b8e65a4d736d   16 months ago   680MB
```

## 构建镜像

```shell
# mvn dockerfile:build
```

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683978349445-a9713dd1-accc-441a-8429-84748ba0a2bd.png)

```shell
# 查看构建镜像信息
$ docker images 
REPOSITORY                                       TAG       IMAGE ID       CREATED          SIZE
10.0.0.51:5000/wolfcode/springboot-docker-demo   1.0.0     5f1e4cf8edca   54 seconds ago   241MB
eclipse-temurin                                  8-jre     50d0169500d4   9 days ago       221MB
tomcat                                           9.0       b8e65a4d736d   16 months ago    680MB

$ docker history 10.0.0.51:5000/wolfcode/springboot-docker-demo:1.0.0
IMAGE          CREATED              CREATED BY                                      SIZE      COMMENT
5f1e4cf8edca   About a minute ago   /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "java…   0B
dcfd3534a64c   About a minute ago   /bin/sh -c #(nop)  EXPOSE 8080                  0B
7c36a50ffaf7   About a minute ago   /bin/sh -c #(nop)  ENV TZ=Asia/Shanghai JAVA…   0B
979358c07b4d   About a minute ago   /bin/sh -c #(nop) COPY file:fc0cd155a74929a2…   19.7MB
b4023efffb6d   About a minute ago   /bin/sh -c #(nop) WORKDIR /wolfcode             0B
db9c2416c218   About a minute ago   |1 JAR_FILE=target/springboot-docker-demo-1.…   0B
ad4967b4b961   About a minute ago   /bin/sh -c #(nop)  ARG JAR_FILE                 0B
8f808c67b682   About a minute ago   /bin/sh -c #(nop)  MAINTAINER xiaoliu <liuga…   0B
50d0169500d4   9 days ago           /bin/sh -c echo Verifying install ...     &&…   0B
<missing>      9 days ago           /bin/sh -c set -eux;     ARCH="$(dpkg --prin…   109MB
<missing>      9 days ago           /bin/sh -c #(nop)  ENV JAVA_VERSION=jdk8u372…   0B
<missing>      9 days ago           /bin/sh -c apt-get update     && DEBIAN_FRON…   34.7MB
<missing>      9 days ago           /bin/sh -c #(nop)  ENV LANG=en_US.UTF-8 LANG…   0B
<missing>      9 days ago           /bin/sh -c #(nop)  ENV PATH=/opt/java/openjd…   0B
<missing>      9 days ago           /bin/sh -c #(nop)  ENV JAVA_HOME=/opt/java/o…   0B
<missing>      2 weeks ago          /bin/sh -c #(nop)  CMD ["/bin/bash"]            0B
<missing>      2 weeks ago          /bin/sh -c #(nop) ADD file:2fc6364d149eccc7f…   77.8MB
<missing>      2 weeks ago          /bin/sh -c #(nop)  LABEL org.opencontainers.…   0B
<missing>      2 weeks ago          /bin/sh -c #(nop)  LABEL org.opencontainers.…   0B
<missing>      2 weeks ago          /bin/sh -c #(nop)  ARG LAUNCHPAD_BUILD_ARCH     0B
<missing>      2 weeks ago          /bin/sh -c #(nop)  ARG RELEASE                  0B
```

## 推送镜像到仓库

在 `maven` 的 `settings.xml` 文件的 `servers` 标签中，增加服务认证配置信息

```shell
<server>
  <id>10.0.0.51:5000</id>
  <username>admin</username>
  <password>Admin@h3c</password>
</server>

# mvn dockerfile:push
```

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683974389443-55843b3b-785e-4b22-8192-1c1701908524.png)

- IDEA 中的 maven 插件中拥有 "`dockerfile`" 插件并且其中有"`dockerfile:push`" 的操作，执行之后就会推送到远程仓库中(使用的是 Nexus 镜像仓库)

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683978593568-7d5d7e7b-0021-42f1-a5bf-a70ac8a23c49.png)

- 登录到 Nexus 镜像仓库，查看到推送镜像的情况

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683979169491-443e3f5a-df42-4ae0-ac4c-da5cb63fc725.png)

- 自动化的将镜像运行成容器[ 需要研究脚本的指令的作用 ]

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683980029358-cb51dc76-87f1-46a8-a251-0cb5aa53a362.png)

- 将`docker-deploy.sh`脚本文件上传到服务器中

```shell
$ mkdir -p /opt/springboot-docker-demo
$ vim docker-deploy.sh
# 参考示例：脚本内容
```

示例：脚本内容

```shell
#!/bin/bash

## 第一个参数：up|start|stop|restart|rm
COMMAND=$1
## app 名称
APP_NAME=$2

## 如果没有给 app 名称，默认就叫 app
if [ -z $APP_NAME ]; then
  APP_NAME="springboot-docker-demo"
fi

## 暴露的端口
EXPOSE_PORT=8888
## 项目/组织
NAMESPACE=wolfcode
## 版本号
TAG=1.0.0

## 仓库地址
REGISTRY_SERVER=10.0.0.51:5000

## 用户名
USERNAME=admin
## 密码
PASSWORD=Admin@h3c

## 镜像名称
IMAGE_NAME="$REGISTRY_SERVER/$NAMESPACE/$APP_NAME:$TAG"

## 使用说明，用来提示输入参数
function usage() {
	echo "Usage: sh docker-deploy.sh [up|start|stop|restart|rm]"
	exit 1
}

## 登录仓库
function login() {
  echo "docker login -u $USERNAME --password-stdin $REGISTRY_SERVER"
  echo "$PASSWORD" | docker login -u $USERNAME --password-stdin $REGISTRY_SERVER
}

## 启动容器
function start() {
  # 检查容器是否存在
  CONTAINER_NAME=$(docker ps | grep "$APP_NAME" | awk '{print $NF}')
  # 存在就不启动了
  if [ -n "$CONTAINER_NAME" ]; then
    echo "container $CONTAINER_NAME aready started..."
    exit 1
  fi
  # 镜像如果不存在需要先登录
  IMAGE=$(docker images | grep "$APP_NAME" | awk '{print $3}')
  if [ -z "$IMAGE" ]; then
    login
  fi
  # 容器不存在就启动
  echo "starting container $APP_NAME..."
  docker run -d --restart=always --name $APP_NAME -p $EXPOSE_PORT:8080 $IMAGE_NAME
  echo "container $APP_NAME started..."
}

## 停止容器
function stop() {
  # 检查容器是否存在
  CONTAINER_NAME=$(docker ps | grep "$APP_NAME" | awk '{print $NF}')

  # 不存在就不需要停止
  if [ -z "$CONTAINER_NAME" ]; then
    echo "container $CONTAINER_NAME not running..."
    exit 1
  fi

  # 存在就停止容器
  echo "stoping container $APP_NAME..."
  docker stop $CONTAINER_NAME
  echo "container $APP_NAME stopted..."
}

## 重启容器
function restart() {
  # 先停止
  stop
  # 再启动
  start
}

## 删除容器、镜像
function rm() {
  # 获取容器名称
  CONTAINER_NAME=$(docker ps | grep "$APP_NAME" | awk '{print $NF}')
  if [ -n "$CONTAINER_NAME" ]; then
    # 停止容器
    stop
    # 删除容器
    echo "removing container $APP_NAME..."
    docker rm $CONTAINER_NAME
    echo "container $APP_NAME removed..."
  fi

  # 获取镜像 id
  IMAGE=$(docker images | grep "$APP_NAME" | awk '{print $3}')
  if [ -n "$IMAGE" ]; then
    # 删除镜像
    echo "removing image $IMAGE..."
    docker rmi $IMAGE
    echo "image $IMAGE removed..."
  fi
}

# 重新拉取镜像并启动容器
function up() {
  # 删除旧的镜像与容器
  rm
  # 拉取新的镜像并启动容器
  start
}

# 根据输入参数，选择执行对应方法，不输入则执行使用说明
case "$COMMAND" in
"up")
	up
;;
"start")
	start
;;
"stop")
	stop
;;
"restart")
	restart
;;
"rm")
	rm
;;
*)
	usage
;;
esac
```

## 使用 Docker 部署到服务器

- 执行脚本

```shell
$ chmod +x docker-deploy.sh
$ sh docker-deploy.sh up

# 查看镜像的情况
$ docker images 10.0.0.51:5000/wolfcode/springboot-docker-demo
REPOSITORY                                       TAG       IMAGE ID       CREATED          SIZE
10.0.0.51:5000/wolfcode/springboot-docker-demo   1.0.0     5f1e4cf8edca   43 minutes ago   241MB

# 查看运行容器的情况
$ docker ps -l
CONTAINER ID   IMAGE                                                  COMMAND                  CREATED          STATUS          PORTS                                       NAMES
75a3ed93a06c   10.0.0.51:5000/wolfcode/springboot-docker-demo:1.0.0   "/bin/sh -c 'java ${…"   30 seconds ago   Up 26 seconds   0.0.0.0:8888->8080/tcp, :::8888->8080/tcp   springboot-docker-demo
```

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683980890920-5b1a21f6-ac3b-4e27-88e8-d9d817b4de97.png)

- 访问页面

```shell
$ curl 10.0.0.51:8888
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Spring Boot Docker Demo</title>
</head>
<body>
<h1>Spring Boot in Docker...</h1>
</body>
</html>

$ curl 10.0.0.51:8888/hello
Spring Boot in Docker...
```

- IDEA 新增接口代码，并重新进行`package`打包构建镜像，然后进行镜像的推送到 Nexus 镜像仓库中[ 执行 maven 插件中拥有 "`dockerfile`" 插件并且其中有"`dockerfile:push`" 的操作 ]

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683981043450-95c99a9e-d724-4a92-af5e-7af0dd93dc42.png)

```shell
# 在服务器中执行脚本docker-deploy.sh
$ bash docker-deploy.sh up
$ curl 10.0.0.51:8888/new
New Interface...
```