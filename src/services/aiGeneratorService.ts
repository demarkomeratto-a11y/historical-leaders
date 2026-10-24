import { HistoricalLeader, HistoricalEra, SupportedLanguage, LeaderSlide } from '../types';
import { createStandardSlideDeck } from '../data/leadersData';

export interface AiGenerationRequest {
  leaderName: string;
  era: HistoricalEra;
  country: string;
  title: string;
  reignYears: string;
  geminiApiKey?: string;
  lang: SupportedLanguage;
}

export async function generateLeaderWithAi(
  req: AiGenerationRequest
): Promise<HistoricalLeader> {
  const id = `ai-${req.leaderName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
  const defaultPortrait = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80";

  if (req.geminiApiKey && req.geminiApiKey.trim().length > 10) {
    try {
      const prompt = `You are a world-class historian. Generate a detailed JSON profile for the historical leader: "${req.leaderName}" (${req.title}, ${req.country}, Reign: ${req.reignYears}, Era: ${req.era}).
Provide a short bio, famous quote, and 6 structured slides with categories: context, events, strategy, legacy, map, tribute. Output valid JSON only.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${req.geminiApiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return {
            id,
            name: {
              uz: req.leaderName, en: req.leaderName, ru: req.leaderName, zh: req.leaderName,
              es: req.leaderName, fr: req.leaderName, ja: req.leaderName, ar: req.leaderName,
              tr: req.leaderName, ko: req.leaderName
            },
            title: {
              uz: parsed.title || req.title, en: parsed.title || req.title, ru: parsed.title || req.title,
              zh: parsed.title || req.title, es: parsed.title || req.title, fr: parsed.title || req.title,
              ja: parsed.title || req.title, ar: parsed.title || req.title, tr: parsed.title || req.title,
              ko: parsed.title || req.title
            },
            era: req.era,
            reignYears: req.reignYears,
            lifespan: parsed.lifespan || req.reignYears,
            country: {
              uz: req.country, en: req.country, ru: req.country, zh: req.country,
              es: req.country, fr: req.country, ja: req.country, ar: req.country,
              tr: req.country, ko: req.country
            },
            countryCode: "UN",
            region: 'asia',
            portraitUrl: defaultPortrait,
            themeColor: "#991b1b",
            tagline: {
              uz: `${req.leaderName.toUpperCase()} — TARIXIY TAQDIMOT`,
              en: `${req.leaderName.toUpperCase()} — HISTORICAL PRESENTATION`,
              ru: `${req.leaderName.toUpperCase()} — ИСТОРИЧЕСКАЯ ПРЕЗЕНТАЦИЯ`,
              zh: `${req.leaderName} — 历史人物深度解析`,
              es: `${req.leaderName.toUpperCase()} — PRESENTACIÓN HISTÓRICA`,
              fr: `${req.leaderName.toUpperCase()} — PRÉSENTATION HISTORIQUE`,
              ja: `${req.leaderName} — 歴史的プレゼンテーション`,
              ar: `${req.leaderName} — العرض التاريخي الشامل`,
              tr: `${req.leaderName.toUpperCase()} — TARİHİ SUNUM`,
              ko: `${req.leaderName} — 역사적 프레젠테이션`,
            },
            shortBio: {
              uz: parsed.shortBio || `${req.leaderName} — ${req.country} tarixidagi buyuk davlat arbobi.`,
              en: parsed.shortBio || `${req.leaderName} — great statesman in the history of ${req.country}.`,
              ru: parsed.shortBio || `${req.leaderName} — выдающийся лидер в истории ${req.country}.`,
              zh: parsed.shortBio || `${req.leaderName}是${req.country}历史上的卓越统领。`,
              es: parsed.shortBio || `${req.leaderName} — gran líder de ${req.country}.`,
              fr: parsed.shortBio || `${req.leaderName} — grand homme d'État de ${req.country}.`,
              ja: parsed.shortBio || `${req.leaderName}は${req.country}史に名を残す偉大なる指導者。`,
              ar: parsed.shortBio || `${req.leaderName} — قائد تاريخي بارز في مسيرة ${req.country}.`,
              tr: parsed.shortBio || `${req.leaderName} — ${req.country} tarihinin büyük devlet adamı.`,
              ko: parsed.shortBio || `${req.leaderName}은(는) ${req.country} 역사의 위대한 지도자.`,
            },
            famousQuote: {
              uz: parsed.famousQuote || "Adolat va qat'iyat bilan mamlakat yuksaladi.",
              en: parsed.famousQuote || "Through justice and resolve, the nation shall rise.",
              ru: parsed.famousQuote || "Справедливость и стойкость возвышают народ.",
              zh: parsed.famousQuote || "唯正义与坚毅方可兴邦。",
              es: parsed.famousQuote || "Con justicia y resolución prospera la nación.",
              fr: parsed.famousQuote || "Par la justice et la fermeté, la nation s'élève.",
              ja: parsed.famousQuote || "正義と不屈の意志により国は興る。",
              ar: parsed.famousQuote || "بالعدل والعزيمة تنهض الأمم.",
              tr: parsed.famousQuote || "Adalet ve kararlılıkla millet yükselir.",
              ko: parsed.famousQuote || "정의와 결단력으로 국가는 번영한다.",
            },
            slides: createStandardSlideDeck(id, req.leaderName, req.country, req.reignYears, defaultPortrait),
            isCustom: true,
          };
        }
      }
    } catch (e) {
      console.warn("Gemini API call failed, falling back to local synthesizer:", e);
    }
  }

  // Intelligent local synthesis
  return {
    id,
    name: {
      uz: req.leaderName, en: req.leaderName, ru: req.leaderName, zh: req.leaderName,
      es: req.leaderName, fr: req.leaderName, ja: req.leaderName, ar: req.leaderName,
      tr: req.leaderName, ko: req.leaderName
    },
    title: {
      uz: req.title, en: req.title, ru: req.title, zh: req.title,
      es: req.title, fr: req.title, ja: req.title, ar: req.title,
      tr: req.title, ko: req.title
    },
    era: req.era,
    reignYears: req.reignYears,
    lifespan: req.reignYears,
    country: {
      uz: req.country, en: req.country, ru: req.country, zh: req.country,
      es: req.country, fr: req.country, ja: req.country, ar: req.country,
      tr: req.country, ko: req.country
    },
    countryCode: "UN",
    region: 'asia',
    portraitUrl: defaultPortrait,
    themeColor: "#991b1b",
    tagline: {
      uz: `${req.leaderName.toUpperCase()} — INTELLEKTUAL AI TAHLILI`,
      en: `${req.leaderName.toUpperCase()} — AI HISTORICAL DOSSIER`,
      ru: `${req.leaderName.toUpperCase()} — ИСТОРИЧЕСКОЕ ДОСЬЕ`,
      zh: `${req.leaderName} — 历史文献智能档案`,
      es: `${req.leaderName.toUpperCase()} — DOSSIER HISTÓRICO`,
      fr: `${req.leaderName.toUpperCase()} — DOSSIER HISTORIQUE`,
      ja: `${req.leaderName} — AI歴史分析`,
      ar: `${req.leaderName} — الملف التاريخي الذكي`,
      tr: `${req.leaderName.toUpperCase()} — YAPAY ZEKA TARİH DOSYASI`,
      ko: `${req.leaderName} — AI 역사 분석 파일`,
    },
    shortBio: {
      uz: `${req.leaderName} (${req.reignYears}) — ${req.country} tarixidagi buyuk davlat arbobi va ${req.title}.`,
      en: `${req.leaderName} (${req.reignYears}) — iconic leader and ${req.title} of ${req.country}.`,
      ru: `${req.leaderName} (${req.reignYears}) — выдающийся деятель и ${req.title} ${req.country}.`,
      zh: `${req.leaderName}（${req.reignYears}）— ${req.country}杰出的${req.title}。`,
      es: `${req.leaderName} (${req.reignYears}) — ilustre ${req.title} de ${req.country}.`,
      fr: `${req.leaderName} (${req.reignYears}) — illustre ${req.title} de ${req.country}.`,
      ja: `${req.leaderName}（${req.reignYears}）— ${req.country}の偉大なる${req.title}。`,
      ar: `${req.leaderName} (${req.reignYears}) — القائد البارز و${req.title} في ${req.country}.`,
      tr: `${req.leaderName} (${req.reignYears}) — ${req.country} tarihinin önemli lideri ve ${req.title}.`,
      ko: `${req.leaderName} (${req.reignYears}) — ${req.country}의 위대한 ${req.title}.`,
    },
    famousQuote: {
      uz: "Tarix xalqiga xizmat qilgan mardlarni hech qachon unutmaydi.",
      en: "History never forgets those who bravely serve their people.",
      ru: "История никогда не забывает тех, кто храбро служит своему народу.",
      zh: "历史永远铭记那些恪尽职守造福人民的勇者。",
      es: "La historia nunca olvida a quienes sirven valientemente a su pueblo.",
      fr: "L'histoire n'oublie jamais ceux qui ont servi leur peuple avec honneur.",
      ja: "歴史は民のために勇敢に尽くした者を決して忘れない。",
      ar: "إن التاريخ لا ينسى أبداً من خدم شعبه بتفانٍ وشجاعة.",
      tr: "Tarih, milletine cesaretle hizmet edenleri asla unutmaz.",
      ko: "역사는 백성을 위해 용감히 헌신한 이를 결코 잊지 않는다.",
    },
    slides: createStandardSlideDeck(id, req.leaderName, req.country, req.reignYears, defaultPortrait),
    isCustom: true,
  };
}
