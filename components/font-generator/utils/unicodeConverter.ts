/**
 * Unicode 文本转换工具
 * 将普通文本转换为各种 Unicode 样式，类似 copy and paste fonts
 * 支持 fontgenerator.cool 上的所有样式
 */

// 组合字符常量
const COMBINING = {
  UNDERLINE: "\u0332", // U+0332 COMBINING LOW LINE
  DOUBLE_UNDERLINE: "\u0333", // U+0333 COMBINING DOUBLE LOW LINE
  STRIKETHROUGH: "\u0336", // U+0336 COMBINING LONG STROKE OVERLAY
  SLASH: "\u0337", // U+0337 COMBINING SHORT SOLIDUS OVERLAY
  WAVE: "\u0330", // U+0330 COMBINING TILDE BELOW
  WAVE_ABOVE: "\u0303", // U+0303 COMBINING TILDE
  CIRCUMFLEX: "\u0302", // U+0302 COMBINING CIRCUMFLEX ACCENT
  RING: "\u030A", // U+030A COMBINING RING ABOVE
  DOT: "\u0307", // U+0307 COMBINING DOT ABOVE
  BREVE: "\u0306", // U+0306 COMBINING BREVE
  DOUBLE_ACCENT: "\u030B", // U+030B COMBINING DOUBLE ACUTE ACCENT
  MACRON: "\u0304", // U+0304 COMBINING MACRON
  DOUBLE_MACRON: "\u035F", // U+035F COMBINING DOUBLE MACRON BELOW
  OVERLINE: "\u0305", // U+0305 COMBINING OVERLINE
  HOOK: "\u0309", // U+0309 COMBINING HOOK ABOVE
  Z_LINES: "\u035C", // U+035C COMBINING DOUBLE BREVE BELOW
  EQUAL_TOP: "\u034C", // U+034C COMBINING ALMOST EQUAL TO ABOVE
  WAVE_TOP: "\u033E", // U+033E COMBINING VERTICAL TILDE
  BOTTOM_ARROW: "\u034E", // U+034E COMBINING UPWARDS ARROW BELOW
  WAVE_UNDER: "\u0330", // U+0330 COMBINING TILDE BELOW
  BREVE_BELOW: "\u032E", // U+032E COMBINING BREVE BELOW
  INTERSECTED: "\u033D\u034D", // U+033D COMBINING X ABOVE + U+034D COMBINING ALMOST EQUAL TO BELOW
  FRAMED: "\u0332\u0331", // U+0332 + U+0331 COMBINING MACRON BELOW
  DOUBLE_OVERLINE: "\u033F", // U+033F COMBINING DOUBLE OVERLINE
  DOUBLE_MACRON_BELOW: "\u035F", // U+035F COMBINING DOUBLE MACRON BELOW
  RING_COLON: "\u205A", // U+205A TWO DOT PUNCTUATION (⫶)
  INTERSECTED_COMB: "\u033D\u034D", // U+033D COMBINING X ABOVE + U+034D COMBINING ALMOST EQUAL TO BELOW
  BOTTOM_ARROW_COMB: "\u034E", // U+034E COMBINING UPWARDS ARROW BELOW
  WAVE_UNDER_COMB: "\u0330", // U+0330 COMBINING TILDE BELOW
  BREVE_BELOW_COMB: "\u032E", // U+032E COMBINING BREVE BELOW
  BREVE_ABOVE_COMB: "\u0306", // U+0306 COMBINING BREVE
  DOT_BELOW: "\u0323", // U+0323 COMBINING DOT BELOW
};

// Unicode 字符映射表
const unicodeMaps: Record<string, Record<string, string>> = {
  // 数学粗体 (Mathematical Bold)
  bold: {
    A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉",
    K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓",
    U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙",
    a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣",
    k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭",
    u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
    "0": "𝟎", "1": "𝟏", "2": "𝟐", "3": "𝟑", "4": "𝟒", "5": "𝟓", "6": "𝟔", "7": "𝟕", "8": "𝟖", "9": "𝟗",
  },
  // 数学斜体 (Mathematical Italic)
  italic: {
    A: "𝐴", B: "𝐵", C: "𝐶", D: "𝐷", E: "𝐸", F: "𝐹", G: "𝐺", H: "𝐻", I: "𝐼", J: "𝐽",
    K: "𝐾", L: "𝐿", M: "𝑀", N: "𝑁", O: "𝑂", P: "𝑃", Q: "𝑄", R: "𝑅", S: "𝑆", T: "𝑇",
    U: "𝑈", V: "𝑉", W: "𝑊", X: "𝑋", Y: "𝑌", Z: "𝑍",
    a: "𝑎", b: "𝑏", c: "𝑐", d: "𝑑", e: "𝑒", f: "𝑓", g: "𝑔", h: "ℎ", i: "𝑖", j: "𝑗",
    k: "𝑘", l: "𝑙", m: "𝑚", n: "𝑛", o: "𝑜", p: "𝑝", q: "𝑞", r: "𝑟", s: "𝑠", t: "𝑡",
    u: "𝑢", v: "𝑣", w: "𝑤", x: "𝑥", y: "𝑦", z: "𝑧",
  },
  // 数学粗斜体 (Mathematical Bold Italic)
  boldItalic: {
    A: "𝑨", B: "𝑩", C: "𝑪", D: "𝑫", E: "𝑬", F: "𝑭", G: "𝑮", H: "𝑯", I: "𝑰", J: "𝑱",
    K: "𝑲", L: "𝑳", M: "𝑴", N: "𝑵", O: "𝑶", P: "𝑷", Q: "𝑸", R: "𝑹", S: "𝑺", T: "𝑻",
    U: "𝑼", V: "𝑽", W: "𝑾", X: "𝑿", Y: "𝒀", Z: "𝒁",
    a: "𝒂", b: "𝒃", c: "𝒄", d: "𝒅", e: "𝒆", f: "𝒇", g: "𝒈", h: "𝒉", i: "𝒊", j: "𝒋",
    k: "𝒌", l: "𝒍", m: "𝒎", n: "𝒏", o: "𝒐", p: "𝒑", q: "𝒒", r: "𝒓", s: "𝒔", t: "𝒕",
    u: "𝒖", v: "𝒗", w: "𝒘", x: "𝒙", y: "𝒚", z: "𝒛",
  },
  // 哥特体/花体 (Mathematical Fraktur)
  gothic: {
    A: "𝔄", B: "𝔅", C: "ℭ", D: "𝔇", E: "𝔈", F: "𝔉", G: "𝔊", H: "ℌ", I: "ℑ", J: "𝔍",
    K: "𝔎", L: "𝔏", M: "𝔐", N: "𝔑", O: "𝔒", P: "𝔓", Q: "𝔔", R: "ℜ", S: "𝔖", T: "𝔗",
    U: "𝔘", V: "𝔙", W: "𝔚", X: "𝔛", Y: "𝔜", Z: "ℨ",
    a: "𝔞", b: "𝔟", c: "𝔠", d: "𝔡", e: "𝔢", f: "𝔣", g: "𝔤", h: "𝔥", i: "𝔦", j: "𝔧",
    k: "𝔨", l: "𝔩", m: "𝔪", n: "𝔫", o: "𝔬", p: "𝔭", q: "𝔮", r: "𝔯", s: "𝔰", t: "𝔱",
    u: "𝔲", v: "𝔳", w: "𝔴", x: "𝔵", y: "𝔶", z: "𝔷",
  },
  // 泡泡字 (Circled)
  bubble: {
    A: "Ⓐ", B: "Ⓑ", C: "Ⓒ", D: "Ⓓ", E: "Ⓔ", F: "Ⓕ", G: "Ⓖ", H: "Ⓗ", I: "Ⓘ", J: "Ⓙ",
    K: "Ⓚ", L: "Ⓛ", M: "Ⓜ", N: "Ⓝ", O: "Ⓞ", P: "Ⓟ", Q: "Ⓠ", R: "Ⓡ", S: "Ⓢ", T: "Ⓣ",
    U: "Ⓤ", V: "Ⓥ", W: "Ⓦ", X: "Ⓧ", Y: "Ⓨ", Z: "Ⓩ",
    a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ", i: "ⓘ", j: "ⓙ",
    k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ", q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ",
    u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ", y: "ⓨ", z: "ⓩ",
    "0": "⓪", "1": "①", "2": "②", "3": "③", "4": "④", "5": "⑤", "6": "⑥", "7": "⑦", "8": "⑧", "9": "⑨",
  },
  // 深色泡泡字 (Dark Bubble)
  darkBubble: {
    A: "🅐", B: "🅑", C: "🅒", D: "🅓", E: "🅔", F: "🅕", G: "🅖", H: "🅗", I: "🅘", J: "🅙",
    K: "🅚", L: "🅛", M: "🅜", N: "🅝", O: "🅞", P: "🅟", Q: "🅠", R: "🅡", S: "🅢", T: "🅣",
    U: "🅤", V: "🅥", W: "🅦", X: "🅧", Y: "🅨", Z: "🅩",
    a: "🅐", b: "🅑", c: "🅒", d: "🅓", e: "🅔", f: "🅕", g: "🅖", h: "🅗", i: "🅘", j: "🅙",
    k: "🅚", l: "🅛", m: "🅜", n: "🅝", o: "🅞", p: "🅟", q: "🅠", r: "🅡", s: "🅢", t: "🅣",
    u: "🅤", v: "🅥", w: "🅦", x: "🅧", y: "🅨", z: "🅩",
  },
  // 方块字 (Square)
  square: {
    A: "🅰", B: "🅱", C: "🅲", D: "🅳", E: "🅴", F: "🅵", G: "🅶", H: "🅷", I: "🅸", J: "🅹",
    K: "🅺", L: "🅻", M: "🅼", N: "🅽", O: "🅾", P: "🅿", Q: "🆀", R: "🆁", S: "🆂", T: "🆃",
    U: "🆄", V: "🆅", W: "🆆", X: "🆇", Y: "🆈", Z: "🆉",
    a: "🅰", b: "🅱", c: "🅲", d: "🅳", e: "🅴", f: "🅵", g: "🅶", h: "🅷", i: "🅸", j: "🅹",
    k: "🅺", l: "🅻", m: "🅼", n: "🅽", o: "🅾", p: "🅿", q: "🆀", r: "🆁", s: "🆂", t: "🆃",
    u: "🆄", v: "🆅", w: "🆆", x: "🆇", y: "🆈", z: "🆉",
  },
  // 带括号字母 (Parenthesized)
  parenthesized: {
    A: "⒜", B: "⒝", C: "⒞", D: "⒟", E: "⒠", F: "⒡", G: "⒢", H: "⒣", I: "⒤", J: "⒥",
    K: "⒦", L: "⒧", M: "⒨", N: "⒩", O: "⒪", P: "⒫", Q: "⒬", R: "⒭", S: "⒮", T: "⒯",
    U: "⒰", V: "⒱", W: "⒲", X: "⒳", Y: "⒴", Z: "⒵",
    a: "⒜", b: "⒝", c: "⒞", d: "⒟", e: "⒠", f: "⒡", g: "⒢", h: "⒣", i: "⒤", j: "⒥",
    k: "⒦", l: "⒧", m: "⒨", n: "⒩", o: "⒪", p: "⒫", q: "⒬", r: "⒭", s: "⒮", t: "⒯",
    u: "⒰", v: "⒱", w: "⒲", x: "⒳", y: "⒴", z: "⒵",
  },
  // 小写 (Small Caps)
  smallCaps: {
    A: "ᴀ", B: "ʙ", C: "ᴄ", D: "ᴅ", E: "ᴇ", F: "ғ", G: "ɢ", H: "ʜ", I: "ɪ", J: "ᴊ",
    K: "ᴋ", L: "ʟ", M: "ᴍ", N: "ɴ", O: "ᴏ", P: "ᴘ", Q: "ǫ", R: "ʀ", S: "s", T: "ᴛ",
    U: "ᴜ", V: "ᴠ", W: "ᴡ", X: "x", Y: "ʏ", Z: "ᴢ",
    a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ",
    k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ",
    u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
  },
  // 双线字 (Double Struck)
  doubleStruck: {
    A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁",
    K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋",
    U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ",
    a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛",
    k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥",
    u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫",
    "0": "𝟘", "1": "𝟙", "2": "𝟚", "3": "𝟛", "4": "𝟜", "5": "𝟝", "6": "𝟞", "7": "𝟟", "8": "𝟠", "9": "𝟡",
  },
  // 全宽字符 (Fullwidth)
  fullwidth: {
    A: "Ａ", B: "Ｂ", C: "Ｃ", D: "Ｄ", E: "Ｅ", F: "Ｆ", G: "Ｇ", H: "Ｈ", I: "Ｉ", J: "Ｊ",
    K: "Ｋ", L: "Ｌ", M: "Ｍ", N: "Ｎ", O: "Ｏ", P: "Ｐ", Q: "Ｑ", R: "Ｒ", S: "Ｓ", T: "Ｔ",
    U: "Ｕ", V: "Ｖ", W: "Ｗ", X: "Ｘ", Y: "Ｙ", Z: "Ｚ",
    a: "ａ", b: "ｂ", c: "ｃ", d: "ｄ", e: "ｅ", f: "ｆ", g: "ｇ", h: "ｈ", i: "ｉ", j: "ｊ",
    k: "ｋ", l: "ｌ", m: "ｍ", n: "ｎ", o: "ｏ", p: "ｐ", q: "ｑ", r: "ｒ", s: "ｓ", t: "ｔ",
    u: "ｕ", v: "ｖ", w: "ｗ", x: "ｘ", y: "ｙ", z: "ｚ",
    "0": "０", "1": "１", "2": "２", "3": "３", "4": "４", "5": "５", "6": "６", "7": "７", "8": "８", "9": "９",
    " ": "　", "!": "！", "?": "？", ".": "．", ",": "，", ":": "：", ";": "；",
  },
  // 反转字符 (Reversed)
  reversed: {
    A: "∀", B: "ᗺ", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "ᖴ", G: "פ", H: "H", I: "I", J: "ſ",
    K: "K", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Q", R: "ᴿ", S: "S", T: "┴",
    U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
    a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
    k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
    u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  },
  // 上标 (Superscript)
  superscript: {
    A: "ᴬ", B: "ᴮ", C: "ᶜ", D: "ᴰ", E: "ᴱ", F: "ᶠ", G: "ᴳ", H: "ᴴ", I: "ᴵ", J: "ᴶ",
    K: "ᴷ", L: "ᴸ", M: "ᴹ", N: "ᴺ", O: "ᴼ", P: "ᴾ", Q: "ᵠ", R: "ᴿ", S: "ˢ", T: "ᵀ",
    U: "ᵁ", V: "ⱽ", W: "ᵂ", X: "ˣ", Y: "ʸ", Z: "ᶻ",
    a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ",
    k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", q: "ᵠ", r: "ʳ", s: "ˢ", t: "ᵗ",
    u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
    "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾",
  },
  // 下标 (Subscript)
  subscript: {
    A: "ₐ", B: "B", C: "C", D: "D", E: "ₑ", F: "F", G: "G", H: "ₕ", I: "ᵢ", J: "ⱼ",
    K: "ₖ", L: "ₗ", M: "ₘ", N: "ₙ", O: "ₒ", P: "ₚ", Q: "Q", R: "ᵣ", S: "ₛ", T: "ₜ",
    U: "ᵤ", V: "ᵥ", W: "W", X: "ₓ", Y: "Y", Z: "Z",
    a: "ₐ", b: "b", c: "c", d: "d", e: "ₑ", f: "f", g: "g", h: "ₕ", i: "ᵢ", j: "ⱼ",
    k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ", o: "ₒ", p: "ₚ", q: "q", r: "ᵣ", s: "ₛ", t: "ₜ",
    u: "ᵤ", v: "ᵥ", w: "w", x: "ₓ", y: "y", z: "z",
    "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
    "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
  },
  // 粗体哥特体 (Bold Fraktur)
  boldGothic: {
    A: "𝕬", B: "𝕭", C: "𝕮", D: "𝕯", E: "𝕰", F: "𝕱", G: "𝕲", H: "𝕳", I: "𝕴", J: "𝕵",
    K: "𝕶", L: "𝕷", M: "𝕸", N: "𝕹", O: "𝕺", P: "𝕻", Q: "𝕼", R: "𝕽", S: "𝕾", T: "𝕿",
    U: "𝖀", V: "𝖁", W: "𝖂", X: "𝖃", Y: "𝖄", Z: "𝖅",
    a: "𝖆", b: "𝖇", c: "𝖈", d: "𝖉", e: "𝖊", f: "𝖋", g: "𝖌", h: "𝖍", i: "𝖎", j: "𝖏",
    k: "𝖐", l: "𝖑", m: "𝖒", n: "𝖓", o: "𝖔", p: "𝖕", q: "𝖖", r: "𝖗", s: "𝖘", t: "𝖙",
    u: "𝖚", v: "𝖛", w: "𝖜", x: "𝖝", y: "𝖞", z: "𝖟",
  },
  // 手写体 (Script)
  script: {
    A: "𝒜", B: "ℬ", C: "𝒞", D: "𝒟", E: "ℰ", F: "ℱ", G: "𝒢", H: "ℋ", I: "ℐ", J: "𝒥",
    K: "𝒦", L: "ℒ", M: "ℳ", N: "𝒩", O: "𝒪", P: "𝒫", Q: "𝒬", R: "ℛ", S: "𝒮", T: "𝒯",
    U: "𝒰", V: "𝒱", W: "𝒲", X: "𝒳", Y: "𝒴", Z: "𝒵",
    a: "𝒶", b: "𝒷", c: "𝒸", d: "𝒹", e: "ℯ", f: "𝒻", g: "ℊ", h: "𝒽", i: "𝒾", j: "𝒿",
    k: "𝓀", l: "𝓁", m: "𝓂", n: "𝓃", o: "ℴ", p: "𝓅", q: "𝓆", r: "𝓇", s: "𝓈", t: "𝓉",
    u: "𝓊", v: "𝓋", w: "𝓌", x: "𝓍", y: "𝓎", z: "𝓏",
  },
  // 粗体手写体 (Bold Script)
  boldScript: {
    A: "𝓐", B: "𝓑", C: "𝓒", D: "𝓓", E: "𝓔", F: "𝓕", G: "𝓖", H: "𝓗", I: "𝓘", J: "𝓙",
    K: "𝓚", L: "𝓛", M: "𝓜", N: "𝓝", O: "𝓞", P: "𝓟", Q: "𝓠", R: "𝓡", S: "𝓢", T: "𝓣",
    U: "𝓤", V: "𝓥", W: "𝓦", X: "𝓧", Y: "𝓨", Z: "𝓩",
    a: "𝓪", b: "𝓫", c: "𝓬", d: "𝓭", e: "𝓮", f: "𝓯", g: "𝓰", h: "𝓱", i: "𝓲", j: "𝓳",
    k: "𝓴", l: "𝓵", m: "𝓶", n: "𝓷", o: "𝓸", p: "𝓹", q: "𝓺", r: "𝓻", s: "𝓼", t: "𝓽",
    u: "𝓾", v: "𝓿", w: "𝔀", x: "𝔁", y: "𝔂", z: "𝔃",
  },
  // 等宽字体 (Monospace)
  monospace: {
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹",
    K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃",
    U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉",
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓",
    k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝",
    u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    "0": "𝟶", "1": "𝟷", "2": "𝟸", "3": "𝟹", "4": "𝟺", "5": "𝟻", "6": "𝟼", "7": "𝟽", "8": "𝟾", "9": "𝟿",
  },
  // 无衬线粗体 (Sans Serif Bold)
  sansSerifBold: {
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩",
    K: "𝖪", L: "𝖫", M: "𝖬", N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳",
    U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹",
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃",
    k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍",
    u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    "0": "𝟢", "1": "𝟣", "2": "𝟤", "3": "𝟥", "4": "𝟦", "5": "𝟧", "6": "𝟨", "7": "𝟩", "8": "𝟪", "9": "𝟫",
  },
  // 无衬线粗斜体 (Sans Serif Bold Italic)
  sansSerifBoldItalic: {
    A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝",
    K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧",
    U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
    a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷",
    k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁",
    u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
    "0": "𝟬", "1": "𝟭", "2": "𝟮", "3": "𝟯", "4": "𝟰", "5": "𝟱", "6": "𝟲", "7": "𝟳", "8": "𝟴", "9": "𝟵",
  },
  // 无衬线斜体 (Sans Serif Italic)
  sansSerifItalic: {
    A: "𝘈", B: "𝘉", C: "𝘊", D: "𝘋", E: "𝘌", F: "𝘍", G: "𝘎", H: "𝘏", I: "𝘐", J: "𝘑",
    K: "𝘒", L: "𝘓", M: "𝘔", N: "𝘕", O: "𝘖", P: "𝘗", Q: "𝘘", R: "𝘙", S: "𝘚", T: "𝘛",
    U: "𝘜", V: "𝘝", W: "𝘞", X: "𝘟", Y: "𝘠", Z: "𝘡",
    a: "𝘢", b: "𝘣", c: "𝘤", d: "𝘥", e: "𝘦", f: "𝘧", g: "𝘨", h: "𝘩", i: "𝘪", j: "𝘫",
    k: "𝘬", l: "𝘭", m: "𝘮", n: "𝘯", o: "𝘰", p: "𝘱", q: "𝘲", r: "𝘳", s: "𝘴", t: "𝘵",
    u: "𝘶", v: "𝘷", w: "𝘸", x: "𝘹", y: "𝘺", z: "𝘻",
  },
  // 无衬线粗斜体 (Sans Serif Bold Italic - 另一种)
  sansSerifBoldItalic2: {
    A: "𝘼", B: "𝘽", C: "𝘾", D: "𝘿", E: "𝙀", F: "𝙁", G: "𝙂", H: "𝙃", I: "𝙄", J: "𝙅",
    K: "𝙆", L: "𝙇", M: "𝙈", N: "𝙉", O: "𝙊", P: "𝙋", Q: "𝙌", R: "𝙍", S: "𝙎", T: "𝙏",
    U: "𝙐", V: "𝙑", W: "𝙒", X: "𝙓", Y: "𝙔", Z: "𝙕",
    a: "𝙖", b: "𝙗", c: "𝙘", d: "𝙙", e: "𝙚", f: "𝙛", g: "𝙜", h: "𝙝", i: "𝙞", j: "𝙟",
    k: "𝙠", l: "𝙡", m: "𝙢", n: "𝙣", o: "𝙤", p: "𝙥", q: "𝙦", r: "𝙧", s: "𝙨", t: "𝙩",
    u: "𝙪", v: "𝙫", w: "𝙬", x: "𝙭", y: "𝙮", z: "𝙯",
  },
  // 希腊字母风格 (Greek-like)
  greek: {
    A: "α", B: "в", C: "¢", D: "∂", E: "є", F: "ƒ", G: "g", H: "н", I: "ι", J: "נ",
    K: "к", L: "l", M: "м", N: "η", O: "σ", P: "ρ", Q: "q", R: "я", S: "s", T: "т",
    U: "υ", V: "ν", W: "ω", X: "χ", Y: "y", Z: "z",
    a: "α", b: "в", c: "¢", d: "∂", e: "є", f: "ƒ", g: "g", h: "н", i: "ι", j: "נ",
    k: "к", l: "l", m: "м", n: "η", o: "σ", p: "ρ", q: "q", r: "я", s: "s", t: "т",
    u: "υ", v: "ν", w: "ω", x: "χ", y: "y", z: "z",
  },
  // 圆润字体 (Rounded Font) - 使用加拿大原住民音节文字
  rounded: {
    A: "ᗩ", B: "ᗷ", C: "ᑕ", D: "ᗪ", E: "E", F: "ᖴ", G: "G", H: "ᕼ", I: "I", J: "ᒍ",
    K: "K", L: "ᒪ", M: "ᗰ", N: "ᑎ", O: "O", P: "ᑭ", Q: "ᑫ", R: "ᖇ", S: "ᔕ", T: "T",
    U: "ᑌ", V: "ᐯ", W: "ᗯ", X: "᙭", Y: "Y", Z: "ᘔ",
    a: "ᗩ", b: "ᗷ", c: "ᑕ", d: "ᗪ", e: "e", f: "ᖴ", g: "g", h: "ᕼ", i: "i", j: "ᒍ",
    k: "k", l: "ᒪ", m: "ᗰ", n: "ᑎ", o: "o", p: "ᑭ", q: "ᑫ", r: "ᖇ", s: "ᔕ", t: "t",
    u: "ᑌ", v: "ᐯ", w: "ᗯ", x: "᙭", y: "y", z: "ᘔ",
  },
  // 复古字体 (Vintage Font) - 使用切罗基文字
  vintage: {
    A: "Ꭺ", B: "Ᏼ", C: "Ꮯ", D: "Ꭰ", E: "Ꭼ", F: "Ꮀ", G: "Ꮆ", H: "Ꮋ", I: "Ꭵ", J: "Ꮑ",
    K: "Ꮶ", L: "Ꮮ", M: "Ꮇ", N: "Ꮑ", O: "Ꮎ", P: "Ꮲ", Q: "Ꭴ", R: "Ꮢ", S: "Ꮥ", T: "Ꭲ",
    U: "Ꮼ", V: "Ꮙ", W: "Ꮗ", X: "Ꭱ", Y: "Ꭹ", Z: "Ꮓ",
    a: "Ꭺ", b: "Ᏼ", c: "Ꮯ", d: "Ꭰ", e: "Ꭼ", f: "Ꮀ", g: "Ꮆ", h: "Ꮋ", i: "Ꭵ", j: "Ꮑ",
    k: "Ꮶ", l: "Ꮮ", m: "Ꮇ", n: "Ꮑ", o: "Ꮎ", p: "Ꮲ", q: "Ꭴ", r: "Ꮢ", s: "Ꮥ", t: "Ꭲ",
    u: "Ꮼ", v: "Ꮙ", w: "Ꮗ", x: "Ꭱ", y: "Ꭹ", z: "Ꮓ",
  },
  // 小字体 (Small Font) - 使用修饰符字母
  small: {
    A: "ᵃ", B: "ᵇ", C: "ᶜ", D: "ᵈ", E: "ᵉ", F: "ᶠ", G: "ᵍ", H: "ʰ", I: "ᵢ", J: "ʲ",
    K: "ᵏ", L: "ˡ", M: "ᵐ", N: "ⁿ", O: "ᵒ", P: "ᵖ", Q: "ᵠ", R: "ʳ", S: "ˢ", T: "ᵗ",
    U: "ᵘ", V: "ᵛ", W: "ʷ", X: "ˣ", Y: "ʸ", Z: "ᶻ",
    a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ᵢ", j: "ʲ",
    k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", q: "ᵠ", r: "ʳ", s: "ˢ", t: "ᵗ",
    u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
  },
};

/**
 * 将文本转换为指定的 Unicode 样式
 * 支持组合字符样式（如下划线、删除线等）
 */
export function convertToUnicode(text: string, style: string): string {
  if (!text || !style || style === "normal") {
    return text;
  }

  // 处理组合字符样式
  if (style === "underline") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.UNDERLINE;
      })
      .join("");
  }

  if (style === "doubleUnderline") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.DOUBLE_UNDERLINE;
      })
      .join("");
  }

  if (style === "strikethrough") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.STRIKETHROUGH;
      })
      .join("");
  }

  if (style === "slashOverlay") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.SLASH;
      })
      .join("");
  }

  if (style === "waveOverlay") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.WAVE_ABOVE;
      })
      .join("");
  }

  if (style === "framed") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.FRAMED;
      })
      .join("");
  }

  if (style === "doubleOverline") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.DOUBLE_OVERLINE;
      })
      .join("");
  }

  if (style === "crowned") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.RING;
      })
      .join("");
  }

  if (style === "zLines") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.Z_LINES;
      })
      .join("");
  }

  if (style === "curvedAccent") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.HOOK;
      })
      .join("");
  }

  if (style === "pointedAccent") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.CIRCUMFLEX;
      })
      .join("");
  }

  if (style === "wavyAccent") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.WAVE_ABOVE;
      })
      .join("");
  }

  if (style === "glyphCap") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.BREVE;
      })
      .join("");
  }

  if (style === "shortMark") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.DOUBLE_ACCENT;
      })
      .join("");
  }

  if (style === "balancedLine") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.EQUAL_TOP;
      })
      .join("");
  }

  if (style === "spotted") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.DOT;
      })
      .join("");
  }

  if (style === "waveTop") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.WAVE_TOP;
      })
      .join("");
  }

  if (style === "bottomArrow") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.BOTTOM_ARROW;
      })
      .join("");
  }

  if (style === "waveUnder") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.WAVE_UNDER;
      })
      .join("");
  }

  if (style === "underCurve") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.BREVE_BELOW;
      })
      .join("");
  }

  if (style === "intersected") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.INTERSECTED;
      })
      .join("");
  }

  if (style === "dualCurve") {
    return text
      .split("")
      .map((char) => {
        const base = unicodeMaps.bold?.[char] || char;
        return base + COMBINING.BREVE_BELOW + COMBINING.BREVE;
      })
      .join("");
  }

  // 带括号/符号的样式
  if (style === "connected") {
    // ⊰C⊱⊰o⊱...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⊰${char}⊱`;
      })
      .join("");
  }

  if (style === "sharp") {
    // ⧼S⧽⧼h⧽...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⧼${char}⧽`;
      })
      .join("");
  }

  if (style === "enclosed") {
    // ⌠E⌡⌠n⌡...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⌠${char}⌡`;
      })
      .join("");
  }

  if (style === "pointed") {
    // ➹P➷➹o➷...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `➹${char}➷`;
      })
      .join("");
  }

  if (style === "lunar") {
    // ☾L☽☾u☽...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `☾${char}☽`;
      })
      .join("");
  }

  if (style === "pointedDots") {
    // ⦑P⦒⦑o⦒...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⦑${char}⦒`;
      })
      .join("");
  }

  if (style === "curvedLight") {
    // ╰C╯╰u╯...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `╰${char}╯`;
      })
      .join("");
  }

  if (style === "curvyLink") {
    // C⌇u⌇r⌇...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `${char}⌇`;
      })
      .join("");
  }

  if (style === "subflow") {
    // S‿u‿b‿...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `${char}‿`;
      })
      .join("");
  }

  if (style === "doubleSlash") {
    // Dｯoｯuｯ...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const fullwidth = unicodeMaps.fullwidth?.[char] || char;
        return `${fullwidth}ｯ`;
      })
      .join("");
  }

  if (style === "arrowSpark") {
    // A↯r↯r↯...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `${char}↯`;
      })
      .join("");
  }

  if (style === "starryMark") {
    // S※t※a※...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `${char}※`;
      })
      .join("");
  }

  if (style === "looped") {
    // L෴o෴o෴...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `${char}෴`;
      })
      .join("");
  }

  if (style === "boxed") {
    // [B̲̅][o̲̅]...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `[${base}${COMBINING.UNDERLINE}${COMBINING.OVERLINE}]`;
      })
      .join("");
  }

  if (style === "arrowedBound") {
    // ⧼A̫⧽⧼r̫⧽...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `⧼${base}\u02EB⧽`;
      })
      .join("");
  }

  if (style === "accented") {
    // ⦏Â⦎⦏ĉ⦎...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `⦏${base}${COMBINING.CIRCUMFLEX}⦎`;
      })
      .join("");
  }

  if (style === "cloudCurve") {
    // C̮̑l̮̑ȏ̮...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `${base}\u0311\u032E`;
      })
      .join("");
  }

  if (style === "softCurves") {
    // ⸦S⸧⸦o⸧...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⸦${char}⸧`;
      })
      .join("");
  }

  if (style === "tripleBeam") {
    // ⚞T⚟⚞r⚟...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⚞${char}⚟`;
      })
      .join("");
  }

  if (style === "triFramed") {
    // ⫷T⫸⫷r⫸...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⫷${char}⫸`;
      })
      .join("");
  }

  if (style === "swirled") {
    // ⎰S⎱⎰w⎱...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⎰${char}⎱`;
      })
      .join("");
  }

  if (style === "frame") {
    // ⦓F⦔⦓r⦔...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⦓${char}⦔`;
      })
      .join("");
  }

  if (style === "boldEdge") {
    // 【B】【o】...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `【${char}】`;
      })
      .join("");
  }

  if (style === "cornerGlow") {
    // 『C』『o』...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `『${char}』`;
      })
      .join("");
  }

  if (style === "tickFrame") {
    // ⦍T⦎⦍i⦎...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⦍${char}⦎`;
      })
      .join("");
  }

  if (style === "softAngles") {
    // 〖S〗〖o〗...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `〖${char}〗`;
      })
      .join("");
  }

  // 特殊组合字符样式
  if (style === "doubleMacron") {
    // D͟o͟u͟b͟l͟e͟ M͟a͟c͟r͟o͟n͟
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `${base}${COMBINING.DOUBLE_MACRON_BELOW}`;
      })
      .join("");
  }

  if (style === "circularStyle") {
    // C̊⫶i̊⫶r̊⫶...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `${base}${COMBINING.RING}⫶`;
      })
      .join("");
  }

  if (style === "intersectedAdvanced") {
    // I͓̽n͓̽t͓̽...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `${base}\u033D\u034D`;
      })
      .join("");
  }

  if (style === "bottomArrowAdvanced") {
    // B͎o͎t͎t͎o͎m͎...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `${base}\u034E`;
      })
      .join("");
  }

  if (style === "waveUnderAdvanced") {
    // W̰a̰v̰ḛ...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `${base}\u0330`;
      })
      .join("");
  }

  // 反转文本样式
  if (style === "reverseText") {
    // txeT esreveR - 简单反转
    return text.split("").reverse().join("");
  }

  if (style === "backwardFlip") {
    // ʇxǝꞱ dᴉlℲ pɹɐʍʞɔɐᗺ - 使用反转字符映射
    const flipMap: Record<string, string> = {
      A: "∀", B: "ᗺ", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "פ", H: "H", I: "I", J: "ſ",
      K: "K", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Q", R: "ᴿ", S: "S", T: "Ʇ",
      U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
      a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
      k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
      u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
    };
    return text
      .split("")
      .reverse()
      .map((char) => flipMap[char] || char)
      .join("");
  }

  if (style === "mirrorText") {
    // ɈxǝT ɿoɿɿiM - 使用镜像字符映射
    const mirrorMap: Record<string, string> = {
      A: "A", B: "ᗺ", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "פ", H: "H", I: "I", J: "ſ",
      K: "K", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Q", R: "ɿ", S: "S", T: "Ʇ",
      U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
      a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
      k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
      u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
    };
    return text
      .split("")
      .reverse()
      .map((char) => mirrorMap[char] || char)
      .join("");
  }

  if (style === "upsideDown") {
    // Ոdsᴉpǝ ᗡoʍu - 使用反转字符
    const upsideDownMap: Record<string, string> = {
      A: "∀", B: "ᗺ", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "ᖴ", G: "פ", H: "H", I: "I", J: "ſ",
      K: "K", L: "˥", M: "W", N: "Ո", O: "O", P: "Ԁ", Q: "Q", R: "ᴿ", S: "S", T: "┴",
      U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
      a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
      k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
      u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
    };
    return text
      .split("")
      .reverse()
      .map((char) => upsideDownMap[char] || char)
      .join("");
  }

  // 符号融合字体样式
  if (style === "straightWaves") {
    // S᷾𒑱y᷾𒑱m᷾...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `${base}\u033E\uD801\uDD71`;
      })
      .join("");
  }

  if (style === "burstConnect") {
    // B⨳u⨳r⨳s⨳t⨳...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `${char}⨳`;
      })
      .join("");
  }

  if (style === "dualShift") {
    // D⊶u⊶a⊶l⊶...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `${char}⊶`;
      })
      .join("");
  }

  if (style === "twistStrike") {
    // T͔↯w͔↯i͔↯s͔↯t͔↯...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `${base}\u0354↯`;
      })
      .join("");
  }

  if (style === "starCluster") {
    // S⁂t⁂a⁂r⁂...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `${char}⁂`;
      })
      .join("");
  }

  if (style === "zigGlitch") {
    // Z͛⦚i͛⦚g͛⦚...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `${base}\u035C⦚`;
      })
      .join("");
  }

  if (style === "focused") {
    // F͖͐ o͖͐ c͖͐...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        const base = unicodeMaps.bold?.[char] || char;
        return `${base}\u0356\u0350`;
      })
      .join("");
  }

  // 流动字体样式
  if (style === "numericalBurst") {
    // ҈N҈҈u҈҈m҈҈...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `҈${char}҈҈`;
      })
      .join("");
  }

  if (style === "cornerGlide") {
    // ┌C┐┌o┐┌r┐...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `┌${char}┐`;
      })
      .join("");
  }

  if (style === "upwardForce") {
    // ┞U┦┞p┦┞w┦...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `┞${char}┦`;
      })
      .join("");
  }

  if (style === "balancedGlow") {
    // ╽B╿╽a╿╽l╿...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `╽${char}╿`;
      })
      .join("");
  }

  if (style === "digitalDisrupt") {
    // ҉D҉҉i҉҉g҉҉...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `҉${char}҉҉`;
      })
      .join("");
  }

  if (style === "dimmed") {
    // ░D░░i░░m░░...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `░${char}░░`;
      })
      .join("");
  }

  if (style === "cornered") {
    // ⌜C⌝⌜o⌝⌜r⌝...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⌜${char}⌝`;
      })
      .join("");
  }

  if (style === "zigZagFlow") {
    // ⇜Z⇝⇜i⇝⇜g⇝...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `⇜${char}⇝`;
      })
      .join("");
  }

  if (style === "heavyMark") {
    // ❰H❱❰e❱❰a❱...
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `❰${char}❱`;
      })
      .join("");
  }

  // 处理普通映射样式
  const map = unicodeMaps[style];
  if (!map) {
    return text;
  }

  return text
    .split("")
    .map((char) => map[char] || char)
    .join("");
}

/**
 * 获取所有可用的 Unicode 样式
 */
export function getAvailableStyles(): string[] {
  return Object.keys(unicodeMaps);
}
