import { HistoricalLeader, SupportedLanguage, LeaderSlide } from '../types';
import { createStandardSlideDeck } from '../data/leadersData';

export interface WikiSearchResult {
  title: string;
  extract: string;
  thumbnail?: string;
  pageId: number;
  description?: string;
}

// Mapping of our language codes to Wikipedia subdomains
const WIKI_LANG_MAP: Record<SupportedLanguage, string> = {
  uz: 'uz',
  en: 'en',
  ru: 'ru',
  zh: 'zh',
  es: 'es',
  fr: 'fr',
  ja: 'ja',
  ar: 'ar',
  tr: 'tr',
  ko: 'ko',
};

export async function searchWikipediaLeader(
  query: string,
  lang: SupportedLanguage = 'en'
): Promise<WikiSearchResult | null> {
  const wikiLang = WIKI_LANG_MAP[lang] || 'en';
  const endpoint = `https://${wikiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      // Fallback search API
      const searchEndpoint = `https://${wikiLang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
      const searchRes = await fetch(searchEndpoint);
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const firstHit = searchData.query?.search?.[0];
        if (firstHit) {
          return searchWikipediaLeader(firstHit.title, lang);
        }
      }
      return null;
    }

    const data = await response.json();
    return {
      title: data.title,
      extract: data.extract,
      thumbnail: data.thumbnail?.source || data.originalimage?.source,
      pageId: data.pageid,
      description: data.description,
    };
  } catch (err) {
    console.error("Wikipedia fetch error:", err);
    return null;
  }
}

// Convert Wikipedia article into full HistoricalLeader with interactive slides
export function convertWikiToLeader(
  wiki: WikiSearchResult,
  lang: SupportedLanguage
): HistoricalLeader {
  const id = `wiki-${wiki.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
  const defaultPortrait = wiki.thumbnail || "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80";

  const leader: HistoricalLeader = {
    id,
    name: {
      uz: wiki.title,
      en: wiki.title,
      ru: wiki.title,
      zh: wiki.title,
      es: wiki.title,
      fr: wiki.title,
      ja: wiki.title,
      ar: wiki.title,
      tr: wiki.title,
      ko: wiki.title,
    },
    title: {
      uz: wiki.description || "Tarixiy Davlat Rahbari (Wikipedia)",
      en: wiki.description || "Historical World Leader (Wikipedia)",
      ru: wiki.description || "Исторический государственный деятель (Википедия)",
      zh: wiki.description || "历史统治者（维基百科）",
      es: wiki.description || "Líder Histórico Mundial (Wikipedia)",
      fr: wiki.description || "Dirigeant Historique (Wikipédia)",
      ja: wiki.description || "歴史的指導者（Wikipedia）",
      ar: wiki.description || "قائد وحاكم تاريخي (ويكيبيديا)",
      tr: wiki.description || "Tarihi Devlet Lideri (Vikipedi)",
      ko: wiki.description || "역사적 지도자 (위키백과)",
    },
    era: 'modern',
    reignYears: "Tarixiy manba",
    lifespan: "Tarixiy davr",
    country: {
      uz: "Xalqaro Tarix",
      en: "World History",
      ru: "Мировая История",
      zh: "世界历史",
      es: "Historia Mundial",
      fr: "Histoire Mondiale",
      ja: "世界史",
      ar: "التاريخ العالمي",
      tr: "Dünya Tarihi",
      ko: "세계사",
    },
    countryCode: "UN",
    region: 'europe',
    portraitUrl: defaultPortrait,
    themeColor: "#991b1b",
    tagline: {
      uz: `${wiki.title.toUpperCase()} — WIKIPEDIA OCHIQ ENSIKLOPEDIYASI`,
      en: `${wiki.title.toUpperCase()} — WIKIPEDIA OPEN ARCHIVE`,
      ru: `${wiki.title.toUpperCase()} — МЕЖДУНАРОДНЫЙ АРХИВ ВИКИПЕДИИ`,
      zh: `${wiki.title} — 维基百科全球开放档案`,
      es: `${wiki.title.toUpperCase()} — ARCHIVO MUNDIAL WIKIPEDIA`,
      fr: `${wiki.title.toUpperCase()} — ARCHIVES MONDIALES WIKIPÉDIA`,
      ja: `${wiki.title} — WIKIPEDIA国際アーカイブ`,
      ar: `${wiki.title} — الأرشيف العالمي الموسوعي ويكيبيديا`,
      tr: `${wiki.title.toUpperCase()} — VİKİPEDİ AÇIK ARŞİVİ`,
      ko: `${wiki.title} — 위키백과 글로벌 오픈 아카이브`,
    },
    shortBio: {
      uz: wiki.extract,
      en: wiki.extract,
      ru: wiki.extract,
      zh: wiki.extract,
      es: wiki.extract,
      fr: wiki.extract,
      ja: wiki.extract,
      ar: wiki.extract,
      tr: wiki.extract,
      ko: wiki.extract,
    },
    famousQuote: {
      uz: `${wiki.title}: Tarix sahifalarida mangu muhrlangan shaxsiyat.`,
      en: `${wiki.title}: A monumental figure in the annals of world history.`,
      ru: `${wiki.title}: Личность, оставившая неизгладимый след в мировой истории.`,
      zh: `${wiki.title}：世界历史长河中不可磨灭的杰出人物。`,
      es: `${wiki.title}: Figura destacada en los anales de la historia universal.`,
      fr: `${wiki.title} : Une figure majeure dans les annales de l'histoire mondiale.`,
      ja: `${wiki.title}：世界史の記録に刻まれた偉大な指導者。`,
      ar: `${wiki.title}: شخصية بارزة تركت أثراً خالداً في التاريخ الإنساني.`,
      tr: `${wiki.title}: Dünya tarihinin sayfalarında silinmez iz bırakan şahsiyet.`,
      ko: `${wiki.title}: 세계사의 기록 속에 뚜렷한 족적을 남긴 인물.`,
    },
    slides: createStandardSlideDeck(id, wiki.title, "World History", "Historical Era", defaultPortrait),
    isCustom: true,
  };

  return leader;
}
