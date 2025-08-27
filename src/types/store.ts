/**
 * Store and state management types
 */
import { FoodItemProps } from './food.js'
import { MealType } from './forms.js'
import { parseRecipes } from '@/src/handlers/parseRecipes'

// Recipe types from parser
export type ParsedRecipe = ReturnType<typeof parseRecipes>[0]
export type ParsedRecipes = ReturnType<typeof parseRecipes>

// Main application state interface
export interface AppState {
  // Cook plate items
  cookPlateItems: FoodItemProps[]
  setCookPlateItems: (items: FoodItemProps[]) => void
  
  // UI state
  showResults: boolean
  setShowResults: (show: boolean) => void
  
  // Filter settings
  minCalories: boolean
  onlyVegetables: boolean
  bestMacros: boolean
  lowestMacro: 'protein' | 'fat' | 'carbs' | null
  setMinCalories: (v: boolean) => void
  setOnlyVegetables: (v: boolean) => void
  setBestMacros: (v: boolean) => void
  setLowestMacro: (macro: 'protein' | 'fat' | 'carbs' | null) => void
  
  // AI recipe generation
  aiResult: string
  aiLoading: boolean
  aiError: string
  parsedRecipes: ParsedRecipes
  fetchAIRecipeToStore: () => Promise<void>
  resetRecipes: () => void
  
  // Favorite recipes
  favoriteRecipes: ParsedRecipes
  addFavoriteRecipe: (recipe: ParsedRecipe) => void
  removeFavoriteRecipe: (recipe: ParsedRecipe) => void
  
  // Meal selection
  selectedMeal: MealType | null
  setSelectedMeal: (meal: MealType | null) => void
  
  // Favorite products
  favoriteProducts: FoodItemProps[]
  addFavoriteProduct: (product: FoodItemProps) => void
  removeFavoriteProduct: (product: FoodItemProps) => void
}

// Session storage data structure
export interface AppStorageData {
  cookPlateItems?: FoodItemProps[]
  minCalories?: boolean
  onlyVegetables?: boolean
  bestMacros?: boolean
  lowestMacro?: 'protein' | 'fat' | 'carbs' | null
  aiResult?: string
  parsedRecipes?: ParsedRecipes
  favoriteRecipes?: ParsedRecipes
  selectedMeal?: MealType | null
  favoriteProducts?: FoodItemProps[]
}