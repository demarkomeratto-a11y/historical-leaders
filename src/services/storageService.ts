import { HistoricalLeader, SupportedLanguage } from '../types';

const STORAGE_KEYS = {
  CUSTOM_LEADERS: 'history_custom_leaders',
  BOOKMARKS: 'history_bookmarks',
  LANG: 'history_preferred_lang',
};

export const storageService = {
  getCustomLeaders(): HistoricalLeader[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_LEADERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveCustomLeader(leader: HistoricalLeader): void {
    try {
      const existing = this.getCustomLeaders();
      const updated = [leader, ...existing.filter(l => l.id !== leader.id)];
      localStorage.setItem(STORAGE_KEYS.CUSTOM_LEADERS, JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  },

  deleteCustomLeader(id: string): void {
    try {
      const existing = this.getCustomLeaders();
      const updated = existing.filter(l => l.id !== id);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_LEADERS, JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage delete error:", e);
    }
  },

  getSavedLanguage(): SupportedLanguage | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.LANG) as SupportedLanguage | null;
    } catch {
      return null;
    }
  },

  saveLanguage(lang: SupportedLanguage): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
    } catch {}
  },

  getBookmarks(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleBookmark(leaderId: string): boolean {
    try {
      const bookmarks = this.getBookmarks();
      const index = bookmarks.indexOf(leaderId);
      let isBookmarked = false;
      if (index >= 0) {
        bookmarks.splice(index, 1);
      } else {
        bookmarks.push(leaderId);
        isBookmarked = true;
      }
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      return isBookmarked;
    } catch {
      return false;
    }
  }
};
