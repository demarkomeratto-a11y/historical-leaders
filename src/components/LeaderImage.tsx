import React, { useState, useEffect } from 'react';
import { Crown, Sparkles, Shield, Compass, Landmark } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

interface LeaderImageProps {
  src?: string;
  alt: string;
  leaderName: string;
  country?: string;
  era?: string;
  themeColor?: string;
  className?: string;
  roundBadge?: boolean;
}

// Verified high-resolution Wikimedia public fallbacks for all leaders
const WIKI_PORTRAIT_FALLBACKS: Record<string, string> = {
  'amir-temur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gerasimov_Amir_Timur.jpg/500px-Gerasimov_Amir_Timur.jpg',
  'genghis-khan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/YuanEmperorAlbumGenghisPortrait.jpg/500px-YuanEmperorAlbumGenghisPortrait.jpg',
  'ho-chi-minh': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Ho_Chi_Minh_1946.jpg/500px-Ho_Chi_Minh_1946.jpg',
  'julius-caesar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Retrato_de_Julio_C%C3%A9sar_%2826724093101%29_%28cropped%29.jpg/500px-Retrato_de_Julio_C%C3%A9sar_%2826724093101%29_%28cropped%29.jpg',
  'alexander-the-great': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Alexander_the_Great_mosaic_%28cropped%29.jpg/500px-Alexander_the_Great_mosaic_%28cropped%29.jpg',
  'napoleon': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/500px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg',
  'george-washington': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/500px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg',
  'abraham-lincoln': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/500px-Abraham_Lincoln_O-77_matte_collodion_print.jpg',
  'ataturk': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Atat%C3%BCrk_in_1932.jpg/500px-Atat%C3%BCrk_in_1932.jpg',
  'churchill': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sir_Winston_Churchill_-_1941_%28cropped%29.jpg/500px-Sir_Winston_Churchill_-_1941_%28cropped%29.jpg',
  'cyrus-the-great': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Cyrus_the_Great_%28cropped%29.jpg/500px-Cyrus_the_Great_%28cropped%29.jpg',
  'qin-shi-huang': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Qin_shihuang_c0105347.jpg/500px-Qin_shihuang_c0105347.jpg',
  'ashoka-the-great': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Emperor_Ashoka_world_history.jpg/500px-Emperor_Ashoka_world_history.jpg',
  'mehmed-ii': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Gentile_Bellini_003.jpg/500px-Gentile_Bellini_003.jpg',
  'suleiman-the-magnificent': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Suleiman_the_Magnificent.jpg/500px-Suleiman_the_Magnificent.jpg',
  'saladin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Saladin_Rex_Aegypti.jpg/500px-Saladin_Rex_Aegypti.jpg',
  'babur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Babur_padishah.jpg/500px-Babur_padishah.jpg',
  'jaloliddin-manguberdi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Jalal_ad-Din_Mingburnu.jpg/500px-Jalal_ad-Din_Mingburnu.jpg',
  'charlemagne': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Albrecht_D%C3%BCrer_-_Kaiser_Karl_der_Gro%C3%9Fe_-_Google_Art_Project.jpg/500px-Albrecht_D%C3%BCrer_-_Kaiser_Karl_der_Gro%C3%9Fe_-_Google_Art_Project.jpg',
  'harun-al-rashid': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Harun_al-Rashid_receiving_a_delegation_of_Charlemagne.jpg/500px-Harun_al-Rashid_receiving_a_delegation_of_Charlemagne.jpg',
  'justinian-i': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Meister_von_San_Vitale_in_Ravenna_001_%28cropped%29.jpg/500px-Meister_von_San_Vitale_in_Ravenna_001_%28cropped%29.jpg',
  'richard-the-lionheart': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Richard_I_of_England%2C_from_his_tomb_effigy.jpg/500px-Richard_I_of_England%2C_from_his_tomb_effigy.jpg',
  'ramesses-ii': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/RamessesIIFrance.jpg/500px-RamessesIIFrance.jpg',
  'pericles': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Pericles_Pio-Clementino_Inv269_n2.jpg/500px-Pericles_Pio-Clementino_Inv269_n2.jpg',
  'hammurabi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Stele_of_Hammurabi_head_%28cropped%29.jpg/500px-Stele_of_Hammurabi_head_%28cropped%29.jpg',
  'augustus-caesar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Statue-Augustus.jpg/500px-Statue-Augustus.jpg',
  'xerxes-i': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Xerxes_I_detail_on_his_tomb.jpg/500px-Xerxes_I_detail_on_his_tomb.jpg',
  'charles-de-gaulle': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Charles_de_Gaulle_1942.jpg/500px-Charles_de_Gaulle_1942.jpg',
  'mahatma-gandhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Portrait_Gandhi.jpg/500px-Portrait_Gandhi.jpg',
  'otto-von-bismarck': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Otto_von_Bismarck_1890.jpg/500px-Otto_von_Bismarck_1890.jpg',
  'nelson-mandela': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/500px-Nelson_Mandela_1994.jpg'
};

// Helper to generate Wikimedia fallbacks if an image fails to load
function generateFallbackUrls(originalUrl?: string): string[] {
  if (!originalUrl) return [];
  const resolved = getAssetUrl(originalUrl);
  const urls: string[] = [resolved];

  // Also check if originalUrl matches any known leader key
  const match = originalUrl.match(/\/leaders\/([^\/\.]+)\./);
  if (match && match[1] && WIKI_PORTRAIT_FALLBACKS[match[1]]) {
    urls.push(WIKI_PORTRAIT_FALLBACKS[match[1]]);
  }

  try {
    // If it's a wikimedia commons thumb, extract filename
    if (originalUrl.includes('wikimedia.org') || originalUrl.includes('wikipedia.org')) {
      const m = originalUrl.match(/\/([^\/?#]+?)(?:\/(\d+px-[^\/?#]+))?(?:[?#]|$)/);
      if (m) {
        const possibleName = m[2] ? m[2].replace(/^\d+px-/, '') : m[1];
        if (possibleName && !urls.includes(`https://commons.wikimedia.org/wiki/Special:FilePath/${possibleName}?width=500`)) {
          urls.push(`https://commons.wikimedia.org/wiki/Special:FilePath/${possibleName}?width=500`);
          urls.push(`https://en.wikipedia.org/wiki/Special:FilePath/${possibleName}?width=300`);
        }
      }
    }
  } catch (err) {
    // ignore
  }

  return urls;
}

export const LeaderImage: React.FC<LeaderImageProps> = ({
  src,
  alt,
  leaderName,
  country,
  era,
  themeColor = '#9b1c1c',
  className = 'w-full h-full object-cover',
  roundBadge = false,
}) => {
  const [candidateUrls, setCandidateUrls] = useState<string[]>([]);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  // When src or leader changes, reset candidate chain
  useEffect(() => {
    const list = generateFallbackUrls(src);
    setCandidateUrls(list);
    setCurrentUrlIndex(0);
    setIsLoaded(false);
    setHasFailedAll(list.length === 0);
  }, [src, leaderName]);

  const handleImageError = () => {
    if (currentUrlIndex < candidateUrls.length - 1) {
      // Try next fallback URL (e.g. Special:FilePath)
      setCurrentUrlIndex(prev => prev + 1);
    } else {
      // Exhausted all URL options -> show royal imperial seal medallion
      setHasFailedAll(true);
    }
  };

  // Monogram initials (e.g. "Amir Temur" -> "AT", "Julius Caesar" -> "JC")
  const initials = leaderName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('') || '👑';

  // Get era badge label
  const getEraBadge = () => {
    if (era === 'ancient') return 'MIL. AVVALGI';
    if (era === 'medieval') return "O'RTA ASRLAR";
    return 'YANGI DAVR';
  };

  // If all attempts failed or no src, render majestic royal imperial medallion portrait
  if (hasFailedAll || candidateUrls.length === 0) {
    if (roundBadge) {
      return (
        <div 
          className={`w-full h-full rounded-full flex flex-col items-center justify-center border-2 border-gold-400 shadow-inner select-none ${className}`}
          style={{
            background: `radial-gradient(circle, ${themeColor} 0%, #150305 85%, #050102 100%)`
          }}
          title={leaderName}
        >
          <Crown className="w-3.5 h-3.5 text-gold-400 mb-0.5" />
          <span className="font-serif font-black text-xs text-gold-300 tracking-wider">
            {initials}
          </span>
        </div>
      );
    }

    return (
      <div 
        className={`w-full h-full flex flex-col items-center justify-center p-4 relative select-none overflow-hidden ${className}`}
        style={{
          background: `radial-gradient(circle at 50% 38%, ${themeColor}cc 0%, #1a0406 65%, #080305 100%)`
        }}
      >
        {/* Subtle decorative grid/stars */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

        {/* Outer Golden Wreath & Seal */}
        <div className="relative flex flex-col items-center justify-center text-center z-10 w-full px-2">
          
          {/* Imperial Medallion */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-3 sm:border-4 border-gold-400 bg-obsidian-950/95 shadow-[0_0_30px_rgba(212,175,55,0.45)] flex flex-col items-center justify-center relative mb-3 group-hover:scale-105 transition-transform duration-300">
            {/* Laurel Wreath Ornament ring */}
            <div className="absolute inset-1 rounded-full border border-gold-500/30 border-dashed pointer-events-none" />
            
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-gold-400 mb-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]" />
            <span className="font-serif font-black text-xl sm:text-2xl md:text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-amber-300 to-gold-500">
              {initials}
            </span>

            {/* Era pill badge */}
            <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-crimson-900 border border-gold-400 text-[8px] sm:text-[9px] font-mono font-bold text-gold-200 uppercase tracking-widest shadow-md">
              {getEraBadge()}
            </div>
          </div>

          {/* Leader Title / Name */}
          <h4 className="font-serif font-black text-xs sm:text-sm md:text-base text-gold-300 leading-snug drop-shadow-md px-1 line-clamp-2">
            {leaderName}
          </h4>

          {country && (
            <p className="text-[10px] sm:text-[11px] font-mono text-parchment-300/85 mt-1 line-clamp-1 flex items-center justify-center gap-1">
              <Landmark className="w-3 h-3 text-gold-400/80" />
              {country}
            </p>
          )}

          <div className="mt-2.5 flex items-center gap-1 text-[9px] font-mono text-gold-400/90 bg-black/60 px-2.5 py-0.5 rounded-full border border-gold-500/30 backdrop-blur-sm">
            <Sparkles className="w-2.5 h-2.5 text-gold-400" /> Tarixiy Portret
          </div>
        </div>
      </div>
    );
  }

  const currentSrc = candidateUrls[currentUrlIndex] || src;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-obsidian-950 flex items-center justify-center ${roundBadge ? 'rounded-full' : ''}`}>
      <img
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="sync"
        onLoad={() => setIsLoaded(true)}
        onError={handleImageError}
        className={className}
      />
    </div>
  );
};
