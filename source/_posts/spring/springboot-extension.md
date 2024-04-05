---
title: SpringBoot 的扩展接口汇总大全（都给你们整理好啦！）
shortTitle: SpringBoot 扩展汇总
categories:
  - [ SpringBoot ]
tags:
  - 扩展
  - SpringBoot
  - 汇总
description:
date: 2024-03-11
keywords: 'SpringBoot,spring,扩展,汇总,总结'
cover: https://img.funning.top/yingguo.png
abbrlink: 112233
---

# 背景

Spring的核心理念蕴含着容器的奥妙。在容器焕然一新的瞬间，外部世界看似平静，却不知内部却是波涛汹涌，掀起惊涛骇浪，浩浩荡荡。Spring
Boot更进一步地封装了Spring框架，秉承着约定优于配置的原则，借助自动装配的机制。有时候，只需引入一个依赖，便能轻松实现功能的装配，几乎无需额外的配置。

# 调用顺序图

> 来自大佬的图
![](https://upload-images.jianshu.io/upload_images/7880910-df5c16edbf034676.jpg?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

# 扩展类

## ApplicationContextInitializer

> org.springframework.context.ApplicationContextInitializer

实现 ApplicationContextInitializer 接口的类，可以在 Spring 容器初始化的早期阶段介入，并在容器刷新之前对应用程序上下文进行必要的定制。
比如设置`环境属性`、`激活配置文件`、`注册监听器`等操作，以便在容器刷新后应用这些配置。
这为开发人员提供了更大的灵活性和控制力，使他们能够更好地适应应用程序的特定需求。

```java
public class TestApplicationContextInitializer implements ApplicationContextInitializer {
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        System.out.println("test");
    }
}      
```

## BeanDefinitionRegistryPostProcessor

> org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor

这个接口在读取项目中的beanDefinition之后执行，提供的扩展点
使用场景：可以在这里`动态注册自己的beanDefinition`，也可以加载classpath之外的bean

## BeanFactoryPostProcessor

> org.springframework.beans.factory.config.BeanFactoryPostProcessor

这个接口是beanFactory的扩展接口，调用时机在实例化bean之前，spring读取beanDefinition信息之后。

在这个时机，用户可以通过实现这个扩展接口来自行处理一些东西，比如修改已经注册的beanDefinition的`元信息`。

## InstantiationAwareBeanPostProcessor

> org.springframework.beans.factory.config.InstantiationAwareBeanPostProcessor

该接口`继承了BeanPostProcess接口`

- BeanPostProcess接口只在bean的初始化阶段进行扩展,注入spring上下文前后。
- InstantiationAwareBeanPostProcessor接口在此基础上增加了3个方法，把可扩展的范围增加了实例化阶段和属性注入阶段。
- InstantiationAwareBeanPostProcessor接口主要的扩展点有以下5个方法，主要在bean生命周期的两大阶段：`实例化阶段`
  和`初始化阶段`
    - postProcessBeforeInstantiation：实例化bean之前，相当于new这个bean之前
    - postProcessAfterInstantiation：实例化bean之后，相当于new这个bean之后
    - postProcessPropertyValues：bean已经实例化完成，在属性注入时阶段触发，@Autowired, @Resource等注解原理基于此方法实现
    - postProcessBeforeInitialization：初始化bean之前，相当于把bean注入spring上下文之前
    - postProcessAfterInitialization：初始化bean之后，相当于把bean注入spring上下文之后

使用场景：这个扩展点非常实用 ，无论是写中间件和业务中，都能利用这个特性

## SmartInstantiationAwareBeanPostProcessor

> org.springframework.beans.factory.config.SmartInstantiationAwareBeanPostProcessor

该扩展接口有3个触发点方法：

- predictBeanType：该触发点发生在postProcessBeforeInstantiation之前(在图上并没有标明，因为一般不太需要扩展这个点)
  ，这个方法用于预测Bean的类型，返回第一个预测成功的Class类型，如果不能预测返回null；当你调用BeanFactory.getType(name)
  时当通过bean的名字无法得到bean类型信息时就调用该回调方法来决定类型信息。
-

determineCandidateConstructors：该触发点发生在postProcessBeforeInstantiation之后，用于确定该bean的构造函数之用，返回的是该bean的所有构造函数列表。用户可以扩展这个点，来自定义选择相应的构造器来实例化这个bean。
-
getEarlyBeanReference：该触发点发生在postProcessAfterInstantiation之后，当有循环依赖的场景，当bean实例化好之后，为了防止有循环依赖，会提前暴露回调方法，用于bean实例化的后置处理。这个方法就是在提前暴露的回调方法中触发。

## BeanFactoryAware

> org.springframework.beans.factory.BeanFactoryAware

可以在bean实例化之后，但还未初始化之前，也就是Setter之前。拿到
BeanFactory，在这个时候，可以对每个bean作特殊化的定制。也或者可以把BeanFactory拿到进行缓存，日后使用。

## ApplicationContextAwareProcessor

> org.springframework.context.support.ApplicationContextAwareProcessor

触发的时机在bean实例化之后，初始化之前

- EnvironmentAware：用于获取EnvironmentAware的一个扩展类，这个变量非常有用，
  可以获得系统内的所有参数。当然个人认为这个Aware没必要去扩展，因为spring内部都可以通过注入的方式来直接获得。
- EmbeddedValueResolverAware：用于获取StringValueResolver的一个扩展类，
  StringValueResolver用于获取基于String类型的properties的变量，一般我们都用@Value的方式去获取，如果实现了这个Aware接口，把StringValueResolver缓存起来，通过这个类去获取String类型的变量，效果是一样的。
- ResourceLoaderAware：用于获取ResourceLoader的一个扩展类，ResourceLoader可以用于获取classpath内所有的资源对象，可以扩展此类来拿到ResourceLoader对象。
-

ApplicationEventPublisherAware：用于获取ApplicationEventPublisher的一个扩展类，ApplicationEventPublisher可以用来发布事件，结合ApplicationListener来共同使用，下文在介绍ApplicationListener时会详细提到。这个对象也可以通过spring注入的方式来获得。

- MessageSourceAware：用于获取MessageSource的一个扩展类，MessageSource主要用来做国际化。
-

ApplicationContextAware：用来获取ApplicationContext的一个扩展类，ApplicationContext应该是很多人非常熟悉的一个类了，就是spring上下文管理器，可以手动的获取任何在spring上下文注册的bean，我们经常扩展这个接口来缓存spring上下文，包装成静态方法。同时ApplicationContext也实现了BeanFactory，MessageSource，ApplicationEventPublisher等接口，也可以用来做相关接口的事情。

## BeanNameAware

> org.springframework.beans.factory.BeanNameAware

触发点在bean的初始化之前，也就是postProcessBeforeInitialization之前，这个类的触发点方法只有一个：setBeanName

使用场景为：用户可以扩展这个点，在初始化bean之前拿到spring容器中注册的的beanName，来自行修改这个beanName的值。

## @PostConstruct

> javax.annotation.PostConstruct

类似于InitializingBean 接口
其作用是在bean的初始化阶段，如果对一个方法标注了@PostConstruct，会先调用这个方法。这里重点是要关注下这个标准的触发点，这个触发点是在postProcessBeforeInitialization之后，InitializingBean.afterPropertiesSet之前。
使用场景：用户可以对某一方法进行标注，来进行初始化某一个类里的属性

## InitializingBean

> org.springframework.beans.factory.InitializingBean

类似于@PostConstruct
用来初始化bean的。InitializingBean接口为bean提供了初始化方法的方式，它只包括`afterPropertiesSet方法`
，凡是继承该接口的类，在初始化bean的时候都会执行该方法。这个扩展点的触发时机在postProcessAfterInitialization之前。

使用场景：用户实现此接口，来进行系统启动的时候一些业务指标的初始化工作。

## FactoryBean

> org.springframework.beans.factory.FactoryBean

FactoryBean接口对于Spring框架来说占用重要的地位，Spring自身就提供了70多个FactoryBean的实现。它们隐藏了实例化一些复杂bean的细节，给上层应用带来了便利。从Spring3.0开始，FactoryBean开始支持泛型，即接口声明改为FactoryBean<T>
的形式

使用场景：用户可以扩展这个类，来为要实例化的bean作一个代理，比如为该对象的所有的方法作一个拦截，在调用前后输出一行log，模仿ProxyFactoryBean的功能。

## SmartInitializingSingleton

> org.springframework.beans.factory.SmartInitializingSingleton

在spring容器管理的所有单例对象（非懒加载对象）初始化完成之后调用的回调接口。

使用场景：用户可以扩展此接口在对所有单例对象初始化完毕后，做一些`后置的业务处理`。

## CommandLineRunner

> org.springframework.boot.CommandLineRunner

触发时机为整个项目启动完毕后，自动执行。如果有多个CommandLineRunner，可以利用@Order来进行排序。

使用场景：用户扩展此接口，进行启动项目之后一些业务的`预处理`。

## DisposableBean

> org.springframework.beans.factory.DisposableBean

触发时机为当此对象销毁时，会自动执行这个方法。

## ApplicationListener

> org.springframework.context.ApplicationListener

触发时机可以穿插在业务方法执行过程中，用户可以自定义某个业务事件。

- ContextRefreshedEvent

```text
  ApplicationContext 被初始化或刷新时，该事件被发布。这也可以在ConfigurableApplicationContext接口中使用 refresh()
  方法来发生。此处的初始化是指：所有的Bean被成功装载，后处理Bean被检测并激活，所有Singleton Bean
  被预实例化，ApplicationContext容器已就绪可用。
```

- ContextStartedEvent

```text
当使用  ConfigurableApplicationContext  （ApplicationContext子接口）接口中的  start()  方法启动  ApplicationContext时，该事件被发布。
你可以调查你的数据库，或者你可以在接受到这个事件后重启任何停止的应用程序。
```

- ContextStoppedEvent

```text
当使用 ConfigurableApplicationContext接口中的 stop()停止ApplicationContext 时，发布这个事件。你可以在接受到这个事件后做必要的清理的工作
```

- ContextClosedEvent

```text
当使用 ConfigurableApplicationContext接口中的 close()方法关闭 ApplicationContext 时，该事件被发布。
一个已关闭的上下文到达生命周期末端；它不能被刷新或重启
```

- RequestHandledEvent

```text
这是一个 web-specific 事件，告诉所有 bean HTTP 请求已经被服务。只能应用于使用DispatcherServlet的Web应用。
在使用Spring作为前端的MVC控制器时，当Spring处理用户请求结束后，系统会自动触发该事件
```

## MethodInterceptor

> org.aopalliance.intercept.MethodInterceptor

这是一个接口，用于实现方法拦截器。方法拦截器可以在目标方法执行前、执行后或异常抛出时拦截方法调用，并执行相应的逻辑。

## StaticMethodMatcherPointcut

> org.springframework.aop.support.StaticMethodMatcherPointcut

这是一个 Spring 框架中的类，用于定义静态方法匹配切点。它提供了一种方式来匹配目标对象中的方法，以确定是否应该应用切面的通知逻辑。

## AbstractBeanFactoryPointcutAdvisor

> org.springframework.aop.support.AbstractBeanFactoryPointcutAdvisor

这是一个抽象类，用于实现切面通知者。它结合了切点和通知，提供了一种将切面应用于 Spring Bean 的方式。
 
