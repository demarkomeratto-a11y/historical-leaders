import React, { useState } from 'react';
import { 
  Maximize2, 
  MapPin, 
  Clock, 
  Sparkles, 
  Volume2, 
  Play,
  Shield,
  Swords,
  Crown,
  Scroll,
  Award,
  Layers
} from 'lucide-react';
import { HistoricalLeader, LeaderSlide, SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { audioService } from '../services/audioService';

interface SlideGridProps {
  leader: HistoricalLeader;
  currentLang: SupportedLanguage;
  onSelectSlide: (slide: LeaderSlide, index: number) => void;
  onStartSlideshow: () => void;
}

export const SlideGrid: React.FC<SlideGridProps> = ({
  leader,
  currentLang,
  onSelectSlide,
  onStartSlideshow,
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  const handleCardClick = (slide: LeaderSlide, idx: number) => {
    audioService.playSlideClick();
    onSelectSlide(slide, idx);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'context': return <Layers className="w-3.5 h-3.5 text-gold-300" />;
      case 'events': return <Swords className="w-3.5 h-3.5 text-gold-300" />;
      case 'strategy': return <Shield className="w-3.5 h-3.5 text-gold-300" />;
      case 'legacy': return <Crown className="w-3.5 h-3.5 text-gold-300" />;
      case 'map': return <MapPin className="w-3.5 h-3.5 text-gold-300" />;
      case 'archive': return <Scroll className="w-3.5 h-3.5 text-gold-300" />;
      case 'tribute': return <Award className="w-3.5 h-3.5 text-gold-300" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-gold-300" />;
    }
  };

  return (
    <div className="w-full my-6">
      
      {/* SECTION TITLE & ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between mb-4 px-2 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-3 h-7 bg-gradient-to-b from-crimson-600 to-amber-600 rounded-sm shadow-md" />
          <div>
            <h3 className="font-serif font-black text-lg sm:text-xl text-gold-300 uppercase tracking-wider flex items-center gap-2">
              <span>{leader.name[currentLang]} &bull; Taqdimot Slaydlari</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-crimson-900/80 text-gold-300 border border-gold-500/30">
                {leader.slides.length} ta slayd
              </span>
            </h3>
            <p className="text-xs text-parchment-400">
              Har bir slaydni bosib to'liq ma'lumot va arxiv xaritalarini ko'ring
            </p>
          </div>
        </div>

        {/* Start Slideshow Button */}
        <button
          onClick={onStartSlideshow}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-crimson-700 hover:from-amber-500 hover:to-crimson-600 text-white font-serif font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Slayd-shouni boshlash</span>
        </button>
      </div>

      {/* VINTAGE FILMSTRIP TOP BORDER (Matching the user's uploaded reference image!) */}
      <div className="w-full h-3.5 bg-obsidian-900 border-y border-gold-600/40 flex justify-between px-2 overflow-hidden mb-4 opacity-80 shadow-inner">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="w-2.5 h-2 bg-black rounded-xs my-auto" />
        ))}
      </div>

      {/* THE SLIDE CARDS GRID (Direct replica of the thumbnail cards layout from the screenshot!) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4.5">
        {leader.slides.map((slide, idx) => {
          const isTribute = slide.category === 'tribute';
          const isMap = slide.category === 'map';

          return (
            <div
              key={slide.id}
              onClick={() => handleCardClick(slide, idx)}
              className="group relative cursor-pointer rounded-xl overflow-hidden border-2 border-crimson-900/70 hover:border-gold-400 bg-gradient-to-b from-parchment-50 via-parchment-100 to-parchment-200 text-obsidian-950 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between aspect-[16/11]"
            >
              
              {/* TOP CRIMSON BANNER (Like the screenshot's red title box) */}
              <div className="bg-gradient-to-r from-crimson-900 via-crimson-800 to-crimson-950 text-white px-3 py-1.5 flex items-center justify-between border-b-2 border-gold-500/40 shadow-xs">
                <div className="flex items-center gap-1.5 truncate">
                  {getCategoryIcon(slide.category)}
                  <span className="font-serif font-black text-[11px] sm:text-xs tracking-wider uppercase truncate text-gold-200">
                    {slide.romanNumeral ? `${slide.romanNumeral}. ` : ''}
                    {slide.badge?.[currentLang] || slide.title[currentLang]}
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-black/60 px-1.5 py-0.2 rounded text-gold-300 font-bold shrink-0 ml-1 border border-gold-500/20">
                  #{slide.slideNumber}
                </span>
              </div>

              {/* SLIDE BODY */}
              <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between overflow-hidden relative">
                
                {/* Background watermarked image */}
                {slide.imageUrl && (
                  <div className="absolute right-1 bottom-1 w-2/5 h-3/4 opacity-20 pointer-events-none overflow-hidden rounded">
                    <img 
                      src={slide.imageUrl} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>
                )}

                {/* Title & Excerpt */}
                <div>
                  <h4 className="font-serif font-black text-xs sm:text-[13px] text-crimson-950 line-clamp-2 leading-snug mb-1.5">
                    {slide.title[currentLang]}
                  </h4>

                  {/* Bullet points with dates */}
                  {slide.bulletPoints && slide.bulletPoints.length > 0 ? (
                    <div className="space-y-1">
                      {slide.bulletPoints.slice(0, 2).map((bp, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-1 text-[10px] text-obsidian-900 leading-tight">
                          <span className="text-crimson-700 font-black shrink-0">&bull;</span>
                          <span className="font-bold text-crimson-900 shrink-0 font-mono text-[9px] bg-crimson-100 px-1 rounded">
                            {bp.dateOrTag}
                          </span>
                          <span className="truncate">{bp.text[currentLang]}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] sm:text-[11px] text-obsidian-850 line-clamp-3 leading-snug font-sans">
                      {slide.content[currentLang]}
                    </p>
                  )}
                </div>

                {/* Bottom Footer bar of the thumbnail */}
                <div className="flex items-center justify-between pt-1.5 border-t border-black/10 mt-1 text-[10px] font-mono">
                  <span className="text-crimson-900 font-bold flex items-center gap-1">
                    {isTribute ? '🎖️ Xulosa' : isMap ? '🗺️ Xarita' : `📄 Slayd ${slide.slideNumber}`}
                  </span>

                  <span className="text-crimson-800 font-black group-hover:text-gold-700 flex items-center gap-1 group-hover:scale-105 transition-transform">
                    <Maximize2 className="w-3 h-3" /> Ochish
                  </span>
                </div>

              </div>

              {/* Gold border shine on hover */}
              <div className="absolute inset-0 bg-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border-2 border-gold-400 rounded-xl" />

            </div>
          );
        })}
      </div>

      {/* VINTAGE FILMSTRIP BOTTOM BORDER */}
      <div className="w-full h-3.5 bg-obsidian-900 border-y border-gold-600/40 flex justify-between px-2 overflow-hidden mt-4 opacity-80 shadow-inner">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="w-2.5 h-2 bg-black rounded-xs my-auto" />
        ))}
      </div>

    </div>
  );
};
