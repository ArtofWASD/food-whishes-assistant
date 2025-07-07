import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { FoodItemProps } from '@/src/api/types/foods'
import { fetchAIRecipe } from '@/src/api/fetchAIRecipe'
import { parseRecipes } from '@/src/handlers/parseRecipes'

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
  aiResult: string
  aiLoading: boolean
  aiError: string
  parsedRecipes: ReturnType<typeof parseRecipes>
  fetchAIRecipeToStore: () => Promise<void>
}

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    fridgeItems: [],
    cookPlateItems: [],
    isDragging: false,
    viewMode: 'list',
    showResults: false,
    minCalories: false,
    onlyVegetables: false,
    bestMacros: false,
    aiResult: '',
    aiLoading: false,
    aiError: '',
    parsedRecipes: [],
    setFridgeItems: (items) => set({ fridgeItems: items }, false, 'setFridgeItems'),
    setCookPlateItems: (items) => set({ cookPlateItems: items }, false, 'setCookPlateItems'),
    setIsDragging: (drag) => set({ isDragging: drag }, false, 'setIsDragging'),
    setViewMode: (mode) => set({ viewMode: mode }, false, 'setViewMode'),
    setShowResults: (show) => set({ showResults: show }, false, 'setShowResults'),
    setMinCalories: (v) => set({ minCalories: v }, false, 'setMinCalories'),
    setOnlyVegetables: (v) => set({ onlyVegetables: v }, false, 'setOnlyVegetables'),
    setBestMacros: (v) => set({ bestMacros: v }, false, 'setBestMacros'),
    fetchAIRecipeToStore: async () => {
      console.log('[fetchAIRecipeToStore] start')
      set({ aiLoading: true, aiError: '', aiResult: '', parsedRecipes: [] }, false, 'fetchAIRecipeToStore_start')
      try {
        const text = await fetchAIRecipe()
        console.log('[fetchAIRecipeToStore] result:', text)
        set({ aiResult: text, parsedRecipes: parseRecipes(text) }, false, 'fetchAIRecipeToStore_success')
      } catch (e: unknown) {
        let message = 'Ошибка запроса к нейросети'
        if (e && typeof e === 'object' && 'message' in e && typeof (e as { message?: unknown }).message === 'string') {
          message = (e as { message: string }).message
        }
        console.log('[fetchAIRecipeToStore] error:', e)
        set({ aiError: message, parsedRecipes: [] }, false, 'fetchAIRecipeToStore_error')
      } finally {
        console.log('[fetchAIRecipeToStore] end')
        set({ aiLoading: false }, false, 'fetchAIRecipeToStore_end')
      }
    },
  }), { name: 'AppStore' })
) 