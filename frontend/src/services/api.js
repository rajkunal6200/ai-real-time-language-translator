const API_BASE_URL = "http://127.0.0.1:8000"

export async function translateText(text, source, target) {
  const response = await fetch(`${API_BASE_URL}/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text, source, target })
  })
  const data = await response.json()
  return data
}
