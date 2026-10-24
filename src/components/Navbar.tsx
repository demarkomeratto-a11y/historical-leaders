import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  Map, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Languages, 
  BookOpen, 
  ChevronDown,
  Quote
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../i18n/translations';
import { audioService } from '../services/audioService';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenMap: () => void;
  onOpenAiModal: () => void;
  onOpenSpeechModal: () => void;
  isMapOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenMap,
  onOpenAiModal,
  onOpenSpeechModal,
  isMapOpen,
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [spokenText, setSpokenText] = useState('');

  const t = UI_TRANSLATIONS[currentLang];
  const activeLangMeta = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    return audioService.onSpeakingChange((speaking, text) => {
      setSpokenText(speaking ? text : '');
    });
  }, []);

  const handleToggleAmbient = () => {
    const newState = audioService.toggleAmbientSound();
    setIsAmbientPlaying(newState);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-obsidian-950/90 backdrop-blur-md border-b border-crimson-900/40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-2">
            
            {/* Logo & Branding */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson-600 via-crimson-800 to-amber-700 flex items-center justify-center shadow-lg shadow-crimson-900/50 border border-gold-500/40">
                <span className="text-xl">👑</span>
              </div>
              <div>
                <h1 className="font-serif font-black tracking-wider text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-200 to-gold-500">
                  {t.siteTitle}
                </h1>
                <p className="text-[10px] sm:text-xs text-parchment-300/70 tracking-wide hidden sm:block">
                  {t.siteSubtitle.slice(0, 75)}...
                </p>
              </div>
            </div>

            {/* Quick Actions & Tools */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* World Map Button (Scrolls to 3D Globe & Map) */}
              <button
                onClick={() => {
                  const mapElement = document.getElementById('interactive-world-map');
                  if (mapElement) {
                    mapElement.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onOpenMap();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-obsidian-900/80 text-parchment-200 border border-crimson-900/50 hover:bg-crimson-950 hover:border-gold-500/50 transition-all duration-300"
                title={t.exploreMap}
              >
                <Map className="w-4 h-4 text-gold-400" />
                <span className="hidden md:inline">{t.exploreMap} (3D)</span>
              </button>

              {/* Historic Speeches / Quotes */}
              <button
                onClick={onOpenSpeechModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-obsidian-900/80 text-parchment-200 border border-crimson-900/50 hover:bg-crimson-950 hover:border-gold-500/50 transition-all duration-300"
                title={t.speechArchive}
              >
                <Quote className="w-4 h-4 text-gold-400" />
                <span className="hidden lg:inline">{t.speechArchive}</span>
              </button>

              {/* AI Generator / Add Leader */}
              <button
                onClick={onOpenAiModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-600 to-crimson-700 text-white border border-gold-400/50 shadow-md shadow-amber-900/30 hover:brightness-110 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-gold-300 animate-pulse" />
                <span>{t.aiGeneratorBtn}</span>
              </button>

              {/* Ambient Sound Toggle */}
              <button
                onClick={handleToggleAmbient}
                className={`p-2 rounded-lg text-xs transition-all border ${
                  isAmbientPlaying 
                    ? 'bg-amber-950/80 border-gold-500 text-gold-300 shadow-inner' 
                    : 'bg-obsidian-900 border-crimson-900/40 text-parchment-400 hover:text-gold-300'
                }`}
                title={t.ambientSound}
              >
                {isAmbientPlaying ? (
                  <Volume2 className="w-4 h-4 text-gold-400 animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* 10 Languages Selector Dropdown (Fixed UZ UZ issue) */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-obsidian-900 border border-gold-500/40 text-parchment-100 hover:border-gold-400 transition-all shadow-sm"
                  aria-label="Select Language"
                >
                  <Languages className="w-4 h-4 text-gold-400 shrink-0" />
                  <span className="font-mono text-xs uppercase font-extrabold text-gold-300">
                    {activeLangMeta.code}
                  </span>
                  <span className="text-xs text-parchment-300 hidden md:inline">
                    {activeLangMeta.nativeName}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-parchment-400 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsLangMenuOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-obsidian-950/98 border border-gold-500/50 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-2xl divide-y divide-white/5 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3.5 py-1.5 text-[10px] uppercase font-bold tracking-wider text-parchment-400/80">
                        10 Ta Til (Languages)
                      </div>
                      <div className="py-1 max-h-72 overflow-y-auto">
                        {SUPPORTED_LANGUAGES.map(lang => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              onLanguageChange(lang.code);
                              setIsLangMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                              currentLang === lang.code
                                ? 'bg-crimson-800/80 text-gold-300 font-bold border-l-3 border-gold-400'
                                : 'text-parchment-200 hover:bg-obsidian-900 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-4 rounded bg-crimson-950 border border-gold-500/40 text-[10px] font-mono font-bold text-gold-300 flex items-center justify-center">
                                {lang.code.toUpperCase()}
                              </span>
                              <span>{lang.nativeName}</span>
                            </div>
                            <span className="text-[10px] font-mono text-parchment-400">
                              {lang.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Floating Animated Audio Subtitle Bar (shows spoken text live) */}
      {spokenText && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[90%] p-3 rounded-2xl bg-obsidian-950/95 border-2 border-gold-400 text-white shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-4 bg-gold-400 rounded-full animate-bounce" />
            <span className="w-1.5 h-6 bg-amber-400 rounded-full animate-bounce [animation-delay:0.15s]" />
            <span className="w-1.5 h-3 bg-gold-300 rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-mono uppercase text-gold-400 font-bold block">
              Ovozli o'qilmoqda ({currentLang.toUpperCase()}):
            </span>
            <p className="text-xs text-parchment-200 font-serif italic truncate">
              "{spokenText}"
            </p>
          </div>
          <button
            onClick={() => audioService.stopSpeech()}
            className="px-2 py-1 rounded-lg bg-crimson-800 hover:bg-crimson-700 text-[11px] font-bold text-white shrink-0"
          >
            To'xtatish
          </button>
        </div>
      )}
    </>
  );
};
