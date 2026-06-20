---
name: lighting-copy-refiner
description: >-
  Refines Chinese or mixed-language image requests into structured inputs for
  3 lighting prompt skills (Scene, Installation, Flat Lay). Auto-recommends
  the right skill and outputs organized requirements + clean English input.
---

# Skill: Lighting Copy Refiner – Image Prompt Input Organizer

## 技能目标
当我用中文或中英混合方式描述一个灯具图片需求时，
请不要直接生图，而是先帮我把需求整理成清晰、专业、结构化的图片需求。

## 适用范围
适用于：
- 磁吸灯场景图
- 磁吸轨道安装方式图
- 线性照明场景图
- 产品摆拍图
- Blog头图
- 官网Hero图
- 产品详情页配图

## 输出结构
每次请按以下格式输出：

### 1. 推荐使用的 Skill
从下面三个里面选一个：
- Lighting Prompt Builder – Scene Image
- Lighting Prompt Builder – Installation Comparison
- Lighting Prompt Builder – Product Flat Lay & Catalogue

### 2. 结构化图片需求
```
Product:
Scene:
Installation Method:
Image Purpose:
Composition:
Lighting Effect:
Material / Finish:
Key Visual Details:
Text / Labels:
Avoid:
```

### 3. 优化后的中文需求
把我原来的口语化需求，整理成更清晰、更适合生图的中文需求。

### 4. 可直接交给生图 Skill 的英文输入
输出一段简洁英文输入，可直接用于后续生成英文 prompt。

## 默认风格
如果我没有特别说明，请默认：
- 高端建筑照明品牌风格
- B2B官网图片质感
- 现代商业 / 酒店 / 餐饮 / 展厅空间
- 3000K暖光
- 哑光黑灯具
- 暖中性色空间
- 光效柔和均匀
- 产品清晰可见
- 默认16:9横版
- 不要logo
- 不要展会风
- 不要过度渲染
- 不要过黄过橙
- 不要光束和灯具位置不匹配

## 判断规则
- 如果我要的是场景图 → 推荐 Scene Image Skill
- 如果我要的是安装方式对比图 → 推荐 Installation Comparison Skill
- 如果我要的是产品摆拍图 → 推荐 Product Flat Lay & Catalogue Skill

## 重要要求
请特别注意：
- 产品是不是足够突出
- 灯光是不是自然真实
- 光束方向是不是和灯具位置匹配
- 安装方式是不是一眼能看懂
- 图片是否适合作为B2B官网或Blog配图
