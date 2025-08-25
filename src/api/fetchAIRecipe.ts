import { FoodItemProps } from "@/src/api/types/foods"
import { useAppStore } from "@/src/store/appStore"

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
const OPENROUTER_MODEL = "deepseek/deepseek-r1-0528-qwen3-8b:free"

// Функция для получения рецепта от AI через OpenRouter API
// TODO: Добавить тесты для обработки ошибок и интеграции с API
export async function fetchAIRecipe() {
  // Получаем продукты из стора
  const cookPlateItems: FoodItemProps[] = useAppStore.getState().cookPlateItems
  const selectedMeal = useAppStore.getState().selectedMeal
  let mealText = ''
  if (selectedMeal === 'breakfast') mealText = 'Тип приёма пищи: Завтрак.'
  if (selectedMeal === 'lunch') mealText = 'Тип приёма пищи: Обед.'
  if (selectedMeal === 'dinner') mealText = 'Тип приёма пищи: Ужин.'
  const prompt = `Найди и предложи проверенные, реальные рецепты блюд, которые можно приготовить из этих продуктов: ${cookPlateItems.map(i => i.name).join(", ")}. 

Важно:
- Используй только традиционные, хорошо известные рецепты
- Рецепты должны быть реально выполнимыми и вкусными
- Не выдумывай новые сочетания, опирайся на классическую кулинарию
- Каждый рецепт должен логично использовать предложенные ингредиенты

${mealText ? mealText + '\n' : ''}
Каждый рецепт отделяй строкой ===РЕЦЕПТ===.

В каждом рецепте обязательно используй следующие маркеры для структурирования ответа:

===НАЗВАНИЕ РЕЦЕПТА===
[Название блюда]

===ОПИСАНИЕ===
[Краткое описание блюда, его особенности и преимущества]

===БЖУ===
[Пищевая ценность блюда: калории, белки, жиры, углеводы на порцию]

===ИНГРЕДИЕНТЫ===
[Список ингредиентов с количеством]

===ИНСТРУКЦИЯ===
[Пошаговая инструкция по приготовлению блюда]

Все поля должны быть на русском языке. Не добавляй ничего лишнего, кроме указанных маркеров и содержимого между ними. Каждый новый рецепт начинай с маркера ===РЕЦЕПТ===.`

  const OPENROUTER_TOKEN = process.env.NEXT_PUBLIC_OPENROUTER_TOKEN
  if (!OPENROUTER_TOKEN) throw new Error("OpenRouter API key is not set in environment variables")
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENROUTER_TOKEN}`
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        { role: "user", content: prompt }
      ]
    })
  })
  if (!response.ok) throw new Error("Ошибка OpenRouter API")
  const data = await response.json()
  const text = data.choices?.[0]?.message?.content || JSON.stringify(data)
  return text
} 