import { readFile } from "node:fs/promises";

const host = "tracklinear.com";
const key = "c6d1ad5644698b77560ad8b4ec9c8216";
const keyLocation = `https://${host}/${key}.txt`;
const endpoint = "https://api.indexnow.org/indexnow";

const sitemap = await readFile(new URL("../sitemap.xml", import.meta.url), "utf8");
const urlList = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), (match) => match[1])
  .filter((url) => url.startsWith(`https://${host}/`))
  .filter((url) => !url.endsWith("/llms.txt"));

if (!urlList.length) {
  throw new Error("No URLs found in sitemap.xml");
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList })
});

console.log(`Submitted ${urlList.length} URLs to IndexNow`);
console.log(`Status: ${response.status} ${response.statusText}`);

if (!response.ok && response.status !== 202) {
  console.error(await response.text());
  process.exitCode = 1;
}
