import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  hasOnboarded: boolean;
  notificationsEnabled: boolean;
  setHasOnboarded: (value: boolean) => void;
  setNotificationsEnabled: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      notificationsEnabled: true,
      setHasOnboarded: (value) => set({ hasOnboarded: value }),
      setNotificationsEnabled: (value) => set({ notificationsEnabled: value }),
    }),
    {
      name: 'fire-and-stone-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
