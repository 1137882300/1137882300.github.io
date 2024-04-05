---
title: elasticsearch 核心概念
shortTitle: elasticsearch
categories:
  - [中间件]
  - [elasticsearch]
tags:
  - 核心
description: elasticsearch 核心概念
date: 2024-03-08
keywords: 'es,elasticsearch,搜索,索引'
cover: https://img.funning.top/moxige.png
abbrlink: 112232
---

## elasticsearch 的核心概念
> Near Realtime（NRT）近实时

两个意思：
- 从写入数据到数据可以被搜索到有一个小延迟（大概1秒）；
- 基于es执行搜索和分析可以达到秒级；

> Cluster 集群

包含多个节点，每个节点属于哪个集群是通过一个配置（集群名称，默认是 elasticsearch ）来决定的，对于中小型应用来说，刚开始一个集群就一个节点很正常

> Node 节点

集群中的一个节点，节点也有一个名称（默认是随机分配的），节点名称很重要（在执行运维管理操作的时候），默认节点会去加入一个名称为 “elasticsearch” 的集群，如果直接启动一堆节点，那么它们会自动组成一个 elasticsearch 集群，当然一个节点也可以组成一个 elasticsearch 集群


> Document&field 文档

es中的最小数据单元，一个 document 可以是一条客户数据，一条商品分类数据，一条订单数据，通常用 JSON 数据结构表示

一个 index 下的 type 中，都可以去存储多个 document。

一个 document 里面有多个 field，每个field就是一个数据字段

> Index 索引

包含一堆有相似结构的文档数据，比如可以有一个客户索引，商品分类索引，订单索引，索引有一个名称。

一个 index 包含很多 document，一个 index 就代表了一类类似的或者相同的 document。比如说建立一个 product index，商品索引，里面可能就存放了所有的商品数据，所有的商品 document。

> Type 类型

每个索引里都可以有一个或多个 type，type 是 index 中的一个逻辑数据分类，一个 type 下的 document，都有相同的 field，比如博客系统，有一个索引，可以定义用户数据 type，博客数据 type，评论数据 type。

每一个 type 里面，都会包含一堆 document

> shard 分片(primary shard)

单台机器无法存储大量数据，es 可以将一个索引中的数据切分为多个 shard，分布在多台服务器上存储。有了 shard 就可以横向扩展，存储更多数据，让搜索和分析等操作分布到多台服务器上去执行，提升吞吐量和性能。每个 shard 都是一个 lucene index。

> replica 复制集/副本(replica shard)

任何一个服务器随时可能故障或宕机，此时 shard 可能就会丢失，因此可以为每个 shard 创建多个 replica副本。replica 可以在 shard 故障时提供备用服务，保证数据不丢失，多个 replica 还可以提升搜索操作的吞吐量和性能。

primary shard（建立索引时一次设置，不能修改，默认5个）
replica shard（随时修改数量，默认1个）
默认每个索引 10 个 shard，5个 primary shard，5个 replica shard，最小的高可用配置，是 2台 服务器。

## es核心概念 vs db核心概念

| elasticsearch | 数据库 |
|---------------|-----|
| Document      | 行   |
| Type          | 表   |
| Index         | 库   |
