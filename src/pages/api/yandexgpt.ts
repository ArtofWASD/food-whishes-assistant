import type { NextApiRequest, NextApiResponse } from 'next'

const YANDEX_API_URL = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
const YANDEX_API_KEY = "ajeu48193lg467so9fmo"
const YANDEX_MODEL_URI = "gpt://b1g84l2v3d7jv1q8k6g7/yandexgpt-lite"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  try {
    const yandexRes = await fetch(YANDEX_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Api-Key ${YANDEX_API_KEY}`
      },
      body: JSON.stringify({
        ...req.body,
        modelUri: YANDEX_MODEL_URI
      })
    })
    const data = await yandexRes.json()
    res.status(200).json(data)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
} 