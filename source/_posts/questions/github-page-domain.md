---
title: 解决 Github Pages 自定义域名失效的问题
shortTitle:
categories:
  - [ 问题 ]
tags:
  - github
  - pages
date: 2024-05-07
description:
keywords: 'github,pages,失效'
cover: https://img2.funning.top/file/3937b6058ac2c0256cdf3.png
abbrlink: 112251
---

# 背景

最近在 github.io ，为我的`hexo博客`在pages里添加了个域名。

然而每次push更新到GitHub的仓库后，发现域名总是莫名的失效了。然后每次非得重新设置，太麻烦啦😩。

> 最后捣鼓了一下

# 原因

在每次push的时候，会自动创建 `CNAME 文件`

![](https://img2.funning.top/file/37643d8affb8675698a09.png)

![](https://img2.funning.top/file/f97501f6713b81108bf1f.png)

# 解决

解决方法：需要在 /source 目录下边设置一个 CNAME 文件，内容是 自己的域名。

![](https://img2.funning.top/file/01f18d002b2fcf076cad1.png)

