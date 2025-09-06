const API_URL = import.meta.env.VITE_API;

export async function translateText(text: string): Promise<{ text: string; translated: string }> {
  const response = await fetch(`${API_URL}/speach/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Failed to translate text');
  }

  return response.json();
}
