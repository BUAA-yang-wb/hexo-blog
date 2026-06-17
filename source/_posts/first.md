---
title: 第一篇文章记录
tags: [学习杂谈]
---
2026年3月6日，我的第一篇文章诞生了！

昨天在本地基于Hexo和Sea模板大概简单设计了一下整体UI等等；今天在aliyun上租了一个轻量级服务器来线上部署博客网站，整体流程如下：

### 第一步：服务器环境准备
首先在aliyun远程控制台中准备相关环境。在 CentOS 系统（同 Alibaba Cloud Linux），使用 `yum` 命令快速安装了 `nginx` 和 `git`。
为了安全起见，没用 root 进行后续代码管理，而是创建了一个专用账户 `git`，并将本地生成的 SSH 公钥粘贴到了服务器的 `~/.ssh/authorized_keys` 中，成功实现免密登录。

### 第二步：配置 Git 裸仓库与自动部署钩子
我在服务器创建了一个网站真实目录 `mkdir -p /var/www/hexo`（并给 git 用户赋权）。
然后在 git 用户的根目录初始化了一个裸仓库 `git init --bare blog.git`。最核心的是编辑了 `hooks/post-receive` 文件，写下了自动解压脚本：
```bash
#!/bin/bash
git --work-tree=/var/www/hexo --git-dir=/home/git/blog.git checkout -f
```

### 第三步：配置 Nginx 代理与防火墙
修改了 `/etc/nginx/nginx.conf` 配置文件表里的 `server` 块，将监听端口设为 80，并将 `root` 配置项指向了我的网页文件夹 `/var/www/hexo`。
另外，还遇到过报错 `403 Forbidden`，排查后是因为原先本地 SSH 密钥文件路径中有中文。。。解决如下：
- 我在 D 盘纯英文路径下重新生成了 SSH 密钥对，建立了一个名为 `ssh_config` 的配置文件。
- 借用 Node.js 修改了 `package.json` 中的执行脚本命令，利用环境变量完美绕过中文路径：

```json
  "scripts": {
    "deploy:aliyun": "set GIT_SSH_COMMAND=ssh -F D:/Desktop/self-learn/blog/ssh_config&& hexo clean && hexo d -g"
  }
```

现在，只需要在终端运行一行命令，就能在写完文章/修改网站之后一键部署到线上。

