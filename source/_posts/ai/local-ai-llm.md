---
title: 一键部署Google开源大模型Gemma，性能远超Mistral、LLama2 | 本地大模型部署，ollama助您轻松完成！
shortTitle: AI部署
categories:
  - [ AI ]
  - [ 大模型 ]
tags:
  - 大模型
  - AI
description:
date: 2024-03-18
keywords: 'AI,人工智能,LLM,大模型,gemini,ollama,llama2,llama,llava'
cover: https://img.funning.top/eluosi.png
abbrlink: 112235
---

# 前置条件

> 安装相关软件

- `docker` 下载安装，地址： https://www.docker.com/get-started/

![](https://img.funning.top/docker-download.png)

```text
Docker 是一种开源平台，用于开发、交付和运行应用程序。它利用容器化技术，可以将应用程序及其所有依赖项打包到一个独立的、标准化的单元中，称为容器。
```

- `ollama` 下载安装，地址： https://ollama.com/download

![](https://img.funning.top/ollama-download.png)

```text
ollama 简单理解就是 安装、管理、连接 大模型的门户工具
```

# 如何运行

> 选择性操作

终端执行命令

启动ollama：`ollama serve` （默认情况下下载好就是启动状态的）

安装大模型：gemma:2b版：`ollama run gemma:2b`
(安装过程有点慢，耐心等待。当然也可以安装其他的大模型，地址：https://ollama.com/library)

安装完成其实就可以开始对话了。不过是在命令终端里，界面着实让人着急。
`但是`可以安装可视化管理界面。

> 建议性实践

终端命令行执行

拉取docker镜像：

```shell
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

等待下载完成之后进入docker可以看到一个镜像，点击启动
![](https://img.funning.top/open-webui.png)

启动成功后在浏览器里输入：http://localhost:3000/
然后注册一下账号就能进入主页啦！
![](https://img.funning.top/ui-1.png)

然后在这里可以`安装`大模型。（一切都可在这里操作）
![](https://img.funning.top/ui-3.png)

可以自定义`知识库`，在这里上传就行啦
![](https://img.funning.top/ui-2.png)

最后你就可以`无限次数`的畅想AI啦
![](https://img.funning.top/ui-4.png)

我这里下载的是 llama2 一个7十亿训练的大模型。（各位根据自己的需求以及电脑配置来下载）
提问的时候也可以上传文件。

# 链接地址：

1. Gemma官网：https://ai.google.dev/gemma?hl=zh-cn
2. ollama官网：https://ollama.com/download
3. ollama github：https://github.com/ollama/ollama
4. ChatGPT-ollama-UI：https://github.com/ivanfioravanti/chatbot-ollama
5. OpenAI-translator：https://github.com/openai-translator/openai-translator
6. Docker：https://www.docker.com/products/docker-desktop/
7. open-webui github：https://github.com/open-webui/open-webui

# 参考命令

- 启动ollama：ollama serve
- 查看ollama是否安装：ollama --version
- 安装gemma:2b版大模型的命令：ollama run gemma:2b
- 退出对话：ctrl+d
- 查看本地安装的模型：ollama list
- 删除某个模型：ollama rm 模型名称
