# Java Web (Docker) 项目

## Alibaba Cloud Toolkit

Alibaba Cloud Toolkit（后文简称Cloud Toolkit）可以帮助开发者更高效地部署、测试、开发和诊断应用。Cloud Toolkit与主流IDE及阿里云其他产品无缝集成，帮助您大大简化应用部署到服务器，尤其是阿里云服务器中的操作。您还可以通过其内嵌的Arthas程序诊断、Terminal Shell终端和MySQL执行器等工具，简化应用开发、测试和诊断的过程。

官方站点：[什么是Alibaba Cloud Toolkit](https://help.aliyun.com/document_detail/29968.html)

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683981897867-d5cdf860-5a3f-4405-9f79-1e7ce9e2a3ff.png)

**产品功能**

- 部署应用

- - 部署应用到ECS：完成编码后，利用Cloud Toolkit快速将应用部署至ECS指定目录。
  - 部署应用到EDAS：将本地代码和云端应用进行关联后，可以实现自动化的部署。
  - 部署应用到Kubernetes：将本地代码和云端容器进行关联后，可以实现自动化的镜像上传和部署。
  - 部署应用到远程服务器：支持SSH标准协议，可以将应用部署到任意机器。

- 内置终端Terminal：在本地IDE内，开发者可以直接通过内置的终端Terminal，快速登录所有支持标准SSH协议的机器。
- 文件上传：在本地IDE内，开发者可以一键将本地文件或者远程URL上传到服务器指定目录。
- SLS日志查看：在本地IDE内，开发者可以查看/分析阿里云的SLS日志。
- 内置数据库SQL Console：在本地IDE内，开发者可以浏览阿里云的RDS资源。若已配置用户名和密码，可通过内置的SQL Console连接上RDS实例，并快速执行SQL语句。
- Arthas诊断：在本地IDE中即可使用Arthas来实现远程诊断。
- 创建Dubbo应用：在本地IDE中快速创建Dubbo应用。
- SSH代理功能：可使用Cloud Toolkit支持SSH代理的功能，通过添加代理机、添加部署机器和设置代理等操作，快速打通网络环境。

### 安装CouTookit

打开 IDEA 设置，进入 `plugins` 菜单，在插件市场中搜索 `Alibaba Cloud Toolkit`，找到后下载并重启 IDEA。

- 重启 IDEA 之后进行添加主机

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683982820868-71136b3a-4e50-40d0-9da6-ed50a4209151.png)

添加主机完成

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683983254326-55b21320-3041-44f3-8e66-abad1bb7a564.png)

### 部署 Java Web 项目

- 注意编辑 IDEA 中 `pom.xml` 文件中的对 Nexus 地址的情况

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683985292227-76e027b5-f61f-4ed7-a8a3-f83530f713b5.png)

- 并且在 `pom.xml` 文件中添加内容[ 否则会出现由于 maven-plugin 版本过低导致构建镜像失败 ]

```properties
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.2.2</version>
        </plugin>
    <plugins>
<build>
```

- IDEA 中的 "maven" 选项中的 `package`进行对项目打包并进行构建镜像 

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683985189177-1a7b5c63-8ca8-4498-b3d7-683f2875f7a5.png)

- 可以查看到本地镜像的情况

```shell
$ docker images 
REPOSITORY                                       TAG            IMAGE ID       CREATED         SIZE
10.0.0.51:5000/wolfcode/javaweb-docker-demo      1.0-SNAPSHOT   227fdd3bad4e   6 minutes ago   680MB
10.0.0.51:5000/wolfcode/springboot-docker-demo   1.0.0          5f1e4cf8edca   2 hours ago     241MB
eclipse-temurin                                  8-jre          50d0169500d4   9 days ago      221MB
tomcat                                           9.0            b8e65a4d736d   16 months ago   680MB

# 查看镜像的历史记录
$ docker history 10.0.0.51:5000/wolfcode/javaweb-docker-demo:1.0-SNAPSHOT
IMAGE          CREATED         CREATED BY                                      SIZE      COMMENT
227fdd3bad4e   8 minutes ago   /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "bin/…   0B
950d2ee47fb8   8 minutes ago   /bin/sh -c #(nop) WORKDIR /usr/local/tomcat/    0B
ad356019409c   8 minutes ago   /bin/sh -c #(nop) COPY file:a62016ebf68d72cb…   4.08kB
04890adc5c7f   8 minutes ago   /bin/sh -c #(nop)  ARG JAR_FILE                 0B
61fc3683f82e   8 minutes ago   /bin/sh -c #(nop) WORKDIR /usr/local/tomcat/…   0B
9715085bc38f   8 minutes ago   /bin/sh -c #(nop)  MAINTAINER xiaoliu<liugan…   0B
b8e65a4d736d   16 months ago   /bin/sh -c #(nop)  CMD ["catalina.sh" "run"]    0B
<missing>      16 months ago   /bin/sh -c #(nop)  EXPOSE 8080                  0B
<missing>      16 months ago   /bin/sh -c set -eux;  nativeLines="$(catalin…   0B
<missing>      16 months ago   /bin/sh -c set -eux;   savedAptMark="$(apt-m…   20.2MB
<missing>      16 months ago   /bin/sh -c #(nop)  ENV TOMCAT_SHA512=b4c2c85…   0B
<missing>      16 months ago   /bin/sh -c #(nop)  ENV TOMCAT_VERSION=9.0.56    0B
<missing>      16 months ago   /bin/sh -c #(nop)  ENV TOMCAT_MAJOR=9           0B
<missing>      16 months ago   /bin/sh -c #(nop)  ENV GPG_KEYS=48F8E69F6390…   0B
<missing>      16 months ago   /bin/sh -c #(nop)  ENV LD_LIBRARY_PATH=/usr/…   0B
<missing>      16 months ago   /bin/sh -c #(nop)  ENV TOMCAT_NATIVE_LIBDIR=…   0B
<missing>      16 months ago   /bin/sh -c #(nop) WORKDIR /usr/local/tomcat     0B
<missing>      16 months ago   /bin/sh -c mkdir -p "$CATALINA_HOME"            0B
<missing>      16 months ago   /bin/sh -c #(nop)  ENV PATH=/usr/local/tomca…   0B
<missing>      16 months ago   /bin/sh -c #(nop)  ENV CATALINA_HOME=/usr/lo…   0B
<missing>      16 months ago   /bin/sh -c #(nop)  CMD ["jshell"]               0B
<missing>      16 months ago   /bin/sh -c set -eux;   arch="$(dpkg --print-…   343MB
<missing>      16 months ago   /bin/sh -c #(nop)  ENV JAVA_VERSION=11.0.13     0B
<missing>      16 months ago   /bin/sh -c #(nop)  ENV LANG=C.UTF-8             0B
<missing>      16 months ago   /bin/sh -c #(nop)  ENV PATH=/usr/local/openj…   0B
<missing>      16 months ago   /bin/sh -c { echo '#/bin/sh'; echo 'echo "$J…   27B
<missing>      16 months ago   /bin/sh -c #(nop)  ENV JAVA_HOME=/usr/local/…   0B
<missing>      16 months ago   /bin/sh -c set -eux;  apt-get update;  apt-g…   11.3MB
<missing>      16 months ago   /bin/sh -c apt-get update && apt-get install…   152MB
<missing>      16 months ago   /bin/sh -c set -ex;  if ! command -v gpg > /…   18.9MB
<missing>      16 months ago   /bin/sh -c set -eux;  apt-get update;  apt-g…   10.7MB
<missing>      16 months ago   /bin/sh -c #(nop)  CMD ["bash"]                 0B
<missing>      16 months ago   /bin/sh -c #(nop) ADD file:c03517c5ddbed4053…   124MB
```

- IDEA 中的 maven 插件中拥有 "`dockerfile`" 插件并且其中有"`dockerfile:push`" 的操作，执行之后就会推送到远程仓库中(使用的是 Nexus 镜像仓库)

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683985785314-6f2232e5-aab3-49f0-8089-3ea39511e568.png)

- 登录到 Nexus 镜像仓库，查看到推送镜像的情况

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683985836289-640baf79-9fe6-4c8f-88f4-604879e59ba7.png)

- 将`docker-deploy.sh`脚本文件上传到服务器中

```shell
$ mkdir -p /opt/javaweb-docker-demo
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
  APP_NAME="javaweb-docker-demo"
fi

## 暴露的端口
EXPOSE_PORT=8808
## 项目/组织
NAMESPACE=wolfcode
## 版本号
TAG=1.0-SNAPSHOT

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

- 执行脚本

```shell
$ chmod +x docker-deploy.sh
$ docker-deploy.sh up

# 查看镜像的情况
$ docker images 10.0.0.51:5000/wolfcode/javaweb-docker-demo:1.0-SNAPSHOT 
REPOSITORY                                    TAG            IMAGE ID       CREATED          SIZE
10.0.0.51:5000/wolfcode/javaweb-docker-demo   1.0-SNAPSHOT   227fdd3bad4e   18 minutes ago   680MB

# 查看运行容器的情况
$ docker ps -l 
CONTAINER ID   IMAGE                                                      COMMAND                  CREATED          STATUS          PORTS                                       NAMES
7ab9e672f40c   10.0.0.51:5000/wolfcode/javaweb-docker-demo:1.0-SNAPSHOT   "/bin/sh -c 'bin/cat…"   45 seconds ago   Up 44 seconds   0.0.0.0:8808->8080/tcp, :::8808->8080/tcp   javaweb-docker-demo
```

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683986227745-29288509-ee9a-4e8a-8a06-908cbad79a86.png)

- 访问页面

```shell
$ curl 10.0.0.51:8808
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Java Web 项目 Docker 容器化部署</title>
</head>
<body>
<h1>Java Web: Hello Docker!!!</h1>
</body>
</html>

$ curl 10.0.0.51:8808/hello
Java Web: Hello Docker!!!
```

- IDEA 修改脚本文件中暴露的端口

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683986480156-19cfc665-37b2-4eae-855f-501592e43488.png)

- 利用`Alibaba Cloud Tookit`的插件将脚本文件进行上传到服务器中，并重新进行`package`打包构建镜像

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683986639078-1b9b2435-1762-4c9c-8790-22877093f5b7.png)

- 利用`Alibaba Cloud Tookit`的插件远程登录到远程服务器中，就可以执行脚本进行运行

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683986732754-d7cbd7e2-d8a8-492f-a4ee-03613082a31d.png)

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683986774820-229e59e0-f885-4671-841a-87c8996f8fda.png)

```shell
# 在服务器中执行脚本docker-deploy.sh
$ bash docker-deploy.sh up

$ curl 10.0.0.51:8808
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Java Web 项目 Docker 容器化部署</title>
</head>
<body>
<h1>Java Web: Hello Docker!!!</h1>
</body>
</html>

$ curl 10.0.0.51:8808/hello
Java Web: Hello Docker!!!
```