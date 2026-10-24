export type SupportedLanguage = 
  | 'uz' 
  | 'en' 
  | 'ru' 
  | 'zh' 
  | 'es' 
  | 'fr' 
  | 'ja' 
  | 'ar' 
  | 'tr' 
  | 'ko';

export type HistoricalEra = 'ancient' | 'medieval' | 'modern';

export interface LocalizedString {
  uz: string;
  en: string;
  ru: string;
  zh: string;
  es: string;
  fr: string;
  ja: string;
  ar: string;
  tr: string;
  ko: string;
}

export type SlideCategory = 
  | 'context'       // I: Tarixiy vaziyat / Fon
  | 'events'        // II: Asosiy voqealar / Harbiy yurishlar / Islohotlar
  | 'strategy'      // III: G'alaba omillari / Strategiya / Siyosat
  | 'legacy'        // IV: Tarixiy ahamiyati / Xalqaro ta'siri
  | 'map'           // Xarita va hududlar
  | 'archive'       // Arxiv fotosuratlari va hujjatlar
  | 'quote'         // Mashhur iqtibos / Nutq
  | 'tribute';      // E'tibor uchun rahmat / Xulosa

export interface LeaderSlide {
  id: string;
  slideNumber: number;
  romanNumeral?: string; // I, II, III, IV
  category: SlideCategory;
  title: LocalizedString;
  subtitle?: LocalizedString;
  badge?: LocalizedString;
  yearRange?: string;
  imageUrl?: string;
  mapCoordinates?: string;
  content: LocalizedString;
  bulletPoints?: {
    dateOrTag?: string;
    text: LocalizedString;
  }[];
  quote?: {
    text: LocalizedString;
    speaker?: LocalizedString;
  };
}

export interface DetailedLeaderDossier {
  leaderId: string;
  territory: {
    realmName: LocalizedString;
    peakAreaKm2: string;
    provincesAndConquests: LocalizedString[];
    tradeRoutesControlled: LocalizedString[];
    keyFortressesAndCapitals: LocalizedString[];
  };
  warsAndBattles: {
    year: string;
    name: LocalizedString;
    opponent: LocalizedString;
    location: LocalizedString;
    outcome: LocalizedString;
    forcesOrTactics?: LocalizedString;
    description: LocalizedString;
  }[];
  economyAndFinance: {
    currency: LocalizedString;
    treasuryState: LocalizedString;
    taxPolicy: LocalizedString;
    tradeAndIncome: LocalizedString;
    majorPublicWorks: LocalizedString[];
  };
  governanceAndPolicy: {
    legalCode: LocalizedString;
    stateStructure: LocalizedString;
    foreignDiplomacy: LocalizedString;
    religiousAndSocialPolicy: LocalizedString;
  };
  historicalSignificance: LocalizedString;
}

export interface HistoricalLeader {
  id: string;
  name: LocalizedString;
  title: LocalizedString; // e.g. "Imperator", "Prezident", "Amir", "Buyuk sarkarda"
  era: HistoricalEra;
  reignYears: string;
  lifespan: string;
  country: LocalizedString;
  countryCode: string; // ISO 2-letter or map code
  region: 'asia' | 'europe' | 'middle_east' | 'americas' | 'africa';
  coordinates?: { lat: number; lng: number };
  reignStartYear?: number; // BCE as negative numbers (-49), CE as positive (1370)
  reignEndYear?: number;   // BCE as negative numbers (-44), CE as positive (1405)
  territoryName?: LocalizedString;
  portraitUrl: string;
  bannerBgUrl?: string;
  emblemOrFlagUrl?: string;
  themeColor?: string; // Crimson, gold, etc.
  tagline: LocalizedString;
  shortBio: LocalizedString;
  famousQuote: LocalizedString;
  famousSpeech?: {
    title: LocalizedString;
    audioUrl?: string;
    excerpt: LocalizedString;
  };
  slides: LeaderSlide[];
  isCustom?: boolean;
}

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  isRtl?: boolean;
}
