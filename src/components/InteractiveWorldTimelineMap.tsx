import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Globe as GlobeIcon, 
  Play, 
  Pause, 
  RotateCcw, 
  Compass, 
  Calendar, 
  ChevronRight, 
  Sparkles,
  ZoomIn,
  ZoomOut,
  Landmark,
  Crown,
  Coins,
  Users,
  Layers,
  Scale
} from 'lucide-react';
import { HistoricalLeader, SupportedLanguage, HistoricalEra } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { LEADER_GEO_REGISTRY, LeaderGeoMeta } from '../data/leaderGeoData';
import { getLeaderImperialStats } from '../data/leaderImperialStats';
import { getAssetUrl } from '../utils/assetUrl';
import { LeaderImage } from './LeaderImage';

interface InteractiveWorldTimelineMapProps {
  leaders: HistoricalLeader[];
  activeLeader: HistoricalLeader;
  currentLang: SupportedLanguage;
  onSelectLeader: (leader: HistoricalLeader) => void;
  onOpenLeaderPresentation?: (leader: HistoricalLeader) => void;
  onOpenLeaderDossier?: (leader: HistoricalLeader) => void;
}

// 3D Cartesian Coordinate
interface Point3D {
  x: number;
  y: number;
  z: number;
}

function latLngToUnit3D(lat: number, lng: number): Point3D {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return {
    x: -Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta)
  };
}

function rotateVec3(p: Point3D, rotX: number, rotY: number): Point3D {
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;

  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y2 = p.y * cosX - z1 * sinX;
  const z2 = p.y * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
}

// Great Silk Road Waypoints
const HISTORICAL_SILK_ROAD_ARCS: [number, number][] = [
  [34.26, 108.94], // Chang'an
  [40.14, 94.66],  // Dunhuang
  [41.72, 82.96],  // Kucha
  [39.47, 75.99],  // Kashgar
  [39.65, 66.96],  // Samarkand
  [37.60, 62.19],  // Merv
  [35.68, 51.42],  // Tehran
  [33.31, 44.36],  // Baghdad
  [36.20, 36.15],  // Antioch
  [41.01, 28.97],  // Constantinople
  [41.90, 12.49],  // Rome
];

export const InteractiveWorldTimelineMap: React.FC<InteractiveWorldTimelineMapProps> = ({
  leaders,
  activeLeader,
  currentLang,
  onSelectLeader,
  onOpenLeaderPresentation,
  onOpenLeaderDossier
}) => {
  const [selectedEra, setSelectedEra] = useState<HistoricalEra | 'all'>('all');
  const [timelineYear, setTimelineYear] = useState<number>(() => {
    const geo = LEADER_GEO_REGISTRY[activeLeader.id];
    return geo ? geo.reignStartYear : 1206;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1);
  const [globeZoom, setGlobeZoom] = useState<number>(1.0);
  const [hoveredLeaderId, setHoveredLeaderId] = useState<string | null>(null);

  // Canvas & WebGL References
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const sphereBuffersRef = useRef<{
    position: WebGLBuffer | null;
    uv: WebGLBuffer | null;
    index: WebGLBuffer | null;
    indexCount: number;
  } | null>(null);

  // Rotation & Smooth Interpolation
  const rotationRef = useRef({ x: 0.35, y: -2.1 });
  const targetRotationRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  // Projected 2D Overlay Pins
  const [projectedPins, setProjectedPins] = useState<{
    leader: HistoricalLeader;
    geo: LeaderGeoMeta;
    screenX: number;
    screenY: number;
    scale: number;
    isVisible: boolean;
  }[]>([]);

  // Imperial stats for active leader
  const activeStats = useMemo(() => {
    return getLeaderImperialStats(activeLeader);
  }, [activeLeader]);

  // Combine leaders with coordinates
  const leadersWithGeo = useMemo(() => {
    return leaders.map(l => {
      const geo = LEADER_GEO_REGISTRY[l.id] || {
        lat: 35,
        lng: 50,
        reignStartYear: l.era === 'ancient' ? -300 : l.era === 'medieval' ? 1200 : 1900,
        reignEndYear: l.era === 'ancient' ? -250 : l.era === 'medieval' ? 1240 : 1950,
        capital: l.country,
        territoryName: l.country
      };
      return { leader: l, geo };
    });
  }, [leaders]);

  // Filter leaders by era
  const visibleLeaders = useMemo(() => {
    return leadersWithGeo.filter(({ leader }) => {
      if (selectedEra !== 'all' && leader.era !== selectedEra) return false;
      return true;
    });
  }, [leadersWithGeo, selectedEra]);

  // Center camera smoothly when active leader changes
  useEffect(() => {
    if (!activeLeader) return;
    const geo = LEADER_GEO_REGISTRY[activeLeader.id];
    if (geo) {
      const targetY = -((geo.lng + 180) * Math.PI) / 180 - Math.PI / 2;
      const targetX = (geo.lat * Math.PI) / 180 * 0.55;
      targetRotationRef.current = { x: targetX, y: targetY };
    }
  }, [activeLeader.id]);

  // -------------------------------------------------------------
  // INITIALIZE HARDWARE WEBGL 3D SPHERE PIPELINE
  // -------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true }) || 
               (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) {
      console.warn("WebGL not supported; falling back to Canvas 2D");
      return;
    }
    glRef.current = gl;

    // 1. Compile Shaders
    const vsSource = `
      attribute vec3 aPosition;
      attribute vec2 aTexCoord;

      uniform mat4 uMatrix;

      varying vec2 vTexCoord;
      varying vec3 vNormal;

      void main() {
        vTexCoord = aTexCoord;
        vNormal = aPosition;
        gl_Position = uMatrix * vec4(aPosition, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;

      varying vec2 vTexCoord;
      varying vec3 vNormal;

      uniform sampler2D uSampler;
      uniform vec3 uSunDir;

      void main() {
        vec4 texColor = texture2D(uSampler, vTexCoord);
        vec3 norm = normalize(vNormal);
        vec3 sun = normalize(uSunDir);

        float diff = max(dot(norm, sun), 0.0);
        float ambient = 0.38;

        // Golden Fresnel rim glow along edges
        float rim = 1.0 - max(dot(norm, vec3(0.0, 0.0, 1.0)), 0.0);
        vec3 atmoCorona = vec3(0.95, 0.75, 0.25) * pow(rim, 3.2) * 0.75;

        vec3 finalRgb = texColor.rgb * (ambient + diff * 0.75) + atmoCorona;
        gl_FragColor = vec4(finalRgb, 1.0);
      }
    `;

    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program;

    // 2. Generate 3D UV Sphere Geometry (48 latBands x 48 lngBands)
    const latBands = 48;
    const lngBands = 48;
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let lat = 0; lat <= latBands; lat++) {
      const theta = (lat * Math.PI) / latBands;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);

      for (let lon = 0; lon <= lngBands; lon++) {
        const phi = (lon * 2 * Math.PI) / lngBands;
        const sinP = Math.sin(phi);
        const cosP = Math.cos(phi);

        positions.push(cosP * sinT, cosT, sinP * sinT);
        uvs.push(1 - lon / lngBands, lat / latBands);
      }
    }

    for (let lat = 0; lat < latBands; lat++) {
      for (let lon = 0; lon < lngBands; lon++) {
        const first = lat * (lngBands + 1) + lon;
        const second = first + lngBands + 1;
        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    sphereBuffersRef.current = {
      position: posBuffer,
      uv: uvBuffer,
      index: indexBuffer,
      indexCount: indices.length
    };

    // 3. Load Real High-Resolution Texture
    const texture = gl.createTexture();
    textureRef.current = texture;
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Initial 1x1 placeholder pixel while image loads
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0,
      gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([12, 35, 65, 255])
    );

    const img = new Image();
    img.src = getAssetUrl('/earth-texture.jpg');
    img.onload = () => {
      if (!glRef.current || !textureRef.current) return;
      const g = glRef.current;
      g.bindTexture(g.TEXTURE_2D, textureRef.current);
      g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, false);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, img);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.REPEAT);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
    };

    return () => {
      if (glRef.current && textureRef.current) {
        glRef.current.deleteTexture(textureRef.current);
      }
    };
  }, []);

  // -------------------------------------------------------------
  // ANIMATION & RENDER FRAME LOOP
  // -------------------------------------------------------------
  useEffect(() => {
    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const canvas = canvasRef.current;
      const gl = glRef.current;
      const prog = programRef.current;
      const bufs = sphereBuffersRef.current;

      if (!canvas) return;

      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = rect?.width || 800;
      const h = rect?.height || 560;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }

      // Smooth camera interpolation towards active leader
      if (targetRotationRef.current) {
        const dx = targetRotationRef.current.x - rotationRef.current.x;
        let dy = targetRotationRef.current.y - rotationRef.current.y;

        while (dy > Math.PI) dy -= Math.PI * 2;
        while (dy < -Math.PI) dy += Math.PI * 2;

        rotationRef.current.x += dx * 0.08;
        rotationRef.current.y += dy * 0.08;

        if (Math.abs(dx) < 0.002 && Math.abs(dy) < 0.002) {
          targetRotationRef.current = null;
        }
      } else if (!isDraggingRef.current) {
        // Gentle orbital rotation
        rotationRef.current.y += 0.0016;
      }

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      // 1. WebGL Textured Sphere Render
      if (gl && prog && bufs) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0.02, 0.01, 0.03, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(prog);

        // Aspect ratio scaling
        const aspect = canvas.width / canvas.height;
        const scale = 0.82 * globeZoom;
        const sx = scale / Math.max(1, aspect);
        const sy = scale * Math.max(1, 1 / aspect);

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);

        // 4x4 Orthographic Projection with Rotation (Y then X)
        const matrix = new Float32Array([
          cosY * sx,         sinX * sinY * sy,        cosX * sinY,        0,
          0,                 cosX * sy,               -sinX,              0,
          -sinY * sx,        sinX * cosY * sy,        cosX * cosY,        0,
          0,                 0,                       0,                  1
        ]);

        const uMatrixLoc = gl.getUniformLocation(prog, "uMatrix");
        gl.uniformMatrix4fv(uMatrixLoc, false, matrix);

        const uSunDirLoc = gl.getUniformLocation(prog, "uSunDir");
        gl.uniform3f(uSunDirLoc, -0.45, 0.55, 0.7);

        // Attributes
        const aPosLoc = gl.getAttribLocation(prog, "aPosition");
        gl.bindBuffer(gl.ARRAY_BUFFER, bufs.position);
        gl.enableVertexAttribArray(aPosLoc);
        gl.vertexAttribPointer(aPosLoc, 3, gl.FLOAT, false, 0, 0);

        const aTexLoc = gl.getAttribLocation(prog, "aTexCoord");
        gl.bindBuffer(gl.ARRAY_BUFFER, bufs.uv);
        gl.enableVertexAttribArray(aTexLoc);
        gl.vertexAttribPointer(aTexLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufs.index);

        if (textureRef.current) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
          const uSampLoc = gl.getUniformLocation(prog, "uSampler");
          gl.uniform1i(uSampLoc, 0);
        }

        gl.drawElements(gl.TRIANGLES, bufs.indexCount, gl.UNSIGNED_SHORT, 0);
      }

      // 2. Calculate Screen Coordinates for Leader Overlay Pins
      const cx = w / 2;
      const cy = h / 2;
      const radiusPx = (Math.min(w, h) * 0.41) * globeZoom;

      const newPins = visibleLeaders.map(({ leader, geo }) => {
        const u3 = latLngToUnit3D(geo.lat, geo.lng);
        const rot = rotateVec3(u3, rotX, rotY);

        // Visible only if on the facing hemisphere of the globe
        const isVisible = rot.z > -0.12;
        const sx = cx + rot.x * radiusPx;
        const sy = cy - rot.y * radiusPx;
        const scale = Math.max(0.75, Math.min(1.15, 0.85 + rot.z * 0.3));

        return {
          leader,
          geo,
          screenX: sx,
          screenY: sy,
          scale,
          isVisible
        };
      });

      setProjectedPins(newPins);

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse & Touch Drag Controls
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      targetRotationRef.current = null;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;

      rotationRef.current.y += deltaX * 0.007;
      rotationRef.current.x += deltaY * 0.007;
      rotationRef.current.x = Math.max(-0.85, Math.min(0.85, rotationRef.current.x));

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setGlobeZoom(z => Math.max(0.7, Math.min(1.6, z - e.deltaY * 0.001)));
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [visibleLeaders, activeLeader.id, globeZoom]);

  // Timeline progression timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimelineYear(prev => {
        const step = playSpeed === 1 ? 15 : playSpeed === 2 ? 35 : 75;
        let next = prev + step;
        if (next > 2026) next = -1500;
        return next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [isPlaying, playSpeed]);

  const handleTimelineYearChange = (year: number) => {
    setTimelineYear(year);
    const matching = leadersWithGeo.find(({ geo }) => year >= geo.reignStartYear && year <= geo.reignEndYear);
    if (matching && matching.leader.id !== activeLeader.id) {
      onSelectLeader(matching.leader);
    }
  };

  const formatYearLabel = (year: number) => {
    if (year < 0) {
      return `${Math.abs(year)} ${currentLang === 'uz' ? 'm.avv.' : currentLang === 'ru' ? 'до н.э.' : 'BCE'}`;
    }
    return `${year} ${currentLang === 'uz' ? 'yil' : currentLang === 'ru' ? 'н.э.' : 'CE'}`;
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-2 border-gold-500/50 bg-gradient-to-b from-[#180a18] via-[#09030a] to-[#040105] shadow-[0_20px_70px_rgba(0,0,0,0.95)]">
      
      {/* 1. TOP HEADER & GLOBE CONTROLS */}
      <div className="px-4 sm:px-6 py-4 bg-obsidian-950/90 border-b border-gold-500/30 flex flex-wrap items-center justify-between gap-3">
        
        {/* Title & Mode */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-crimson-600/30 border border-gold-400 flex items-center justify-center shadow-lg">
            <GlobeIcon className="w-5 h-5 text-gold-300 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-400">
                3D Real Dunyo Globusi
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h3 className="font-serif font-black text-lg sm:text-xl text-gold-200">
              Interaktiv Tarixiy Globus
            </h3>
          </div>
        </div>

        {/* Quick Era Filter Pills */}
        <div className="flex items-center gap-1.5 bg-obsidian-900/90 p-1 rounded-xl border border-gold-500/30 overflow-x-auto text-xs">
          {(['all', 'ancient', 'medieval', 'modern'] as const).map(era => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-3 py-1.5 rounded-lg font-mono font-bold transition-all whitespace-nowrap ${
                selectedEra === era
                  ? 'bg-gradient-to-r from-amber-600 to-crimson-700 text-white shadow'
                  : 'text-parchment-400 hover:text-white'
              }`}
            >
              {era === 'all' ? "Barcha Davrlar" : era === 'ancient' ? "Qadimgi Dunyo" : era === 'medieval' ? "O'rta Asrlar" : "Yangi Davr"}
            </button>
          ))}
        </div>

      </div>

      {/* 2. 3D GLOBE INTERACTIVE STAGE */}
      <div className="relative w-full h-[540px] sm:h-[600px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing bg-black select-none">
        
        {/* Cosmic Corona Gradient in Space */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* 3D Hardware Accelerated WebGL Canvas */}
        <canvas 
          ref={canvasRef} 
          className="block w-full h-full relative z-10"
        />

        {/* 3D Screen-Projected HTML Leader Markers */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {projectedPins.map(({ leader, geo, screenX, screenY, scale, isVisible }) => {
            if (!isVisible) return null;

            const isActive = leader.id === activeLeader.id;
            const isHovered = hoveredLeaderId === leader.id;
            const isTimelineActive = timelineYear >= geo.reignStartYear && timelineYear <= geo.reignEndYear;

            return (
              <div
                key={leader.id}
                style={{
                  left: `${screenX}px`,
                  top: `${screenY}px`,
                  transform: `translate(-50%, -50%) scale(${scale * (isActive ? 1.25 : 1)})`,
                }}
                className="absolute pointer-events-auto transition-transform duration-200"
              >
                {/* Active Leader Pulsing Golden Ripple */}
                {isActive && (
                  <div className="absolute -inset-4 rounded-full border-2 border-gold-300 bg-gold-400/25 animate-ping pointer-events-none" />
                )}

                {/* Marker Button */}
                <button
                  onClick={() => onSelectLeader(leader)}
                  onMouseEnter={() => setHoveredLeaderId(leader.id)}
                  onMouseLeave={() => setHoveredLeaderId(null)}
                  className={`group relative flex flex-col items-center focus:outline-none ${
                    isActive ? 'z-40' : isHovered ? 'z-30' : 'z-20'
                  }`}
                  title={`${leader.name[currentLang]} (${leader.reignYears})`}
                >
                  {/* Circular Real Portrait Frame */}
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 shadow-2xl bg-black relative transition-all ${
                    isActive 
                      ? 'border-gold-300 ring-2 ring-gold-400 ring-offset-2 ring-offset-black' 
                      : 'border-gold-500/80 hover:border-gold-300'
                  }`}>
                    <LeaderImage 
                      src={leader.portraitUrl} 
                      alt={leader.name[currentLang]}
                      leaderName={leader.name[currentLang]}
                      country={leader.country[currentLang]}
                      era={leader.era}
                      themeColor={leader.themeColor}
                      roundBadge={true}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Reign Years / Localized Name Badge */}
                  <div className={`mt-1 whitespace-nowrap px-1.5 py-0.5 rounded text-[9px] font-mono font-bold shadow-md transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-600 via-crimson-700 to-amber-600 text-white border border-gold-400' 
                      : isTimelineActive 
                        ? 'bg-gold-500 text-black border border-gold-300 font-extrabold' 
                        : 'bg-obsidian-950/95 text-gold-300 border border-gold-500/40 group-hover:border-gold-300'
                  }`}>
                    {leader.name[currentLang]}
                  </div>
                </button>

                {/* Rich Hover Popup Card */}
                {(isHovered && !isActive) && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full w-56 p-3 rounded-xl bg-obsidian-950/95 border border-gold-400 text-parchment-100 shadow-2xl backdrop-blur-md pointer-events-auto z-50 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-gold-400 shrink-0 bg-black">
                        <LeaderImage 
                          src={leader.portraitUrl} 
                          alt={leader.name[currentLang]} 
                          leaderName={leader.name[currentLang]}
                          era={leader.era}
                          className="w-full h-full object-cover object-top" 
                        />
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-serif font-black text-xs text-gold-200 truncate">{leader.name[currentLang]}</h5>
                        <p className="text-[9px] font-mono text-parchment-400">{leader.country[currentLang]}</p>
                        <p className="text-[9px] font-mono text-gold-400 font-bold">{leader.reignYears}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Active Leader Stats Panel (Top Right) */}
        <div className="absolute top-4 right-4 z-30 max-w-xs p-4 rounded-2xl bg-obsidian-950/95 border-2 border-gold-500/60 backdrop-blur-xl shadow-2xl hidden md:block select-none">
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-gold-400 shrink-0 bg-black shadow-lg">
              <LeaderImage 
                src={activeLeader.portraitUrl} 
                alt={activeLeader.name[currentLang]} 
                leaderName={activeLeader.name[currentLang]}
                era={activeLeader.era}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-mono font-bold text-gold-400 uppercase tracking-widest block">
                {activeLeader.country[currentLang]}
              </span>
              <h4 className="font-serif font-black text-base text-gold-200 truncate">
                {activeLeader.name[currentLang]}
              </h4>
              <p className="text-[10px] font-mono text-parchment-300 mt-0.5">
                {activeLeader.reignYears}
              </p>
            </div>
          </div>

          {/* Key Imperial Stats */}
          <div className="mt-3 pt-2.5 border-t border-gold-500/30 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-xl bg-obsidian-900 border border-gold-500/20">
                <span className="text-[9px] font-mono text-parchment-400 uppercase block">Davlat Hududi</span>
                <span className="font-mono font-black text-gold-300 text-xs block truncate">{activeStats.territoryArea}</span>
              </div>
              <div className="p-2 rounded-xl bg-obsidian-900 border border-gold-500/20">
                <span className="text-[9px] font-mono text-parchment-400 uppercase block">Aholi Soni</span>
                <span className="font-bold text-parchment-200 text-xs block truncate">{activeStats.population[currentLang]}</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-obsidian-900 border border-amber-500/20">
              <span className="text-[9px] font-mono text-gold-400 uppercase block">Davlat Boyligi & Xazinasi</span>
              <p className="text-[10px] text-parchment-200 line-clamp-2 mt-0.5">{activeStats.stateWealth[currentLang]}</p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-gold-500/30 flex flex-col gap-2">
            {onOpenLeaderDossier && (
              <button
                onClick={() => onOpenLeaderDossier(activeLeader)}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-600 via-crimson-700 to-amber-600 hover:from-amber-500 hover:to-crimson-600 text-white font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                <span>To'liq Tarixiy Dossier</span>
              </button>
            )}

            {onOpenLeaderPresentation && (
              <button
                onClick={() => onOpenLeaderPresentation(activeLeader)}
                className="w-full py-1.5 rounded-xl bg-obsidian-900 border border-gold-500/40 hover:bg-gold-500 hover:text-black text-gold-300 font-serif font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
              >
                <span>🎬 Taqdimotini Ko'rish</span>
              </button>
            )}
          </div>
        </div>

        {/* 3D Zoom Controls */}
        <div className="absolute bottom-6 right-4 z-30 flex flex-col gap-1.5">
          <button 
            onClick={() => setGlobeZoom(z => Math.min(1.6, z + 0.15))}
            className="p-2.5 rounded-xl bg-obsidian-900/90 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-black transition-colors shadow-lg"
            title="Kattalashtirish"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setGlobeZoom(z => Math.max(0.7, z - 0.15))}
            className="p-2.5 rounded-xl bg-obsidian-900/90 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-black transition-colors shadow-lg"
            title="Kichiklashtirish"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Orbit Helper Instruction */}
        <div className="absolute bottom-4 left-4 z-30 px-3 py-1.5 rounded-xl bg-obsidian-950/80 border border-gold-500/30 text-[11px] font-mono text-parchment-300 pointer-events-none hidden sm:flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
          <span>Sichqoncha bilan globusni istalgan tomonga aylantiring</span>
        </div>

      </div>

      {/* 3. INTERACTIVE TIMELINE SCRUBBER */}
      <div className="p-4 sm:p-5 bg-obsidian-950/95 border-t border-gold-500/30 select-none">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-xl bg-gold-400 hover:bg-gold-300 text-obsidian-950 flex items-center justify-center shadow-lg font-bold transition-transform active:scale-95"
              title={isPlaying ? "To'xtatish" : "Tarixiy vaqtni yurgizish"}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => setTimelineYear(-1200)}
              className="p-2.5 rounded-xl bg-obsidian-900 border border-gold-500/30 text-parchment-300 hover:text-gold-300 transition-colors"
              title="Qayta boshlash"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-mono text-parchment-400 uppercase block">Tanlangan Davr:</span>
              <span className="font-serif font-black text-lg sm:text-xl text-gold-300 font-mono">
                {formatYearLabel(timelineYear)}
              </span>
            </div>
          </div>

          {/* Speed selector */}
          <div className="flex items-center gap-1.5 bg-obsidian-900 p-1 rounded-xl border border-white/10 text-xs">
            <span className="text-[10px] font-mono text-parchment-400 px-1.5">Tezlik:</span>
            {[1, 2, 5].map(spd => (
              <button
                key={spd}
                onClick={() => setPlaySpeed(spd)}
                className={`px-2 py-0.5 rounded font-mono font-bold ${
                  playSpeed === spd ? 'bg-gold-400 text-obsidian-950' : 'text-parchment-300 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

        </div>

        {/* Interactive Scrub Slider */}
        <div className="relative">
          <input
            type="range"
            min="-1800"
            max="2026"
            step="10"
            value={timelineYear}
            onChange={(e) => handleTimelineYearChange(Number(e.target.value))}
            className="w-full h-2 bg-obsidian-900 rounded-lg appearance-none cursor-pointer accent-gold-400 focus:outline-none"
          />

          {/* Milestone Labels */}
          <div className="flex justify-between text-[10px] font-mono text-parchment-400/80 mt-1.5">
            <span>-1800 BCE</span>
            <span>-500 (Fors & Yunon)</span>
            <span>0 (Rim Imperiyasi)</span>
            <span>1206 (Chingizxon)</span>
            <span>1370 (Temuriylar)</span>
            <span>2026 CE</span>
          </div>
        </div>

      </div>

    </div>
  );
};
