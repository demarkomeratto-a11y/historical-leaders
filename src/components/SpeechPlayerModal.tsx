import React, { useState } from 'react';
import { X, Volume2, VolumeX, Crown, Quote, Sparkles, Scroll } from 'lucide-react';
import { HistoricalLeader, SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { audioService } from '../services/audioService';
import { getAssetUrl } from '../utils/assetUrl';

interface SpeechPlayerModalProps {
  leader: HistoricalLeader;
  currentLang: SupportedLanguage;
  onClose: () => void;
}

export const SpeechPlayerModal: React.FC<SpeechPlayerModalProps> = ({
  leader,
  currentLang,
  onClose,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const t = UI_TRANSLATIONS[currentLang];

  const speech = leader.famousSpeech;
  const quote = leader.famousQuote[currentLang];

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      audioService.stopSpeech();
      setIsSpeaking(false);
    } else {
      const textToSpeak = speech 
        ? `${speech.title[currentLang]}. ${speech.excerpt[currentLang]}`
        : `${leader.name[currentLang]}. ${quote}`;
      
      setIsSpeaking(true);
      audioService.speakText(textToSpeak, currentLang, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative z-10 w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border-2 border-gold-500/70 shadow-2xl bg-gradient-to-br from-parchment-50 via-parchment-100 to-parchment-200 text-obsidian-950 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-crimson-900 via-crimson-800 to-crimson-950 text-white border-b-2 border-gold-500/50">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-gold-400" />
            <div>
              <h3 className="font-serif font-black text-lg text-gold-200 uppercase tracking-wide">
                {t.speechArchive}
              </h3>
              <p className="text-xs text-parchment-300 font-mono">
                {leader.name[currentLang]} &bull; {leader.country[currentLang]}
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

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Portrait Banner */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/70 border border-crimson-900/20 shadow-xs">
            <img
              src={getAssetUrl(leader.portraitUrl)}
              alt=""
              className="w-16 h-16 rounded-full object-cover border-2 border-gold-500 shadow-md"
            />
            <div>
              <h4 className="font-serif font-black text-lg text-crimson-950">
                {leader.name[currentLang]}
              </h4>
              <p className="text-xs font-serif italic text-obsidian-800">
                {leader.title[currentLang]}
              </p>
            </div>
          </div>

          {/* Speech Excerpt */}
          {speech ? (
            <div className="space-y-3">
              <h5 className="font-serif font-bold text-base text-crimson-900 border-b border-crimson-900/20 pb-2">
                📜 {speech.title[currentLang]}
              </h5>
              <div className="p-5 rounded-2xl bg-white border border-gold-500/30 shadow-inner relative">
                <Quote className="w-8 h-8 text-gold-400/30 absolute right-4 top-4 pointer-events-none" />
                <p className="font-serif text-sm sm:text-base text-obsidian-900 leading-relaxed italic whitespace-pre-line">
                  "{speech.excerpt[currentLang]}"
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h5 className="font-serif font-bold text-base text-crimson-900 border-b border-crimson-900/20 pb-2">
                📜 {t.historicalQuotes}
              </h5>
              <div className="p-5 rounded-2xl bg-white border border-gold-500/30 shadow-inner relative">
                <Quote className="w-8 h-8 text-gold-400/30 absolute right-4 top-4 pointer-events-none" />
                <p className="font-serif text-base text-obsidian-900 leading-relaxed italic">
                  "{quote}"
                </p>
              </div>
            </div>
          )}

          {/* Audio Player Action */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-crimson-950 to-obsidian-900 text-white flex items-center justify-between">
            <div className="text-xs">
              <span className="font-bold text-gold-300 block">
                {isSpeaking ? "Ovozli o'qilmoqda..." : "Nutqni ovozli tinglash"}
              </span>
              <span className="text-parchment-400 text-[11px]">
                Web Speech TTS ({currentLang.toUpperCase()})
              </span>
            </div>

            <button
              onClick={handleToggleSpeak}
              className={`px-5 py-2.5 rounded-xl font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
                isSpeaking
                  ? 'bg-gold-500 text-obsidian-950 ring-2 ring-gold-300'
                  : 'bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 hover:brightness-110'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 animate-pulse" />
                  <span>To'xtatish</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Tinglash</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
