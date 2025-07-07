import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { FoodItemProps } from '@/src/api/types/foods'
import { fetchAIRecipe } from '@/src/api/fetchAIRecipe'

export function parseRecipes(text: string): Array<{
  name: string | null,
  description: string | null,
  bju: string | null,
  ingredients: string | null,
  instruction: string | null,
  full: string
}> {
  const parts = text.split(/===РЕЦЕПТ===/).map(s => s.trim()).filter(Boolean)
  return parts.map(part => {
    // Найти все маркеры и их позиции
    const markerRegex = /===([A-ZА-ЯЁ\s]+?)===/gim
    const fields: Record<string, string> = {}
    const markers: { key: string, index: number }[] = []
    let match
    while ((match = markerRegex.exec(part)) !== null) {
      markers.push({ key: match[1].trim().toUpperCase(), index: match.index })
    }
    // Для каждого маркера взять содержимое до следующего маркера
    for (let i = 0; i < markers.length; i++) {
      const key = markers[i].key
      const start = markers[i].index + part.slice(markers[i].index).indexOf('===') + (`===${key}===`).length
      const end = i + 1 < markers.length ? markers[i + 1].index : part.length
      const value = part.slice(start, end).trim()
      fields[key] = value
    }
    return {
      name: fields['НАЗВАНИЕ РЕЦЕПТА'] || '',
      description: fields['ОПИСАНИЕ'] || '',
      bju: fields['БЖУ'] || '',
      ingredients: fields['ИНГРЕДИЕНТЫ'] || '',
      instruction: fields['ИНСТРУКЦИЯ'] || '',
      full: part.trim()
    }
  })
}

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
  devtools((set, get) => ({
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
      } catch (e: any) {
        console.log('[fetchAIRecipeToStore] error:', e)
        set({ aiError: e?.message || 'Ошибка запроса к нейросети', parsedRecipes: [] }, false, 'fetchAIRecipeToStore_error')
      } finally {
        console.log('[fetchAIRecipeToStore] end')
        set({ aiLoading: false }, false, 'fetchAIRecipeToStore_end')
      }
    },
  }), { name: 'AppStore' })
) 