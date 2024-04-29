---
title: META LLAMA 3 爆炸登场！在线试用、本地部署，性能直逼 GPT-4！
shortTitle: AI部署
categories:
  - [ AI ]
  - [ 大模型 ]
tags:
  - 大模型
  - AI
description:
date: 2024-04-22
keywords: 'AI,人工智能,LLM,大模型,gemini,ollama,llama2,llama,llama3'
cover: https://img.funning.top/dawoshi.png
abbrlink: 112247
---

# Meta 宣布推出革命性开源大语言模型 Llama 3！

Meta 正式发布了下一代开源大语言模型 Llama 3，这标志着 AI 发展的新里程碑！该模型分为 80 亿和 700 亿参数两个版本，
被誉为“Llama 2 的重大飞跃”，为大规模语言模型树立新标杆。

# Llama 3 的未来之路

值得一提的是，Llama 3 已与 Meta AI 助手深度集成，未来还将陆续在 AWS、Databricks、Google Cloud 等多个云平台上线，
并获得AMD、Intel、NVIDIA 等硬件厂商的支持，进一步扩大应用场景。
这将为 Llama 3 带来无限的可能！

# Meta 的开源AI 决心

该模型的发布彰显了 Meta 在开源 AI 领域的决心和影响力。我们有理由期待，Llama 3 将为自然语言处理、机器学习等 AI 前沿技术的发展注入新动力。
期待 Llama 3 的未来！

# 三种使用方式

1. 在线使用（`推荐`）
2. 本地直连使用
3. 套壳使用
4. API 方式调用（`推荐`）

## 在线使用

入口：[链接直达](https://www.meta.ai/)

> 不仅可以智能对话，也可以在线生成图片

## 本地直连使用

1. 从github下载Llama 3 项目文件：
   [点击下载](https://github.com/meta-llama/llama3)

2. 申请模型下载链接（申请秒过），申请后会在邮件里提供一个下载链接：
   [点击申请](https://llama.meta.com/llama-downloads/)

3. 环境依赖安装

   ```shell
   # 在Llama3最高级目录执行以下命令(建议在安装了python的conda环境下执行)
   pip install -e .
   ```

4. 下载Llama3模型

   ```shell
   bash download.sh
   ```

5. 运行命令后在终端下输入邮件里获取到下载链接，并选择你需要的模型

6. 运行示例脚本，执行以下命令
   ```shell
   torchrun --nproc_per_node 1 example_chat_completion.py \
       --ckpt_dir Meta-Llama-3-8B-Instruct/ \
       --tokenizer_path Meta-Llama-3-8B-Instruct/tokenizer.model \
       --max_seq_len 512 --max_batch_size 6
   ```

7. 创建自己的对话脚本，在根目录下创建以下chat.py脚本

   ```python
   from typing import List, Optional
   import fire
   from llama import Dialog, Llama
   
   def main(
   ckpt_dir: str,
   tokenizer_path: str,
   top_p: float = 0.9,
   max_seq_len: int = 512,
   max_batch_size: int = 4,
   max_gen_len: Optional[int] = None,
   ):
       generator = Llama.build(
           ckpt_dir=ckpt_dir,
           tokenizer_path=tokenizer_path,
           max_seq_len=max_seq_len,
           max_batch_size=max_batch_size,
       )
   
       # Modify the dialogs list to only include user inputs
       dialogs: List[Dialog] = [
           [{"role": "user", "content": ""}],  # Initialize with an empty user input
       ]
   
       # Start the conversation loop
       while True:
           # Get user input
           user_input = input("You: ")
           
           # Exit loop if user inputs 'exit'
           if user_input.lower() == 'exit':
               break
           
           # Append user input to the dialogs list
           dialogs[0][0]["content"] = user_input
   
           # Use the generator to get model response
           result = generator.chat_completion(
               dialogs,
               max_gen_len=max_gen_len,
               temperature=temperature,
               top_p=top_p,
           )[0]
   
           # Print model response
           print(f"Model: {result['generation']['content']}")
   
   if __name__ == "__main__":
    fire.Fire(main)
   ```

8. 运行以下命令就可以开始对话
   ```shell
   torchrun --nproc_per_node 1 chat.py     --ckpt_dir Meta-Llama-3-8B-Instruct/     --tokenizer_path Meta-Llama-3-8B-Instruct/tokenizer.model     --max_seq_len 512 --max_batch_size 6
   ```

## 套壳使用

1. 通过LM Studio 下载Llama 3 大模型
   [点击下载](https://lmstudio.ai/)

2. 下载模型后通过Jan加载模型，就可以实现可视化操作使用！非常适合新手
   [点击下载](https://jan.ai/)

   ![使用截图](https://img.funning.top/Snipaste_10.png)

## API 方式调用

1. 免费申请 Groq 的 API KEY
   [点击申请](https://groq.com/)

2. 部署lobe-chat
   [点击查看部署步骤](https://github.com/lobehub/lobe-chat)

3. 部署好之后来到：设置-语言模型-groq
   ![设置图片](https://img.funning.top/lobe02.png)

4. 最后免费无限享受😎
   ![使用截图](https://img.funning.top/lobe01.png)