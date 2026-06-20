# Blog 6 Rewrite: Novel-style → B2B Scan-friendly

## Before (小说式叙事风格)

- 397 行, 21KB
- 开头是对话："when Marco Silva walked us through..."
- 逐个空间详细描述（Lobby / Restaurant / Corridors / Guest Rooms）
- 2张图片，纯文字密集

## After (B2B扫读风格)

- 约280行, 18.5KB
- 开头是数据摘要：`Project: 42-room · Before: 5 lamp types · After: 1 platform · Result: +0.9 score, -34% energy`
- 三段式结构：**Problem → Solution → Results**，每个用 Highlight Box 视觉隔离
- 3张图片（头图+系统图+客房实景），每张图片内容不重复
- 结尾收束为 B2B Takeaways（"What This Means for Your Next Project"）

## 改写要点

1. **砍掉场景描写** — 所有"he pointed to the tall windows"这类叙事直接删
2. **数据前置** — 最硬核的指标放在第一段，扫读即得
3. **表格替代段落** — Space-by-space 从5段文字压缩为一张表格
4. **Highlight Box 分隔** — 用白色卡片式 div 把 Problem/Solution/Results 三个模块视觉隔离
5. **CTA 强化** — 结尾直接招呼"Send us your floor plans"，不给模糊选项

## 适用场景

当用户说"文字太多、图片太少、阅读困难"时：
1. 确认文章类型（案例类/知识类/技术类）
2. 砍掉全部叙事/对话/情感描写
3. 用数据摘要替代开头引子
4. 检查图片是否都有独特内容，没有重复
5. 如果图片不够→提供生成提示词让用户补充
