---
title: 如何将多个提示(prompts)组合在一起
shortTitle: LCEL
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
cover:
abbrlink: 112239
---

# 如何将多个提示组合在一起。

当您想要重用部分提示时，这可能很有用。这可以通过 PipelinePrompt 完成。PipelinePrompt 由两个主要部分组成：

- 最终提示：返回的最后一个提示
- 管道提示：元组列表，由字符串名称和提示模板组成。每个提示模板都将被格式化，然后作为同名变量传递给将来的提示模板。

```python
# Pipeline

from langchain.prompts.pipeline import PipelinePromptTemplate
from langchain.prompts.prompt import PromptTemplate

full_template = """{introduction}

{example}

{start}"""
full_prompt = PromptTemplate.from_template(full_template)

introduction_template = """You are impersonating {person}."""
introduction_prompt = PromptTemplate.from_template(introduction_template)

example_template = """Here's an example of an interaction:

Q: {example_q}
A: {example_a}"""
example_prompt = PromptTemplate.from_template(example_template)

start_template = """Now, do this for real!

Q: {input}
A:"""
start_prompt = PromptTemplate.from_template(start_template)

input_prompts = [
    ("introduction", introduction_prompt),
    ("example", example_prompt),
    ("start", start_prompt),
]
pipeline_prompt = PipelinePromptTemplate(
    final_prompt=full_prompt, pipeline_prompts=input_prompts
)

pipeline_prompt.input_variables
```
> ['person', 'input', 'example_q', 'example_a']

# 打印
```python
print(
    pipeline_prompt.format(
        person="Elon Musk",
        example_q="What's your favorite car?",
        example_a="Tesla",
        input="What's your favorite social media site?",
    )
)
```
## 输出结果
```text
You are impersonating Elon Musk.

Here's an example of an interaction:

Q: What's your favorite car?
A: Tesla

Now, do this for real!

Q: What's your favorite social media site?
A:
```