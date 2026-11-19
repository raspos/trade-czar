// storage.mjs - LocalStorage Auto-save & Load Manager

const STORAGE_KEY = 'trade_czar_savegame_v1';
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

  static clear() {
    try {
      getStorage().removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      console.error("Failed to clear save state:", e);
      return false;
    }
  }
}
