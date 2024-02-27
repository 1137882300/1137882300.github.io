---
title: hexo博客命令
categories:
  - web前端
tags:
  - jQuery
  - 表格
  - 表单验证
date: 2019-12-11
keywords: ''
cover:
abbrlink: 34fer43
---

git clone https://github.com/amehime/hexo-theme-shoka.git ./themes/shoka


yarn remove hexo-renderer-marked


npm un hexo-renderer-marked --save

npm i hexo-renderer-multi-markdown-it --save



9556d23c97824374fc83207e3557bf1a

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



https://gitee.com/api/v5/repos/owner/repo/contents/path/fileName

https://gitee.com/api/v5/repos/coderzane/images/contents/master/images/1703052299628.jpg

https://gitee.com/api/v5/repos/coderzane/images/contents/images/202312201034862.jpg


https://gitee.com/api/v5/repos/coderzane/images/git/gitee/trees/sha


https://gitee.com/api/v5/repos/coderzane/images/git/blobs/sha


https://gitee.com/coderzane/images/raw/master/images/202312201034862.jpg


npm un hexo-renderer-marked --save

npm uninstall hexo-renderer-markdown-it --save


https://github.com/theme-shoka-x/hexo-theme-shokaX.git ./themes/shokaX


yarn add hexo-lightning-minify


npm uninstall hexo-lightning-minify --save


hexo init crab
cd crab
npm install

hexo clean   # 清除缓存文件等
hexo cl  # 清除缓存文件等
hexo g   # 生成页面
hexo s   # 启动预览



安装
npm install -g hexo-cli

npm install hexo -g   //安装  
npm update hexo -g 	  //升级
hexo version  	      //查看hexo的版本
hexo init nodejs-hexo   //创建nodejs-hexo 名字的本地文件
hexo init nodejs-hexo    //创建博客
hexo init blog          //初始化，生成文件夹为blog
cd blog  	             //进入blog文件夹
npm install            //安装依赖库
hexo generate           //生成一套静态网页
hexo server         //运行测试,浏览器打开地址，http://localhost:4000/
hexo deploy         //进行部署

hexo new "new article"  //新建文章‘new article’
hexo new page "about"  //新建页面 ‘about’

hexo n "我的博客"` == `hexo new` "我的博客"    //新建文章
hexo g == hexo generate        //生成`
hexo s == hexo server          //启动服务预览
hexo d == hexo deploy          //部署


npm config set registry http://registry.npmmirror.com

官方镜像源
npm config set registry https://registry.npmjs.org/

淘宝镜像源
npm config set registry https://registry.npm.taobao.org/


步骤：

hexo init crab
cd crab
npm install

theme: butterfly

npm install hexo-theme-butterfly

pug 以及 stylus 的渲染器
npm install hexo-renderer-pug hexo-renderer-stylus --save

注意：(Hexo會自動合併主題中的 _config.yml 和 _config.butterfly.yml 裏的配置，如果存在同名配置，會使用 _config.butterfly.yml 的配置，其優先度較高。)

hexo new page tags

hexo new page categories

hexo new page link


搜索需要安装 hexo-generator-searchdb 或者 hexo-generator-search，根据它的文档去做相应配置
npm install hexo-generator-searchdb
npm install hexo-generator-search --save
字数统计特性
npm install hexo-wordcount --save
PWA 特性
npm install hexo-offline --save

使用hexo d 部署
npm install hexo-deployer-git --save





强制push 且覆盖
git push -f
