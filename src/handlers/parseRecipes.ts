// Функция для парсинга AI-ответа с рецептами по маркерам ===...===
// TODO: Добавить тесты для граничных случаев парсинга
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