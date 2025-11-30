const fs = require('fs');
const path = require('path');

// 所有字体生成器页面
const fontPages = [
  { path: '/font-generator', name: 'Font Generator' },
  { path: '/carly-rae-jepsen-font', name: 'Carly Rae Jepsen Font' },
  { path: '/calligraphy-generator', name: 'Calligraphy Generator' },
  { path: '/pokemon-font', name: 'Pokemon Font' },
  { path: '/minecraft-font', name: 'Minecraft Font' },
  { path: '/the-life-of-a-showgirl-font', name: 'The Life of a Showgirl Font' },
  { path: '/disney-font', name: 'Disney Font' },
  { path: '/brat-font', name: 'Brat Font' },
  { path: '/graffiti-generator', name: 'Graffiti Generator' },
  { path: '/hindi-font-generator', name: 'Hindi Font Generator' },
  { path: '/tamil-font-generator', name: 'Tamil Font Generator' },
  { path: '/malayalam-font-generator', name: 'Malayalam Font Generator' },
  { path: '/undertale-font', name: 'Undertale Font' },
  { path: '/coca-cola-font', name: 'Coca-Cola Font' },
  { path: '/demon-slayer-font', name: 'Demon Slayer Font' },
  { path: '/gta-font', name: 'GTA Font' },
  { path: '/squid-game-font', name: 'Squid Game Font' },
  { path: '/montserrat-font', name: 'Montserrat Font' },
  { path: '/sonic-font', name: 'Sonic Font' },
  { path: '/plus-jakarta-sans', name: 'Plus Jakarta Sans' },
];

// 中文翻译
const zhCNNames = {
  'Font Generator': '字体生成器',
  'Carly Rae Jepsen Font': 'Carly Rae Jepsen 字体',
  'Calligraphy Generator': '书法生成器',
  'Pokemon Font': 'Pokemon 字体',
  'Minecraft Font': 'Minecraft 字体',
  'The Life of a Showgirl Font': 'The Life of a Showgirl 字体',
  'Disney Font': 'Disney 字体',
  'Brat Font': 'Brat 字体',
  'Graffiti Generator': '涂鸦生成器',
  'Hindi Font Generator': '印地语字体生成器',
  'Tamil Font Generator': '泰米尔语字体生成器',
  'Malayalam Font Generator': '马拉雅拉姆语字体生成器',
  'Undertale Font': 'Undertale 字体',
  'Coca-Cola Font': '可口可乐字体',
  'Demon Slayer Font': '鬼灭之刃字体',
  'GTA Font': 'GTA 字体',
  'Squid Game Font': '鱿鱼游戏字体',
  'Montserrat Font': 'Montserrat 字体',
  'Sonic Font': '索尼克字体',
  'Plus Jakarta Sans': 'Plus Jakarta Sans',
};

// 获取所有语言目录
const i18nDir = path.join(__dirname, '../i18n/messages');
const locales = fs.readdirSync(i18nDir).filter(dir => {
  const dirPath = path.join(i18nDir, dir);
  return fs.statSync(dirPath).isDirectory() && fs.existsSync(path.join(dirPath, 'common.json'));
});

locales.forEach(locale => {
  const commonPath = path.join(i18nDir, locale, 'common.json');
  const common = JSON.parse(fs.readFileSync(commonPath, 'utf8'));
  
  // 更新 Products 部分的链接
  const productsGroup = common.Footer.Links.groups.find(g => g.title === 'Products' || g.title === '产品');
  if (productsGroup) {
    // 保留 Home 链接，添加所有字体生成器链接
    productsGroup.links = [
      { href: '/', name: locale === 'zh-CN' ? '首页' : 'Home' },
      ...fontPages.map(page => ({
        href: page.path,
        name: locale === 'zh-CN' ? (zhCNNames[page.name] || page.name) : page.name
      }))
    ];
  }
  
  // 格式化并写入
  fs.writeFileSync(commonPath, JSON.stringify(common, null, 2) + '\n', 'utf8');
  console.log(`Updated ${locale}/common.json`);
});

console.log('All footer links updated!');


