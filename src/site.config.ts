import { defineSolitudeConfig } from './lib/config';

export default defineSolitudeConfig({
  site: process.env.SITE_URL || 'https://freeip.blog',
  title: 'FreeIP Blog',
  description:
    'FreeIP Blog - 专注于网络自由、数字技术、独立开发与前沿探索的独立博客。',
  locale: 'zh-CN',
  timeZone: 'Asia/Shanghai',
  author: { name: 'FreeIP' },
  menus: [
    {
      name: '四大专题大系',
      children: [
        { name: '平价高性价比专题', url: '/p/best-budget-airports-guide/', icon: 'fas fa-coins' },
        { name: '游戏低延迟专线专题', url: '/p/gaming-and-iplc-airports-guide/', icon: 'fas fa-gamepad' },
        { name: 'AI生产力与TikTok专线', url: '/p/ai-and-tiktok-residential-ip-guide/', icon: 'fas fa-robot' },
        { name: '不限时按量备用专题', url: '/p/non-expiring-backup-airports-guide/', icon: 'fas fa-shield-halved' },
      ],
    },
    {
      name: '知识与避坑',
      children: [
        { name: '🚨 机场跑路预警与风控防雷', url: '/p/airport-scam-and-risk-warning-guide/', icon: 'fas fa-triangle-exclamation' },
        { name: '📚 出海网络百科全书 (万字FAQ)', url: '/p/ultimate-airport-and-proxy-faq-guide/', icon: 'fas fa-book-open' },
        { name: '🎁 免费资源与应急救急手册', url: '/p/free-vpn-and-proxy-resources-guide/', icon: 'fas fa-gift' },
      ],
    },
    {
      name: '测评与榜单',
      children: [
        { name: '2026年度测速天梯总榜', url: '/p/2026-best-airports-speedtest-ranking/', icon: 'fas fa-trophy' },
        { name: '光速云王牌深度评测', url: '/p/guangsu-cloud-review/', icon: 'fas fa-bolt' },
        { name: '老牌与备选综合档案库', url: '/p/backup-airports-compendium/', icon: 'fas fa-database' },
      ],
    },
    {
      name: '客户端与工具',
      children: [
        { name: '全平台客户端选型与配置', url: '/p/proxy-clients-complete-guide/', icon: 'fas fa-laptop-code' },
        { name: '分类检索', url: '/categories/', icon: 'fas fa-clone' },
        { name: '标签聚合', url: '/tags/', icon: 'fas fa-tags' },
      ],
    },
    {
      name: '文库归档',
      url: '/archives/',
    },
    {
      name: '关于',
      children: [
        { name: '关于本站与评测准则', url: '/about/' },
        { name: '友情链接', url: '/links/' },
        { name: '装备清单', url: '/equipment/' },
        { name: '碎碎念', url: '/brevity/' },
      ],
    },
  ],
  theme: {
    lightbox: 'fancybox',
    nav: {
      group: {
        专题与天梯: [
          {
            name: '2026测速天梯',
            url: '/p/2026-best-airports-speedtest-ranking/',
            icon: '/img/logo.png',
          },
          {
            name: '平价选购大系',
            url: '/p/best-budget-airports-guide/',
            icon: '/img/logo.png',
          },
          {
            name: '全平台客户端',
            url: '/p/proxy-clients-complete-guide/',
            icon: '/img/logo.png',
          },
          {
            name: '关于本站',
            url: '/about/',
            icon: '/img/logo.png',
          },
        ],
      },
    },
    hometop: {
      banner: {
        title: '探索自由网络与技术边界',
        desc: 'FreeIP Blog — 专注独立思考、技术沉淀与前沿数字探索。',
      },
    },
    aside: {
      home: { noSticky: 'about', Sticky: 'allInfo' },
      post: { noSticky: 'about', Sticky: 'newestPost,allInfo' },
      page: { noSticky: 'about', Sticky: 'newestPost,allInfo' },
      my_card: {
        description: '自由网络架构与独立开发者的技术自留地。',
        content: '探索技术边界，连接自由世界。',
        witty_words: ['代码构筑自由', '思想连接世界', '保持好奇与专注'],
        information: [
          {
            name: '关于',
            url: '/about/',
            icon: 'fas fa-user',
          },
          {
            name: 'RSS',
            url: '/index.xml',
            icon: 'fas fa-rss',
          },
        ],
      },
    },
    footer: {
      information: {
        left: [
          {
            name: '关于',
            url: '/about/',
            icon: 'fas fa-circle-info',
          },
        ],
        right: [{ name: 'RSS', url: '/index.xml', icon: 'fas fa-rss' }],
      },
      group: {
        专题大系: [
          { name: '平价高性价比专题', url: '/p/best-budget-airports-guide/' },
          { name: '游戏超低延迟专线', url: '/p/gaming-and-iplc-airports-guide/' },
          { name: 'AI与TikTok专线', url: '/p/ai-and-tiktok-residential-ip-guide/' },
          { name: '不限时按量备用', url: '/p/non-expiring-backup-airports-guide/' },
        ],
        评测与选型: [
          { name: '测速天梯总榜', url: '/p/2026-best-airports-speedtest-ranking/' },
          { name: '光速云深度评测', url: '/p/guangsu-cloud-review/' },
          { name: '客户端配置指南', url: '/p/proxy-clients-complete-guide/' },
          { name: '老牌机场档案库', url: '/p/backup-airports-compendium/' },
        ],
      },
    },
    capsule: { enable: false, id: '', type: 'playlist', server: 'netease' },
    post: {
      meta: { locate: false },
      covercolor: { enable: true, mode: 'local' },
    },
    brevity: { enable: true },
    keyboard: {
      enable: true,
      list: [
        { modifier: 'shift', key: 'D', action: 'toggleTheme' },
        { modifier: 'mod', key: 'F', action: 'openSearch' },
        { modifier: 'shift', key: 'K', action: 'toggleKeyboard' },
      ],
    },
    search: { tags: ['网络', '专线', '光速云', '客户端'], local: { preload: true } },
    pwa: { enable: true },
  },
});
