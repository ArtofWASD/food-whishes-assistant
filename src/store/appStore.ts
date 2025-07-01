import { create } from 'zustand'
import { FoodItemProps } from '@/src/api/types/Foods'

interface AppState {
  fridgeItems: FoodItemProps[]
  cookPlateItems: FoodItemProps[]
  isDragging: boolean
  viewMode: string
  showResults: boolean
  minCalories: boolean
  onlyVegetables: boolean
  bestMacros: boolean
  setFridgeItems: (items: FoodItemProps[]) => void
  setCookPlateItems: (items: FoodItemProps[]) => void
  setIsDragging: (drag: boolean) => void
  setViewMode: (mode: string) => void
  setShowResults: (show: boolean) => void
  setMinCalories: (v: boolean) => void
  setOnlyVegetables: (v: boolean) => void
  setBestMacros: (v: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  fridgeItems: [],
  cookPlateItems: [],
  isDragging: false,
  viewMode: 'list',
  showResults: false,
  minCalories: false,
  onlyVegetables: false,
  bestMacros: false,
  setFridgeItems: (items) => set({ fridgeItems: items }),
  setCookPlateItems: (items) => set({ cookPlateItems: items }),
  setIsDragging: (drag) => set({ isDragging: drag }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setShowResults: (show) => set({ showResults: show }),
  setMinCalories: (v) => set({ minCalories: v }),
  setOnlyVegetables: (v) => set({ onlyVegetables: v }),
  setBestMacros: (v) => set({ bestMacros: v }),
})) 