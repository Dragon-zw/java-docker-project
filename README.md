# Java-docker-project
以 Java 语言为主，利用 Docker 技术实现项目的上传，打包，构建镜像，以及将镜像上传到镜像仓库后进行服务器的部署。

该仓库主要的项目有

- Java Web（Tomcat）
- Spring Boot （Docker）
- Spring Cloud （Docker-Compose）微服务项目

该项目会以 Docker 的方式进行项目的镜像构建，部署到服务器中，所以需要开发人员懂得 Linux 基础，以及相应的 Docker 命令，Dockerfile 的指令等

其次需要使用者会 Java Web，SpringBoot 以及 SpringCloud 微服务。该项目使用的是 Nexus 作为镜像仓库，用于构建镜像时上传的地方，以及服务器利用镜像仓库进行拉取镜像后运行成容器

## 部署Docker | Docker-Compose

```sh
#!/bin/bash
# Shell ENV
DOCKER_VERSION="20.10.7"
CONTAINERD_VERSION="1.4.6"

# step 1: 安装必要的一些系统工具
echo -e "==> 安装必要的系统工具"
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 2: 添加软件源信息
echo -e "==> 添加软件源信息"
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 3
echo -e "==> 修改配置文件"
sudo sed -i 's+download.docker.com+mirrors.aliyun.com/docker-ce+' /etc/yum.repos.d/docker-ce.repo
# Step 4: 更新并安装Docker-CE
echo -e "==> 安装更新Docker"
sudo yum makecache fast
# containerd.io Docker运行时环境
sudo yum -y install docker-ce-${DOCKER_VERSION} docker-ce-cli-${DOCKER_VERSION} containerd.io-${CONTAINERD_VERSION}
# Step 5: 配置加速器以及docker参数
echo -e "==> 配置加速器以及docker参数"
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://po13h3y1.mirror.aliyuncs.com","http://hub-mirror.c.163.com","https://mirror.ccs.tencentyun.com","http://f1361db2.m.daocloud.io"],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF
# Step 6: 加载服务
echo -e "==> 加载服务"
sudo systemctl daemon-reload
sudo systemctl restart docker
sudo systemctl enable docker
# 查看Docker服务信息
echo -e "==> 查看Docker服务信息"
docker info

# Step 7: 安装 Docker-Compose
echo -e "==> 安装 Docker-Compose"
sudo curl -L "http://mirrors.aliyun.com/docker-toolbox/linux/compose/1.21.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# Step 7.1: 将可执行权限应用于二进制文件
echo -e "==> 将可执行权限应用于二进制文件"
sudo chmod +x /usr/local/bin/docker-compose
# Step 7.2: 创建软链接
echo -e "==> 创建软链接"
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
# Step 7.3: 测试是否安装成功
echo -e "==> Docker-Compose 测试是否安装成功"
docker-compose --version
```

## 部署 Nexus 镜像仓库

### 💫Nexus 的简介和搭建

#### Nexus 

Nexus 是一个强大的 Maven 仓库管理器，它极大地简化了自己内部仓库的维护和外部仓库的访问。利用 Nexus 你可以只在一个地方就能够完全控制访问 和部署在你所维护仓库中的每个 Artifact。Nexus 是一套 “开箱即用” 的系统不需要数据库，它使用文件系统加 Lucene 来组织数据。Nexus 使用 ExtJS 来开发界面，利用 Restlet 来提供完整的 REST APIs，通过 m2eclipse 与 Eclipse 集成使用。Nexus 支持 WebDAV 与 LDAP 安全身份认证。

```shell
# 创建持久化目录
$ mkdir -p /opt/docker/nexus
# 开放权限
$ chmod 777 -R /opt/docker

# 启动 nexus 容器
# 5000 数据上传容器内的端口 5001 是进行仓库拉取镜像的端口
$ docker run -d --restart=always \
  -p 10880:8081 -p 5000:5000 -p 5001:5001 \
  --name nexus \
  -v /opt/docker/nexus:/nexus-data \
  sonatype/nexus3
# nexus 第一次启动会比较慢，需要一定时间进行初始化过程
$ docker logs -f -n 200 nexus

# 查看默认密码
$ docker exec -it nexus cat /nexus-data/admin.password
d775567d-c1b5-492b-a481-96f011d80415
```

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683876248776-53da7380-7366-43f0-984a-a04afea11d8f.png)

- 右上角点击"Sign in"进行登录。`用户名:admin/密码:d775567d-c1b5-492b-a481-96f011d80415[需要查看文件得到]`
- 根据向导进行配置即可。

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683876423299-0005e0b1-e35d-4db1-b05e-801fc8009b6e.png)

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683876492878-ee118d2a-d44c-4dba-a314-d72ba2c0c2a4.png)

- maven-pulibc 是一个分组，所有的访问都可以从 maven-pulibc 进行访问
- maven-release 是发布后的 jar 包（即测试通过后的 jar 包）
- maven-snapshots 是测试代码存放的位置
- maven-central 是一个只读的位置，是一个代理，可以将请求发送到配置阿里云镜像仓库

#### 创建存储器

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683876716032-108036e2-86a1-4a5c-a805-6581d26156fd.png)

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683876764256-e0735adc-b2b2-4aa8-be98-ff5d4129d54c.png)

创建 Docker 仓库

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683876817713-5af283a9-e75e-4915-9258-cce70b0af71f.png)

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683876865981-5bd20f2b-08cf-4d89-97be-f65a42e4eec9.png)

- 创建 docker(hosted) 仓库

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683877041504-afe32a93-8273-4f37-b993-b6662c7083a7.png)

- 创建 docker(proxy) 代理仓库[ 配置好代理地址即可创建主机 ]

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683877323795-eb5e8277-5c94-4d15-b854-32351d35c274.png)

- 创建 docker(group) 分组

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683877525531-e461e992-212a-4442-8e39-96bddf4d5617.png)

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683877569445-f6d2c710-0a21-4088-a754-0b00b04f4bad.png)

### 💫 Nexus 的使用

#### 修改Docker 配置文件

```shell
# 在Docker机制中，默认除Docker认证服务以外的其他非https协议直接禁用
# 5000 数据上传容器内的端口 5001 是进行仓库拉取镜像的端口
$ vim /etc/docker/daemon.json
{
  "registry-mirrors": ["https://po13h3y1.mirror.aliyuncs.com","http://hub-mirror.c.163.com","https://mirror.ccs.tencentyun.com","http://f1361db2.m.daocloud.io"],
  "insecure-registries": ["http://10.0.0.30:5000","http://10.0.0.30:5001"],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}

# 重启 Docker 服务
$ systemctl daemon-reload && systemctl restart docker
# 查看 Nexus 容器的状态
$ docker ps
CONTAINER ID   IMAGE             COMMAND                  CREATED          STATUS          PORTS                                                       NAMES
2decf8b528ae   sonatype/nexus3   "sh -c ${SONATYPE_DI…"   41 minutes ago   Up 11 seconds   0.0.0.0:5000-5001->5000-5001/tcp, 0.0.0.0:10880->8081/tcp   nexus
# 查看容器的日志
$ docker logs nexus

# 使用 Nexus 账号和密码进行登录
$ docker login --username admin --password Admin@h3c 10.0.0.30:5000
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

#### Nexus 完成镜像管理命令

推送镜像

```shell
$ docker pull alpine:latest

# 拉取镜像并推送镜像到Nexus的仓库
$ docker tag alpine:latest 10.0.0.30:5000/alpine:v1.0.0
$ docker push 10.0.0.30:5000/alpine:v1.0.0
The push refers to repository [10.0.0.30:5000/alpine]
8d3ac3489996: Pushed
v1.0.0: digest: sha256:e7d88de73db3d3fd9b2d63aa7f447a10fd0220b7cbf39803c803f2af9ba256b3 size: 528
```

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683878929404-461cc951-4d3c-4f57-a6b8-56ac38ffb9e1.png)

![img](https://cdn.nlark.com/yuque/0/2023/png/2555283/1683878965678-872a0dfb-0234-4a56-ac17-7d228dac01b9.png)

拉取镜像

```shell
$ docker pull 10.0.0.30:5000/alpine:v1.0.0
v1.0.0: Pulling from alpine
Digest: sha256:e7d88de73db3d3fd9b2d63aa7f447a10fd0220b7cbf39803c803f2af9ba256b3
Status: Downloaded newer image for 10.0.0.30:5000/alpine:v1.0.0
10.0.0.30:5000/alpine:v1.0.0

$ docker login --username admin --password Admin@h3c 10.0.0.30:5001
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
$ docker pull 10.0.0.30:5001/alpine:v1.0.0
v1.0.0: Pulling from alpine
Digest: sha256:e7d88de73db3d3fd9b2d63aa7f447a10fd0220b7cbf39803c803f2af9ba256b3
Status: Downloaded newer image for 10.0.0.30:5000/alpine:v1.0.0
10.0.0.30:5001/alpine:v1.0.0
```

>  注意：
>
> Nexus 中的 5000 是代表`docker-snapshots`的仓库，现在下载的镜像刚好是`docker-snapshots`的仓库的镜像，故可以正常下载；
>
> 但是如果下载的镜像不在`docker-snapshots`的仓库中，是真正的 Nginx / Tomcat 的镜像，那么就无法在`docker-snapshots`的仓库中进行下载，就需要在`docker-central`的仓库中下载，`docker-central`的仓库并没有配置访问路径，只配置了`docker-public`分组，`docker-public`是配置`5001`端口。
>
> 所以要实现找到本地仓库镜像就下载，找不到就去远程DockerHub等进行下载，就需要登录到 5001 的下载。

> Nexus 将上传和下载分成了两个不同的端口，上传镜像就使用 5000 端口，为了方便下载则使用 5001 端口

> 学技术不能钻牛角尖，要有能够更好的深度和广度的学习技术的方式。找到适合自己获取的技术的能力。祝各位同学能够更好的成就自己

