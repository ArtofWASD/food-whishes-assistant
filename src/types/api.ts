/**
 * API and external service types
 */

// OpenRouter API configuration
export interface OpenRouterConfig {
  url: string
  model: string
  token?: string
}

// API request/response types
export interface AIRecipeRequest {
  ingredients: string[]
  mealType?: string
}

export interface AIRecipeResponse {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
}

// Recipe parsing types
export interface RecipeSection {
  title: string
  content: string
}

export interface ParsedRecipeData {
  name?: string
  description?: string
  bju?: string
  ingredients?: string
  instructions?: string
  full: string
}

// Fake API data structure
export interface FakeApiData {
  foods: Array<{
    id: number
    name: string
    imgUrl: string
    callory: number
    fats: number
    carbs: number
    proteins: number
    type: string
  }>
}

// Error handling types
export interface ApiError {
  message: string
  code?: string | number
  details?: any
}