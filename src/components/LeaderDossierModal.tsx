import React, { useState, useEffect } from 'react';
import { 
  X, 
  Crown, 
  Globe, 
  Landmark, 
  Coins, 
  ShieldAlert, 
  Scale, 
  Scroll, 
  Swords, 
  MapPin, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Building2,
  Users,
  Compass,
  Layers
} from 'lucide-react';
import { HistoricalLeader, SupportedLanguage } from '../types';
import { getLeaderDossier } from '../data/leaderDetailedDossier';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { audioService } from '../services/audioService';
import { LeaderImage } from './LeaderImage';

interface LeaderDossierModalProps {
  leader: HistoricalLeader;
  currentLang: SupportedLanguage;
  onClose: () => void;
  onOpenSlidePresentation?: () => void;
}

type DossierTab = 'overview' | 'territory' | 'wars' | 'economy' | 'policy' | 'multimedia';

export const LeaderDossierModal: React.FC<LeaderDossierModalProps> = ({
  leader,
  currentLang,
  onClose,
  onOpenSlidePresentation
}) => {
  const [activeTab, setActiveTab] = useState<DossierTab>('overview');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const dossier = getLeaderDossier(leader);

  useEffect(() => {
    return audioService.onSpeakingChange((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle TTS reading of the active tab summary
  const handleToggleSpeech = () => {
    if (isSpeaking) {
      audioService.stopSpeech();
    } else {
      let speechText = `${leader.name[currentLang]}. ${leader.title[currentLang]}. `;
      if (activeTab === 'overview') {
        speechText += `${leader.shortBio[currentLang]} ${dossier.historicalSignificance[currentLang]}`;
      } else if (activeTab === 'territory') {
        speechText += `${dossier.territory.realmName[currentLang]}. Eng yuqori maydoni: ${dossier.territory.peakAreaKm2}.`;
      } else if (activeTab === 'wars') {
        speechText += `Urushlar va janglar soni: ${dossier.warsAndBattles.length}. ${dossier.warsAndBattles[0]?.name[currentLang]}: ${dossier.warsAndBattles[0]?.description[currentLang]}`;
      } else if (activeTab === 'economy') {
        speechText += `Moliyaviy holat: ${dossier.economyAndFinance.treasuryState[currentLang]}. Pul birligi: ${dossier.economyAndFinance.currency[currentLang]}.`;
      } else if (activeTab === 'policy') {
        speechText += `Qonunlari va boshqaruvi: ${dossier.governanceAndPolicy.legalCode[currentLang]}. ${dossier.governanceAndPolicy.stateStructure[currentLang]}`;
      }
      audioService.speakText(speechText, currentLang);
    }
  };

  // Localized tab labels
  const tabLabels: Record<DossierTab, { label: string; icon: any; count?: number }> = {
    overview: {
      label: currentLang === 'uz' ? "Biografiya & Meros" :
             currentLang === 'ru' ? "Биография и Величие" :
             currentLang === 'zh' ? "生平传略与功绩" :
             currentLang === 'es' ? "Biografía y Legado" :
             currentLang === 'fr' ? "Biographie et Héritage" :
             currentLang === 'ja' ? "生涯と歴史的遺産" :
             currentLang === 'ar' ? "السيرة والخلود التاريخي" :
             currentLang === 'tr' ? "Biyografi ve Miras" :
             currentLang === 'ko' ? "생애 및 역사적 유산" : "Biography & Legacy",
      icon: Crown
    },
    territory: {
      label: currentLang === 'uz' ? "Eggalagan Yerlari" :
             currentLang === 'ru' ? "Завоеванные Земли" :
             currentLang === 'zh' ? "疆域版图与行省" :
             currentLang === 'es' ? "Tierras y Fronteras" :
             currentLang === 'fr' ? "Territoires et Frontières" :
             currentLang === 'ja' ? "征服地と帝国版図" :
             currentLang === 'ar' ? "الأراضي والحدود والفتوحات" :
             currentLang === 'tr' ? "Fethedilen Topraklar" :
             currentLang === 'ko' ? "정복 영토와 제국 강역" : "Conquered Lands",
      icon: Compass,
      count: dossier.territory.provincesAndConquests.length
    },
    wars: {
      label: currentLang === 'uz' ? "Urushlari & Janglari" :
             currentLang === 'ru' ? "Войны и Сражения" :
             currentLang === 'zh' ? "大战役与征战" :
             currentLang === 'es' ? "Guerras y Batallas" :
             currentLang === 'fr' ? "Guerres et Batailles" :
             currentLang === 'ja' ? "戦役と決戦" :
             currentLang === 'ar' ? "المعارك والحروب الكبرى" :
             currentLang === 'tr' ? "Savaşlar ve Meydanlar" :
             currentLang === 'ko' ? "전쟁 및 결전 기록" : "Wars & Battles",
      icon: Swords,
      count: dossier.warsAndBattles.length
    },
    economy: {
      label: currentLang === 'uz' ? "Moliyaviy Holati" :
             currentLang === 'ru' ? "Казна и Экономика" :
             currentLang === 'zh' ? "国库财政与经贸" :
             currentLang === 'es' ? "Tesoro y Economía" :
             currentLang === 'fr' ? "Finances et Économie" :
             currentLang === 'ja' ? "国庫財政と経済" :
             currentLang === 'ar' ? "خزينة الدولة والاقتصاد" :
             currentLang === 'tr' ? "Maliye ve Hazine" :
             currentLang === 'ko' ? "국가 재정 및 경제" : "Treasury & Economy",
      icon: Coins
    },
    policy: {
      label: currentLang === 'uz' ? "Siyosat & Qonunlar" :
             currentLang === 'ru' ? "Законы и Политика" :
             currentLang === 'zh' ? "法典政令与外交" :
             currentLang === 'es' ? "Leyes y Política" :
             currentLang === 'fr' ? "Lois et Diplomatie" :
             currentLang === 'ja' ? "成文法典と統治政策" :
             currentLang === 'ar' ? "القوانين والسياسة والحكم" :
             currentLang === 'tr' ? "Kanunlar ve Siyaset" :
             currentLang === 'ko' ? "국가 법전 및 통치 정책" : "Laws & Policy",
      icon: Scale
    },
    multimedia: {
      label: currentLang === 'uz' ? "Taqdimot & Slaydlar" :
             currentLang === 'ru' ? "Слайды и Речи" :
             currentLang === 'zh' ? "专题档案与演说" :
             currentLang === 'es' ? "Presentación y Discursos" :
             currentLang === 'fr' ? "Présentation et Discours" :
             currentLang === 'ja' ? "演説とスライド資料" :
             currentLang === 'ar' ? "العرض والخطب التاريخية" :
             currentLang === 'tr' ? "Sunum ve Hitaplar" :
             currentLang === 'ko' ? "역사 발표 슬라이드" : "Slides & Speeches",
      icon: Layers,
      count: leader.slides.length
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      
      {/* Background Ambience Corona */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-crimson-700/20 via-gold-500/10 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Main Modal Window */}
      <div 
        className="relative w-full max-w-5xl rounded-3xl bg-gradient-to-b from-[#160d16] via-[#0d070e] to-[#080309] border-2 border-gold-500/50 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh] z-10"
        role="dialog"
        aria-modal="true"
      >
        
        {/* 1. TOP HEADER BANNER */}
        <div className="relative px-5 sm:px-8 py-5 border-b border-gold-500/30 bg-gradient-to-r from-obsidian-950 via-[#270b13] to-obsidian-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Leader Quick Summary */}
          <div className="flex items-center gap-4 min-w-0">
            {/* 3D Round Golden Portrait Frame */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-gold-400 shrink-0 bg-black shadow-xl ring-2 ring-gold-500/40">
              <LeaderImage
                src={leader.portraitUrl}
                alt={leader.name[currentLang]}
                leaderName={leader.name[currentLang]}
                country={leader.country[currentLang]}
                era={leader.era}
                themeColor={leader.themeColor}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gold-400/20 text-gold-300 border border-gold-500/40">
                  {leader.era}
                </span>
                <span className="text-[11px] font-mono text-parchment-300">
                  {leader.reignYears}
                </span>
                <span className="text-[11px] font-mono text-gold-400 bg-crimson-950/80 px-2 py-0.5 rounded border border-crimson-800/60">
                  {leader.country[currentLang]}
                </span>
              </div>

              <h2 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-gold-200 truncate">
                {leader.name[currentLang]}
              </h2>

              <p className="text-xs sm:text-sm font-serif italic text-parchment-300 line-clamp-1">
                {leader.title[currentLang]}
              </p>
            </div>
          </div>

          {/* Action buttons: TTS Speak & Close */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isSpeaking 
                  ? 'bg-crimson-700 text-white border-gold-400 shadow-lg animate-pulse'
                  : 'bg-obsidian-900 text-parchment-200 border-gold-500/30 hover:border-gold-400 hover:text-gold-300'
              }`}
              title="Ovozli eshitish"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-gold-300" />
                  <span>To'xtatish</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-gold-400" />
                  <span>Ovozli eshitish</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-obsidian-900/90 text-parchment-300 hover:text-gold-300 hover:bg-crimson-950 border border-gold-500/30 transition-colors"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* 2. TAB NAVIGATION BAR */}
        <div className="flex items-center gap-1 px-4 sm:px-8 py-2.5 bg-obsidian-950/90 border-b border-crimson-900/40 overflow-x-auto scrollbar-none">
          {(Object.keys(tabLabels) as DossierTab[]).map((tabKey) => {
            const item = tabLabels[tabKey];
            const Icon = item.icon;
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 via-crimson-700 to-amber-700 text-white shadow-lg border border-gold-300'
                    : 'text-parchment-300 hover:text-gold-200 hover:bg-obsidian-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold-200' : 'text-gold-400/80'}`} />
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-black/30 text-gold-200' : 'bg-crimson-950 text-gold-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 3. TAB CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">

          {/* TAB 1: OVERVIEW & BIOGRAPHY */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Highlight Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-3.5 rounded-2xl bg-obsidian-900/70 border border-gold-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-500/40 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-parchment-400 block">Maksimal Hududi</span>
                    <span className="text-xs sm:text-sm font-bold text-gold-300 font-mono">{dossier.territory.peakAreaKm2}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-obsidian-900/70 border border-gold-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-crimson-500/10 border border-crimson-500/40 flex items-center justify-center shrink-0">
                    <Swords className="w-5 h-5 text-crimson-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-parchment-400 block">Katta Janglari</span>
                    <span className="text-xs sm:text-sm font-bold text-gold-300 font-mono">{dossier.warsAndBattles.length} ta yirik jang</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-obsidian-900/70 border border-gold-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center shrink-0">
                    <Coins className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-parchment-400 block">Davlat Tangalari</span>
                    <span className="text-xs sm:text-sm font-bold text-gold-300 font-mono line-clamp-1">{dossier.economyAndFinance.currency[currentLang]}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-obsidian-900/70 border border-gold-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/40 flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-parchment-400 block">Qonun & Adolat</span>
                    <span className="text-xs sm:text-sm font-bold text-gold-300 font-mono line-clamp-1">{dossier.governanceAndPolicy.legalCode[currentLang]}</span>
                  </div>
                </div>
              </div>

              {/* Biography Details */}
              <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-900/60 border border-crimson-900/50 backdrop-blur-md space-y-4">
                <div className="flex items-center gap-2 text-gold-400 font-serif font-bold text-base border-b border-crimson-900/40 pb-2">
                  <Landmark className="w-5 h-5 text-gold-400" />
                  <h3>Tarixiy Davlat Boshqaruvi va Shaxsiyati</h3>
                </div>
                <p className="text-sm sm:text-base text-parchment-200 leading-relaxed font-sans">
                  {leader.shortBio[currentLang]}
                </p>
                <div className="p-4 rounded-xl bg-[#240b12] border-l-4 border-gold-400 text-gold-200 italic font-serif text-sm sm:text-base">
                  "{leader.famousQuote[currentLang]}"
                </div>
              </div>

              {/* Historical Significance */}
              <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-900/60 border border-gold-500/30 space-y-3">
                <div className="flex items-center gap-2 text-gold-300 font-serif font-bold text-base">
                  <Award className="w-5 h-5 text-gold-400" />
                  <h3>Jahon Tarixidagi O'rni va Merosi</h3>
                </div>
                <p className="text-sm text-parchment-300 leading-relaxed">
                  {dossier.historicalSignificance[currentLang]}
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: CONQUERED TERRITORIES & REALM BOUNDARIES */}
          {activeTab === 'territory' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Realm Header */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-crimson-950 to-obsidian-900 border border-gold-500/40">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block mb-1">
                  Saltanat / Davlat Nomi
                </span>
                <h3 className="font-serif font-black text-xl sm:text-2xl text-gold-200">
                  {dossier.territory.realmName[currentLang]}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-xs font-mono text-parchment-300">
                  <div>
                    <span className="text-parchment-400">Eng yuqori maydoni: </span>
                    <span className="text-gold-300 font-bold">{dossier.territory.peakAreaKm2}</span>
                  </div>
                </div>
              </div>

              {/* Provinces & Conquests List */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-gold-300 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-gold-400" />
                  <span>Eggallangan Hududlar, Viloyatlar va Istilolar</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dossier.territory.provincesAndConquests.map((province, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-obsidian-900/80 border border-gold-500/20 hover:border-gold-500/50 flex items-start gap-3 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-crimson-900/60 border border-gold-500/40 text-gold-300 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-parchment-200 font-medium">
                        {province[currentLang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trade Routes & Strategic Hubs */}
              <div className="p-5 rounded-2xl bg-obsidian-900/60 border border-crimson-900/40 space-y-3">
                <h4 className="font-serif font-bold text-sm text-gold-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold-400" />
                  <span>Nazorat Qilingan Savdo Yo'llari va Magistrallar</span>
                </h4>
                <div className="space-y-2">
                  {dossier.territory.tradeRoutesControlled.map((route, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-parchment-300">
                      <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
                      <span>{route[currentLang]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citadels & Capitals */}
              <div className="p-5 rounded-2xl bg-obsidian-900/60 border border-gold-500/30 space-y-3">
                <h4 className="font-serif font-bold text-sm text-gold-300 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-gold-400" />
                  <span>Bosh Poytaxtlar, Qasrlar va Strategik Qal'alar</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {dossier.territory.keyFortressesAndCapitals.map((fort, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-parchment-200 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{fort[currentLang]}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: WARS & DECISIVE BATTLES */}
          {activeTab === 'wars' && (
            <div className="space-y-5 animate-fadeIn">
              
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base sm:text-lg text-gold-200 flex items-center gap-2">
                  <Swords className="w-5 h-5 text-crimson-400" />
                  <span>Harbiy Yurishlar va Hal Qiluvchi Tarixiy Janglar</span>
                </h3>
                <span className="text-xs font-mono text-gold-400 bg-crimson-950 px-2.5 py-1 rounded-full border border-gold-500/30">
                  {dossier.warsAndBattles.length} ta jang
                </span>
              </div>

              <div className="space-y-4">
                {dossier.warsAndBattles.map((battle, idx) => (
                  <div 
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-obsidian-900/80 border-2 border-crimson-900/60 hover:border-gold-500/60 transition-all space-y-3"
                  >
                    {/* Battle Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-crimson-900/40 pb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            {battle.year}-yil
                          </span>
                          <span className="text-xs font-mono text-parchment-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gold-400" />
                            {battle.location[currentLang]}
                          </span>
                        </div>
                        <h4 className="font-serif font-black text-lg sm:text-xl text-gold-200 mt-1">
                          {battle.name[currentLang]}
                        </h4>
                      </div>

                      <div className="self-start sm:self-auto px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold">
                        {battle.outcome[currentLang]}
                      </div>
                    </div>

                    {/* Opponent & Forces */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-parchment-400 block font-mono uppercase text-[9px]">Dushman Kuchlari & Qo'mondoni:</span>
                        <span className="text-gold-300 font-bold mt-0.5 block">{battle.opponent[currentLang]}</span>
                      </div>
                      {battle.forcesOrTactics && (
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                          <span className="text-parchment-400 block font-mono uppercase text-[9px]">Harbiy Taktika & Kuchlar:</span>
                          <span className="text-parchment-200 font-bold mt-0.5 block">{battle.forcesOrTactics[currentLang]}</span>
                        </div>
                      )}
                    </div>

                    {/* Strategic Impact Description */}
                    <p className="text-xs sm:text-sm text-parchment-300 leading-relaxed pt-1">
                      {battle.description[currentLang]}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: STATE FINANCE & ECONOMY */}
          {activeTab === 'economy' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Currency & Treasury Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/50 to-obsidian-900 border border-gold-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-gold-300 font-serif font-bold text-sm">
                    <Coins className="w-4 h-4 text-gold-400" />
                    <span>Davlat Tangalari & Pul Tizimi</span>
                  </div>
                  <p className="text-sm font-semibold text-parchment-100">
                    {dossier.economyAndFinance.currency[currentLang]}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-crimson-950/50 to-obsidian-900 border border-crimson-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-gold-300 font-serif font-bold text-sm">
                    <TrendingUp className="w-4 h-4 text-crimson-400" />
                    <span>Davlat G'aznasining Holati</span>
                  </div>
                  <p className="text-sm text-parchment-200 leading-relaxed">
                    {dossier.economyAndFinance.treasuryState[currentLang]}
                  </p>
                </div>
              </div>

              {/* Tax & Fiscal Policies */}
              <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-900/70 border border-gold-500/30 space-y-3">
                <h4 className="font-serif font-bold text-sm sm:text-base text-gold-300 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-gold-400" />
                  <span>Soliq Siyosati, Bojxona va Moliyaviy Islohotlar</span>
                </h4>
                <p className="text-xs sm:text-sm text-parchment-300 leading-relaxed">
                  {dossier.economyAndFinance.taxPolicy[currentLang]}
                </p>
              </div>

              {/* Trade Corridors & Treasury Revenues */}
              <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-900/70 border border-crimson-900/40 space-y-3">
                <h4 className="font-serif font-bold text-sm sm:text-base text-gold-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold-400" />
                  <span>Xalqaro Savdo, Boj Daromadlari va Karvon Yo'llari</span>
                </h4>
                <p className="text-xs sm:text-sm text-parchment-300 leading-relaxed">
                  {dossier.economyAndFinance.tradeAndIncome[currentLang]}
                </p>
              </div>

              {/* Public Works & Architecture Financed */}
              <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-900/70 border border-gold-500/30 space-y-3">
                <h4 className="font-serif font-bold text-sm sm:text-base text-gold-300 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gold-400" />
                  <span>G'azna Hisobidan Barpo Etilgan Infratuzilma va Me'moriy Yodgorliklar</span>
                </h4>
                <div className="space-y-2">
                  {dossier.economyAndFinance.majorPublicWorks.map((work, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-parchment-200">
                      <div className="w-2 h-2 rounded-full bg-gold-400 shrink-0 mt-1.5" />
                      <span>{work[currentLang]}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: GOVERNANCE, LAWS & DIPLOMACY */}
          {activeTab === 'policy' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Supreme Legal Code */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-obsidian-950 via-[#1c0812] to-obsidian-950 border-2 border-gold-500/40 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block">
                  Asosiy Qonunlar To'plami & Tuzuklar
                </span>
                <h4 className="font-serif font-black text-lg sm:text-xl text-gold-200">
                  {dossier.governanceAndPolicy.legalCode[currentLang]}
                </h4>
              </div>

              {/* State Administrative Structure */}
              <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-900/70 border border-crimson-900/40 space-y-3">
                <h4 className="font-serif font-bold text-sm sm:text-base text-gold-300 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-gold-400" />
                  <span>Davlat Boshqaruv Tizimi va Ma'muriy Idoralar</span>
                </h4>
                <p className="text-xs sm:text-sm text-parchment-300 leading-relaxed">
                  {dossier.governanceAndPolicy.stateStructure[currentLang]}
                </p>
              </div>

              {/* Foreign Diplomacy & Treaties */}
              <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-900/70 border border-gold-500/30 space-y-3">
                <h4 className="font-serif font-bold text-sm sm:text-base text-gold-300 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gold-400" />
                  <span>Tashqi Siyosat, Elchilik Aloqalari va Xalqaro Shartnomalar</span>
                </h4>
                <p className="text-xs sm:text-sm text-parchment-300 leading-relaxed">
                  {dossier.governanceAndPolicy.foreignDiplomacy[currentLang]}
                </p>
              </div>

              {/* Religious and Social Tolerance */}
              <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-900/70 border border-crimson-900/40 space-y-3">
                <h4 className="font-serif font-bold text-sm sm:text-base text-gold-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold-400" />
                  <span>Diniy Siyosat, Ijtimoiy Bag'rikenglik va Ilm-fan Homiylligi</span>
                </h4>
                <p className="text-xs sm:text-sm text-parchment-300 leading-relaxed">
                  {dossier.governanceAndPolicy.religiousAndSocialPolicy[currentLang]}
                </p>
              </div>

            </div>
          )}

          {/* TAB 6: MULTIMEDIA, SLIDES & SPEECHES */}
          {activeTab === 'multimedia' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Famous Speech Section */}
              {leader.famousSpeech && (
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-obsidian-950 via-crimson-950 to-obsidian-950 border-2 border-gold-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400">
                      Tarixiy Mashhur Nutq
                    </span>
                    <button
                      onClick={() => audioService.speakText(leader.famousSpeech!.excerpt[currentLang], currentLang)}
                      className="px-3 py-1 rounded-lg bg-gold-400/20 text-gold-300 border border-gold-400/40 hover:bg-gold-400/30 text-xs font-mono font-bold flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Eshitish</span>
                    </button>
                  </div>

                  <h4 className="font-serif font-bold text-base sm:text-lg text-gold-200">
                    {leader.famousSpeech.title[currentLang]}
                  </h4>

                  <p className="text-xs sm:text-sm italic font-serif text-parchment-200 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/10">
                    "{leader.famousSpeech.excerpt[currentLang]}"
                  </p>
                </div>
              )}

              {/* Slide Archive Previews */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-gold-300 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-gold-400" />
                    <span>Tarixiy Taqdimot Slaydlari ({leader.slides.length} ta)</span>
                  </h4>
                  {onOpenSlidePresentation && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenSlidePresentation();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-crimson-700 text-white font-serif font-bold text-xs uppercase flex items-center gap-1.5 shadow"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                      <span>To'liq Ekranda Ochish</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {leader.slides.map((slide, idx) => (
                    <div 
                      key={slide.id || idx}
                      className="p-3.5 rounded-xl bg-obsidian-900/80 border border-gold-500/20 hover:border-gold-500/60 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-parchment-400 mb-1">
                          <span>Slayd #{idx + 1}</span>
                          <span className="text-gold-400 uppercase">{slide.category}</span>
                        </div>
                        <h5 className="font-serif font-bold text-xs sm:text-sm text-gold-200 line-clamp-1">
                          {slide.title[currentLang]}
                        </h5>
                        <p className="text-[11px] text-parchment-400 line-clamp-2 mt-1">
                          {slide.content[currentLang]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* 4. FOOTER CONTROLS */}
        <div className="px-5 sm:px-8 py-3.5 bg-obsidian-950 border-t border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[11px] font-mono text-parchment-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Tarixiy ma'lumotlar arxiv manbalari va solnomalar asosida jamlangan.</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenSlidePresentation && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSlidePresentation();
                }}
                className="px-4 py-2 rounded-xl bg-gold-400 hover:bg-gold-300 text-obsidian-950 font-serif font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-obsidian-950" />
                <span>Slayd Taqdimoti</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-obsidian-900 border border-white/20 text-parchment-200 hover:bg-obsidian-800 text-xs font-mono"
            >
              Yopish
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
