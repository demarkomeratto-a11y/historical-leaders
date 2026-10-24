import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Calendar, 
  Quote, 
  Sparkles,
  Maximize2,
  Award,
  Layers,
  MapPin,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LeaderSlide, SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { audioService } from '../services/audioService';
import { LeaderImage } from './LeaderImage';

interface SlideModalProps {
  slides: LeaderSlide[];
  currentIndex: number;
  currentLang: SupportedLanguage;
  leaderName: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const SlideModal: React.FC<SlideModalProps> = ({
  slides,
  currentIndex,
  currentLang,
  leaderName,
  onClose,
  onNavigate,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const slide = slides[currentIndex];
  const t = UI_TRANSLATIONS[currentLang];
  const isFinalSlide = currentIndex === slides.length - 1;

  useEffect(() => {
    return audioService.onSpeakingChange((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  // Trigger celebration confetti on the final tribute slide
  useEffect(() => {
    if (isFinalSlide) {
      audioService.playGong();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#991B1B', '#F59E0B', '#FFFFFF'],
        });
      } catch {}
    }
  }, [isFinalSlide]);

  // Autoplay progression timer
  useEffect(() => {
    if (!isAutoplay) return;

    const timer = setTimeout(() => {
      if (currentIndex < slides.length - 1) {
        onNavigate(currentIndex + 1);
      } else {
        setIsAutoplay(false);
      }
    }, 7500);

    return () => clearTimeout(timer);
  }, [isAutoplay, currentIndex, slides.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) onNavigate(currentIndex + 1);
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, slides.length, onClose, onNavigate]);

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      audioService.stopSpeech();
    } else {
      const text = `${slide.title[currentLang]}. ${slide.content[currentLang]}. ${
        slide.bulletPoints?.map(b => `${b.dateOrTag || ''}: ${b.text[currentLang]}`).join('. ') || ''
      }`;
      audioService.speakText(text, currentLang);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 12), y: x * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  if (!slide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn select-none overflow-y-auto">
      
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main 3D Slide Presentation Theater Window */}
      <div 
        className="relative z-10 w-full max-w-4xl max-h-[94vh] flex flex-col rounded-3xl overflow-hidden border-2 border-gold-500/60 shadow-[0_20px_70px_rgba(0,0,0,0.95)] bg-gradient-to-b from-[#180e18] via-[#0d060e] to-[#060206] text-parchment-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* TOP GOLD & CRIMSON BANNER BAR */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-gradient-to-r from-obsidian-950 via-[#2a0b14] to-obsidian-950 border-b border-gold-500/40 shadow-lg">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-gold-400/20 text-gold-300 border border-gold-500/40">
              {currentIndex + 1} / {slides.length}
            </span>
            <div className="min-w-0">
              <span className="font-serif font-black text-sm sm:text-base tracking-widest uppercase text-gold-200 truncate block">
                {slide.romanNumeral ? `${slide.romanNumeral}. ` : ''}
                {slide.badge?.[currentLang] || leaderName}
              </span>
              <span className="text-[10px] text-parchment-400 font-mono block truncate">
                {leaderName} &bull; Tarixiy Taqdimot Slaydlari
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Autoplay Slideshow */}
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isAutoplay
                  ? 'bg-gold-500 text-obsidian-950 ring-2 ring-gold-300 font-extrabold shadow'
                  : 'bg-obsidian-900 text-gold-300 hover:bg-crimson-950 border border-gold-500/30'
              }`}
              title="Avtomatik o'tish"
            >
              {isAutoplay ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span className="hidden sm:inline">{isAutoplay ? "Aylanmoqda" : "Avto-ijro"}</span>
            </button>

            {/* Audio Speech */}
            <button
              onClick={handleToggleSpeak}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isSpeaking 
                  ? 'bg-crimson-700 text-white animate-pulse ring-2 ring-gold-400 shadow' 
                  : 'bg-obsidian-900 text-gold-300 hover:bg-crimson-950 border border-gold-500/30'
              }`}
              title={isSpeaking ? t.stopNarration : t.listenNarration}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-gold-300" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? t.stopNarration : t.listenNarration}</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-obsidian-900 hover:bg-crimson-950 text-parchment-300 hover:text-white border border-gold-500/30 transition-colors"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PROGRESS BAR FOR AUTOPLAY */}
        {isAutoplay && (
          <div className="w-full h-1 bg-crimson-950 overflow-hidden">
            <div className="h-full bg-gold-400 animate-[pulse_7s_linear_infinite]" />
          </div>
        )}

        {/* MODAL SLIDE STAGE */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Header Title with Antique Seal Stamp */}
          <div className="flex items-start justify-between border-b border-gold-500/20 pb-4 gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-black text-xl sm:text-2xl md:text-3xl text-gold-200 leading-snug">
                {slide.title[currentLang]}
              </h3>
              {slide.yearRange && (
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 mt-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>{slide.yearRange}</span>
                </div>
              )}
            </div>

            {/* Antique Seal Stamp */}
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-gold-400 bg-crimson-950/80 text-gold-300 flex flex-col items-center justify-center shrink-0 rotate-12 shadow-lg font-mono text-[9px] font-black uppercase text-center leading-none p-1">
              <span>★ RASMIY ★</span>
              <span className="text-[10px] text-gold-200 font-bold mt-0.5">TARIX</span>
            </div>
          </div>

          {/* Media & Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Archival Illustration with 3D Parallax Tilt */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
              className="md:col-span-5 rounded-2xl overflow-hidden border-2 border-gold-400/80 shadow-2xl bg-black group relative aspect-[4/3] sm:aspect-auto sm:h-72 cursor-pointer"
            >
              <LeaderImage
                src={slide.imageUrl}
                alt={slide.title[currentLang]}
                leaderName={slide.title[currentLang]}
                className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-mono flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-crimson-950/90 text-gold-300 border border-gold-500/40 text-[9px] font-bold uppercase">
                  {slide.category}
                </span>
                <span className="text-gold-300 font-bold">#Slayd {slide.slideNumber}</span>
              </div>
            </div>

            {/* Slide Body Details */}
            <div className="md:col-span-7 space-y-4">
              
              <p className="text-sm sm:text-base text-parchment-200 leading-relaxed font-sans font-medium">
                {slide.content[currentLang]}
              </p>

              {/* Step-by-Step Historical Milestones */}
              {slide.bulletPoints && slide.bulletPoints.length > 0 && (
                <div className="space-y-2.5 pt-1">
                  {slide.bulletPoints.map((bp, bIdx) => (
                    <div 
                      key={bIdx}
                      className="p-3 rounded-xl bg-obsidian-900/80 border border-gold-500/20 shadow-sm flex items-start gap-3 hover:border-gold-400/60 transition-colors"
                    >
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-crimson-900 text-gold-300 shrink-0 mt-0.5 border border-gold-500/40">
                        {bp.dateOrTag}
                      </span>
                      <p className="text-xs sm:text-sm text-parchment-200 leading-snug font-sans">
                        {bp.text[currentLang]}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Quote Stamp */}
              {slide.quote && (
                <div className="p-4 rounded-xl bg-crimson-950/60 border-l-4 border-gold-400 shadow-lg relative">
                  <div className="flex items-start gap-2.5">
                    <Quote className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm font-serif italic text-gold-200 font-bold leading-relaxed">
                        "{slide.quote.text[currentLang]}"
                      </p>
                      {slide.quote.speaker && (
                        <span className="text-xs font-mono text-parchment-400 font-bold mt-1 block">
                          — {slide.quote.speaker[currentLang]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Special Celebratory Message on the Final Tribute Slide */}
              {isFinalSlide && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-crimson-900 via-amber-800 to-crimson-900 text-white shadow-xl text-center space-y-1.5 border border-gold-400">
                  <Sparkles className="w-6 h-6 text-gold-300 mx-auto animate-bounce" />
                  <h4 className="font-serif font-black text-sm uppercase tracking-wider text-gold-200">
                    {t.thankYouListening}
                  </h4>
                  <p className="text-xs text-parchment-200">
                    Siz {leaderName} hayoti va faoliyati haqidagi to'liq taqdimotni tomosha qildingiz.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* MODAL FOOTER NAVIGATION */}
        <div className="px-5 py-3.5 bg-obsidian-950 border-t border-gold-500/30 flex items-center justify-between">
          <button
            onClick={() => currentIndex > 0 && onNavigate(currentIndex - 1)}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-serif font-black uppercase tracking-wider transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed bg-black/20 text-parchment-500 border border-white/10'
                : 'bg-obsidian-900 text-gold-300 hover:bg-crimson-950 shadow-md active:scale-95 border border-gold-500/40'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.prev}</span>
          </button>

          <div className="text-xs font-mono font-bold text-parchment-400 hidden sm:block">
            Klaviatura: [← Oldingi] [→ Keyingi] [ESC Yopish]
          </div>

          <button
            onClick={() => currentIndex < slides.length - 1 && onNavigate(currentIndex + 1)}
            disabled={currentIndex === slides.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-serif font-black uppercase tracking-wider transition-all ${
              currentIndex === slides.length - 1
                ? 'opacity-30 cursor-not-allowed bg-black/20 text-parchment-500 border border-white/10'
                : 'bg-gradient-to-r from-amber-600 via-crimson-700 to-amber-600 text-white hover:brightness-110 shadow-lg active:scale-95 border border-gold-400'
            }`}
          >
            <span>{t.next}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
