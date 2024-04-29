---
title: Chat Models 聊天模型
shortTitle:
categories:
  - [ AI ]
  - [ LLM ]
  - [ LangChain ]
tags:
  - AI
  - LLM
  - 大语言模型
  - LangChain
  - prompt
description:
date: 2024-04-01
keywords: 'AI,prompt,LangChain'
cover: https://img.funning.top/menggu1.png
abbrlink: 112240
---

# 概述

聊天模型是LangChain的核心组件。

聊天模型是一种语言模型，它使用聊天消息作为输入，并将聊天消息作为输出返回（而不是使用纯文本）。

LangChain与许多模型提供商（OpenAI、Cohere、Hugging Face等）集成，并公开了一个标准接口来与所有这些模型进行交互。

LangChain允许您在同步、异步、批处理和流模式下使用模型，并提供其他功能（例如，缓存）等。

# 初始化

```python
import os
from langchain_openai import OpenAI
from langchain_openai import ChatOpenAI

os.environ["OPENAI_API_KEY"] = 'api-key'
os.environ["OPENAI_API_BASE"] = 'https://api.moonshot.cn/v1/'

api_key = os.getenv("OPENAI_API_KEY")
base_url = os.getenv("OPENAI_API_BASE")

print(api_key, base_url)

# 初始化模型(两种方式)：

llm = OpenAI(
    openai_api_base=base_url,
    openai_api_key=api_key,
    model_name="moonshot-v1-8k",
    temperature=0.7,
)

chat = ChatOpenAI(
    openai_api_base=base_url,
    openai_api_key=api_key,
    model_name="moonshot-v1-8k",
    temperature=0.7,
).bind(logprobs=True)
```

# chat 调用

```python
from langchain_core.messages import HumanMessage, SystemMessage

chat.invoke(
    [
        HumanMessage(
            content="Translate this sentence from English to French: I love programming."
        )
    ]
)
```

> AIMessage(content='J\'aime la programmation.\n\nIn this translation, "I love" is translated to "J\'aime" and "
> programming" is translated to "la programmation." The sentence structure remains the same as in English, with the
> subject (I) followed by the verb (love) and then the object (programming).', response_metadata={'token_usage':
> {'completion_tokens': 68, 'prompt_tokens': 15, 'total_tokens': 83}, 'model_name': 'moonshot-v1-8k', '
> system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None})

# 第二种方式

```python
messages = [
    SystemMessage(
        content="You are a helpful assistant that translates English to French."
    ),
    HumanMessage(content="I love programming."),
]
chat(messages)
```

> AIMessage(content="J'aime la programmation.", response_metadata={'token_usage': {'completion_tokens': 8, '
> prompt_tokens': 20, 'total_tokens': 28}, 'model_name': 'moonshot-v1-8k', 'system_fingerprint': None, '
> finish_reason': '
> stop', 'logprobs': None})

## 批量方式

```python
batch_messages = [
    [
        SystemMessage(
            content="You are a helpful assistant that translates English to chinese."
        ),
        HumanMessage(content="I love programming."),
    ],
    [
        SystemMessage(
            content="You are a helpful assistant that translates English to chinese."
        ),
        HumanMessage(content="I love artificial intelligence."),
    ],
]
result = chat.generate(batch_messages)
# 在Python中，当你想要在控制台中输出变量的值时，通常会使用 print 函数。但是，如果你在交互式环境（比如Python解释器或Jupyter Notebook）中执行这段代码，并且想要查看 result 的值，你可以直接输入变量名 result，而不需要使用 print 函数。
result
```

```text
LLMResult(generations=[[ChatGeneration(text='我热爱编程。', generation_info={'finish_reason': 'stop', 'logprobs': None}, message=AIMessage(content='我热爱编程。', response_metadata={'token_usage': {'completion_tokens': 5, 'prompt_tokens': 20, 'total_tokens': 25}, 'model_name': 'moonshot-v1-8k', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None}))], [ChatGeneration(text='我爱人工智能。', generation_info={'finish_reason': 'stop', 'logprobs': None}, message=AIMessage(content='我爱人工智能。', response_metadata={'token_usage': {'completion_tokens': 4, 'prompt_tokens': 21, 'total_tokens': 25}, 'model_name': 'moonshot-v1-8k', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None}))]], llm_output={'token_usage': {'completion_tokens': 9, 'prompt_tokens': 41, 'total_tokens': 50}, 'model_name': 'moonshot-v1-8k'}, run=[RunInfo(run_id=UUID('6eea2ab7-7faf-445c-8349-9cf471a862ec')), RunInfo(run_id=UUID('653c7159-bb9c-4ea6-ad18-c95aaaf65075'))])
```

# 缓存模块

## 内存缓存

```python
# Caching 缓存
# LangChain为聊天模型提供了一个可选的缓存层。这很有用，原因有两个：
# 如果您经常多次请求相同的完成，它可以通过减少您向LLM提供商进行的 API 调用次数来为您节省资金。它可以通过减少您对LLM提供程序进行的 API 调用次数来加快应用程序的速度。

# In Memory Cache 内存缓存中

# <!-- ruff: noqa: F821 -->
from langchain.globals import set_llm_cache

# %time
from langchain.cache import InMemoryCache

set_llm_cache(InMemoryCache())

# The first time, it is not yet in cache, so it should take longer
chat.invoke("Tell me a joke")
```

```text
CPU times: user 1 µs, sys: 0 ns, total: 1 µs
Wall time: 4.77 µs

AIMessage(content="Sure, here's one for you:\n\nWhy did the tomato turn red?\n\nBecause it saw the salad dressing!", response_metadata={'token_usage': {'completion_tokens': 23, 'prompt_tokens': 7, 'total_tokens': 30}, 'model_name': 'moonshot-v1-8k', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None})
```

```python
# %time
# The second time it is, so it goes faster
chat.invoke("Tell me a joke")
```

```text
CPU times: user 1e+03 ns, sys: 0 ns, total: 1e+03 ns
Wall time: 2.86 µs

AIMessage(content="Sure, here's one for you:\n\nWhy did the tomato turn red?\n\nBecause it saw the salad dressing!", response_metadata={'token_usage': {'completion_tokens': 23, 'prompt_tokens': 7, 'total_tokens': 30}, 'model_name': 'moonshot-v1-8k', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None})
```

## 第三方缓存（sqlite）

```python
# SQLite Cache SQLite缓存
# We can do the same thing with a SQLite cache
from langchain.cache import SQLiteCache

set_llm_cache(SQLiteCache(database_path="langchain.db"))
```

```python
# %time
# The first time, it is not yet in cache, so it should take longer
chat.invoke("Tell me a joke")
```

```text
CPU times: user 1 µs, sys: 1 µs, total: 2 µs
Wall time: 11 µs

AIMessage(content="Sure, here's one for you:\n\nWhy don't scientists trust atoms?\n\nBecause they make up everything!", response_metadata={'token_usage': {'completion_tokens': 22, 'prompt_tokens': 7, 'total_tokens': 29}, 'model_name': 'moonshot-v1-8k', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None})
```

```python
# %time
# The second time it is, so it goes faster
chat.invoke("Tell me a joke")
```

```text
AIMessage(content="Sure, here's one for you:\n\nWhy don't scientists trust atoms?\n\nBecause they make up everything!")
```