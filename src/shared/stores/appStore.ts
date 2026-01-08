import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  isInitialized: boolean;
  isOffline: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  setInitialized: (value: boolean) => void;
  setOffline: (value: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  initialize: () => Promise<void>;
}

const THEME_KEY = '@app_theme';
const LANGUAGE_KEY = '@app_language';

export const useAppStore = create<AppState>((set, get) => ({
  isInitialized: false,
  isOffline: false,
  theme: 'system',
  language: 'en',

  setInitialized: (value) => set({ isInitialized: value }),

  setOffline: (value) => set({ isOffline: value }),

  setTheme: async (theme) => {
    set({ theme });
    await AsyncStorage.setItem(THEME_KEY, theme);
  },

  setLanguage: async (language) => {
    set({ language });
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  },

  initialize: async () => {
    const theme = (await AsyncStorage.getItem(THEME_KEY)) as 'light' | 'dark' | 'system' | null;
    const language = (await AsyncStorage.getItem(LANGUAGE_KEY)) || 'en';

    set({
      theme: theme || 'system',
      language,
      isInitialized: true,
    });
  },
}));

