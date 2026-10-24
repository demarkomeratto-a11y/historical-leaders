import React, { useState, useEffect, useMemo } from 'react';
import { 
  HistoricalLeader, 
  HistoricalEra, 
  SupportedLanguage, 
  LeaderSlide 
} from './types';
import { ALL_FLAGSHIP_LEADERS } from './data/leadersData';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from './i18n/translations';
import { storageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { LeaderCarousel } from './components/LeaderCarousel';
import { HeroPresentation } from './components/HeroPresentation';
import { SlideGrid } from './components/SlideGrid';
import { SlideModal } from './components/SlideModal';
import { TimelineBar } from './components/TimelineBar';
import { LeaderCard } from './components/LeaderCard';
import { WorldMapModal } from './components/WorldMapModal';
import { InteractiveWorldTimelineMap } from './components/InteractiveWorldTimelineMap';
import { AiGeneratorModal } from './components/AiGeneratorModal';
import { SpeechPlayerModal } from './components/SpeechPlayerModal';
import { LeaderDossierModal } from './components/LeaderDossierModal';
import { Crown, Globe2, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  // 1. Language state with local storage persistence
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    return storageService.getSavedLanguage() || 'uz';
  });

  // 2. Leaders state (flagship 30 + custom saved)
  const [allLeaders, setAllLeaders] = useState<HistoricalLeader[]>(() => {
    const custom = storageService.getCustomLeaders();
    return [...custom, ...ALL_FLAGSHIP_LEADERS];
  });

  // 3. Active leader displayed in Hero (Default to 'amir-temur' or 'ho-chi-minh')
  const [activeLeader, setActiveLeader] = useState<HistoricalLeader>(() => {
    return allLeaders.find(l => l.id === 'amir-temur') || allLeaders[0];
  });

  // 4. Modal and view states
  const [selectedSlide, setSelectedSlide] = useState<LeaderSlide | null>(null);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  const [selectedEra, setSelectedEra] = useState<HistoricalEra | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSpeechModalOpen, setIsSpeechModalOpen] = useState(false);
  const [dossierLeader, setDossierLeader] = useState<HistoricalLeader | null>(null);

  // Sync RTL and lang attributes
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    storageService.saveLanguage(currentLang);
  }, [currentLang]);

  // Handle language change
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
  };

  // Add new leader from AI / Wiki / Manual form
  const handleAddNewLeader = (newLeader: HistoricalLeader) => {
    setAllLeaders(prev => [newLeader, ...prev]);
    setActiveLeader(newLeader);
  };

  // Filter leaders catalog
  const filteredLeaders = useMemo(() => {
    return allLeaders.filter(leader => {
      // Era filter
      if (selectedEra !== 'all' && leader.era !== selectedEra) {
        return false;
      }
      // Region filter
      if (selectedRegion !== 'all' && leader.region !== selectedRegion) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = leader.name[currentLang]?.toLowerCase().includes(q) ||
                          leader.name.en.toLowerCase().includes(q) ||
                          leader.name.uz.toLowerCase().includes(q);
        const countryMatch = leader.country[currentLang]?.toLowerCase().includes(q) ||
                             leader.country.en.toLowerCase().includes(q);
        const titleMatch = leader.title[currentLang]?.toLowerCase().includes(q);
        const reignMatch = leader.reignYears.toLowerCase().includes(q);
        return nameMatch || countryMatch || titleMatch || reignMatch;
      }
      return true;
    });
  }, [allLeaders, selectedEra, selectedRegion, searchQuery, currentLang]);

  const t = UI_TRANSLATIONS[currentLang];

  // Open slide modal
  const handleSelectSlide = (slide: LeaderSlide, idx: number) => {
    setSelectedSlide(slide);
    setSelectedSlideIndex(idx);
  };

  // Launch Fullscreen Presentation Mode (opens first slide)
  const handleLaunchPresentation = () => {
    if (activeLeader.slides && activeLeader.slides.length > 0) {
      setSelectedSlide(activeLeader.slides[0]);
      setSelectedSlideIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-parchment-100 font-sans selection:bg-crimson-600 selection:text-white pb-20">
      
      {/* 1. NAVBAR WITH FIXED LANGUAGE SELECTOR, MAP TOGGLE, AI & AUDIO */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenMap={() => setIsMapOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenSpeechModal={() => setIsSpeechModalOpen(true)}
        isMapOpen={isMapOpen}
      />

      {/* 2. MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        
        {/* INTERACTIVE ROTATING LEADER CAROUSEL (Top Quick Selector for all 30 leaders!) */}
        <section aria-label="Leader Rotating Carousel">
          <LeaderCarousel
            leaders={allLeaders}
            activeLeaderId={activeLeader.id}
            currentLang={currentLang}
            onSelectLeader={(leader) => {
              setActiveLeader(leader);
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
          />
        </section>

        {/* HERO SHOWCASE WITH CONTROLS (Inspired directly by user's reference image!) */}
        <section aria-label="Featured Leader Presentation">
          <HeroPresentation
            leader={activeLeader}
            allLeaders={allLeaders}
            currentLang={currentLang}
            onSelectLeader={setActiveLeader}
            onLaunchPresentation={handleLaunchPresentation}
            onOpenSpeech={() => setIsSpeechModalOpen(true)}
            onOpenDossier={() => setDossierLeader(activeLeader)}
          />
        </section>

        {/* INTERACTIVE SLIDE CARDS GRID (The bottom half of the user's reference screenshot!) */}
        <section aria-label="Interactive Presentation Slides Grid">
          <SlideGrid
            leader={activeLeader}
            currentLang={currentLang}
            onSelectSlide={handleSelectSlide}
            onStartSlideshow={handleLaunchPresentation}
          />
        </section>

        {/* 3D GLOBE & HISTORICAL TIMELINE WORLD MAP SECTION */}
        <section id="interactive-world-map" aria-label="Interactive 3D Globe and Timeline World Map" className="mt-8">
          <InteractiveWorldTimelineMap
            leaders={allLeaders}
            activeLeader={activeLeader}
            currentLang={currentLang}
            onSelectLeader={(leader) => {
              setActiveLeader(leader);
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            onOpenLeaderPresentation={(leader) => {
              setActiveLeader(leader);
              if (leader.slides && leader.slides.length > 0) {
                setSelectedSlide(leader.slides[0]);
                setSelectedSlideIndex(0);
              }
            }}
            onOpenLeaderDossier={(leader) => {
              setDossierLeader(leader);
            }}
          />
        </section>

        {/* 3. EXPLORE ALL HISTORICAL LEADERS CATALOG SECTION */}
        <section id="catalog-section" className="mt-14 pt-8 border-t-2 border-crimson-900/40">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-gold-400 mb-1">
                <Crown className="w-4 h-4 text-gold-400" />
                <span>30 Ta Tarixiy Buyuk Rahbarlar Ko'rgazmasi</span>
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-200">
                {t.featuredLeaders}
              </h2>
            </div>
            <div className="text-xs font-mono text-parchment-400">
              {filteredLeaders.length} {t.totalLeaders}
            </div>
          </div>

          {/* Timeline Bar, Era Filter & Live Search */}
          <TimelineBar
            selectedEra={selectedEra}
            onSelectEra={setSelectedEra}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            currentLang={currentLang}
            totalCount={allLeaders.length}
          />

          {/* Leader Catalog Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 my-6">
            {filteredLeaders.map(leader => (
              <LeaderCard
                key={leader.id}
                leader={leader}
                currentLang={currentLang}
                isSelected={leader.id === activeLeader.id}
                onSelect={(selected) => {
                  setActiveLeader(selected);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                onOpenDossier={(selected) => {
                  setDossierLeader(selected);
                }}
              />
            ))}
          </div>

          {filteredLeaders.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-obsidian-900/60 border border-crimson-900/40 text-parchment-400">
              <p className="text-base font-serif mb-3">Qidiruvingiz bo'yicha rahbar topilmadi.</p>
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-crimson-700 hover:bg-crimson-600 text-white font-bold text-xs uppercase"
              >
                {t.aiGeneratorBtn} orqali qidirish yoki qo'shish
              </button>
            </div>
          )}

        </section>

      </main>

      {/* 4. MODALS */}

      {/* Hybrid Slide Modal */}
      {selectedSlide && (
        <SlideModal
          slides={activeLeader.slides}
          currentIndex={selectedSlideIndex}
          currentLang={currentLang}
          leaderName={activeLeader.name[currentLang]}
          onClose={() => setSelectedSlide(null)}
          onNavigate={(newIdx) => {
            setSelectedSlideIndex(newIdx);
            setSelectedSlide(activeLeader.slides[newIdx]);
          }}
        />
      )}

      {/* World Map Modal */}
      {isMapOpen && (
        <WorldMapModal
          leaders={allLeaders}
          currentLang={currentLang}
          onSelectLeader={(leader) => {
            setActiveLeader(leader);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          onClose={() => setIsMapOpen(false)}
        />
      )}

      {/* AI / Wikipedia / Manual Leader Generator */}
      {isAiModalOpen && (
        <AiGeneratorModal
          currentLang={currentLang}
          onAddLeader={handleAddNewLeader}
          onClose={() => setIsAiModalOpen(false)}
        />
      )}

      {/* Historic Speech & Quotes Modal */}
      {isSpeechModalOpen && (
        <SpeechPlayerModal
          leader={activeLeader}
          currentLang={currentLang}
          onClose={() => setIsSpeechModalOpen(false)}
        />
      )}

      {/* Comprehensive Leader Historical Dossier Modal */}
      {dossierLeader && (
        <LeaderDossierModal
          leader={dossierLeader}
          currentLang={currentLang}
          onClose={() => setDossierLeader(null)}
          onOpenSlidePresentation={() => {
            setActiveLeader(dossierLeader);
            handleLaunchPresentation();
          }}
        />
      )}

      {/* FOOTER */}
      <footer className="mt-20 border-t border-crimson-900/40 bg-obsidian-950/90 py-10 text-center text-xs text-parchment-400/70">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-gold-400 font-serif font-bold text-sm">
            <span>👑</span>
            <span>{t.siteTitle}</span>
          </div>
          <p className="max-w-xl mx-auto">
            10 ta xalqaro tilda dunyo tarixidagi barcha davlat rahbarlarini interaktiv taqdimot formatida o'rganish xalqaro platformasi.
          </p>
          <div className="text-[11px] font-mono text-parchment-500 pt-2">
            O'zbek &bull; English &bull; Русский &bull; 中文 &bull; Español &bull; Français &bull; 日本語 &bull; العربية &bull; Türkçe &bull; 한국어
          </div>
        </div>
      </footer>

    </div>
  );
};
