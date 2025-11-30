import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // 使用 locale 作为文件系统目录
  const fileSystemLocale = locale;

  const common = (await import(`./messages/${fileSystemLocale}/common.json`)).default;

  return {
    locale,
    messages: {
      // common (先展开)
      ...common,
      
      // Main pages (后定义，覆盖 common 中的同名属性)
      Home: (await import(`./messages/${fileSystemLocale}/Home.json`)).default,
      
      // Testimonials
      Testimonials: (await import(`./messages/${fileSystemLocale}/Testimonials.json`)).default,
      
      // Carly Rae Jepsen Font
      CarlyRaeJepsenFont: (await import(`./messages/${fileSystemLocale}/CarlyRaeJepsenFont.json`)).default,
      
      // Calligraphy Generator
      CalligraphyGenerator: (await import(`./messages/${fileSystemLocale}/CalligraphyGenerator.json`)).default,
      
      // Pokemon Font
      PokemonFont: (await import(`./messages/${fileSystemLocale}/PokemonFont.json`)).default,
      
      // Minecraft Font
      MinecraftFont: (await import(`./messages/${fileSystemLocale}/MinecraftFont.json`)).default,
      
      // The Life of a Showgirl Font
      TheLifeOfAShowgirlFont: (await import(`./messages/${fileSystemLocale}/TheLifeOfAShowgirlFont.json`)).default,
      
      // Disney Font
      DisneyFont: (await import(`./messages/${fileSystemLocale}/DisneyFont.json`)).default,
      
      // Brat Font
      BratFont: (await import(`./messages/${fileSystemLocale}/BratFont.json`)).default,
      
      // Graffiti Generator
      GraffitiGenerator: (await import(`./messages/${fileSystemLocale}/GraffitiGenerator.json`)).default,
      
      // Hindi Font Generator
      HindiFontGenerator: (await import(`./messages/${fileSystemLocale}/HindiFontGenerator.json`)).default,
      
      // Tamil Font Generator
      TamilFontGenerator: (await import(`./messages/${fileSystemLocale}/TamilFontGenerator.json`)).default,
      
      // Undertale Font
      UndertaleFont: (await import(`./messages/${fileSystemLocale}/UndertaleFont.json`)).default,
      
      // Coca-Cola Font
      CocaColaFont: (await import(`./messages/${fileSystemLocale}/CocaColaFont.json`)).default,
      
      // Demon Slayer Font
      DemonSlayerFont: (await import(`./messages/${fileSystemLocale}/DemonSlayerFont.json`)).default,
      
      // GTA Font
      GtaFont: (await import(`./messages/${fileSystemLocale}/GtaFont.json`)).default,
      
      // Squid Game Font
      SquidGameFont: (await import(`./messages/${fileSystemLocale}/SquidGameFont.json`)).default,
      
      // Montserrat Font
      MontserratFont: (await import(`./messages/${fileSystemLocale}/MontserratFont.json`)).default,
      
      // Malayalam Font Generator
      MalayalamFontGenerator: (await import(`./messages/${fileSystemLocale}/MalayalamFontGenerator.json`)).default,
      
      // Sonic Font
      SonicFont: (await import(`./messages/${fileSystemLocale}/SonicFont.json`)).default,
      
      // Plus Jakarta Sans Font
      PlusJakartaSans: (await import(`./messages/${fileSystemLocale}/PlusJakartaSans.json`)).default,
      
      // Font Generator
      FontGenerator: (await import(`./messages/${fileSystemLocale}/FontGenerator.json`)).default
    }
  };
});