const fs = require('fs');
const path = require('path');

// 需要保留的翻译文件（根据 i18n/request.ts）
const keepFiles = [
  'common.json',
  'Home.json',
  'Testimonials.json',
  'CarlyRaeJepsenFont.json',
  'CalligraphyGenerator.json',
  'PokemonFont.json',
  'MinecraftFont.json',
  'TheLifeOfAShowgirlFont.json',
  'DisneyFont.json',
  'BratFont.json',
  'GraffitiGenerator.json',
  'HindiFontGenerator.json',
  'TamilFontGenerator.json',
  'UndertaleFont.json',
  'CocaColaFont.json',
  'DemonSlayerFont.json',
  'GtaFont.json',
  'SquidGameFont.json',
  'MontserratFont.json',
  'MalayalamFontGenerator.json',
  'SonicFont.json',
  'PlusJakartaSans.json',
  'FontGenerator.json'
];

// 所有语言目录
const locales = ['en', 'zh-CN', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pl', 'pt', 'ru'];

const messagesDir = path.join(__dirname, '../i18n/messages');

locales.forEach(locale => {
  const localeDir = path.join(messagesDir, locale);
  
  if (!fs.existsSync(localeDir)) {
    console.log(`Skipping ${locale} - directory not found`);
    return;
  }

  const files = fs.readdirSync(localeDir);
  let deletedCount = 0;

  files.forEach(file => {
    if (!keepFiles.includes(file)) {
      const filePath = path.join(localeDir, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${locale}/${file}`);
        deletedCount++;
      } catch (error) {
        console.error(`Error deleting ${locale}/${file}:`, error.message);
      }
    }
  });

  if (deletedCount > 0) {
    console.log(`\n${locale}: Deleted ${deletedCount} file(s)\n`);
  } else {
    console.log(`${locale}: No files to delete\n`);
  }
});

console.log('Done!');


