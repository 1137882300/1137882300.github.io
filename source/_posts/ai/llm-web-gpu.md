---
title: 浏览器端本地运行语言模型 = Transformers.js + WebGPU + Phi-3
shortTitle: AI
categories:
  - [ AI ]
  - [ 大模型 ]
tags:
  - 大模型
  - AI
  - web-gpu
description:
date: 2024-05-12
keywords: 'AI,人工智能,LLM,大模型,web-gpu'
cover: https://img2.funning.top/file/edbec1e3f0e86faf2d11b.png
abbrlink: 112252
---

# 介绍

`Phi-3-mini-4k-instruction`，这是一个38.2亿的参数LLM，它针对Web上的推理进行了优化。下载后，模型（2.3 GB）将被缓存，并在您重新访问页面时重用。

所有内容都`直接在浏览器中运行`，这意味着您的对话不会发送到服务器。🤗甚至可以在模型加载后`断开与互联网的连接`！

# 使用步骤

进入网址：[点击进入](https://huggingface.co/spaces/Xenova/experimental-phi3-webgpu)

> 点击： load model， 大约也就2个G多一点，下载完成后就可以正常使用啦。

![](https://img2.funning.top/file/bc9badea9cf0850b5b278.png)

> 大模型被缓存到浏览器里（按F12查看）

![](https://img2.funning.top/file/88d4993d478f8187d9c21.png)

# 相关链接

- https://github.com/xenova/transformers.js
- https://huggingface.co/spaces/Xenova/experimental-phi3-webgpu
- https://huggingface.co/Xenova/Phi-3-mini-4k-instruct
- https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-onnx