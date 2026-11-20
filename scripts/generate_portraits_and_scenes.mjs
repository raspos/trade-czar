// scripts/generate_portraits_and_scenes.mjs
// Generates high-resolution semi-realistic vector portraits and scene backgrounds for Trade Czar
import fs from 'fs';
import path from 'path';

const outPortraitsDir = path.resolve('dist/assets/portraits');
const outScenesDir = path.resolve('dist/assets/scenes');

fs.mkdirSync(outPortraitsDir, { recursive: true });
fs.mkdirSync(outScenesDir, { recursive: true });

// 1. CHARACTERS DEFINITIONS
const CHARACTERS = [
  {
    id: "player_minister",
    name: "통상교섭본부장 (플레이어)",
    title: "대한민국 통상사령탑",
    gender: "male",
    hairColor: "#1e293b",
    hairStyle: "neat_side_part",
    suitColor: "#0f172a",
    tieColor: "#b91c1c",
    glasses: false,
    skinTone: "#fcd34d",
    badge: "🇰🇷"
  },
  {
    id: "president",
    name: "대통령",
    title: "대한민국 국가원수",
    gender: "male",
    hairColor: "#475569",
    hairStyle: "executive_pompadour",
    suitColor: "#1e1e24",
    tieColor: "#1d4ed8",
    glasses: false,
    skinTone: "#fde68a",
    badge: "🦅"
  },
  {
    id: "us_trade_rep",
    name: "캐서린 타이",
    title: "미국 무역대표부(USTR) 대표",
    gender: "female",
    hairColor: "#0f172a",
    hairStyle: "sharp_bob",
    suitColor: "#1e3a8a",
    tieColor: "#ffffff",
    glasses: true,
    skinTone: "#fed7aa",
    badge: "🇺🇸"
  },
  {
    id: "cn_trade_rep",
    name: "왕 상무부 부부장",
    title: "중국 상무부 통상대표",
    gender: "male",
    hairColor: "#020617",
    hairStyle: "slick_back",
    suitColor: "#334155",
    tieColor: "#dc2626",
    glasses: true,
    skinTone: "#fef08a",
    badge: "🇨🇳"
  },
  {
    id: "eu_trade_rep",
    name: "베른트 특사",
    title: "유럽연합(EU) 통상총국 수석대표",
    gender: "male",
    hairColor: "#94a3b8",
    hairStyle: "silver_trim",
    suitColor: "#1e293b",
    tieColor: "#fbbf24",
    glasses: false,
    skinTone: "#ffedd5",
    badge: "🇪🇺"
  },
  {
    id: "jp_trade_rep",
    name: "사토 국장",
    title: "일본 경제산업성 통상정책국장",
    gender: "male",
    hairColor: "#334155",
    hairStyle: "formal_trim",
    suitColor: "#1e293b",
    tieColor: "#0284c7",
    glasses: true,
    skinTone: "#fef08a",
    badge: "🇯🇵"
  },
  {
    id: "deputy_pm",
    name: "경제부총리",
    title: "기획재정부 장관",
    gender: "male",
    hairColor: "#334155",
    hairStyle: "parted_gray",
    suitColor: "#0f172a",
    tieColor: "#047857",
    glasses: true,
    skinTone: "#fde68a",
    badge: "📊"
  },
  {
    id: "budget_minister",
    name: "기획예산처 장관",
    title: "국가재정 총괄",
    gender: "male",
    hairColor: "#64748b",
    hairStyle: "conservative_receding",
    suitColor: "#1e293b",
    tieColor: "#475569",
    glasses: true,
    skinTone: "#fcd34d",
    badge: "💰"
  },
  {
    id: "foreign_minister",
    name: "외교부 장관",
    title: "대외 외교 총괄",
    gender: "female",
    hairColor: "#1e293b",
    hairStyle: "elegant_bun",
    suitColor: "#312e81",
    tieColor: "#c084fc",
    glasses: false,
    skinTone: "#fef08a",
    badge: "🌐"
  },
  {
    id: "farmer_leader",
    name: "전국농민총연맹 대표",
    title: "농민단체 비상대책위원장",
    gender: "male",
    hairColor: "#334155",
    hairStyle: "rugged_short",
    suitColor: "#78350f",
    tieColor: "#b45309",
    vest: true,
    glasses: false,
    skinTone: "#d97706",
    badge: "🌾"
  },
  {
    id: "samsung_exec",
    name: "이재용 회장",
    title: "삼성전자 총수",
    gender: "male",
    hairColor: "#1e293b",
    hairStyle: "clean_modern",
    suitColor: "#0f172a",
    tieColor: "#2563eb",
    glasses: false,
    skinTone: "#fef08a",
    badge: "💾"
  },
  {
    id: "hyundai_exec",
    name: "정의선 회장",
    title: "현대자동차그룹 총수",
    gender: "male",
    hairColor: "#1e293b",
    hairStyle: "sharp_undercut",
    suitColor: "#111827",
    tieColor: "#0284c7",
    glasses: false,
    skinTone: "#fde68a",
    badge: "🚗"
  },
  {
    id: "ship_leader",
    name: "조선해양플랜트협회장",
    title: "HD현대·한화오션 대표단",
    gender: "male",
    hairColor: "#475569",
    hairStyle: "brushed_back",
    suitColor: "#1e3a8a",
    tieColor: "#0369a1",
    glasses: false,
    skinTone: "#d97706",
    badge: "⚓"
  },
  {
    id: "labor_leader",
    name: "민주노총 금속노조 위원장",
    title: "제조업 노동계 대표",
    gender: "male",
    hairColor: "#1e293b",
    hairStyle: "short_cropped",
    suitColor: "#991b1b",
    tieColor: "#450a0a",
    vest: true,
    glasses: false,
    skinTone: "#b45309",
    badge: "✊"
  },
  {
    id: "assembly_member",
    name: "국회 외통위원장",
    title: "여야 통상상임위 수석의원",
    gender: "male",
    hairColor: "#334155",
    hairStyle: "political_wave",
    suitColor: "#1e1e24",
    tieColor: "#b91c1c",
    glasses: true,
    skinTone: "#fde68a",
    badge: "🏛️"
  },
  {
    id: "journalist",
    name: "출입기자단 간사",
    title: "통상 출입 선임기자",
    gender: "female",
    hairColor: "#0f172a",
    hairStyle: "press_ponytail",
    suitColor: "#374151",
    tieColor: "#9ca3af",
    glasses: false,
    skinTone: "#fef08a",
    badge: "🎙️"
  }
];

const EXPRESSIONS = ['neutral', 'angry', 'surprised', 'satisfied', 'stern'];

function generateSvgPortrait(char, expr) {
  // Variations based on expression
  let eyeShape = '';
  let browShape = '';
  let mouthShape = '';
  let extraEffect = '';

  switch (expr) {
    case 'angry':
      browShape = `<path d="M 80 145 L 125 158 M 175 158 L 220 145" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/>`;
      eyeShape = `<ellipse cx="105" cy="170" rx="14" ry="7" fill="#0f172a"/>
                  <ellipse cx="195" cy="170" rx="14" ry="7" fill="#0f172a"/>
                  <circle cx="105" cy="170" r="4" fill="#ef4444"/>
                  <circle cx="195" cy="170" r="4" fill="#ef4444"/>`;
      mouthShape = `<path d="M 120 238 Q 150 220 180 238" stroke="#7f1d1d" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      extraEffect = `<path d="M 215 110 L 235 125 M 225 105 L 245 120" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
                     <circle cx="150" cy="190" r="60" fill="url(#angryFlush)" opacity="0.25"/>`;
      break;

    case 'surprised':
      browShape = `<path d="M 75 130 Q 105 115 130 135 M 170 135 Q 195 115 225 130" stroke="#0f172a" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      eyeShape = `<ellipse cx="105" cy="165" rx="18" ry="18" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
                  <circle cx="105" cy="165" r="7" fill="#0f172a"/>
                  <ellipse cx="195" cy="165" rx="18" ry="18" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
                  <circle cx="195" cy="165" r="7" fill="#0f172a"/>`;
      mouthShape = `<ellipse cx="150" cy="235" rx="14" ry="18" fill="#450a0a"/>`;
      extraEffect = `<ellipse cx="230" cy="140" rx="6" ry="14" fill="#38bdf8" opacity="0.8" transform="rotate(20 230 140)"/>`;
      break;

    case 'satisfied':
      browShape = `<path d="M 80 142 Q 105 135 130 144 M 170 144 Q 195 135 220 142" stroke="#0f172a" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      eyeShape = `<path d="M 90 170 Q 105 155 120 170" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
                  <path d="M 180 170 Q 195 155 210 170" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      mouthShape = `<path d="M 118 225 Q 150 255 182 225 Z" fill="#991b1b" stroke="#7f1d1d" stroke-width="3"/>`;
      extraEffect = `<circle cx="85" cy="195" r="14" fill="#f43f5e" opacity="0.3"/>
                     <circle cx="215" cy="195" r="14" fill="#f43f5e" opacity="0.3"/>`;
      break;

    case 'stern':
      browShape = `<path d="M 75 146 L 130 156 M 170 156 L 225 146" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
                   <line x1="145" y1="150" x2="145" y2="162" stroke="#0f172a" stroke-width="3"/>
                   <line x1="155" y1="150" x2="155" y2="162" stroke="#0f172a" stroke-width="3"/>`;
      eyeShape = `<ellipse cx="105" cy="172" rx="13" ry="8" fill="#0f172a"/>
                  <circle cx="107" cy="171" r="3" fill="#ffffff"/>
                  <ellipse cx="195" cy="172" rx="13" ry="8" fill="#0f172a"/>
                  <circle cx="197" cy="171" r="3" fill="#ffffff"/>`;
      mouthShape = `<line x1="120" y1="234" x2="180" y2="234" stroke="#450a0a" stroke-width="6" stroke-linecap="round"/>`;
      extraEffect = `<rect x="70" y="210" width="160" height="40" fill="url(#shadowGrad)" opacity="0.15"/>`;
      break;

    case 'neutral':
    default:
      browShape = `<path d="M 80 142 Q 105 138 128 145 M 172 145 Q 195 138 220 142" stroke="#0f172a" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      eyeShape = `<ellipse cx="105" cy="168" rx="14" ry="11" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
                  <circle cx="105" cy="168" r="6" fill="#1e293b"/>
                  <ellipse cx="195" cy="168" rx="14" ry="11" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
                  <circle cx="195" cy="168" r="6" fill="#1e293b"/>`;
      mouthShape = `<path d="M 125 232 Q 150 236 175 232" stroke="#450a0a" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
      extraEffect = ``;
      break;
  }

  // Glasses overlay
  const glassesSvg = char.glasses ? `
    <g stroke="#1e293b" stroke-width="4" fill="rgba(255,255,255,0.2)">
      <rect x="80" y="152" width="50" height="32" rx="6"/>
      <rect x="170" y="152" width="50" height="32" rx="6"/>
      <line x1="130" y1="166" x2="170" y2="166" stroke-width="4"/>
      <line x1="80" y1="166" x2="55" y2="160" stroke-width="3"/>
      <line x1="220" y1="166" x2="245" y2="160" stroke-width="3"/>
    </g>
  ` : '';

  // Hair style
  let hairSvg = '';
  if (char.gender === 'female') {
    if (char.hairStyle === 'sharp_bob') {
      hairSvg = `
        <path d="M 60 170 Q 50 80 150 70 Q 250 80 240 170 Q 235 220 220 230 L 220 180 Q 200 110 150 110 Q 100 110 80 180 L 80 230 Q 65 220 60 170 Z" fill="${char.hairColor}"/>
      `;
    } else {
      hairSvg = `
        <circle cx="150" cy="65" r="30" fill="${char.hairColor}"/>
        <path d="M 65 160 Q 60 85 150 80 Q 240 85 235 160 Q 220 115 150 115 Q 80 115 65 160 Z" fill="${char.hairColor}"/>
      `;
    }
  } else {
    hairSvg = `
      <path d="M 65 150 Q 60 70 150 65 Q 240 70 235 150 Q 215 95 150 95 Q 85 95 65 150 Z" fill="${char.hairColor}"/>
      <path d="M 75 105 Q 120 75 180 85 Q 215 95 235 125 Q 195 90 140 90 Q 95 90 75 105 Z" fill="${char.hairColor}" filter="brightness(1.2)"/>
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="70%" stop-color="#e2e8f0" stop-opacity="1"/>
      <stop offset="100%" stop-color="#cbd5e1" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="angryFlush" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${char.suitColor}"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="300" height="400" rx="16" fill="url(#bgGrad)"/>
  <rect x="6" y="6" width="288" height="388" rx="12" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 2"/>

  <!-- Character Badge Top Right -->
  <g transform="translate(245, 25)">
    <circle cx="0" cy="0" r="18" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"/>
    <text x="0" y="6" font-size="16" text-anchor="middle">${char.badge}</text>
  </g>

  <!-- Body / Shoulders -->
  <g filter="url(#cardShadow)">
    <path d="M 30 400 L 40 310 Q 75 270 150 270 Q 225 270 260 310 L 270 400 Z" fill="url(#suitGrad)"/>
    <!-- Collar & Shirt -->
    <polygon points="120,270 150,335 180,270 160,265 140,265" fill="#ffffff"/>
    <!-- Tie -->
    <polygon points="144,285 156,285 160,370 150,390 140,370" fill="${char.tieColor}"/>
    <!-- Lapels -->
    <path d="M 90 280 L 135 345 L 120 400 L 45 400 Z" fill="#0f172a" opacity="0.4"/>
    <path d="M 210 280 L 165 345 L 180 400 L 255 400 Z" fill="#020617" opacity="0.4"/>
  </g>

  <!-- Neck -->
  <rect x="126" y="215" width="48" height="60" rx="6" fill="${char.skinTone}" filter="brightness(0.9)"/>

  <!-- Head / Face -->
  <g filter="url(#cardShadow)">
    <ellipse cx="150" cy="180" rx="68" ry="82" fill="${char.skinTone}"/>
    <!-- Ears -->
    <circle cx="78" cy="180" r="14" fill="${char.skinTone}"/>
    <circle cx="222" cy="180" r="14" fill="${char.skinTone}"/>
  </g>

  <!-- Hair -->
  ${hairSvg}

  <!-- Eyes & Eyebrows -->
  ${browShape}
  ${eyeShape}

  <!-- Nose -->
  <path d="M 150 175 L 144 206 L 156 206" stroke="#b45309" stroke-width="3" fill="none" stroke-linecap="round"/>

  <!-- Mouth -->
  ${mouthShape}

  <!-- Glasses if any -->
  ${glassesSvg}

  <!-- Extra Emotion Effects -->
  ${extraEffect}

  <!-- Name Banner Ribbon Bottom -->
  <g transform="translate(150, 368)">
    <rect x="-130" y="-18" width="260" height="34" rx="8" fill="#0f172a" opacity="0.95"/>
    <text x="0" y="4" font-family="'Pretendard', sans-serif" font-size="13" font-weight="800" fill="#f8fafc" text-anchor="middle">
      ${char.name}
    </text>
  </g>
</svg>`;
}

// Generate all portraits
let portraitCount = 0;
for (const char of CHARACTERS) {
  for (const expr of EXPRESSIONS) {
    const filename = `${char.id}_${expr}.svg`;
    const filepath = path.join(outPortraitsDir, filename);
    fs.writeFileSync(filepath, generateSvgPortrait(char, expr), 'utf-8');
    portraitCount++;
  }
}
console.log(`✓ Generated ${portraitCount} character expression portraits in ${outPortraitsDir}`);

// 2. SCENES GENERATOR (Realistic 2D Vector Backgrounds for the 5+ Required Scenes)
const SCENES = [
  {
    id: "scene_us_negotiation",
    title: "미국 무역대표부(USTR) 고위급 협상장",
    flag: "🇺🇸",
    wallColor: "#1e293b",
    woodTrim: "#78350f",
    tableColor: "#451a03",
    bannerText: "OFFICE OF THE UNITED STATES TRADE REPRESENTATIVE · WASHINGTON D.C."
  },
  {
    id: "scene_president_office",
    title: "대통령실 집무실 (긴급 독대)",
    flag: "🇰🇷",
    wallColor: "#0f172a",
    woodTrim: "#9a3412",
    tableColor: "#3e1c07",
    bannerText: "OFFICE OF THE PRESIDENT · THE REPUBLIC OF KOREA"
  },
  {
    id: "scene_hyundai_boardroom",
    title: "현대자동차그룹 글로벌 전략회의실",
    flag: "🚗",
    wallColor: "#090d16",
    woodTrim: "#0284c7",
    tableColor: "#1e293b",
    bannerText: "HYUNDAI MOTOR GROUP · GLOBAL STRATEGY BOARDROOM"
  },
  {
    id: "scene_cabinet_meeting",
    title: "정부서울청사 국무회의실 (국내 부처 조정회의)",
    flag: "🏛️",
    wallColor: "#1e293b",
    woodTrim: "#b45309",
    tableColor: "#78350f",
    bannerText: "GOVERNMENT COMPLEX SEOUL · STATE COUNCIL CONFERENCE ROOM"
  },
  {
    id: "scene_wto_dispute",
    title: "세계무역기구(WTO) 제네바 분쟁해결 회의장",
    flag: "🌐",
    wallColor: "#334155",
    woodTrim: "#475569",
    tableColor: "#1e293b",
    bannerText: "WORLD TRADE ORGANIZATION · DISPUTE SETTLEMENT BODY · GENEVA"
  },
  {
    id: "scene_supply_warroom",
    title: "비상 해운선복 및 전략비축 공급망 지휘소",
    flag: "🚢",
    wallColor: "#020617",
    woodTrim: "#0369a1",
    tableColor: "#0f172a",
    bannerText: "NATIONAL SUPPLY CHAIN CRISIS CENTER · CONTINGENCY FLEET COMMAND"
  },
  {
    id: "scene_press_conference",
    title: "정부서울청사 합동브리핑실 (외신기자회견)",
    flag: "🎙️",
    wallColor: "#0c4a6e",
    woodTrim: "#0284c7",
    tableColor: "#075985",
    bannerText: "GOVERNMENT PRESS CENTER · DIPLOMATIC & ECONOMIC BRIEFING"
  },
  {
    id: "scene_national_assembly",
    title: "대한민국 국회 본회의장 (통상비준 심의)",
    flag: "⚖️",
    wallColor: "#14532d",
    woodTrim: "#166534",
    tableColor: "#052e16",
    bannerText: "NATIONAL ASSEMBLY OF KOREA · PLENARY SESSION HALL"
  }
];

function generateSvgScene(scene) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700">
  <defs>
    <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${scene.wallColor}"/>
      <stop offset="65%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${scene.woodTrim}"/>
      <stop offset="100%" stop-color="#271003"/>
    </linearGradient>
    <linearGradient id="tableGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${scene.tableColor}" stop-opacity="0.95"/>
      <stop offset="40%" stop-color="#1c0b02"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="windowLight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Back Wall -->
  <rect width="1200" height="700" fill="url(#wallGrad)"/>

  <!-- Wall Wood Molding & Panels -->
  <rect x="0" y="60" width="1200" height="12" fill="url(#woodGrad)"/>
  <rect x="0" y="380" width="1200" height="16" fill="url(#woodGrad)"/>

  <!-- Architectural Background Windows / Monitors -->
  <g opacity="0.45">
    <rect x="120" y="100" width="260" height="250" rx="8" fill="#1e293b" stroke="${scene.woodTrim}" stroke-width="4"/>
    <rect x="135" y="115" width="230" height="220" fill="url(#windowLight)"/>
    <line x1="250" y1="100" x2="250" y2="350" stroke="${scene.woodTrim}" stroke-width="3"/>
    <line x1="120" y1="225" x2="380" y2="225" stroke="${scene.woodTrim}" stroke-width="3"/>

    <rect x="820" y="100" width="260" height="250" rx="8" fill="#1e293b" stroke="${scene.woodTrim}" stroke-width="4"/>
    <rect x="835" y="115" width="230" height="220" fill="url(#windowLight)"/>
    <line x1="950" y1="100" x2="950" y2="350" stroke="${scene.woodTrim}" stroke-width="3"/>
    <line x1="820" y1="225" x2="1080" y2="225" stroke="${scene.woodTrim}" stroke-width="3"/>
  </g>

  <!-- Center Crest / Logo Shield Backing -->
  <g transform="translate(600, 200)" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.5))">
    <circle cx="0" cy="0" r="70" fill="#0f172a" stroke="${scene.woodTrim}" stroke-width="4"/>
    <circle cx="0" cy="0" r="58" fill="none" stroke="#d97706" stroke-width="1.5" stroke-dasharray="6 3"/>
    <text x="0" y="20" font-size="52" text-anchor="middle">${scene.flag}</text>
  </g>

  <!-- Top Official Header Plaque -->
  <g transform="translate(600, 35)">
    <rect x="-420" y="-20" width="840" height="38" rx="6" fill="#020617" stroke="${scene.woodTrim}" stroke-width="2"/>
    <text x="0" y="4" font-family="'Pretendard', sans-serif" font-size="13" font-weight="900" fill="#fde68a" letter-spacing="1.5" text-anchor="middle">
      ${scene.bannerText}
    </text>
  </g>

  <!-- Massive Curved Conference / Negotiation Table in Foreground -->
  <g>
    <!-- Table Base / Shadow -->
    <ellipse cx="600" cy="620" rx="680" ry="240" fill="#000000" opacity="0.65"/>
    <!-- Table Top -->
    <ellipse cx="600" cy="600" rx="660" ry="220" fill="url(#tableGrad)" stroke="${scene.woodTrim}" stroke-width="6"/>
    <!-- Table Reflection Strip -->
    <ellipse cx="600" cy="570" rx="540" ry="140" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.15"/>
  </g>

  <!-- Interactive Table Desk Props -->
  <g transform="translate(600, 500)">
    <!-- Official Document Folder Center -->
    <rect x="-80" y="-30" width="160" height="70" rx="4" fill="#fef3c7" stroke="#b45309" stroke-width="2" transform="rotate(-3)"/>
    <line x1="-60" y1="-10" x2="60" y2="-10" stroke="#92400e" stroke-width="2"/>
    <line x1="-60" y1="5" x2="40" y2="5" stroke="#92400e" stroke-width="1.5"/>
    <line x1="-60" y1="20" x2="50" y2="20" stroke="#92400e" stroke-width="1.5"/>
    <circle cx="45" cy="18" r="8" fill="#dc2626" opacity="0.8"/>

    <!-- Left Delegate Microphone -->
    <circle cx="-280" cy="-20" r="16" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
    <path d="M -280 -20 Q -270 -60 -250 -70" stroke="#334155" stroke-width="4" fill="none"/>
    <rect x="-254" y="-80" width="8" height="18" rx="2" fill="#020617"/>

    <!-- Right Delegate Microphone -->
    <circle cx="280" cy="-20" r="16" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
    <path d="M 280 -20 Q 270 -60 250 -70" stroke="#334155" stroke-width="4" fill="none"/>
    <rect x="246" y="-80" width="8" height="18" rx="2" fill="#020617"/>

    <!-- Executive Pen Stand -->
    <rect x="140" y="-20" width="36" height="20" rx="3" fill="#1e293b"/>
    <line x1="158" y1="-20" x2="175" y2="-55" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`;
}

// Generate all scenes
for (const scene of SCENES) {
  const filename = `${scene.id}.svg`;
  const filepath = path.join(outScenesDir, filename);
  fs.writeFileSync(filepath, generateSvgScene(scene), 'utf-8');
}
console.log(`✓ Generated ${SCENES.length} scene backgrounds in ${outScenesDir}`);
