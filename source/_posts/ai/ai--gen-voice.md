---
title: 革命性AI创新！一句话即可打造震撼120秒超长视频，免费开源，引爆你的创作激情！
shortTitle: AI生成视频
categories:
  - [ AI ]
  - [ 大模型 ]
tags:
  - 大模型
  - AI
  - 视频
description:
date: 2024-04-19
keywords: 'AI,人工智能,LLM,大模型,视频'
cover: https://img.funning.top/anjielisi.png
abbrlink: 112246
---

# 欣赏AI生成的视频效果

![](https://img.funning.top/ai-video-1.gif)

最新发布的StreamingT2V模型，由Picsart AI Research团队倾力打造，引领视频生成领域的革新！超越Sora模型，轻松创造长达2分钟（1200帧）的高品质视频！更令人振奋的是，
这一开源模型与SVD、animatediff等其他模型完美兼容，为视频生成领域带来了前所未有的突破！

![](https://img.funning.top/ai-video-2.gif)

# 亮点总结

- 创造长达2分钟（1200帧）的视频，超越以往模型
- 视频质量卓越，呈现高品质效果
- 与其他主流模型实现无缝衔接，提供更多创作可能性
- 开源免费，方便开发者使用和进行二次开发

# 免费体验

免费在线试玩：[点击跳转](https://huggingface.co/spaces/PAIR/StreamingT2V)

# 本地搭建

1. 安装并安装 Python 3.10 and CUDA >= 11.6 环境 [Python 3](https://www.python.org/downloads/release/python-3100/)
   、[Cuda 下载](https://developer.nvidia.com/cuda-downloads)

2. 克隆开源项目至本地：

```shell
git clone https://github.com/Picsart-AI-Research/StreamingT2V.git
cd StreamingT2V/
```

3. 安装必备的环境：

```shell
conda create -n st2v python=3.10
conda activate st2v
pip install -r requirements.txt
```

4. `可选`如果您的系统上缺少 FFmpeg，请安装 FFmpeg

```shell
conda install conda-forge::ffmpeg
```

5. 从[huggingface](https://huggingface.co/PAIR/StreamingT2V) 下载模型并将它放在 `t2v_enhanced/checkpoints` 目录下

6. 文本转视频

```shell
cd t2v_enhanced
python inference.py --prompt="A white bone spirit riding a motorcycle"
```


# 基础模型推理时间对比

## [ModelscopeT2V](https://github.com/modelscope/modelscope)作为基础模型

|  帧数  | 更快预览的推理时间 (256×256) | 最终结果的推理时间 (720×720) |
| :----: | :--------------------------: | :--------------------------: |
|  24帧  |             40秒             |            165秒             |
|  56帧  |             75秒             |            360秒             |
|  80帧  |            110秒             |            525秒             |
| 240帧  |            340秒             |    1610 秒（约 27 分钟）     |
| 600帧  |            860秒             |    5128 秒（约 85 分钟）     |
| 1200帧 |    1710 秒（约 28 分钟）     |   10225 秒（约 170 分钟）    |

## [AnimateDiff](https://github.com/guoyww/AnimateDiff)作为基础模型

|  帧数  | 更快预览的推理时间 (256×256) | 最终结果的推理时间 (720×720) |
| :----: | :--------------------------: | :--------------------------: |
|  24帧  |             50秒             |            180秒             |
|  56帧  |             85秒             |            370秒             |
|  80帧  |            120秒             |            535秒             |
| 240帧  |            350秒             |    1620 秒（约 27 分钟）     |
| 600帧  |            870秒             |     5138 秒（~85 分钟）      |
| 1200帧 |    1720 秒（约 28 分钟）     |   10235 秒（约 170 分钟）    |

## [SVD](https://github.com/Stability-AI/generative-models)作为基本模型

|  帧数  | 更快预览的推理时间 (256×256) | 最终结果的推理时间 (720×720) |
| :----: | :--------------------------: | :--------------------------: |
|  24帧  |             80秒             |            210秒             |
|  56帧  |            115秒             |            400秒             |
|  80帧  |            150秒             |            565秒             |
| 240帧  |            380秒             |    1650 秒（约 27 分钟）     |
| 600帧  |            900秒             |     5168 秒（~86 分钟）      |
| 1200帧 |    1750 秒（约 29 分钟）     |    10265 秒（~171 分钟）     |

所有测量均使用 NVIDIA A100 (80 GB) GPU 进行。当帧数超过 80 时，采用随机混合。对于随机混合，chunk_size和 的值overlap_size分别设置为 112 和 32。

更多的文生视频在线使用：[点击前往](https://huggingface.co/spaces/PAIR/Text2Video-Zero) 支持多模型自由切换！