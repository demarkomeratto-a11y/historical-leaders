import { SupportedLanguage } from '../types';

class AudioService {
  private synth: SpeechSynthesis | null = null;
  private isSpeaking = false;
  private audioCtx: AudioContext | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;
  private onSpeakingChangeCallbacks: ((speaking: boolean, text: string) => void)[] = [];
  private currentSpokenText = '';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      // Pre-warm voices
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.synth?.getVoices();
        };
      }
    }
  }

  onSpeakingChange(callback: (speaking: boolean, text: string) => void) {
    this.onSpeakingChangeCallbacks.push(callback);
    return () => {
      this.onSpeakingChangeCallbacks = this.onSpeakingChangeCallbacks.filter(c => c !== callback);
    };
  }

  private notifySpeaking(speaking: boolean, text: string) {
    this.isSpeaking = speaking;
    this.currentSpokenText = speaking ? text : '';
    this.onSpeakingChangeCallbacks.forEach(cb => cb(speaking, text));
  }

  // --- TEXT TO SPEECH (10 LANGUAGES WITH INTELLIGENT FALLBACK) ---
  speakText(text: string, lang: SupportedLanguage, onEnd?: () => void): void {
    if (!this.synth) {
      this.playChime(440, 'sine', 0.5);
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel();
      if (this.synth.paused) {
        this.synth.resume();
      }

      // Play soft start chime so user immediately hears audio activity
      this.playChime(660, 'sine', 0.15);

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = this.synth.getVoices();

      // Language code mappings
      const langPrefixMap: Record<SupportedLanguage, string[]> = {
        uz: ['uz', 'tr', 'ru', 'en'], // If Uzbek not found, Turkish sounds very close or Russian/English
        en: ['en'],
        ru: ['ru'],
        zh: ['zh', 'cmn', 'yue'],
        es: ['es'],
        fr: ['fr'],
        ja: ['ja'],
        ar: ['ar'],
        tr: ['tr', 'uz'],
        ko: ['ko'],
      };

      const preferredPrefixes = langPrefixMap[lang] || ['en'];
      let selectedVoice: SpeechSynthesisVoice | null = null;

      // Find the best voice in the browser
      for (const prefix of preferredPrefixes) {
        const found = voices.find(v => v.lang.toLowerCase().startsWith(prefix.toLowerCase()));
        if (found) {
          selectedVoice = found;
          break;
        }
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else if (voices.length > 0) {
        // Fallback to any default voice on the user's OS
        utterance.voice = voices[0];
        utterance.lang = voices[0].lang;
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.notifySpeaking(true, text);
      };

      utterance.onend = () => {
        this.notifySpeaking(false, '');
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis notice:", e);
        this.notifySpeaking(false, '');
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis caught error:", err);
      this.notifySpeaking(false, '');
      if (onEnd) onEnd();
    }
  }

  stopSpeech(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
    }
    this.notifySpeaking(false, '');
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  getCurrentText(): string {
    return this.currentSpokenText;
  }

  // --- AMBIENT HISTORICAL SOUND (WEB AUDIO API) ---
  toggleAmbientSound(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbientSound();
      return false;
    } else {
      this.startAmbientSound();
      return true;
    }
  }

  startAmbientSound(): void {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.ambientGain = this.audioCtx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.05, this.audioCtx.currentTime + 2.5);
      this.ambientGain.connect(this.audioCtx.destination);

      this.ambientOsc1 = this.audioCtx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(110, this.audioCtx.currentTime); // A2 drone

      this.ambientOsc2 = this.audioCtx.createOscillator();
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(164.81, this.audioCtx.currentTime); // E3 fifth

      this.ambientOsc1.connect(this.ambientGain);
      this.ambientOsc2.connect(this.ambientGain);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isAmbientPlaying = true;
    } catch (e) {
      console.warn("Ambient sound error:", e);
      this.isAmbientPlaying = false;
    }
  }

  stopAmbientSound(): void {
    if (this.ambientGain && this.audioCtx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1);
        setTimeout(() => {
          this.ambientOsc1?.stop();
          this.ambientOsc2?.stop();
          this.ambientOsc1?.disconnect();
          this.ambientOsc2?.disconnect();
          this.ambientGain?.disconnect();
          this.isAmbientPlaying = false;
        }, 1100);
      } catch {
        this.isAmbientPlaying = false;
      }
    } else {
      this.isAmbientPlaying = false;
    }
  }

  getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  playClickSound(): void {
    this.playChime(660, 'sine', 0.12);
  }

  // Historical sound chime
  playChime(freq = 528, type: OscillatorType = 'sine', duration = 0.3): void {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = this.audioCtx || new AudioContextClass();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy
    }
  }

  // Battle gong / victory sound
  playGong(): void {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = this.audioCtx || new AudioContextClass();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {}
  }

  playSlideClick(): void {
    this.playChime(587.33, 'sine', 0.2); // D5 chime
  }
}

export const audioService = new AudioService();
