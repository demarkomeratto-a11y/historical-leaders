import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Crown, 
  Sparkles,
  Check
} from 'lucide-react';
import { HistoricalLeader, SupportedLanguage } from '../types';
import { LeaderImage } from './LeaderImage';

interface LeaderCarouselProps {
  leaders: HistoricalLeader[];
  activeLeaderId: string;
  currentLang: SupportedLanguage;
  onSelectLeader: (leader: HistoricalLeader) => void;
}

export const LeaderCarousel: React.FC<LeaderCarouselProps> = ({
  leaders,
  activeLeaderId,
  currentLang,
  onSelectLeader,
}) => {
  const [isAutoplay, setIsAutoplay] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Autoplay rotation every 5 seconds if enabled
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      const currentIndex = leaders.findIndex(l => l.id === activeLeaderId);
      const nextIndex = (currentIndex + 1) % leaders.length;
      onSelectLeader(leaders[nextIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, activeLeaderId, leaders, onSelectLeader]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full my-4 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-obsidian-950 via-crimson-950/60 to-obsidian-950 border-2 border-crimson-900/60 shadow-xl backdrop-blur-md">
      
      {/* Top Header of the Carousel */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-gold-400" />
          <h3 className="font-serif font-black text-xs sm:text-sm uppercase tracking-wider text-gold-300">
            Rahbarlar Galereyasi &bull; Tanlash uchun bosing ({leaders.length} ta rahbar)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Autoplay Toggle */}
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
              isAutoplay
                ? 'bg-gold-500 text-obsidian-950 border-gold-300 shadow-md ring-2 ring-gold-400/50'
                : 'bg-obsidian-900 text-parchment-300 border-crimson-900/60 hover:text-gold-300'
            }`}
            title="Avtomatik navbatma-navbat aylanish"
          >
            {isAutoplay ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span>Aylanmoqda</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Aylanib turish (Avto)</span>
              </>
            )}
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={() => handleScroll('left')}
            className="p-1 rounded-lg bg-obsidian-900 border border-crimson-900/60 text-parchment-300 hover:text-gold-300 hover:border-gold-500 active:scale-95 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-1 rounded-lg bg-obsidian-900 border border-crimson-900/60 text-parchment-300 hover:text-gold-300 hover:border-gold-500 active:scale-95 transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel Track */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1 px-1 scroll-smooth"
      >
        {leaders.map((leader) => {
          const isActive = leader.id === activeLeaderId;
          return (
            <button
              key={leader.id}
              onClick={() => onSelectLeader(leader)}
              className={`group flex items-center gap-2.5 p-1.5 pr-3.5 rounded-xl border text-left shrink-0 transition-all duration-300 relative ${
                isActive
                  ? 'bg-gradient-to-r from-crimson-800 to-amber-700 border-gold-400 text-white ring-2 ring-gold-400/60 shadow-xl scale-105'
                  : 'bg-obsidian-900/90 hover:bg-crimson-950/80 border-crimson-900/50 text-parchment-200 hover:border-gold-500/60'
              }`}
            >
              {/* Leader Avatar with fallback */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden shrink-0 border border-gold-400/50 bg-black relative">
                <LeaderImage
                  src={leader.portraitUrl}
                  alt={leader.name[currentLang]}
                  leaderName={leader.name[currentLang]}
                  country={leader.country[currentLang]}
                  era={leader.era}
                  themeColor={leader.themeColor}
                  roundBadge={true}
                  className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-110 transition-transform duration-300"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-gold-400/20 ring-2 ring-gold-400 rounded-lg pointer-events-none" />
                )}
              </div>

              {/* Text info */}
              <div className="min-w-0 max-w-[130px] sm:max-w-[150px]">
                <h4 className="font-serif font-bold text-xs truncate leading-tight text-gold-200 group-hover:text-gold-300">
                  {leader.name[currentLang]}
                </h4>
                <p className="text-[10px] font-mono text-parchment-400 truncate mt-0.5">
                  {leader.country[currentLang]}
                </p>
                <span className="text-[9px] font-mono text-gold-400 font-bold block truncate">
                  {leader.reignYears}
                </span>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <div className="w-4 h-4 rounded-full bg-gold-400 text-obsidian-950 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
};
