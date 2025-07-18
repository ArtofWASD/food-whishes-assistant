// Zustand store для управления состоянием приложения (продукты, режимы, результаты AI и т.д.)
// TODO: Добавить тесты для логики состояния и асинхронных экшенов
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { FoodItemProps } from '@/src/api/types/foods'
import { fetchAIRecipe } from '@/src/api/fetchAIRecipe'
import { parseRecipes } from '@/src/handlers/parseRecipes'

interface AppState {
  cookPlateItems: FoodItemProps[]
  showResults: boolean
  minCalories: boolean
  onlyVegetables: boolean
  bestMacros: boolean
  setCookPlateItems: (items: FoodItemProps[]) => void
  setShowResults: (show: boolean) => void
  setMinCalories: (v: boolean) => void
  setOnlyVegetables: (v: boolean) => void
  setBestMacros: (v: boolean) => void
  aiResult: string
  aiLoading: boolean
  aiError: string
  parsedRecipes: ReturnType<typeof parseRecipes>
  fetchAIRecipeToStore: () => Promise<void>
  resetRecipes: () => void
  favoriteRecipes: ReturnType<typeof parseRecipes>
  addFavoriteRecipe: (recipe: ReturnType<typeof parseRecipes>[0]) => void
  removeFavoriteRecipe: (recipe: ReturnType<typeof parseRecipes>[0]) => void
  selectedMeal: 'breakfast' | 'lunch' | 'dinner' | null
  setSelectedMeal: (meal: 'breakfast' | 'lunch' | 'dinner' | null) => void
  favoriteProducts: FoodItemProps[]
  addFavoriteProduct: (product: FoodItemProps) => void
  removeFavoriteProduct: (product: FoodItemProps) => void
}

export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    cookPlateItems: [],
    showResults: false,
    minCalories: false,
    onlyVegetables: false,
    bestMacros: false,
    aiResult: '',
    aiLoading: false,
    aiError: '',
    parsedRecipes: [],
    favoriteRecipes: [],
    selectedMeal: null,
    favoriteProducts: [],
    setCookPlateItems: (items) => set({ cookPlateItems: items }, false, 'setCookPlateItems'),
    setShowResults: (show) => set({ showResults: show }, false, 'setShowResults'),
    setMinCalories: (v) => set({ minCalories: v }, false, 'setMinCalories'),
    setOnlyVegetables: (v) => set({ onlyVegetables: v }, false, 'setOnlyVegetables'),
    setBestMacros: (v) => set({ bestMacros: v }, false, 'setBestMacros'),
    fetchAIRecipeToStore: async () => {
      set({ aiLoading: true, aiError: '', aiResult: '', parsedRecipes: [] }, false, 'fetchAIRecipeToStore_start')
      try {
        const text = await fetchAIRecipe()
        set({ aiResult: text, parsedRecipes: parseRecipes(text) }, false, 'fetchAIRecipeToStore_success')
      } catch (e: unknown) {
        let message = 'Ошибка запроса к нейросети'
        if (e && typeof e === 'object' && 'message' in e && typeof (e as { message?: unknown }).message === 'string') {
          message = (e as { message: string }).message
        }
        set({ aiError: message, parsedRecipes: [] }, false, 'fetchAIRecipeToStore_error')
      } finally {
        set({ aiLoading: false }, false, 'fetchAIRecipeToStore_end')
      }
    },
    // Новый метод для сброса рецептов
    resetRecipes: () => set({ aiResult: '', parsedRecipes: [] }, false, 'resetRecipes'),
    addFavoriteRecipe: (recipe) => {
      const exists = get().favoriteRecipes.some(r => r.full === recipe.full)
      if (!exists) set({ favoriteRecipes: [...get().favoriteRecipes, recipe] }, false, 'addFavoriteRecipe')
    },
    removeFavoriteRecipe: (recipe) => {
      set({ favoriteRecipes: get().favoriteRecipes.filter(r => r.full !== recipe.full) }, false, 'removeFavoriteRecipe')
    },
    setSelectedMeal: (meal) => set({ selectedMeal: meal }, false, 'setSelectedMeal'),
    addFavoriteProduct: (product) => {
      const exists = get().favoriteProducts.some(p => p.id === product.id)
      if (!exists) set({ favoriteProducts: [...get().favoriteProducts, product] }, false, 'addFavoriteProduct')
    },
    removeFavoriteProduct: (product) => {
      set({ favoriteProducts: get().favoriteProducts.filter(p => p.id !== product.id) }, false, 'removeFavoriteProduct')
    },
  }), { name: 'AppStore' })
)

// Синхронизация с sessionStorage для выбранных ингредиентов и настроек
if (typeof window !== 'undefined') {
  const store = useAppStore
  // Восстановление при инициализации
  const saved = sessionStorage.getItem('appStore')
  if (saved) {
    const parsed = JSON.parse(saved)
    if (parsed.cookPlateItems) store.setState({ cookPlateItems: parsed.cookPlateItems })
    if (parsed.minCalories !== undefined) store.setState({ minCalories: parsed.minCalories })
    if (parsed.onlyVegetables !== undefined) store.setState({ onlyVegetables: parsed.onlyVegetables })
    if (parsed.bestMacros !== undefined) store.setState({ bestMacros: parsed.bestMacros })
    if (parsed.aiResult !== undefined) store.setState({ aiResult: parsed.aiResult })
    if (parsed.parsedRecipes !== undefined) store.setState({ parsedRecipes: parsed.parsedRecipes })
    if (parsed.favoriteRecipes !== undefined) store.setState({ favoriteRecipes: parsed.favoriteRecipes })
    if (parsed.selectedMeal !== undefined) store.setState({ selectedMeal: parsed.selectedMeal })
    if (parsed.favoriteProducts !== undefined) store.setState({ favoriteProducts: parsed.favoriteProducts })
  }
  // Подписка на изменения
  store.subscribe((state) => {
    sessionStorage.setItem('appStore', JSON.stringify({
      cookPlateItems: state.cookPlateItems,
      minCalories: state.minCalories,
      onlyVegetables: state.onlyVegetables,
      bestMacros: state.bestMacros,
      aiResult: state.aiResult,
      parsedRecipes: state.parsedRecipes,
      favoriteRecipes: state.favoriteRecipes,
      selectedMeal: state.selectedMeal,
      favoriteProducts: state.favoriteProducts,
    }))
  })
} 