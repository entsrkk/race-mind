import { create } from 'zustand'
import { CategoryKey } from '../types/guideCategories'

interface GuideState {
  searchQuery: string;
  activeCategory: CategoryKey;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: CategoryKey) => void;
}

export const useGuideStore = create<GuideState>((set) => ({
  searchQuery: '',
  activeCategory: 'all',
  setSearchQuery: (query) => set(() => ({ searchQuery: query })),
  setActiveCategory: (category) => set(() => ({ activeCategory: category })),
}))
