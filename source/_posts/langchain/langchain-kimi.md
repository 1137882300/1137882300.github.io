---
title: LangChain 完美兼容适配 MoonshotAI 国内AI，无需魔法即可调用，完美替代 OpenAI
shortTitle: LangChain 调用 MoonshotAI
categories:
  - [ AI ]
  - [ LLM ]
  - [ LangChain ]
tags:
  - AI
  - LLM
  - 大语言模型
  - MoonshotAI
  - 月之暗面
  - kimi
  - LangChain
description: LangChain 调用 MoonshotAI,国内替换 OpenAI 方案。
date: 2024-03-29
keywords: 'AI,MoonshotAI,OpenAI,LangChain,月之暗面'
cover: https://img.funning.top/gubabilun.png
abbrlink: 112236
---

# 必知概念

官方概念：（地址：https://python.langchain.com）

LangChain是一个开发由语言模型驱动的应用程序的框架。它使应用程序能够：

- 上下文感知：将语言模型连接到上下文源（提示指令、少量示例、响应内容等）
- 依靠语言模型进行推理（关于如何根据提供的上下文回答，采取什么行动等）

> `说人话`： 类似于Java的 SpringBoot 框架，而 LangChain 就是 AI 界的 “SpringBoot” 框架

# 必要条件

创建`月之暗面`的 api 账号，`月之暗面 == MoonshotAI`

官网地址：https://platform.moonshot.cn

现在注册新用户还会`赠送15元钱`

| 模型               | 计费单位      | 价格     
|------------------|-----------|--------| 
| moonshot-v1-8k   | 1M tokens | ¥12.00 |
| moonshot-v1-32k  | 1M tokens | ¥24.00 |
| moonshot-v1-128k | 1M tokens | ¥60.00 |

> 此处 1M = 1,000,000

价格比 OpenAI 的相当的实惠了，不过免费的 15 块已经可以用好久好久了

# 必会代码

> 安装必要的依赖包

```python
pip install -U langchain
pip install -U langchain-openai
```

> MoonShotAI 完全兼容 OpenAI 接口

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    openai_api_base="https://api.moonshot.cn/v1/",
    openai_api_key="你刚申请的API-Key",
    model_name="moonshot-v1-8k",
    temperature=0.7,
)
print(llm.invoke("请问你是我的小美吗?"))
```

```text
content='您好！我是MoonshotAI，一款由Moonshot Corp开发的人工智能助手。我可以帮助您回答问题和解决问题。请问有什么我可以帮助您的？' response_metadata={'token_usage': {'completion_tokens': 31, 'prompt_tokens': 11, 'total_tokens': 42}, 'model_name': 'moonshot-v1-8k', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None}
```

```python
import os

os.environ["OPENAI_API_KEY"] = 'api-key'
os.environ["OPENAI_API_BASE"] = 'https://api.moonshot.cn/v1/'
from langchain_openai import ChatOpenAI

api_key = os.getenv("OPENAI_API_KEY")
base_url = os.getenv("OPENAI_API_BASE")

print(api_key, base_url)

llm = ChatOpenAI(
    openai_api_base=base_url,
    openai_api_key=api_key,
    model_name="moonshot-v1-8k",
    temperature=0.5,
)

```

> 后面就可以直接使用 LangChain 的相关依赖和方法了，下面演示一个例子

```python
from langchain.prompts import PromptTemplate

# Basic Example of a Prompt.
response = llm.invoke("What are the 7 wonders of the world?")
print(f"Response: {response}")

# Basic Example of a Prompt Template.
prompt_template = PromptTemplate.from_template(
    "List {n} cooking recipe ideas {cuisine} cuisine (name only)."
)
prompt = prompt_template.format(n=3, cuisine="italian")
print(f"Templated Prompt: {prompt}")

response = llm.invoke(prompt)
print(f"Response: {response}")

```

> 注意 llm 就是上面的 大模型实例