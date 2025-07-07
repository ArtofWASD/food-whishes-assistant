import { fetchAIRecipe } from '@/src/api/fetchAIRecipe' 
import { useAppStore } from '@/src/store/appStore'

describe('fetchAIRecipe', () => {
  beforeEach(() => {
    // Заполняем стор тестовыми продуктами
    useAppStore.setState({
      cookPlateItems: [
        { id: 1, name: 'Яйцо', imgUrl: '', callory: 100, fats: 5, carbs: 1, proteins: 8 },
        { id: 2, name: 'Молоко', imgUrl: '', callory: 60, fats: 3, carbs: 5, proteins: 3 },
      ]
    })
    // Мокаем fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: '===РЕЦЕПТ===\nОмлет' } }] })
    }) as jest.MockedFunction<typeof fetch>
    process.env.NEXT_PUBLIC_OPENROUTER_TOKEN = 'test-token'
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('отправляет запрос к OpenRouter с правильным телом', async () => {
    await fetchAIRecipe()
    expect(global.fetch).toHaveBeenCalledTimes(1)
    const [url, options] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).toContain('openrouter.ai')
    expect(options.method).toBe('POST')
    expect(options.headers['Authorization']).toBe('Bearer test-token')
    const body = JSON.parse(options.body)
    expect(body.model).toBeDefined()
    expect(body.messages[0].content).toContain('Яйцо')
    expect(body.messages[0].content).toContain('Молоко')
  })

  it('возвращает текст рецепта из ответа', async () => {
    const result = await fetchAIRecipe()
    expect(result).toContain('Омлет')
  })
}) 