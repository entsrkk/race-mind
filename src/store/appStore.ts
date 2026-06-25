import { create } from 'zustand'

export type TabId = 'home' | 'fuel' | 'guide';

interface AppState {
  count: number;
  activeTab: TabId;
  increment: () => void;
  decrement: () => void;
  setActiveTab: (tab: TabId) => void;
}

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  activeTab: 'home',
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setActiveTab: (tab) => set(() => ({ activeTab: tab })),
}))
