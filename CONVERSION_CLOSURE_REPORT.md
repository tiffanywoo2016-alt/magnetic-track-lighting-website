# Tracklinear 转化闭环报告

日期：2026-08-25

## 已通过网站和线上 URL 证据闭环

- 追踪脚本已上线：`https://tracklinear.com/scripts/conversion-tracking.js`。
- GA4 衡量 ID `G-WXHSW5Y7V8` 已存在于线上追踪脚本。
- Microsoft Clarity 加载代码已存在于线上追踪脚本，项目 ID 为 `y78d9q40xm`。
- `https://tracklinear.com/c6d1ad5644698b77560ad8b4ec9c8216.txt` 返回 200，并且内容为 IndexNow key。
- `https://tracklinear.com/sitemap.xml` 返回 200，并包含有效 sitemap 内容。
- `https://tracklinear.com/index.html` 已引用 `scripts/conversion-tracking.js?v=20260825-web3forms`。
- `https://tracklinear.com/contact.html` 已使用 Web3Forms，并引用 `scripts/conversion-tracking.js?v=20260825-web3forms`。
- IndexNow 已成功提交：共提交 34 个 URL，返回状态 200。

## 本地覆盖检查

- 已检查 HTML 页面：50 个。
- 当前正式追踪页面：36 个。
- 询盘表单数量：30 个。
- Web3Forms 表单数量：30 个。
- 已启用 Ajax 提交的表单数量：30 个。
- FormSubmit 表单数量：0 个。

未加载追踪脚本的 14 个页面是旧的根目录 `blog-post-*` 跳转页。这些页面是 `noindex` 跳转页，且没有收录在 `sitemap.xml` 中，因此不作为当前正式转化页面处理。

## 已在 `scripts/conversion-tracking.js` 中实现的事件

- `generate_lead`
- `lead_submit_success`
- `whatsapp_click`
- `email_click`
- `phone_click`
- `resource_request_click`
- `cta_click`

## 不能仅靠代码证明完成的事项

以下事项必须进入对应后台确认，未确认前不能宣称完全完成：

- GA4 在真实浏览器测试后收到相关事件。
- GA4 已将主要事件标记为 Key Events。
- Clarity 后台显示安装成功，并开始接收访问会话。
- Bing Webmaster Tools 显示网站验证成功，且 sitemap 状态为已接受或待处理但无 URL 错误。
- Tracklinear 业务邮箱收到 Web3Forms 的真实测试询盘邮件。

## 自动化测试说明

- 已尝试用脚本直接向 Web3Forms 提交测试表单，但 Web3Forms 返回 Cloudflare JavaScript 验证。因此命令行提交不能证明表单投递成功，必须用真实浏览器提交，并在邮箱里确认收件。
- 已尝试使用浏览器自动化做页面级测试，但浏览器控制会话超时。因此 GA4 事件是否进入 Realtime 或 DebugView，仍需通过 GA4 后台确认。

## 最后人工闭环检查

1. 打开 `https://tracklinear.com/contact.html?utm_source=codex&utm_medium=manual&utm_campaign=conversion_closure`。
2. 提交一条测试询盘，内容写：`GA4/Web3Forms test only, please ignore.`
3. 确认 Tracklinear 邮箱收到这条询盘。
4. 在 GA4 Realtime 或 DebugView 中确认 `generate_lead` 和 `lead_submit_success`。
5. 在 GA4 Admin 中把主要事件标记为 Key Events：
   - `generate_lead`
   - `lead_submit_success`
   - `whatsapp_click`
   - `email_click`
6. 在 Clarity 中确认安装状态为 active，并等待会话数据出现。
7. 在 Bing Webmaster Tools 中验证 Tracklinear，并提交 `https://tracklinear.com/sitemap.xml`。

