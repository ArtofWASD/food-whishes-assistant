// Zustand store для управления состоянием приложения (продукты, режимы, результаты AI и т.д.)
// TODO: Добавить тесты для логики состояния и асинхронных экшенов
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { FoodItemProps, AppState, AppStorageData, ParsedRecipe, MealType } from '@/src/types'
import { fetchAIRecipe } from '@/src/api/fetchAIRecipe'
import { parseRecipes } from '@/src/handlers/parseRecipes'

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
    setCookPlateItems: (items: FoodItemProps[]) => set({ cookPlateItems: items }, false, 'setCookPlateItems'),
    setShowResults: (show: boolean) => set({ showResults: show }, false, 'setShowResults'),
    setMinCalories: (v: boolean) => set({ minCalories: v }, false, 'setMinCalories'),
    setOnlyVegetables: (v: boolean) => set({ onlyVegetables: v }, false, 'setOnlyVegetables'),
    setBestMacros: (v: boolean) => set({ bestMacros: v }, false, 'setBestMacros'),
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
    addFavoriteRecipe: (recipe: ParsedRecipe) => {
      const exists = get().favoriteRecipes.some((r: ParsedRecipe) => r.full === recipe.full)
      if (!exists) set({ favoriteRecipes: [...get().favoriteRecipes, recipe] }, false, 'addFavoriteRecipe')
    },
    removeFavoriteRecipe: (recipe: ParsedRecipe) => {
      set({ favoriteRecipes: get().favoriteRecipes.filter((r: ParsedRecipe) => r.full !== recipe.full) }, false, 'removeFavoriteRecipe')
    },
    setSelectedMeal: (meal: MealType | null) => set({ selectedMeal: meal }, false, 'setSelectedMeal'),
    addFavoriteProduct: (product: FoodItemProps) => {
      const exists = get().favoriteProducts.some((p: FoodItemProps) => p.id === product.id)
      if (!exists) set({ favoriteProducts: [...get().favoriteProducts, product] }, false, 'addFavoriteProduct')
    },
    removeFavoriteProduct: (product: FoodItemProps) => {
      set({ favoriteProducts: get().favoriteProducts.filter((p: FoodItemProps) => p.id !== product.id) }, false, 'removeFavoriteProduct')
    },
  }), { name: 'AppStore' })
)

// Синхронизация с sessionStorage для выбранных ингредиентов и настроек
if (typeof window !== 'undefined') {
  const store = useAppStore
  // Восстановление при инициализации
  const saved = sessionStorage.getItem('appStore')
  if (saved) {
    const parsed: AppStorageData = JSON.parse(saved)
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
    const storageData: AppStorageData = {
      cookPlateItems: state.cookPlateItems,
      minCalories: state.minCalories,
      onlyVegetables: state.onlyVegetables,
      bestMacros: state.bestMacros,
      aiResult: state.aiResult,
      parsedRecipes: state.parsedRecipes,
      favoriteRecipes: state.favoriteRecipes,
      selectedMeal: state.selectedMeal,
      favoriteProducts: state.favoriteProducts,
    }
    sessionStorage.setItem('appStore', JSON.stringify(storageData))
  })
} 