# MAGNETRACK Blog 发布标准

所有新 Blog 必须执行以下 SEO/结构化数据规范：

## 1. Article Schema (JSON-LD)
每篇 Blog `<head>` 内必须包含：
- `@type`: Article
- headline, description, image
- datePublished, dateModified (ISO 8601 + 时区)
- author: `@type`: Person, name: Tiffany Woo
- publisher: `@type`: Organization, name: MAGNETRACK Lighting
- mainEntityOfPage 指向当前 URL

## 2. BreadcrumbList Schema + 视觉面包屑
- JSON-LD BreadcrumbList: Home → Blog → Article
- 视觉面包屑导航条: Home / Blog / Article

## 3. 相关文章内链
每篇底部添加 "Related Articles" 板块，链接 2 篇相关文章。

## 4. 图片 Alt 优化
Hero 图片 Alt 必须用描述性关键词短语，非通用描述。

## 5. 返回链接
指向 `blog/index.html`，文案: "← Back to Blog"

## 6. 发布时间间隔
新 Blog 与上一篇间隔 1-2 天。

## 7. Blog 首页卡片 (blog/index.html)
- 每个 `<article>` 添加 `itemscope itemtype="https://schema.org/BlogPosting"`
- 包含 `itemprop="datePublished"` 和 `itemprop="author"`
- 卡片显示发布日期 (blog-card-date)

## 8. Sitemap
- 所有 URL 必须包含 `<lastmod>`
- Blog 文章按实际发布日期设置 lastmod

## 9. 首页底部链接
- Blog 链接统一指向 `blog/index.html`
- 不直接指向单篇 blog-post-*.html
