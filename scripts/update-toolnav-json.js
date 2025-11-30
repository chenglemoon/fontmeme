const fs = require('fs');
const path = require('path');

const locales = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'pl', 'pt', 'ru'];

const translations = {
  de: { name: "Startseite", title: "Schriftgenerator Startseite" },
  es: { name: "Inicio", title: "Página de Inicio del Generador de Fuentes" },
  fr: { name: "Accueil", title: "Page d'Accueil du Générateur de Polices" },
  it: { name: "Home", title: "Homepage del Generatore di Font" },
  ja: { name: "ホーム", title: "フォントジェネレーターホームページ" },
  ko: { name: "홈", title: "폰트 생성기 홈페이지" },
  pl: { name: "Strona główna", title: "Strona główna generatora czcionek" },
  pt: { name: "Início", title: "Página Inicial do Gerador de Fontes" },
  ru: { name: "Главная", title: "Главная страница генератора шрифтов" },
};

locales.forEach(locale => {
  const toolnavPath = path.join(__dirname, `../i18n/messages/${locale}/ToolNav.json`);
  if (fs.existsSync(toolnavPath)) {
    const t = translations[locale];
    const content = {
      home: {
        name: t.name,
        title: t.title
      }
    };
    
    fs.writeFileSync(toolnavPath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`Updated ${locale}/ToolNav.json`);
  }
});


