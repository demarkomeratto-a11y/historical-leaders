import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Search, 
  BookOpen, 
  PlusCircle, 
  Key, 
  Loader2, 
  Check, 
  Globe
} from 'lucide-react';
import { HistoricalLeader, HistoricalEra, SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { searchWikipediaLeader, convertWikiToLeader, WikiSearchResult } from '../services/wikipediaService';
import { generateLeaderWithAi } from '../services/aiGeneratorService';
import { storageService } from '../services/storageService';

interface AiGeneratorModalProps {
  currentLang: SupportedLanguage;
  onAddLeader: (leader: HistoricalLeader) => void;
  onClose: () => void;
}

export const AiGeneratorModal: React.FC<AiGeneratorModalProps> = ({
  currentLang,
  onAddLeader,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'wiki' | 'ai' | 'manual'>('wiki');
  
  // Wikipedia Search State
  const [wikiQuery, setWikiQuery] = useState('');
  const [isSearchingWiki, setIsSearchingWiki] = useState(false);
  const [wikiResult, setWikiResult] = useState<WikiSearchResult | null>(null);
  const [wikiError, setWikiError] = useState('');

  // AI Generator State
  const [aiName, setAiName] = useState('');
  const [aiTitle, setAiTitle] = useState('');
  const [aiCountry, setAiCountry] = useState('');
  const [aiReign, setAiReign] = useState('');
  const [aiEra, setAiEra] = useState<HistoricalEra>('modern');
  const [apiKey, setApiKey] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const t = UI_TRANSLATIONS[currentLang];

  // Search Wikipedia
  const handleSearchWiki = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wikiQuery.trim()) return;

    setIsSearchingWiki(true);
    setWikiError('');
    setWikiResult(null);

    const result = await searchWikipediaLeader(wikiQuery.trim(), currentLang);
    setIsSearchingWiki(false);

    if (result) {
      setWikiResult(result);
    } else {
      setWikiError("Ushbu nom bilan ma'lumot topilmadi. Boshqa tilda yoki to'liq ismini yozib ko'ring (masalan: Mirzo Ulug'bek, Abraham Lincoln).");
    }
  };

  // Convert and add Wikipedia result to exhibition
  const handleImportWiki = () => {
    if (!wikiResult) return;
    const newLeader = convertWikiToLeader(wikiResult, currentLang);
    storageService.saveCustomLeader(newLeader);
    onAddLeader(newLeader);
    onClose();
  };

  // Generate Leader with AI
  const handleGenerateAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiName.trim()) return;

    setIsGeneratingAi(true);
    const generated = await generateLeaderWithAi({
      leaderName: aiName.trim(),
      era: aiEra,
      country: aiCountry.trim() || 'World History',
      title: aiTitle.trim() || 'Historical Leader',
      reignYears: aiReign.trim() || 'Historical Era',
      geminiApiKey: apiKey.trim(),
      lang: currentLang,
    });
    setIsGeneratingAi(false);

    storageService.saveCustomLeader(generated);
    onAddLeader(generated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative z-10 w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border-2 border-gold-500/50 shadow-2xl bg-obsidian-950 text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-crimson-950 via-obsidian-900 to-crimson-950 border-b border-crimson-800/40">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-gold-400" />
            <div>
              <h3 className="font-serif font-black text-lg text-gold-300 uppercase tracking-wide">
                {t.aiGeneratorTitle}
              </h3>
              <p className="text-xs text-parchment-400">
                {t.aiGeneratorDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white/80 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 3 Tabs */}
        <div className="flex border-b border-white/10 bg-obsidian-900 px-6 pt-2 gap-4">
          <button
            onClick={() => setActiveTab('wiki')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'wiki'
                ? 'border-gold-400 text-gold-300'
                : 'border-transparent text-parchment-400 hover:text-parchment-200'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>{t.wikiTab} (Bepul 10 tilda)</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'ai'
                ? 'border-gold-400 text-gold-300'
                : 'border-transparent text-parchment-400 hover:text-parchment-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>{t.aiKeyTab}</span>
          </button>
        </div>

        {/* TAB 1: WIKIPEDIA LIVE SEARCH */}
        {activeTab === 'wiki' && (
          <div className="p-6 overflow-y-auto space-y-5">
            <form onSubmit={handleSearchWiki} className="space-y-3">
              <label className="block text-xs font-serif text-parchment-300">
                {t.wikiSearchPrompt}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={wikiQuery}
                  onChange={(e) => setWikiQuery(e.target.value)}
                  placeholder="Masalan: Mirzo Ulug'bek, Abraham Lincoln, Fatih Sultan Mehmed..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-obsidian-900 border border-crimson-900/60 text-xs sm:text-sm text-parchment-100 placeholder-parchment-500 focus:outline-hidden focus:border-gold-400"
                />
                <button
                  type="submit"
                  disabled={isSearchingWiki}
                  className="px-5 py-2.5 rounded-xl bg-crimson-700 hover:bg-crimson-600 text-white font-bold text-xs flex items-center gap-2 active:scale-95 transition-all shadow-md shrink-0"
                >
                  {isSearchingWiki ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>{t.searchWikiBtn}</span>
                </button>
              </div>
            </form>

            {wikiError && (
              <div className="p-3.5 rounded-xl bg-crimson-950/80 border border-crimson-800 text-xs text-crimson-200">
                {wikiError}
              </div>
            )}

            {wikiResult && (
              <div className="p-5 rounded-2xl bg-obsidian-900 border border-gold-500/40 shadow-xl space-y-4">
                <div className="flex items-start gap-4">
                  {wikiResult.thumbnail && (
                    <img
                      src={wikiResult.thumbnail}
                      alt={wikiResult.title}
                      className="w-20 h-24 object-cover rounded-xl border border-gold-400 shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-black text-xl text-gold-300">
                      {wikiResult.title}
                    </h4>
                    {wikiResult.description && (
                      <p className="text-xs text-parchment-300 font-mono italic mt-0.5">
                        {wikiResult.description}
                      </p>
                    )}
                    <p className="text-xs text-parchment-300/90 line-clamp-3 mt-2 leading-relaxed">
                      {wikiResult.extract}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-parchment-400">
                    Avtomatik ravishda to'liq slaydlar to'plami yaratiladi
                  </span>
                  <button
                    onClick={handleImportWiki}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Ko'rgazmaga qo'shish</span>
                  </button>
                </div>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-obsidian-900/60 border border-white/5 text-[11px] text-parchment-400/80 leading-relaxed">
              💡 <strong>Eslatma:</strong> Wikipedia integratsiyasi orqali insoniyat tarixidagi barcha davlat rahbarlarini (qadimgi shohlar, xalifalar, imperatorlar va prezidentlar) 10 ta tilda darhol ochish va taqdimotini ko'rish mumkin.
            </div>
          </div>
        )}

        {/* TAB 2: AI GENERATOR */}
        {activeTab === 'ai' && (
          <form onSubmit={handleGenerateAi} className="p-6 overflow-y-auto space-y-4">
            <div>
              <label className="block text-xs font-serif text-parchment-300 mb-1">
                Rahbar Ismi *
              </label>
              <input
                type="text"
                required
                value={aiName}
                onChange={(e) => setAiName(e.target.value)}
                placeholder="Masalan: Mirzo Ulug'bek, Avraam Linkoln, Buyuk Karl..."
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-crimson-900/60 text-xs sm:text-sm text-parchment-100 placeholder-parchment-500 focus:outline-hidden focus:border-gold-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-serif text-parchment-300 mb-1">
                  Davlat / Imperiya
                </label>
                <input
                  type="text"
                  value={aiCountry}
                  onChange={(e) => setAiCountry(e.target.value)}
                  placeholder="Masalan: Temuriylar, Rim, Fransiya..."
                  className="w-full px-4 py-2 rounded-xl bg-obsidian-900 border border-crimson-900/60 text-xs text-parchment-100 focus:outline-hidden focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-parchment-300 mb-1">
                  Tarixiy Davr
                </label>
                <select
                  value={aiEra}
                  onChange={(e) => setAiEra(e.target.value as HistoricalEra)}
                  className="w-full px-4 py-2 rounded-xl bg-obsidian-900 border border-crimson-900/60 text-xs text-parchment-100 focus:outline-hidden focus:border-gold-400"
                >
                  <option value="ancient">Qadimgi Davr</option>
                  <option value="medieval">O'rta Asrlar</option>
                  <option value="modern">Yangi va Eng yangi davr</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif text-parchment-300 mb-1">
                Boshqaruv Yillari va Unvoni
              </label>
              <input
                type="text"
                value={aiReign}
                onChange={(e) => setAiReign(e.target.value)}
                placeholder="Masalan: 1409 — 1449, Samarqand Hukmdori"
                className="w-full px-4 py-2 rounded-xl bg-obsidian-900 border border-crimson-900/60 text-xs text-parchment-100 focus:outline-hidden focus:border-gold-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-serif text-parchment-300 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-gold-400" />
                  <span>Gemini API Kaliti (Ixtiyoriy)</span>
                </label>
                <span className="text-[10px] text-parchment-500">Ixtiyoriy (Kiritilmasa ichki AI ishlaydi)</span>
              </div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-2 rounded-xl bg-obsidian-900 border border-crimson-900/60 text-xs text-parchment-100 placeholder-parchment-600 focus:outline-hidden focus:border-gold-400 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isGeneratingAi}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-crimson-700 to-amber-700 hover:brightness-110 text-white font-serif font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isGeneratingAi ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Slaydlar yaratilmoqda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-gold-300" />
                  <span>AI orqali to'liq taqdimot yaratish</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>

    </div>
  );
};
