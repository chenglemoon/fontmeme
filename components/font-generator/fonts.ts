/**
 * 字体样式配置
 * 使用 Unicode 字符样式，类似 copy and paste fonts
 * 包含 fontgenerator.cool 上的所有样式
 */

export interface FontStyle {
  name: string;
  displayName: string;
  unicodeStyle: string; // Unicode 样式类型
  fallback: string;
}

export const FONT_STYLES: FontStyle[] = [
  // 基础样式
  {
    name: "Bold",
    displayName: "Bold",
    unicodeStyle: "bold",
    fallback: "sans-serif",
  },
  {
    name: "Italic",
    displayName: "Italic",
    unicodeStyle: "italic",
    fallback: "sans-serif",
  },
  {
    name: "BoldItalic",
    displayName: "Bold Italic",
    unicodeStyle: "boldItalic",
    fallback: "sans-serif",
  },
  {
    name: "Gothic",
    displayName: "Gothic",
    unicodeStyle: "gothic",
    fallback: "serif",
  },
  {
    name: "BoldGothic",
    displayName: "Bold Gothic",
    unicodeStyle: "boldGothic",
    fallback: "serif",
  },
  {
    name: "Script",
    displayName: "Script",
    unicodeStyle: "script",
    fallback: "cursive",
  },
  {
    name: "BoldScript",
    displayName: "Bold Script",
    unicodeStyle: "boldScript",
    fallback: "cursive",
  },
  {
    name: "SansSerifBold",
    displayName: "Sans Serif Bold",
    unicodeStyle: "sansSerifBold",
    fallback: "sans-serif",
  },
  {
    name: "SansSerifItalic",
    displayName: "Sans Serif Italic",
    unicodeStyle: "sansSerifItalic",
    fallback: "sans-serif",
  },
  {
    name: "SansSerifBoldItalic",
    displayName: "Sans Serif Bold Italic",
    unicodeStyle: "sansSerifBoldItalic",
    fallback: "sans-serif",
  },
  {
    name: "SansSerifBoldItalic2",
    displayName: "Sans Serif Bold Italic 2",
    unicodeStyle: "sansSerifBoldItalic2",
    fallback: "sans-serif",
  },
  {
    name: "Monospace",
    displayName: "Monospace",
    unicodeStyle: "monospace",
    fallback: "monospace",
  },
  {
    name: "DoubleStruck",
    displayName: "Double Struck",
    unicodeStyle: "doubleStruck",
    fallback: "serif",
  },
  {
    name: "Bubble",
    displayName: "Bubble",
    unicodeStyle: "bubble",
    fallback: "sans-serif",
  },
  {
    name: "DarkBubble",
    displayName: "Dark Bubble",
    unicodeStyle: "darkBubble",
    fallback: "sans-serif",
  },
  {
    name: "Square",
    displayName: "Square",
    unicodeStyle: "square",
    fallback: "sans-serif",
  },
  {
    name: "Parenthesized",
    displayName: "Parenthesized",
    unicodeStyle: "parenthesized",
    fallback: "sans-serif",
  },
  {
    name: "SmallCaps",
    displayName: "Small Caps",
    unicodeStyle: "smallCaps",
    fallback: "sans-serif",
  },
  {
    name: "Fullwidth",
    displayName: "Fullwidth",
    unicodeStyle: "fullwidth",
    fallback: "monospace",
  },
  {
    name: "Reversed",
    displayName: "Reversed",
    unicodeStyle: "reversed",
    fallback: "sans-serif",
  },
  {
    name: "Strikethrough",
    displayName: "Strikethrough",
    unicodeStyle: "strikethrough",
    fallback: "sans-serif",
  },
  {
    name: "Superscript",
    displayName: "Superscript",
    unicodeStyle: "superscript",
    fallback: "sans-serif",
  },
  {
    name: "Subscript",
    displayName: "Subscript",
    unicodeStyle: "subscript",
    fallback: "sans-serif",
  },
  {
    name: "Greek",
    displayName: "Greek",
    unicodeStyle: "greek",
    fallback: "sans-serif",
  },
  // 线性文本样式
  {
    name: "Underline",
    displayName: "Underline",
    unicodeStyle: "underline",
    fallback: "sans-serif",
  },
  {
    name: "DoubleUnderline",
    displayName: "Double Underline",
    unicodeStyle: "doubleUnderline",
    fallback: "sans-serif",
  },
  {
    name: "SlashOverlay",
    displayName: "Slash Overlay",
    unicodeStyle: "slashOverlay",
    fallback: "sans-serif",
  },
  {
    name: "WaveOverlay",
    displayName: "Wave Overlay",
    unicodeStyle: "waveOverlay",
    fallback: "sans-serif",
  },
  {
    name: "Framed",
    displayName: "Framed",
    unicodeStyle: "framed",
    fallback: "sans-serif",
  },
  {
    name: "DoubleOverline",
    displayName: "Double Overline",
    unicodeStyle: "doubleOverline",
    fallback: "sans-serif",
  },
  // 加冕美学字母
  {
    name: "Crowned",
    displayName: "Crowned",
    unicodeStyle: "crowned",
    fallback: "sans-serif",
  },
  {
    name: "ZLines",
    displayName: "Z Lines",
    unicodeStyle: "zLines",
    fallback: "sans-serif",
  },
  {
    name: "CurvedAccent",
    displayName: "Curved Accent",
    unicodeStyle: "curvedAccent",
    fallback: "sans-serif",
  },
  {
    name: "PointedAccent",
    displayName: "Pointed Accent",
    unicodeStyle: "pointedAccent",
    fallback: "sans-serif",
  },
  {
    name: "WavyAccent",
    displayName: "Wavy Accent",
    unicodeStyle: "wavyAccent",
    fallback: "sans-serif",
  },
  {
    name: "GlyphCap",
    displayName: "Glyph Cap",
    unicodeStyle: "glyphCap",
    fallback: "sans-serif",
  },
  {
    name: "ShortMark",
    displayName: "Short Mark",
    unicodeStyle: "shortMark",
    fallback: "sans-serif",
  },
  {
    name: "BalancedLine",
    displayName: "Balanced Line",
    unicodeStyle: "balancedLine",
    fallback: "sans-serif",
  },
  {
    name: "Spotted",
    displayName: "Spotted",
    unicodeStyle: "spotted",
    fallback: "sans-serif",
  },
  // 交叉字体
  {
    name: "UnderCurve",
    displayName: "Under Curve",
    unicodeStyle: "underCurve",
    fallback: "sans-serif",
  },
  {
    name: "WaveTop",
    displayName: "Wave Top",
    unicodeStyle: "waveTop",
    fallback: "sans-serif",
  },
  {
    name: "BottomArrow",
    displayName: "Bottom Arrow",
    unicodeStyle: "bottomArrow",
    fallback: "sans-serif",
  },
  {
    name: "WaveUnder",
    displayName: "Wave Under",
    unicodeStyle: "waveUnder",
    fallback: "sans-serif",
  },
  {
    name: "Intersected",
    displayName: "Intersected",
    unicodeStyle: "intersected",
    fallback: "sans-serif",
  },
  {
    name: "DualCurve",
    displayName: "Dual Curve",
    unicodeStyle: "dualCurve",
    fallback: "sans-serif",
  },
  // 特殊字符映射样式
  {
    name: "Rounded",
    displayName: "Rounded Font",
    unicodeStyle: "rounded",
    fallback: "sans-serif",
  },
  {
    name: "Vintage",
    displayName: "Vintage Font",
    unicodeStyle: "vintage",
    fallback: "serif",
  },
  {
    name: "Small",
    displayName: "Small Font",
    unicodeStyle: "small",
    fallback: "sans-serif",
  },
  // 带括号/符号的样式
  {
    name: "Connected",
    displayName: "Connected Text",
    unicodeStyle: "connected",
    fallback: "sans-serif",
  },
  {
    name: "Sharp",
    displayName: "Sharp",
    unicodeStyle: "sharp",
    fallback: "sans-serif",
  },
  {
    name: "Enclosed",
    displayName: "Enclosed",
    unicodeStyle: "enclosed",
    fallback: "sans-serif",
  },
  {
    name: "Pointed",
    displayName: "Pointed",
    unicodeStyle: "pointed",
    fallback: "sans-serif",
  },
  {
    name: "Lunar",
    displayName: "Lunar",
    unicodeStyle: "lunar",
    fallback: "sans-serif",
  },
  {
    name: "PointedDots",
    displayName: "Pointed Dots",
    unicodeStyle: "pointedDots",
    fallback: "sans-serif",
  },
  {
    name: "CurvedLight",
    displayName: "Curved Light",
    unicodeStyle: "curvedLight",
    fallback: "sans-serif",
  },
  {
    name: "CurvyLink",
    displayName: "Curvy Link",
    unicodeStyle: "curvyLink",
    fallback: "sans-serif",
  },
  {
    name: "Subflow",
    displayName: "Subflow",
    unicodeStyle: "subflow",
    fallback: "sans-serif",
  },
  {
    name: "DoubleSlash",
    displayName: "Double Slash",
    unicodeStyle: "doubleSlash",
    fallback: "sans-serif",
  },
  {
    name: "ArrowSpark",
    displayName: "Arrow Spark",
    unicodeStyle: "arrowSpark",
    fallback: "sans-serif",
  },
  {
    name: "StarryMark",
    displayName: "Starry Mark",
    unicodeStyle: "starryMark",
    fallback: "sans-serif",
  },
  {
    name: "Looped",
    displayName: "Looped",
    unicodeStyle: "looped",
    fallback: "sans-serif",
  },
  {
    name: "Boxed",
    displayName: "Boxed",
    unicodeStyle: "boxed",
    fallback: "sans-serif",
  },
  {
    name: "ArrowedBound",
    displayName: "Arrowed Bound",
    unicodeStyle: "arrowedBound",
    fallback: "sans-serif",
  },
  {
    name: "Accented",
    displayName: "Accented",
    unicodeStyle: "accented",
    fallback: "sans-serif",
  },
  {
    name: "CloudCurve",
    displayName: "Cloud Curve",
    unicodeStyle: "cloudCurve",
    fallback: "sans-serif",
  },
  {
    name: "SoftCurves",
    displayName: "Soft Curves",
    unicodeStyle: "softCurves",
    fallback: "sans-serif",
  },
  {
    name: "TripleBeam",
    displayName: "Triple Beam",
    unicodeStyle: "tripleBeam",
    fallback: "sans-serif",
  },
  {
    name: "TriFramed",
    displayName: "Tri-Framed",
    unicodeStyle: "triFramed",
    fallback: "sans-serif",
  },
  {
    name: "Swirled",
    displayName: "Swirled",
    unicodeStyle: "swirled",
    fallback: "sans-serif",
  },
  {
    name: "Frame",
    displayName: "Frame",
    unicodeStyle: "frame",
    fallback: "sans-serif",
  },
  {
    name: "BoldEdge",
    displayName: "Bold Edge",
    unicodeStyle: "boldEdge",
    fallback: "sans-serif",
  },
  {
    name: "CornerGlow",
    displayName: "Corner Glow",
    unicodeStyle: "cornerGlow",
    fallback: "sans-serif",
  },
  {
    name: "TickFrame",
    displayName: "Tick Frame",
    unicodeStyle: "tickFrame",
    fallback: "sans-serif",
  },
  {
    name: "SoftAngles",
    displayName: "Soft Angles",
    unicodeStyle: "softAngles",
    fallback: "sans-serif",
  },
  // 特殊组合字符样式
  {
    name: "DoubleMacron",
    displayName: "Underline Text (Double Macron)",
    unicodeStyle: "doubleMacron",
    fallback: "sans-serif",
  },
  {
    name: "CircularStyle",
    displayName: "Circular Style",
    unicodeStyle: "circularStyle",
    fallback: "sans-serif",
  },
  {
    name: "IntersectedAdvanced",
    displayName: "Intersected",
    unicodeStyle: "intersectedAdvanced",
    fallback: "sans-serif",
  },
  {
    name: "BottomArrowAdvanced",
    displayName: "Bottom Arrow",
    unicodeStyle: "bottomArrowAdvanced",
    fallback: "sans-serif",
  },
  {
    name: "WaveUnderAdvanced",
    displayName: "Wave Under",
    unicodeStyle: "waveUnderAdvanced",
    fallback: "sans-serif",
  },
  // 反转文本样式
  {
    name: "ReverseText",
    displayName: "Reverse Text",
    unicodeStyle: "reverseText",
    fallback: "sans-serif",
  },
  {
    name: "BackwardFlip",
    displayName: "Backward Flip Text",
    unicodeStyle: "backwardFlip",
    fallback: "sans-serif",
  },
  {
    name: "MirrorText",
    displayName: "Mirror Text",
    unicodeStyle: "mirrorText",
    fallback: "sans-serif",
  },
  {
    name: "UpsideDown",
    displayName: "Upside Down Text",
    unicodeStyle: "upsideDown",
    fallback: "sans-serif",
  },
  // 符号融合字体样式
  {
    name: "StraightWaves",
    displayName: "Straight Waves",
    unicodeStyle: "straightWaves",
    fallback: "sans-serif",
  },
  {
    name: "BurstConnect",
    displayName: "Burst Connect",
    unicodeStyle: "burstConnect",
    fallback: "sans-serif",
  },
  {
    name: "DualShift",
    displayName: "Dual Shift",
    unicodeStyle: "dualShift",
    fallback: "sans-serif",
  },
  {
    name: "TwistStrike",
    displayName: "Twist Strike",
    unicodeStyle: "twistStrike",
    fallback: "sans-serif",
  },
  {
    name: "StarCluster",
    displayName: "Star Cluster",
    unicodeStyle: "starCluster",
    fallback: "sans-serif",
  },
  {
    name: "ZigGlitch",
    displayName: "ZigGlitch",
    unicodeStyle: "zigGlitch",
    fallback: "sans-serif",
  },
  {
    name: "Focused",
    displayName: "Focused",
    unicodeStyle: "focused",
    fallback: "sans-serif",
  },
  // 流动字体样式
  {
    name: "NumericalBurst",
    displayName: "Numerical Burst",
    unicodeStyle: "numericalBurst",
    fallback: "sans-serif",
  },
  {
    name: "CornerGlide",
    displayName: "Corner Glide",
    unicodeStyle: "cornerGlide",
    fallback: "sans-serif",
  },
  {
    name: "UpwardForce",
    displayName: "Upward Force",
    unicodeStyle: "upwardForce",
    fallback: "sans-serif",
  },
  {
    name: "BalancedGlow",
    displayName: "Balanced Glow",
    unicodeStyle: "balancedGlow",
    fallback: "sans-serif",
  },
  {
    name: "DigitalDisrupt",
    displayName: "Digital Disrupt",
    unicodeStyle: "digitalDisrupt",
    fallback: "sans-serif",
  },
  {
    name: "Dimmed",
    displayName: "Dimmed",
    unicodeStyle: "dimmed",
    fallback: "sans-serif",
  },
  {
    name: "Cornered",
    displayName: "Cornered",
    unicodeStyle: "cornered",
    fallback: "sans-serif",
  },
  {
    name: "ZigZagFlow",
    displayName: "ZigZag Flow",
    unicodeStyle: "zigZagFlow",
    fallback: "sans-serif",
  },
  {
    name: "HeavyMark",
    displayName: "Heavy Mark",
    unicodeStyle: "heavyMark",
    fallback: "sans-serif",
  },
];
