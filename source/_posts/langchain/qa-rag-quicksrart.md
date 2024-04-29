---
title: Q&A RAG 快速入门
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
  - RAG
description:
date: 2024-04-08
keywords: 'AI,prompt,LangChain'
cover: https://img.funning.top/bajisitan.png
abbrlink: 112243
---

# 什么是RAG

RAG 全称：Retrieval-Augmented Generation
RAG 是一种使用额外数据增强LLM知识的技术。

最强大的应用程序LLMs之一是复杂的问答 （Q&A） 聊天机器人。这些应用程序可以回答有关特定源信息的问题。这些应用程序使用一种称为检索增强生成
（RAG） 的技术。

LLMs可以对广泛的主题进行推理，但他们的知识仅限于公共数据，直到他们接受培训的特定时间点。如果要构建可以推理私有数据或模型截止日期后引入的数据的
AI 应用程序，则需要使用模型所需的特定信息来增强模型的知识。引入适当信息并将其插入模型提示符的过程称为检索增强生成 （RAG）。

# RAG 架构

典型的 RAG 应用程序有两个主要组件：

索引：用于从源引入数据并对其进行索引的管道。这通常发生在离线状态。

检索和生成：实际的 RAG 链，它在运行时接受用户查询并从索引中检索相关数据，然后将其传递给模型。

## Indexing 索引

加载：首先我们需要加载数据。这是使用 DocumentLoaders 完成的。

拆分：文本拆分器将大 Documents 块拆分为更小的块。这对于索引数据和将数据传递到模型都很有用，因为大块更难搜索，并且不适合模型的有限上下文窗口。

存储：我们需要某个地方来存储和索引我们的拆分，以便以后可以搜索它们。这通常是使用 VectorStore 和 Embeddings 模型完成的。

![](https://img.funning.top/rag_indexing.png)

## Retrieval and generation 检索和生成

检索：给定用户输入，使用 Retriever 从存储中检索相关拆分。

生成：ChatModel / LLM 使用包含问题和检索数据的提示生成答案

![](https://img.funning.top/rag_retrieval_generation.png)

# 实战代码

## 初始化环境

```python
import os
from langchain_openai import OpenAI
from langchain_openai import ChatOpenAI

os.environ["OPENAI_API_KEY"] = 'your key'
os.environ["OPENAI_API_BASE"] = 'https://api.moonshot.cn/v1/'

api_key = os.getenv("OPENAI_API_KEY")
base_url = os.getenv("OPENAI_API_BASE")

print("api_key=" + api_key, "base_url=" + base_url)

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

## 向量化 初始化

```python
from langchain.embeddings import SentenceTransformerEmbeddings

embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
```

## 所需依赖准备

```python
# BeautifulSoup (通常缩写为：BS4)  用于解析 HTML 和 XML 文件。它提供了从 HTML 和 XML 文档中提取数据的功能，以及对解析树进行导航的工具。
import bs4
from langchain import hub
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_text_splitters import RecursiveCharacterTextSplitter
```

## 核心代码

```python
# Load, chunk and index the contents of the blog.
loader = WebBaseLoader(
    web_paths=("https://lilianweng.github.io/posts/2023-06-23-agent/",),
    bs_kwargs=dict(
        parse_only=bs4.SoupStrainer(
            class_=("post-content", "post-title", "post-header")
        )
    ),
)
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)
splits = text_splitter.split_documents(docs)
vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)

# Retrieve and generate using the relevant snippets of the blog.
# retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 6})
retriever = vectorstore.as_retriever()
# 提取名为 rlm/rag-prompt 的资源。
prompt = hub.pull("rlm/rag-prompt")


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | chat
        | StrOutputParser()
)
```

## invoke调用

```python
rag_chain.invoke("What is Task Decomposition?")
```

## 调用结果

```text
"Task Decomposition is a process that breaks down complex tasks into smaller, simpler steps. It utilizes techniques such as Chain of Thought, which instructs the model to think step by step, transforming difficult tasks into manageable ones and providing insight into the model's thought process. This can be achieved through simple prompting, task-specific instructions, or human inputs, and can be extended by exploring multiple reasoning possibilities using Tree of Thoughts."
```

## Stream 式输出

```python
for chunk in rag_chain.stream("What is Task Decomposition?"):
    print(chunk, end="", flush=True)
```

## 自定义 prompt

```python
from langchain_core.prompts import PromptTemplate

template = """Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.
Always say "thanks for asking!" at the end of the answer.

{context}

Question: {question}

Helpful Answer:"""
custom_rag_prompt = PromptTemplate.from_template(template)

rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | custom_rag_prompt
        | chat
        | StrOutputParser()
)

rag_chain.invoke("What is Task Decomposition?")
```

## 输出结果

```text
'Task decomposition involves breaking down complex tasks into smaller, more manageable subgoals. It helps in making it easier to understand, plan, and execute the overall task. This approach is useful in various fields, including project management, programming, and artificial intelligence.\n\nChallenges in long-term planning and task decomposition include managing dependencies between subgoals, coordinating resources, and adapting to changing circumstances. Addressing these challenges can lead to more efficient and effective task completion.\n\nThanks for asking!'
```