import React from 'react';
import { Search, Compass, Clock, Filter, Sparkles } from 'lucide-react';
import { HistoricalEra, SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';

interface TimelineBarProps {
  selectedEra: HistoricalEra | 'all';
  onSelectEra: (era: HistoricalEra | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  currentLang: SupportedLanguage;
  totalCount: number;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  selectedEra,
  onSelectEra,
  searchQuery,
  onSearchChange,
  selectedRegion,
  onSelectRegion,
  currentLang,
  totalCount,
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  const eras: { id: HistoricalEra | 'all'; label: string; desc: string; icon: string }[] = [
    { id: 'all', label: t.allEras, desc: `${totalCount} ${t.totalLeaders}`, icon: '🏛️' },
    { id: 'ancient', label: t.ancientEra, desc: t.ancientEraDesc, icon: '🏺' },
    { id: 'medieval', label: t.medievalEra, desc: t.medievalEraDesc, icon: '⚔️' },
    { id: 'modern', label: t.modernEra, desc: t.modernEraDesc, icon: '📜' },
  ];

  const regions = [
    { id: 'all', label: t.allRegions },
    { id: 'asia', label: t.asia },
    { id: 'europe', label: t.europe },
    { id: 'middle_east', label: t.middleEast },
    { id: 'americas', label: t.americas },
    { id: 'africa', label: t.africa },
  ];

  return (
    <div className="w-full my-6 space-y-4">
      
      {/* 1. ERA TABS SELECTOR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        {eras.map(era => {
          const isSelected = selectedEra === era.id;
          return (
            <button
              key={era.id}
              onClick={() => onSelectEra(era.id)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                isSelected
                  ? 'bg-gradient-to-br from-crimson-800 to-crimson-950 border-gold-400 text-white shadow-xl shadow-crimson-950/60 ring-2 ring-gold-500/40'
                  : 'bg-obsidian-900/80 hover:bg-crimson-950/40 border-crimson-900/40 text-parchment-200 hover:border-gold-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl">{era.icon}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
                )}
              </div>
              <h4 className="font-serif font-black text-xs sm:text-sm tracking-wide text-gold-300 group-hover:text-gold-200">
                {era.label}
              </h4>
              <p className="text-[10px] text-parchment-400/80 truncate mt-0.5">
                {era.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* 2. SEARCH & REGION FILTERS */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        
        {/* Instant Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-900/90 border border-crimson-900/50 text-xs sm:text-sm text-parchment-100 placeholder-parchment-400/50 focus:outline-hidden focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all backdrop-blur-md"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-parchment-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Region Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {regions.map(r => (
            <button
              key={r.id}
              onClick={() => onSelectRegion(r.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedRegion === r.id
                  ? 'bg-gold-500 text-obsidian-950 border-gold-300 font-bold shadow-sm'
                  : 'bg-obsidian-900/80 text-parchment-300 border-crimson-900/30 hover:border-gold-500/50'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};
