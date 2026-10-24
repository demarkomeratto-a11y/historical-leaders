import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  ArrowRight,
  Quote, 
  Crown, 
  Bookmark, 
  Share2, 
  Globe,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { HistoricalLeader, SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { audioService } from '../services/audioService';
import { storageService } from '../services/storageService';
import { LeaderImage } from './LeaderImage';
import { Coins, Users, Compass, Landmark } from 'lucide-react';
import { getLeaderImperialStats } from '../data/leaderImperialStats';

interface HeroPresentationProps {
  leader: HistoricalLeader;
  allLeaders: HistoricalLeader[];
  currentLang: SupportedLanguage;
  onSelectLeader: (leader: HistoricalLeader) => void;
  onLaunchPresentation: () => void;
  onOpenSpeech: () => void;
  onOpenDossier?: () => void;
}

export const HeroPresentation: React.FC<HeroPresentationProps> = ({
  leader,
  allLeaders,
  currentLang,
  onSelectLeader,
  onLaunchPresentation,
  onOpenSpeech,
  onOpenDossier,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(() => 
    storageService.getBookmarks().includes(leader.id)
  );
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const imperialStats = getLeaderImperialStats(leader);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 14), y: x * 14 });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Reset img error on leader change
  useEffect(() => {
    setImgError(false);
  }, [leader.id]);

  useEffect(() => {
    return audioService.onSpeakingChange((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  const t = UI_TRANSLATIONS[currentLang];

  const currentIndex = allLeaders.findIndex(l => l.id === leader.id);
  const prevLeader = allLeaders[(currentIndex - 1 + allLeaders.length) % allLeaders.length];
  const nextLeader = allLeaders[(currentIndex + 1) % allLeaders.length];

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      audioService.stopSpeech();
    } else {
      const textToRead = `${leader.name[currentLang]}. ${leader.title[currentLang]}. ${leader.shortBio[currentLang]} ${leader.famousQuote[currentLang]}`;
      audioService.speakText(textToRead, currentLang);
    }
  };

  const handleToggleBookmark = () => {
    const state = storageService.toggleBookmark(leader.id);
    setIsBookmarked(state);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // Safe portrait URL with multiple fallbacks
  const portraitSrc = imgError 
    ? "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
    : leader.portraitUrl;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-obsidian-800 bg-obsidian-950 text-white my-3 select-none">
      
      {/* 1. TOP HEADER BAR: Leader Switcher, Tagline, Navigation */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-r from-obsidian-950 via-crimson-950 to-obsidian-950 border-b border-crimson-800/50 gap-2">
        
        {/* Quick Prev / Next Switchers */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSelectLeader(prevLeader)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-obsidian-900 border border-crimson-900/60 text-parchment-200 hover:text-gold-300 hover:border-gold-500 text-xs font-mono transition-all"
            title={`Oldingi: ${prevLeader.name[currentLang]}`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Oldingi</span>
          </button>

          {/* Quick Dropdown Selector for All 30 Leaders */}
          <select
            value={leader.id}
            onChange={(e) => {
              const selected = allLeaders.find(l => l.id === e.target.value);
              if (selected) onSelectLeader(selected);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-obsidian-900 border border-gold-500/50 text-gold-300 text-xs font-serif font-bold focus:outline-hidden focus:ring-1 focus:ring-gold-400 cursor-pointer max-w-[170px] sm:max-w-[220px] truncate"
          >
            {allLeaders.map((l) => (
              <option key={l.id} value={l.id} className="bg-obsidian-950 text-white font-sans">
                {l.name[currentLang]} ({l.country[currentLang]})
              </option>
            ))}
          </select>

          <button
            onClick={() => onSelectLeader(nextLeader)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-obsidian-900 border border-crimson-900/60 text-parchment-200 hover:text-gold-300 hover:border-gold-500 text-xs font-mono transition-all"
            title={`Keyingi: ${nextLeader.name[currentLang]}`}
          >
            <span className="hidden sm:inline">Keyingi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center Title / Tagline */}
        <div className="hidden lg:block text-right px-4 flex-1 truncate">
          <h2 className="font-serif font-black tracking-widest text-sm text-gold-400 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] truncate">
            {leader.tagline[currentLang] || leader.name[currentLang]}
          </h2>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-full border transition-all ${
              isBookmarked 
                ? 'bg-gold-500 text-obsidian-950 border-gold-300' 
                : 'bg-obsidian-900/80 text-parchment-300 border-crimson-900/60 hover:text-gold-400'
            }`}
            title="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-obsidian-900/80 text-parchment-300 border border-crimson-900/60 hover:text-gold-400 transition-all relative"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
            {copiedNotification && (
              <span className="absolute -top-7 right-0 text-[10px] bg-gold-500 text-black font-bold px-1.5 py-0.5 rounded shadow">
                Nusxalandi!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. HERO PRESENTATION CANVAS */}
      <div 
        className="relative min-h-[420px] sm:min-h-[460px] md:min-h-[480px] flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 md:p-10 overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 75% 30%, ${leader.themeColor || '#8B0000'}cc 0%, #2b0606 50%, #0c070a 100%)`
        }}
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Giant Star Emblem Graphic */}
        <div className="absolute right-8 md:right-28 top-8 text-gold-500/15 pointer-events-none select-none text-[260px] md:text-[380px] font-serif leading-none">
          ★
        </div>

        {/* LEFT / CENTER: Leader Cutout Portrait Frame with 3D Float Animation */}
        <div className="relative z-10 w-full md:w-5/12 flex flex-col items-center justify-center mb-6 md:mb-0 perspective-1000">
          <div 
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{ 
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="relative group cursor-pointer"
          >
            
            {/* Glow Aura */}
            <div className="absolute -inset-3 bg-gradient-to-r from-gold-500 via-crimson-600 to-amber-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse-gold" />
            
            {/* Portrait Card */}
            <div className="relative rounded-2xl overflow-hidden border-3 border-gold-400 shadow-2xl bg-black w-[260px] sm:w-[290px] md:w-[320px] aspect-[3/4]">
              
              <LeaderImage
                key={leader.id}
                src={leader.portraitUrl}
                alt={leader.name[currentLang]}
                leaderName={leader.name[currentLang]}
                country={leader.country[currentLang]}
                era={leader.era}
                themeColor={leader.themeColor}
                className="w-full h-full object-cover object-top filter contrast-105 saturate-110 group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Bottom Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none" />

              {/* Badges on Portrait */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-crimson-950/95 text-gold-300 border border-gold-500/50 backdrop-blur-md shadow-lg">
                  <Globe className="w-3.5 h-3.5 text-gold-400" />
                  {leader.country[currentLang]}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-black/90 text-parchment-200 border border-white/20">
                  {leader.reignYears}
                </span>
              </div>
            </div>

            {/* 3D IMPERIAL STATE STATS CARD DIRECTLY UNDER PICTURE */}
            <div className="mt-3.5 w-full rounded-2xl bg-gradient-to-b from-obsidian-900/95 via-obsidian-950 to-black p-3.5 border-2 border-gold-500/50 shadow-2xl backdrop-blur-md space-y-2.5 text-left">
              <div className="flex items-center justify-between border-b border-gold-500/30 pb-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-gold-400">
                <span className="flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-gold-400" />
                  <span>Davlat Ko'rsatkichlari</span>
                </span>
                <span className="text-parchment-300 font-bold">{leader.name[currentLang]}</span>
              </div>

              {/* Grid of Key Imperial Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* 1. Davlat Hududi */}
                <div className="p-2 rounded-xl bg-obsidian-950/90 border border-gold-500/20">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-parchment-400 uppercase">
                    <Compass className="w-3 h-3 text-gold-400" />
                    <span>Davlat Hududi</span>
                  </div>
                  <span className="font-serif font-black text-xs sm:text-sm text-gold-300 font-mono mt-0.5 block truncate">
                    {imperialStats.territoryArea}
                  </span>
                </div>

                {/* 2. Aholi Soni */}
                <div className="p-2 rounded-xl bg-obsidian-950/90 border border-gold-500/20">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-parchment-400 uppercase">
                    <Users className="w-3 h-3 text-amber-400" />
                    <span>Aholi Soni</span>
                  </div>
                  <span className="font-bold text-xs text-parchment-200 mt-0.5 block truncate" title={imperialStats.population[currentLang]}>
                    {imperialStats.population[currentLang]}
                  </span>
                </div>
              </div>

              {/* 3. Davlat Boyligi va G'aznasi */}
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-obsidian-950 to-obsidian-950 border border-amber-500/30 text-xs">
                <div className="flex items-center gap-1 text-[10px] font-mono text-gold-400 uppercase">
                  <Coins className="w-3 h-3 text-gold-400" />
                  <span>Davlat Boyligi & Xazinasi</span>
                </div>
                <p className="text-[11px] text-parchment-200 mt-0.5 leading-snug line-clamp-2">
                  {imperialStats.stateWealth[currentLang]}
                </p>
              </div>

              {/* 4. Poytaxt & Bosh Qonun */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-parchment-300">
                <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 truncate">
                  <span className="text-parchment-500 block">Poytaxt:</span>
                  <span className="text-gold-300 font-bold truncate block">{imperialStats.capital[currentLang]}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 truncate">
                  <span className="text-parchment-500 block">Bosh Qonun:</span>
                  <span className="text-gold-300 font-bold truncate block">{imperialStats.supremeLaw[currentLang]}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT / MAIN CONTENT */}
        <div className="relative z-10 w-full md:w-7/12 md:pl-8 flex flex-col justify-center text-center md:text-left">
          
          {/* Era / Lifespan Tag */}
          <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-gold-400/20 text-gold-300 border border-gold-500/40">
              {leader.era === 'ancient' ? t.ancientEra : leader.era === 'medieval' ? t.medievalEra : t.modernEra}
            </span>
            <span className="text-xs text-parchment-300 font-mono">
              {t.lifespan}: {leader.lifespan}
            </span>
          </div>

          {/* Leader Name */}
          <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-gold-300 tracking-tight leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] mb-3">
            {leader.name[currentLang]}
          </h1>

          {/* Title */}
          <p className="font-serif italic text-base sm:text-xl text-parchment-200/95 font-medium max-w-xl mb-3 leading-relaxed">
            {leader.title[currentLang]}
          </p>

          {/* Short Bio */}
          <p className="text-xs sm:text-sm text-parchment-300/90 leading-relaxed max-w-xl mb-5 line-clamp-3">
            {leader.shortBio[currentLang]}
          </p>

          {/* Famous Quote Banner */}
          <div className="relative p-3.5 sm:p-4 rounded-xl bg-obsidian-900/80 border border-crimson-800/80 backdrop-blur-md mb-6 max-w-xl shadow-lg">
            <div className="flex items-start gap-2.5">
              <Quote className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-serif italic text-gold-200 leading-snug">
                "{leader.famousQuote[currentLang]}"
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS (The famous golden banner!) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
            
            {/* BIG GOLDEN BANNER BUTTON */}
            <button
              onClick={onLaunchPresentation}
              className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-serif font-black text-sm sm:text-base text-obsidian-950 uppercase tracking-widest bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 hover:from-amber-300 hover:to-gold-400 shadow-xl shadow-gold-900/50 border-2 border-gold-200 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-current text-obsidian-950 group-hover:translate-x-0.5 transition-transform" />
              <span>{t.viewPresentation}</span>
            </button>

            {/* FULL HISTORICAL DOSSIER BUTTON */}
            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="group relative inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-serif font-black text-xs sm:text-sm text-white uppercase tracking-wider bg-gradient-to-r from-crimson-800 via-crimson-700 to-amber-700 hover:from-crimson-700 hover:to-amber-600 shadow-xl shadow-crimson-950/80 border-2 border-gold-400/80 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-gold-300 animate-pulse" />
                <span>To'liq Tarixiy Dossier</span>
              </button>
            )}

            {/* TTS Speech Narration */}
            <button
              onClick={handleToggleSpeech}
              className={`inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                isSpeaking
                  ? 'bg-crimson-700 text-white border-gold-400 shadow-lg shadow-crimson-900/50 ring-2 ring-gold-400/50'
                  : 'bg-obsidian-900/90 text-parchment-200 border-crimson-800/80 hover:bg-crimson-950 hover:border-gold-500'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-gold-300 animate-pulse" />
                  <span>{t.stopNarration}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-gold-400" />
                  <span>{t.listenNarration}</span>
                </>
              )}
            </button>

            {/* Historic Speech Button */}
            {leader.famousSpeech && (
              <button
                onClick={onOpenSpeech}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-obsidian-900/90 text-parchment-200 border border-crimson-800/80 hover:bg-crimson-950 hover:border-gold-500 transition-all"
              >
                <Crown className="w-4 h-4 text-gold-400" />
                <span>{t.playSpeech}</span>
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
