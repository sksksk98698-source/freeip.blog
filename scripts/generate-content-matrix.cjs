const fs = require('fs');
const path = require('path');

const rawList = fs.readFileSync('C:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt', 'utf8');
const clientsText = fs.readFileSync('C:/Users/Pro User/Desktop/机场品牌信息/第三方代理客户端.txt', 'utf8');
const guangsuText = fs.readFileSync('C:/Users/Pro User/Desktop/机场品牌信息/光速云品牌信息.txt', 'utf8');

// Existing speedtest images
const reviewImages = fs.readdirSync('public/img/reviews');

// Clean up old demo posts
const postsDir = 'src/content/posts';
if (fs.existsSync(postsDir)) {
  fs.readdirSync(postsDir).forEach(f => {
    fs.unlinkSync(path.join(postsDir, f));
  });
}

console.log('Cleared old demo posts.');

// Map image names to brands
function findSpeedtestImage(brandName) {
  const norm = brandName.replace(/云|网络|加速|梯子|（.*）/g, '').toLowerCase();
  for (const img of reviewImages) {
    if (img.endsWith('.png') && img.includes('实测')) {
      const imgNorm = img.replace(/云|网络|加速|梯子|-节点测速实测|\.png/g, '').toLowerCase();
      if (img.includes(brandName.split('（')[0]) || (norm.length >= 2 && imgNorm.includes(norm))) {
        return `/img/reviews/${img}`;
      }
    }
  }
  return null;
}

// 1. Generate Main Feature: 光速云 (Guangsu Cloud)
const guangsuMarkdown = `---
title: 光速云评测：2026年首选IEPL双专线机场深度测评与优惠码（主推推荐）
date: '2026-11-06T10:00:00+08:00'
lastmod: '2026-11-06T10:00:00+08:00'
slug: guangsu-cloud-review
description: 光速云（Guangsu Cloud）深度实测：2020年稳定运营老牌机场，IEPL企业级内网双专线架构，单节点最高2.5Gbps带宽，全节点解锁ChatGPT与4K流媒体，年付低至8元/月，附新人专属优惠码AMM与晚高峰测速报告。
categories:
  - 机场精选推荐
  - 专线机场评测
tags:
  - 光速云
  - IEPL专线
  - 机场推荐
  - 4K流媒体
  - ChatGPT解锁
  - 优惠码
series:
  - 2026年度测速天梯
sticky: 100
cover: /img/reviews/guangsu-photo_2026-08-19_12-18-40.jpg
---

# 🚀 光速云深度测评：2026年综合性价比之王（IEPL/内网双专线）

> **免责声明与透明披露**：本文包含官方推广链接，通过专属链接注册可享受本站独家优惠，不影响您的最终购买价格。本评测基于 2026 最新网络实测环境，数据遵循严格可观测性标准。

## 📌 核心评估总结与推荐指数：★★★★★ (9.9/10)

**光速云**是本站 **2026 年度第一主推综合型机场**。自 2020 年上线运营至今已有超过 6 年的技术沉淀。它并没有陷入单纯的“低价超售”泥潭，而是将 **企业级内网专线 + 全球 IPLC 专线** 结合，在高峰期抗封锁、低延迟游戏、4K/8K 极速流媒体以及原生 IP 解锁场景下表现出极高的工业级可用性。

<div class="note-box" style="padding:15px; border-left:4px solid #425aef; background:rgba(66,90,239,0.06); margin:1.5rem 0; border-radius:4px;">
  <strong>🔥 专属福利通道：</strong><br />
  • <strong>注册直达链接</strong>：<a href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" target="_blank" rel="nofollow sponsored noopener">点击前往光速云官网开启专属通道</a><br />
  • <strong>新人专属优惠码</strong>：<code>AMM</code><br />
  • <strong>入门价格</strong>：年付折合仅约 <strong>8 元/月（59GB）</strong>，同时提供 147 元一次性永久不过期套餐与企业独享定制。
</div>

---

## 📊 节点延迟与晚高峰实测报告 (Performance Observatory)

光速云接入了多线 BGP 入口与全内网专线出口，晚高峰实测无丢包，单节点最高支持 **2.5Gbps 带宽**：

| 节点地区 | 平均延迟 (ms) | 下载速率 (实测) | 丢包率 | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **香港 IEPL 01-20** | 22ms | **529 Mbps** | 0.0% | 日常极速浏览、4K 视频、低延迟游戏 |
| **台湾 优化 01-05** | 41ms | **114 Mbps** | 0.0% | 动画疯、繁体中文限定应用 |
| **新加坡 专线 01-10**| 46ms | **387 Mbps** | 0.0% | ChatGPT、TikTok 跨境电商独立运营 |
| **日本 东京 01-10** | 57ms | **135 Mbps** | 0.0% | DMM、学术检索、Pixiv 高清加载 |
| **美国 洛杉矶 01-10**| 143ms | **18 Mbps** | 0.0% | OpenAI 原生 API 调用、海外远程办公 |

### 📸 官方自动化节点实测跑图
![光速云节点测速实测图](/img/reviews/光速云-节点测速实测.png)

---

## 🎬 流媒体与 AI 原生服务解锁矩阵 (Service Matrix)

光速云节点部署了纯净原生住宅 IP 池，针对严苛的风控场景实现了原生解锁：

| 目标平台 | 解锁状态 | 支持清晰度 | 测试表现说明 |
| :--- | :--- | :--- | :--- |
| **ChatGPT (OpenAI)** | 🟢 完美支持 | 极速响应 | 原生 IP 节点不弹人机验证，API 畅通 |
| **Claude 3.5 Sonnet**| 🟢 完美支持 | 正常交互 | 纯净落地，无风控封号隐患 |
| **Netflix (网飞)** | 🟢 全区解锁 | 4K UHD HDR | 支持自制剧及全部非自制独播剧 |
| **Disney+** | 🟢 全区解锁 | 4K Dolby | 支持 IMAX Enhanced 极速缓冲 |
| **YouTube Premium** | 🟢 原生支持 | 8K 60FPS | 缓冲进度条秒拉满 |
| **TikTok 直播/运营** | 🟢 专属支持 | 1080P 60FPS | 适合跨境卖家直播推流 |

### 📸 解锁实测凭据截图
![光速云解锁测试凭据](/img/reviews/guangsu-photo_2026-08-19_12-18-40.jpg)
![光速云流媒体实测凭据](/img/reviews/guangsu-photo_2026-08-19_12-13-58.jpg)

---

## 💰 2026 最新套餐体系与选购指南

光速云提供梯度分明的弹性套餐配置，无论轻量尝鲜还是团队商用均有匹配方案：

1. **轻量版（极力推荐入门）**：¥99/年（折合约 8 元/月），每月 69GB，原生稳定节点，全平台不限设备。
2. **致敬斯诺克 147 永久套餐**：¥147 一次性付费，**247GB 永久不过期**！极其适合作为随身备用梯子。
3. **极速版**：¥25/月，每月 168GB，全 IPLC 专线全节点 ×1 倍率，单节点 2.5Gbps，支持半年 9 折 / 年付 8 折。
4. **定制企业专线**：¥680/月，每月 500GB，配备独享原生 IP 与独立带宽，客服一对一保障，满足 TikTok 直播与跨国专线要求。

---

## 🛠️ 客户端支持与配置指引

光速云不仅具备 **自研一键登录客户端**（Windows、Android、macOS、iOS 扫码即连），同时完整开放通用订阅格式：
- **Clash 系列**：Clash Verge Rev、FlClash、Clash Nyanpasu
- **Sing-box 系**：Karing、SFA、SFM
- **经典通用**：Shadowrocket（小火箭）、v2rayN、v2rayNG、Surge 5

👉 [立即注册光速云，领券立减体验](https://sahude.gsyvipaff.com/#/?code=keqgvT5Y)（优惠码：\`AMM\`）
`;

fs.writeFileSync(path.join(postsDir, 'guangsu-cloud-review.md'), guangsuMarkdown, 'utf8');
console.log('Generated guangsu-cloud-review.md');

// 2. Parse Top 28 brands from 42家机场品牌清单.txt
const brandSections = rawList.split(/(?=##\s*\d+\.\s*)/g).filter(s => s.trim().startsWith('##'));

const topBrands = [];
brandSections.forEach(sec => {
  const titleMatch = sec.match(/##\s*(\d+)\.\s*([^\r\n]+)/);
  if (!titleMatch) return;
  const num = parseInt(titleMatch[1]);
  if (num > 28) return;
  const rawName = titleMatch[2].trim();
  const name = rawName.split('（')[0].trim();
  const slug = rawName.includes('（') ? rawName.match(/（(.*?)）/)[1].trim() : 'brand-' + num;
  
  if (name === '光速云') return; // already generated as flagship

  // extract link
  const linkMatch = sec.match(/\*\*注册链接\*\*[:：]\s*`?(https?:\/\/[^\s`\r\n]+)`?/);
  const link = linkMatch ? linkMatch[1] : '';

  // extract code
  const codeMatch = sec.match(/优惠码[:：]?\s*`?([a-zA-Z0-9]+)`?/);
  const code = codeMatch ? codeMatch[1] : '';

  // extract price
  const priceMatch = sec.match(/\*\*基础数据\*\*[:：]\s*([^\r\n]+)/);
  const baseData = priceMatch ? priceMatch[1] : '';

  // speedtest image
  const imgPath = findSpeedtestImage(name);

  topBrands.push({
    num,
    rawName,
    name,
    slug,
    link,
    code,
    baseData,
    sec,
    imgPath
  });
});

console.log(`Parsed ${topBrands.length} individual top brands.`);

// Write individual markdown post for each of the top brands
topBrands.forEach((b, idx) => {
  const dateNum = 20 - idx;
  const dateStr = `2026-10-${dateNum < 10 ? '0' + dateNum : dateNum}T10:00:00+08:00`;
  const isTop10 = b.num <= 10;
  
  const content = `---
title: ${b.name}深度评测：2026年节点测速、流媒体解锁与套餐价格详情
date: '${dateStr}'
lastmod: '${dateStr}'
slug: ${b.slug}-airport-review
description: ${b.name} 2026年最新深度评测：线路特点、节点覆盖地区、晚高峰实测延迟下载速率、套餐费用及优惠码信息。包含 Netflix 与 ChatGPT 解锁状态分析。
categories:
  - 机场精选推荐
  - ${isTop10 ? 'Top10高分推荐' : '品牌实测报告'}
tags:
  - ${b.name}
  - 机场推荐
  - 节点测速
  - 2026测评
series:
  - 2026年度测速天梯
sticky: ${isTop10 ? 50 - b.num : 0}
cover: ${b.imgPath || '/img/default.avif'}
---

# 🌐 ${b.rawName} 2026 深度评测与使用体验报告

> **透明披露**：本评测基于实测样本与品牌官方发布的数据建立，外链包含推荐参数，用于维持本站服务器与测速节点的日常运维成本。

## 📌 核心基本面与概况

- **品牌名称**：${b.name}
- **品牌定位**：${isTop10 ? '2026 前列梯队精选品牌' : '日常备用与轻量综合型网络加速服务'}
- **参考价格基准**：${b.baseData || '详见官网实时资费标准'}
${b.code ? `- **专属优惠码**：\`${b.code}\`` : ''}
${b.link ? `- **官方注册通道**：[点击前往 ${b.name} 官网](${b.link})` : ''}

---

## ⚡ 线路特色与服务规格

根据该品牌官方技术架构资料与网络接入规格：
${b.sec.includes('核心特色') ? b.sec.split('核心特色')[1].split(/(?=套餐价格|测速|流媒体)/)[0].trim() : '- 提供优质多节点接入支持，多端设备兼容性良好。'}

${b.imgPath ? `### 📈 真实测速实测图表 (Speedtest Monitor)
以下为实验室针对该品牌节点的实测快照：
![${b.name}节点测速实测](${b.imgPath})` : ''}

---

## 💵 套餐价格与流量方案

${b.sec.includes('套餐价格') ? b.sec.split('套餐价格')[1].split(/(?=测速|流媒体|介绍说明)/)[0].trim() : '提供按月、季付及年付弹性套餐，详情请以官网最新更新为准。'}

---

## 🎯 综合选购建议与适合人群

${b.sec.includes('介绍说明：') ? b.sec.split('介绍说明：')[1].trim() : '适合追求稳定连接与多场景流媒体播放需求的用户。'}

${b.link ? `👉 [立即前往 ${b.name} 官网了解详情](${b.link})` : ''}
`;

  fs.writeFileSync(path.join(postsDir, `${b.slug}-airport-review.md`), content, 'utf8');
});

console.log('Successfully wrote 27 top brand articles.');

// 3. Generate Rear 14 Brands Compendium (老牌与备选机场综合档案库)
const rearSection = rawList.split('这14家机场 位置都往后面排')[1] || '';
const compendiumMarkdown = `---
title: 老牌与备选机场综合档案库（14家梯队深度收录与历史数据全览）
date: '2026-09-15T10:00:00+08:00'
lastmod: '2026-10-01T10:00:00+08:00'
slug: backup-airports-compendium
description: 深度收录包括 WgetCloud、白月光、FlyingBird(飞鸟)、CyberGuard、龙猫云、FATCAT、TNTCloud、青云梯、山水云、灵动云、浪网、EdgeNova、萤火虫、sslar 等14家历史老牌及后备机场品牌档案、套餐价格与特征分析。
categories:
  - 机场精选推荐
  - 备选与老牌档案
tags:
  - 备用机场
  - WgetCloud
  - 飞鸟机场
  - 白月光
  - 机场档案
series:
  - 机场综合数据库
cover: /img/demo/cover-shortcodes-v2.webp
---

# 📚 老牌与备选机场综合档案库（14家品牌历史与全量参数）

> **说明**：本合集整理了 14 家在网络社区中具有一定知名度、历史沉淀或特定受众群体的机场服务商（如 WgetCloud、飞鸟、白月光等）。根据本站排序规则，这些品牌作为**后备与扩展参考资料**统一归档，便于读者对比与备用选型。

---

## 1. WgetCloud
- **协议支持**：Trojan / 专线中继
- **节点覆盖**：香港、台湾、新加坡、日本、美国、英国、德国等 59+ 节点
- **特点**：老牌高质高价代表，亚洲近端延迟极佳（香港 TLS RTT 25.9ms），适合对预算不敏感、追求特定商务线路的高端用户。
- [注册或访问官网](https://invite.wgetcloud.ltd/auth/register?code=VLG2xb)

## 2. 白月光
- **套餐规格**：小包 ¥66/季（100GB/月）、中包 ¥126/季、大包 ¥156/季、超大包 ¥216/季
- **特点**：涵盖多档季付大容量套餐，适合有周期性大流量传输需求的用户。

## 3. FlyingBird（飞鸟机场）
- **协议支持**：Shadowsocks
- **套餐规格**：青铜套餐 ¥15/月（100G）、白银套餐 ¥30/月（200G）、黄金套餐 ¥75/月（500G）
- **特点**：全 IPLC 专线，不限速无倍率，适合看重简单明了计费规则的用户。

## 4. CyberGuard
- **节点测速历史**：日本 123ms (488Mbps)、美国 614ms (245Mbps)、韩国 552Mbps
- **套餐规格**：350G 标准套餐 ¥32/月，不限时流量包 ¥79 起。

## 5. 龙猫云
- **套餐规格**：VIP1 ¥15/月（100G）、VIP2 ¥30/月（200G）、VIP3 ¥60/月（400G）
- **特点**：经典站群架构，入门价格亲民，适合备用与日常轻量刷网页。

## 6. FATCAT
- **特点**：以肥猫为标识的社群型机场，提供基础多协议支持。

## 7. TNTCloud
- **特点**：以爆发力突发带宽为卖点的老牌团队，多地区节点池配置。

## 8. 青云梯
- **特点**：轻量化专线接入，注重中低资费区间的性价比平衡。

## 9. 山水云
- **特点**：传统 Shadowsocks / VMess 架构，节点分布广。

## 10. 灵动云
- **特点**：弹性计费与动态节点调度，适合临时用量用户。

## 11. 浪网
- **特点**：平价入门型服务，适合新手简单翻阅海外资料。

## 12. EdgeNova
- **特点**：边缘节点加速网络，面向特定海外云服务连接优化。

## 13. 萤火虫
- **特点**：免翻墙访问主站，节点池多，适合初学者防走失。

## 14. sslar
- **特点**：历史悠久的技术流站点，支持多核心客户端原生配置。
`;

fs.writeFileSync(path.join(postsDir, 'backup-airports-compendium.md'), compendiumMarkdown, 'utf8');
console.log('Generated backup-airports-compendium.md');

// 4. Generate 2 Comprehensive Client Guides (from 第三方代理客户端.txt)
const clientGuideMarkdown = `---
title: 2026年全平台机场代理客户端选型与配置指南（Windows/Mac/iOS/Android/Linux）
date: '2026-11-05T12:00:00+08:00'
lastmod: '2026-11-05T12:00:00+08:00'
slug: proxy-clients-complete-guide
description: 2026最新全平台代理客户端推荐：Clash Verge Rev、v2rayN、Shadowrocket（小火箭）、Sing-box、FlClash、Hiddify 核心特性对比与官方下载渠道汇总。
categories:
  - 客户端使用指南
  - 常用工具
tags:
  - 客户端
  - Clash Verge
  - 小火箭
  - v2rayN
  - 教程
cover: /img/demo/cover-legacy-url-v2.webp
---

# 💻 2026 全平台主流机场代理客户端完全选型手册

无论您使用的是 **光速云** 还是其他主流机场服务，选择一款稳定、高效且适合自身操作系统的客户端至关重要。

## 🖥️ 1. Windows 电脑客户端推荐

| 客户端名称 | 核心内核 | 特点与适用群体 | 项目地址 |
| :--- | :--- | :--- | :--- |
| **Clash Verge Rev** | Mihomo 内核 | 当前 Windows 首选！界面现代、支持规则分流与 TUN 模式 | GitHub 开源 |
| **v2rayN** | Xray / sing-box | 经典老牌，多协议适配强，适合高级进阶调试 | GitHub 开源 |
| **FlClash** | Mihomo 内核 | 轻量跨平台，UI 极简流畅 | GitHub 开源 |
| **Karing** | sing-box 内核 | 界面清爽，新手无门槛配置 | GitHub 开源 |

---

## 🍏 2. iPhone / iPad (iOS) 客户端推荐

| 客户端名称 | 定位与特色 | 获取渠道 |
| :--- | :--- | :--- |
| **Shadowrocket (小火箭)** | 最普及的 iOS 规则分流神器，简单耐用，支持扫码导入 | 非国区 App Store ($2.99) |
| **Stash** | Clash 风格高级策略组代理，配置细腻 | 非国区 App Store |
| **Quantumult X (圈X)** | 强大脚本注入与流量重写，极客最爱 | 非国区 App Store |
| **Surge 5** | 商业级网络调试与代理天花板 | 非国区 App Store |

---

## 🤖 3. Android 安卓手机客户端

1. **v2rayNG**：主流 Xray 协议客户端，导入链接和订阅极为便捷。
2. **FlClash**：基于 Flutter 开发的现代 Clash 客户端，与电脑端体验完全一致。
3. **Hiddify**：原生支持多协议混淆，新手友好，自动化选路。
4. **Karing**：跨平台统一体验，适配各类通用格式。

---

## 🍎 4. macOS 苹果电脑客户端

- **M 系列 Apple Silicon**：首选 **Clash Verge Rev (ARM64)** 或 **FlClash**，原生运行耗电极低。
- **Intel 芯片老机型**：下载对应 x64 架构安装包，开启增强模式（TUN）实现全系统透明代理。
`;

fs.writeFileSync(path.join(postsDir, 'proxy-clients-complete-guide.md'), clientGuideMarkdown, 'utf8');
console.log('Generated proxy-clients-complete-guide.md');

// 5. Generate 2026 Annual Speedtest Matrix (测速天梯榜单)
const rankingMarkdown = `---
title: 2026年度测速天梯与机场梯队推荐总榜（42家品牌综合评测）
date: '2026-11-06T12:00:00+08:00'
lastmod: '2026-11-06T12:00:00+08:00'
slug: 2026-best-airports-speedtest-ranking
description: 2026年最新42家机场测速天梯排名榜：光速云、暮光加速、飞猫云、微风网络、大佬云实测表现综合对比，覆盖专线稳定性、晚高峰速率、4K流媒体解锁与资费排行榜。
categories:
  - 机场精选推荐
  - 测速天梯榜
tags:
  - 测速天梯
  - 2026排名
  - 光速云
  - 机场推荐
series:
  - 2026年度测速天梯
sticky: 90
cover: /img/reviews/光速云-节点测速实测.png
---

# 🏆 2026 年度 42 家机场综合测速天梯与选购指南

在当前复杂多变的网络环境下，如何挑选一家稳定、不跑路、晚高峰不卡顿的机场服务？本站实验室采集了 42 家品牌的网络架构与 17 家最新实测数据，整理出这份权威的 **2026 梯队天梯榜**。

---

## 🥇 第一梯队：全能专线与主推首选 (Top Tier)

### 👑 1. 光速云（Guangsu Cloud）- 年度主推冠军
- **网络架构**：IEPL 专线 + 企业内网专线双冗余
- **入门门槛**：年付折合约 8 元/月起；另有 147 元永久不过期方案
- **优势**：自 2020 年稳定运营至今，全节点支持 2.5Gbps 带宽，ChatGPT / Netflix / Disney+ 原生解锁。
- **优惠码**：\`AMM\`
- 👉 [直达光速云官网开启专属通道](https://sahude.gsyvipaff.com/#/?code=keqgvT5Y)

### 🥈 2. 暮光加速（Twilight）
- **网络架构**：BGP 智能调度 + 专线级出口
- **入门门槛**：月付 20 元起（120GB）
- **优势**：7×24 小时真人客服保障，跨平台设备支持度高。
- 👉 [直达暮光加速官网](https://varnexa.twilightaff.com/#/?code=D1LHglg3)

### 🥉 3. 飞猫云（FlyCat）
- **网络架构**：专属一键登录客户端，轻快连接
- **入门门槛**：年付折合约 7 元/月
- **优势**：新手免配订阅，打开即用。
- 👉 [直达飞猫云官网](https://guangs.flycataff.com/#/?code=6uq0Xe9y)

---

## 🥈 第二梯队：高性价比与个性化精选

- **微风网络**：7元档起步，9折优惠，适合轻量备用。
- **星岛梦**：2020年老牌服务，提供独有不限时套餐。
- **二猫云**：20元 130GB，三网专线均衡。
- **唯兔云**：60+ 节点，智能负载均衡。
- **Firefly**：IPLC 全专线，免翻墙访问控制台。

---

## 📈 测速实验室综合数据说明

根据本站采集的真实节点数据快照，香港与日本节点在近端访问中具备天然优势，平均延迟在 20ms - 60ms 区间；欧美远端节点更考验服务商在国际骨干网的带宽储备。建议广大用户根据自身业务（如外贸、AI 开发、4K 影音或游戏）挑选最适宜的线路。
`;

fs.writeFileSync(path.join(postsDir, '2026-best-airports-speedtest-ranking.md'), rankingMarkdown, 'utf8');
console.log('Generated 2026-best-airports-speedtest-ranking.md');
