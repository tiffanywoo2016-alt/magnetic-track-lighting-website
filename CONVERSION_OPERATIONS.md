# Tracklinear 转化运营清单

## 当前闭环状态

最新证据状态见 `CONVERSION_CLOSURE_REPORT.md`。

截至 2026-08-25，网站侧追踪代码、Web3Forms 表单路由、sitemap 可访问性、IndexNow key 可访问性、IndexNow 提交已经完成。GA4 Key Events、Clarity 后台收数、Bing Webmaster 验证、业务邮箱收件仍需要在对应账号后台确认。

## 发布后检查

1. 确认以下 URL 返回 200：
   - `https://tracklinear.com/scripts/conversion-tracking.js`
   - `https://tracklinear.com/c6d1ad5644698b77560ad8b4ec9c8216.txt`
   - `https://tracklinear.com/sitemap.xml`

2. IndexNow key 文件上线后提交 IndexNow：
   - 运行 `node scripts/submit-indexnow.mjs`
   - 返回 200 表示提交成功。
   - 返回 202 表示已接收，key 验证仍在等待。

3. 补齐必须依赖账号后台的工具：
   - Bing Webmaster Tools 网站验证 meta tag。
   - Microsoft Clarity 后台安装状态确认。
   - GA4 将 `generate_lead`、`lead_submit_success`、`whatsapp_click`、`email_click`、`resource_request_click`、`cta_click` 等事件按优先级标记。

## 账号设置检查清单

以下信息必须从真实账号后台复制，不要猜测，也不要编造。

### 1. Bing Webmaster Tools

目标：验证 `https://tracklinear.com`，提交 sitemap，并让 Bing / IndexNow 数据可见。

Tiffany 需要从 Bing 后台获取：

- 验证方式：HTML meta tag。
- 完整 meta tag，通常格式类似：
  `<meta name="msvalidate.01" content="PASTE_BING_CODE_HERE" />`

执行清单：

- 把完整 Bing meta tag 加到 `index.html` 的 `<head>` 内。
- 验证成功后仍保留该 tag。
- 在 Bing Webmaster Tools 中提交：
  `https://tracklinear.com/sitemap.xml`
- 确认 Bing 显示 Tracklinear 已验证。
- 确认 sitemap 状态为已接受，或处于待处理但没有 URL 错误。
- 确认 IndexNow key 文件在线：
  `https://tracklinear.com/c6d1ad5644698b77560ad8b4ec9c8216.txt`

成功标准：

- `index.html` 包含准确的 `msvalidate.01` meta tag。
- Bing Webmaster Tools 显示 Tracklinear 已验证。
- sitemap 已出现在 Bing Webmaster Tools 中。

### 2. Microsoft Clarity

目标：记录热图和访问录屏，用于诊断表单摩擦、CTA 点击和页面流失。

Tiffany 需要从 Clarity 后台确认：

- 项目追踪代码或项目 ID。
- 后台安装状态是否显示 active / installed。

执行清单：

- 当前网站已通过 `scripts/conversion-tracking.js` 加载 Clarity。
- 不要把 Clarity 加到 `loading.html`、模板页、跳转页或诊断报告页。
- 发布后进入 Clarity 后台确认安装状态。
- 等待数小时后再判断会话数据；Clarity 数据并不一定立刻出现。

第一次查看 Clarity 时优先看：

- 首页：用户是否滚动到联系区域。
- Manufacturer 页面：报价表单和 WhatsApp 点击情况。
- 产品页：表单开始填写与最终提交之间是否流失。
- Landing page：用户是否到达报价表单。
- 表单字段或 CTA 附近是否有重复点击、误点或卡顿。
- 移动端会话是否存在表单放弃。

### 3. GA4 Key Events

目标：把真正代表询盘意图的行为标记为 Key Events，让周报关注询盘质量，而不是只看访问量。

`scripts/conversion-tracking.js` 已发送的事件：

- `generate_lead`：任意表单提交尝试。
- `lead_submit_success`：Ajax 表单成功提交。
- `whatsapp_click`：WhatsApp 链接点击。
- `email_click`：邮箱链接点击。
- `phone_click`：电话链接点击。
- `resource_request_click`：catalogue、datasheet、installation guide、driver guide 等资源请求点击。
- `cta_click`：quotation、inquiry、project、contact 或锚点 CTA 点击。

推荐 GA4 Key Events：

主要事件：

- `generate_lead`
- `lead_submit_success`
- `whatsapp_click`
- `email_click`

次要事件：

- `resource_request_click`
- `cta_click`
- `phone_click`

GA4 设置清单：

- 打开 Tracklinear 的 GA4 Admin。
- 进入 Events，在测试行为后确认上述事件出现。
- 把主要事件标记为 Key Events。
- 次要事件先观察；如果报告数据太少，再标记为 Key Events。
- 在 DebugView 或 Realtime 中测试：
  - 提交表单
  - 点击 WhatsApp
  - 点击邮箱
  - 点击 catalogue / driver matching guide
  - 点击报价 CTA
- 建立简单周报视图，至少包含：
  - event name
  - page path
  - source / medium
  - campaign
  - country

报告判断规则：

- 合格询盘数量比总事件数量更重要。
- `generate_lead` 是强意图信号，但真实商业质量仍要结合邮件 / WhatsApp 跟进判断。
- 后续优化要用 UTM source 和 page path 判断，不要只凭页面浏览量下结论。

### 4. 发给 Codex 的账号信息

准备好后，只发送以下账号配置值：

- Bing 验证 meta tag：
  `<meta name="msvalidate.01" content="..." />`
- 如果 Clarity 项目 ID 发生变化，发送新的 Clarity 项目 ID 或完整官方追踪代码。
- 是否现在把次要 GA4 事件也标记为 Key Events，还是先观察一周数据。

不要发送密码、账号恢复码、API secret、客户隐私资料或任何不需要进入代码的敏感信息。

## UTM 规则

所有给网站导流的外部渠道都必须使用 UTM 链接。

示例：

- Alibaba profile：`https://tracklinear.com/?utm_source=alibaba&utm_medium=profile&utm_campaign=baseline`
- 邮件签名：`https://tracklinear.com/48v-magnetic-track-lighting-manufacturer-china.html?utm_source=email&utm_medium=signature&utm_campaign=sales`
- WhatsApp 跟进：`https://tracklinear.com/contact.html?utm_source=whatsapp&utm_medium=message&utm_campaign=quote_followup`
- PDF catalogue 二维码：`https://tracklinear.com/?utm_source=catalog_pdf&utm_medium=qr&utm_campaign=catalog`

## 询盘回复 SOP

内部规则：新表单询盘应触发手机提醒，并且在工作时间内尽快由人工回复。

第一封回复只问缺失的关键决策信息：

- 轨道平台或尺寸
- 安装方式
- 灯具模块类型和数量
- 驱动 / 控制需求
- 目的国家
- OEM / private label 需求
