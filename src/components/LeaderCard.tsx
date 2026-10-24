import React from 'react';
import { Play, Sparkles, MapPin, Globe, CheckCircle } from 'lucide-react';
import { HistoricalLeader, SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { LeaderImage } from './LeaderImage';

interface LeaderCardProps {
  leader: HistoricalLeader;
  currentLang: SupportedLanguage;
  isSelected: boolean;
  onSelect: (leader: HistoricalLeader) => void;
  onOpenDossier?: (leader: HistoricalLeader) => void;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({
  leader,
  currentLang,
  isSelected,
  onSelect,
  onOpenDossier,
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  return (
    <div
      onClick={() => onSelect(leader)}
      className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 relative bg-obsidian-900/90 backdrop-blur-md flex flex-col justify-between transform-3d ${
        isSelected
          ? 'border-gold-400 ring-2 ring-gold-500/50 shadow-2xl shadow-crimson-900/50 scale-[1.02]'
          : 'border-crimson-950/80 hover:border-gold-500/60 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl hover:shadow-gold-950/30'
      }`}
    >
      {/* Top Media Portrait Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
        <LeaderImage
          src={leader.portraitUrl}
          alt={leader.name[currentLang]}
          leaderName={leader.name[currentLang]}
          country={leader.country[currentLang]}
          era={leader.era}
          themeColor={leader.themeColor}
          className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />

        {/* Badges on Top */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-crimson-900/90 text-gold-300 border border-gold-500/40 backdrop-blur-md">
            {leader.era}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/60 text-parchment-200 border border-white/20">
            {leader.reignYears}
          </span>
        </div>

        {/* Selected Checkmark Indicator */}
        {isSelected && (
          <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-gold-400 text-obsidian-950 flex items-center justify-center font-bold shadow-lg">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-parchment-400 font-mono mb-1">
            <Globe className="w-3 h-3 text-gold-400" />
            <span>{leader.country[currentLang]}</span>
          </div>

          <h4 className="font-serif font-black text-base sm:text-lg text-gold-300 group-hover:text-gold-200 transition-colors line-clamp-1 leading-snug">
            {leader.name[currentLang]}
          </h4>

          <p className="text-xs text-parchment-300/80 italic font-serif line-clamp-1 mb-2">
            {leader.title[currentLang]}
          </p>

          <p className="text-[11px] text-parchment-400/90 line-clamp-2 leading-relaxed">
            {leader.shortBio[currentLang]}
          </p>
        </div>

        {/* View Slide & Dossier Buttons */}
        <div className="pt-3 mt-3 border-t border-crimson-900/30 flex items-center justify-between text-xs font-semibold gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(leader);
            }}
            className="flex items-center gap-1 text-gold-400 hover:text-gold-200 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t.viewPresentation}</span>
          </button>

          {onOpenDossier && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDossier(leader);
              }}
              className="px-2 py-0.5 rounded-lg bg-crimson-950/90 hover:bg-gold-500 hover:text-black border border-gold-500/40 text-[10px] font-mono text-gold-300 font-bold transition-all shadow"
              title="Urushlar, moliyaviy holat, yerlar va siyosat tahlili"
            >
              🏛️ Dossier
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
