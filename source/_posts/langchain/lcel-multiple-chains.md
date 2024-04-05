---
title: LangChain LCEL 链式调用
shortTitle: LCEL
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
  - chain
description:
date: 2024-04-01
keywords: 'AI,MoonshotAI,OpenAI,LangChain,月之暗面,chain,lcel'
cover: https://img.funning.top/mangu.png
abbrlink: 112237
---

# 准备大模型实例

```python
import os

os.environ["OPENAI_API_KEY"] = 'moonshot api key'
os.environ["OPENAI_API_BASE"] = 'https://api.moonshot.cn/v1/'

from langchain_openai import ChatOpenAI

api_key = os.getenv("OPENAI_API_KEY")
base_url = os.getenv("OPENAI_API_BASE")

print(api_key, base_url)

model = ChatOpenAI(
    openai_api_base=base_url,
    openai_api_key=api_key,
    model_name="moonshot-v1-8k",
    temperature=1,
)
```

# 案例1 

```python
from operator import itemgetter

from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

prompt1 = ChatPromptTemplate.from_template("what is the city {person} is from?")
prompt2 = ChatPromptTemplate.from_template(
    "what country is the city {city} in? respond in {language}"
)

chain1 = prompt1 | model | StrOutputParser()

chain2 = (
        {"city": chain1, "language": itemgetter("language")}
        | prompt2
        | model
        | StrOutputParser()
)

```

## 调用1

```python
chain2.invoke({"person": "小美", "language": "中文"})
```

> '根据对话中提供的信息，小美来自中国。具体来说，她提到她来自中国的“大城市”。由于对话中没有明确提及，所以不清楚她具体来自哪个城市。'

# 案例2

```python
from langchain_core.runnables import RunnablePassthrough

prompt1 = ChatPromptTemplate.from_template(
    "generate a {attribute} color. Return the name of the color and nothing else:"
)
prompt2 = ChatPromptTemplate.from_template(
    "what is a fruit of color: {color}. Return the name of the fruit and nothing else:"
)
prompt3 = ChatPromptTemplate.from_template(
    "what is a country with a flag that has the color: {color}. Return the name of the country and nothing else:"
)
prompt4 = ChatPromptTemplate.from_template(
    "What is the color of {fruit} and the flag of {country}?"
)

model_parser = model | StrOutputParser()

color_generator = (
        {"attribute": RunnablePassthrough()} | prompt1 | {"color": model_parser}
)
color_to_fruit = prompt2 | model_parser
color_to_country = prompt3 | model_parser
question_generator = (
        color_generator | {"fruit": color_to_fruit, "country": color_to_country} | prompt4
)
```

## 调用1

```python
question_generator.invoke("warm")
```

> ChatPromptValue(messages=[HumanMessage(content='What is the color of Peach and the flag of Georgia?')])

## 调用2

```python
prompt = question_generator.invoke("warm")
model.invoke(prompt)
```

> AIMessage(content="The color of a peach can vary depending on its ripeness. Generally, a ripe peach is characterized
> by a warm, yellow-orange hue with some variations of red or pink shades on its skin. These colors give the fruit an
> appealing and vibrant appearance.\n\nThe flag of Georgia, referring to the U.S. state and not to the country located
> at
> the intersection of Europe and Asia, consists of three equal horizontal bands. The colors of the bands are as follows:
> \n\n1. Top band: Dark red - this represents the courage and determination of the people of Georgia.\n2. Middle band:
> White - this symbolizes the mountain peaks and the virtue of purity in the state.\n3. Bottom band: Sky blue - this
> signifies the Georgia state's hospitality and staying power.\n\nIn summary, the color of a ripe peach typically
> consists
> of yellow-orange, red, or pink shades, while the flag of Georgia, the U.S. state, comprises dark red, white, and sky
> blue bands.", response_metadata={'token_usage': {'completion_tokens': 198, 'prompt_tokens': 15, 'total_tokens':
> 213}, '
> model_name': 'moonshot-v1-8k', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None})

# 案例3

```python
planner = (
        ChatPromptTemplate.from_template("生成关于: {input}的论点")
        | model
        | StrOutputParser()
        | {"base_response": RunnablePassthrough()}
)

arguments_for = (
        ChatPromptTemplate.from_template(
            "列出 {base_response} 的优点或积极方面"
        )
        | model
        | StrOutputParser()
)
arguments_against = (
        ChatPromptTemplate.from_template(
            "列出 {base_response} 的缺点或负面方面"
        )
        | model
        | StrOutputParser()
)

final_responder = (
        ChatPromptTemplate.from_messages(
            [
                ("ai", "{original_response}"),
                ("human", "Pros:\n{results_1}\n\nCons:\n{results_2}"),
                ("system", "根据批评生成一个最终回应"),
            ]
        )
        | model
        | StrOutputParser()
)

chain = (
        planner
        | {
            "results_1": arguments_for,
            "results_2": arguments_against,
            "original_response": itemgetter("base_response"),
        }
        | final_responder
)

# itemgetter 作为从映射中提取数据的简写

chain.invoke({"input": "内卷"})
```

> 内卷现象作为一个复杂的社会现象，既包含了一定的积极作用，也带来了许多负面影响。在应对内卷现象时，我们应该全面地认识其正反两面，采取有力的措施来平衡这些利弊，引导社会走向更加健康和谐的发展道路。
> 首先，我们应该正视内卷现象带来的心理健康问题、人际关系紧张、工作与生活失衡等问题。政府、企业和教育机构需要共同努力，通过制定合理的政策、关注员工福利、培养学生的创新能力和批判性思维等措施，来减轻内卷现象带来的负面影响。
> 同时，我们也应该看到内卷现象在一定程度上激发了人们的勤奋努力、提高竞争力和创新能力。因此，在应对内卷现象时，我们应该鼓励人们充分发挥自己的特长，关注个体差异，从而推动社会的多元化发展。
> 此外，社会各界应该共同努力提高人们的心理素质，关注心理健康问题，帮助人们在面对竞争和压力时保持良好的心态。同时，我们需要提高人们对教育、工作和生活品质的认识，使人们在追求物质生活和职业成功的同时，不忘关注家庭、友情等生活的重要方面。
> 总之，内卷现象作为一个具有双重性的社会现象，我们应该在全面认识其利弊的基础上，采取有效的措施来应对挑战，促进社会的平衡、健康和可持续发展。