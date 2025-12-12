const fs = require('fs');
const path = require('path');

const locales = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'pl', 'pt', 'ru'];

const translations = {
  de: { title: "Schriftgenerator", home: "Startseite", tagLine: "Erstellen Sie kostenlos schöne Schriftarten online!" },
  es: { title: "Generador de Fuentes", home: "Inicio", tagLine: "¡Crea hermosas fuentes en línea gratis!" },
  fr: { title: "Générateur de Polices", home: "Accueil", tagLine: "Créez de belles polices en ligne gratuitement !" },
  it: { title: "Generatore di Font", home: "Home", tagLine: "Crea bellissimi font online gratuitamente!" },
  ja: { title: "フォントジェネレーター", home: "ホーム", tagLine: "無料で美しいフォントをオンラインで作成！" },
  ko: { title: "폰트 생성기", home: "홈", tagLine: "무료로 아름다운 폰트를 온라인으로 만들기！" },
  pl: { title: "Generator Czcionek", home: "Strona główna", tagLine: "Twórz piękne czcionki online za darmo!" },
  pt: { title: "Gerador de Fontes", home: "Início", tagLine: "Crie fontes bonitas online gratuitamente!" },
  ru: { title: "Генератор Шрифтов", home: "Главная", tagLine: "Создавайте красивые шрифты онлайн бесплатно!" },
};

locales.forEach(locale => {
  const commonPath = path.join(__dirname, `../i18n/messages/${locale}/common.json`);
  if (fs.existsSync(commonPath)) {
    const content = JSON.parse(fs.readFileSync(commonPath, 'utf8'));
    const t = translations[locale];
    
    // Update Header
    if (content.Header) {
      content.Header.title = t.title;
      content.Header.links = [
        { href: "/", name: t.home }
      ];
    }
    
    // Update Footer
    if (content.Footer) {
      content.Footer.title = t.title;
      content.Footer.tagLine = t.tagLine;
      if (content.Footer.Links && content.Footer.Links.groups) {
        const productsGroup = content.Footer.Links.groups.find(g => g.title === "Products" || g.title === "Produtos" || g.title === "Produkte" || g.title === "Produits" || g.title === "Prodotti" || g.title === "製品" || g.title === "제품" || g.title === "Продукты");
        if (productsGroup) {
          productsGroup.links = [
            { href: "/", name: t.home }
          ];
        }
      }
    }
    
    fs.writeFileSync(commonPath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`Updated ${locale}/common.json`);
  }
});



