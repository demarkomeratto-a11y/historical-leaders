import React, { useState, useEffect } from 'react';
import { Crown, Sparkles, Shield, Compass, Landmark } from 'lucide-react';

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

// Helper to resolve base-aware path for local images
function resolveLeaderUrl(originalUrl?: string): string {
  if (!originalUrl) return '';
  if (originalUrl.startsWith('/')) {
    const baseUrl = ((import.meta as any).env?.BASE_URL || '/').replace(/\/$/, '');
    return `${baseUrl}${originalUrl}`;
  }
  return originalUrl;
}

// Helper to generate Wikimedia fallbacks if an image fails to load
function generateFallbackUrls(originalUrl?: string): string[] {
  if (!originalUrl) return [];
  const resolved = resolveLeaderUrl(originalUrl);
  const urls: string[] = [resolved];

  try {
    // If it's a wikimedia commons thumb, extract filename
    if (originalUrl.includes('wikimedia.org') || originalUrl.includes('wikipedia.org')) {
      // Extract filename before the last thumb size or path
      const match = originalUrl.match(/\/([^\/?#]+?)(?:\/(\d+px-[^\/?#]+))?(?:[?#]|$)/);
      if (match) {
        // e.g. "Gerasimov_Amir_Timur.jpg"
        const possibleName = match[2] ? match[2].replace(/^\d+px-/, '') : match[1];
        if (possibleName && !urls.includes(`https://commons.wikimedia.org/wiki/Special:FilePath/${possibleName}?width=500`)) {
          urls.push(`https://commons.wikimedia.org/wiki/Special:FilePath/${possibleName}?width=500`);
          urls.push(`https://en.wikipedia.org/wiki/Special:FilePath/${possibleName}?width=300`);
        }
      }
    }
  } catch (err) {
    // ignore regex issues
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
