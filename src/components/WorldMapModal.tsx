import React, { useState } from 'react';
import { X, Globe2, MapPin, ChevronRight, Award } from 'lucide-react';
import { HistoricalLeader, SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';

interface WorldMapModalProps {
  leaders: HistoricalLeader[];
  currentLang: SupportedLanguage;
  onSelectLeader: (leader: HistoricalLeader) => void;
  onClose: () => void;
}

export const WorldMapModal: React.FC<WorldMapModalProps> = ({
  leaders,
  currentLang,
  onSelectLeader,
  onClose,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const t = UI_TRANSLATIONS[currentLang];

  const regions = [
    { id: 'all', label: t.allRegions, count: leaders.length },
    { id: 'asia', label: t.asia, count: leaders.filter(l => l.region === 'asia').length },
    { id: 'europe', label: t.europe, count: leaders.filter(l => l.region === 'europe').length },
    { id: 'middle_east', label: t.middleEast, count: leaders.filter(l => l.region === 'middle_east').length },
    { id: 'americas', label: t.americas, count: leaders.filter(l => l.region === 'americas').length },
    { id: 'africa', label: t.africa, count: leaders.filter(l => l.region === 'africa').length },
  ];

  const filteredLeaders = selectedRegion === 'all'
    ? leaders
    : leaders.filter(l => l.region === selectedRegion);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border-2 border-gold-500/50 shadow-2xl bg-obsidian-950 text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-crimson-950 via-obsidian-900 to-crimson-950 border-b border-crimson-800/40">
          <div className="flex items-center gap-3">
            <Globe2 className="w-6 h-6 text-gold-400" />
            <div>
              <h3 className="font-serif font-black text-lg text-gold-300 uppercase tracking-wide">
                {t.exploreMap}
              </h3>
              <p className="text-xs text-parchment-400">
                Qit'alar va tarixiy davlatlar bo'yicha buyuk rahbarlarni tanlang
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

        {/* Region Tabs */}
        <div className="px-6 py-3 bg-obsidian-900 border-b border-white/5 flex items-center gap-2 overflow-x-auto">
          {regions.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedRegion === r.id
                  ? 'bg-gradient-to-r from-crimson-700 to-amber-700 text-white border-gold-400 shadow-md'
                  : 'bg-obsidian-950 text-parchment-300 border-crimson-900/40 hover:border-gold-500/50'
              }`}
            >
              <span>{r.label}</span>
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 text-gold-300 font-mono">
                {r.count}
              </span>
            </button>
          ))}
        </div>

        {/* Leaders Map Grid List */}
        <div className="p-6 overflow-y-auto max-h-[60vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredLeaders.map(leader => (
            <div
              key={leader.id}
              onClick={() => {
                onSelectLeader(leader);
                onClose();
              }}
              className="group cursor-pointer p-3.5 rounded-xl border border-crimson-900/40 bg-obsidian-900/80 hover:bg-crimson-950/60 hover:border-gold-400/80 transition-all flex items-center gap-3.5 shadow-md"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gold-500/40 bg-black">
                <img
                  src={leader.portraitUrl}
                  alt={leader.name[currentLang]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-gold-400 mb-0.5">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{leader.country[currentLang]}</span>
                </div>
                <h4 className="font-serif font-black text-sm text-gold-200 group-hover:text-gold-300 truncate">
                  {leader.name[currentLang]}
                </h4>
                <p className="text-[11px] text-parchment-400 font-mono">
                  {leader.reignYears}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-parchment-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
