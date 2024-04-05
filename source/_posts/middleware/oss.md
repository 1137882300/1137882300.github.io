---
title: OSS基本操作
categories:
  - 中间件
tags:
  - SpringBoot
date: 2023-11-09
keywords: ''
cover: https://cdn.jsdelivr.net/gh/1137882300/images@master/images%E8%80%81%E6%8C%9D.jpg
abbrlink: 112218
---

 

### 开通 OSS

OSS 也就是 Object Storage Service，是阿里云提供的一套对象存储服务，国内的竞品还有七牛云的 Kodo和腾讯云的COS。

第一步，登录阿里云官网，搜索“OSS”关键字，进入 OSS 产品页。

第二步，如果是 OSS 新用户的话，可以享受 6 个月的新人专享优惠价，不过续费的时候还是会肉疼。

第三步，进入 OSS 管理控制台，点击「Bucket 列表」，点击「创建 Bucket」。

Bucket 的词面意思是桶，这里指存储空间，就是用于存储对象的容器。注意读写权限为“公共读”，也就是允许互联网用户访问云空间上的图片。

第四步，点击「确定」就算是开通成功了。

### 整合 OSS

第一步，在 pom.xml 文件中添加 OSS 的依赖。

```
<!-- 阿里云 OSS -->
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.10.2</version>
</dependency>
```

第二步，在 application.yml 文件中添加 OSS 配置项。

```
aliyun:
  oss:
      # oss对外服务的访问域名
    endpoint: oss-cn-beijing.aliyuncs.com
      # 访问身份验证中用到用户标识
    accessKeyId: LTAI5
      # 用户用于加密签名字符串和oss用来验证签名字符串的密钥
    accessKeySecret: RYN
      # oss的存储空间
    bucketName: itwanger-oss1
      # 上传文件大小(M)
    maxSize: 3
      # 上传文件夹路径前缀
    dir:
      prefix: codingmore/images/
```

第三步，新增 OssClientConfig.java 配置类，主要就是通过  @Value 注解从配置文件中获取配置项，然后创建 OSSClient。

```java
@Configuration
public class OssClientConfig {
    @Value("${aliyun.oss.endpoint}")
    String endpoint ;
    @Value("${aliyun.oss.accessKeyId}")
    String accessKeyId ;
    @Value("${aliyun.oss.accessKeySecret}")
    String accessKeySecret;

    @Bean
    public OSSClient createOssClient() {
        return (OSSClient)new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
    }
}
```

第四步，新增文件上传接口 OssController.java，参数为 MultipartFile。

```java
@Controller
@Api(tags = "上传")
@RequestMapping("/ossController")
public class OssController {
    @Autowired
    private IOssService ossService;

    @RequestMapping(value = "/upload",method=RequestMethod.POST)
    @ResponseBody
    @ApiOperation("上传")
    public ResultObject<String> upload(@RequestParam("file") MultipartFile file, HttpServletRequest req)  {
        return ResultObject.success(ossService.upload(file));
    }
}
```

第五步，新增 Service，将文件上传到 OSS，并返回文件保存路径。

```java
@Service
public class OssServiceImpl implements IOssService{

    @Value("${aliyun.oss.maxSize}")
    private int maxSize;
   
    @Value("${aliyun.oss.bucketName}")
    private String bucketName;
  
    @Value("${aliyun.oss.dir.prefix}")
    private String dirPrefix;
    
    @Autowired
    private OSSClient ossClient;   
    @Override
    public String upload(MultipartFile file) {
        try {
            return upload(file.getInputStream(), file.getOriginalFilename());
        } catch (IOException e) {
            LOGGER.error(e.getMessage());
        }
        return null;
    }

    @Override
    public String upload(InputStream inputStream,String name) {
        String objectName = getBucketName(name);
        // 创建PutObject请求。
        ossClient.putObject(bucketName, objectName, inputStream);
        return formatPath(objectName);
    }
    private String getBucketName(String url){
        String ext = "";
        for(String extItem:imageExtension){
            if(url.indexOf(extItem) != -1){
                ext = extItem;
                break;
            }
        }
        return dirPrefix+ DateUtil.today()+"/"+ IdUtil.randomUUID()+ext;
    }

    private String formatPath(String objectName){
        return "https://"  +bucketName+"."+ ossClient.getEndpoint().getHost() + "/" + objectName;
    }
}  
```

### 利用 OSS 进行自动转链

第一步，在 PostsServiceImpl.java 中添加图片转链的方法，主要利用正则表达式找出文章内容中的外链，然后将外链的图片上传到 OSS，然后再替换掉原来的外链图片。

```java
// 匹配图片的 markdown 语法
// ![](hhhx.png)
// ![xx](hhhx.png?ax)
public static final String IMG_PATTERN = "\\!\\[.*\\]\\((.*)\\)";

private void handleContentImg(Posts posts) {
    String content = posts.getPostContent();

    Pattern p = Pattern.compile(IMG_PATTERN, Pattern.CASE_INSENSITIVE);
    Matcher m = p.matcher(content);

    Map<String, Future<String>> map = new HashMap<>();

    while (m.find()) {
        String imageTag = m.group();
        LOGGER.info("使用分组进行替换{}", imageTag);

        String imageUrl = imageTag.substring(imageTag.indexOf("(") + 1, imageTag.indexOf(")"));

        // 确认是本站链接，不处理
        if (imageUrl.indexOf(iOssService.getEndPoint()) != -1) {
            continue;
        }

        // 通过线程池将图片上传到 OSS
        Future<String> future = ossUploadImageExecutor.submit(() -> iOssService.upload(imageUrl));
        map.put(imageUrl, future);
    }

    for (String oldUrl : map.keySet()) {
        Future<String> future = map.get(oldUrl);

        try {
           String imageUrl = future.get();
           content = content.replace(oldUrl, imageUrl);
        } catch (InterruptedException | ExecutionException e) {
            LOGGER.error("获取图片链接出错{}", e.getMessage());
        }
        
    }
    posts.setPostContent(content);
} 
```

第二步，在 OssServiceImpl.java 中添加根据外链地址上传图片到 OSS 的方法。

```java
public String upload(String url) {
    String objectName = getFileName(url);
    try (InputStream inputStream = new URL(url).openStream()) {
        ossClient.putObject(bucketName, objectName, inputStream);
    } catch (IOException e) {
        LOGGER.error(e.getMessage());
    }
    return formatOSSPath(objectName);
}
```
