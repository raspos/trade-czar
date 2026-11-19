// storage.mjs - LocalStorage Auto-save & Load Manager with safe namespacing

export const STORAGE_PREFIX = 'trade-czar:';
export const STORAGE_KEY = 'trade-czar:savegame_v1';
const memoryStore = new Map();

function getStorage() {
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  return {
    getItem: (k) => memoryStore.get(k) || null,
    setItem: (k, v) => memoryStore.set(k, String(v)),
    removeItem: (k) => memoryStore.delete(k)
  };
}

export class StorageManager {
  static get storageKey() {
    return STORAGE_KEY;
  }

  static get prefix() {
    return STORAGE_PREFIX;
  }

  static save(gameState) {
    try {
      const serialized = JSON.stringify({
        version: "1.0",
        timestamp: Date.now(),
        data: gameState
      });
      getStorage().setItem(STORAGE_KEY, serialized);
      return true;
    } catch (e) {
      console.error("Failed to save game state:", e);
      return false;
    }
  }

  static load() {
    try {
      const raw = getStorage().getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed.data;
    } catch (e) {
      console.error("Failed to load game state:", e);
      return null;
    }
  }

  static hasSave() {
    return Boolean(getStorage().getItem(STORAGE_KEY));
  }

  // Safe removal of ONLY trade-czar: prefixed keys, never touching other projects
  static clear() {
    try {
      if (typeof localStorage !== 'undefined') {
        const toRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(STORAGE_PREFIX)) {
            toRemove.push(k);
          }
        }
        toRemove.forEach(k => localStorage.removeItem(k));
      } else {
        for (const k of Array.from(memoryStore.keys())) {
          if (k.startsWith(STORAGE_PREFIX)) {
            memoryStore.delete(k);
          }
        }
      }
      return true;
    } catch (e) {
      console.error("Failed to clear trade-czar save state:", e);
      return false;
    }
  }
}
