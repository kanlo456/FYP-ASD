import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function getGeminiChat(chat: any) {
    const response = await fetch(`http://localhost:3000/text`, {
        method: 'POST',
        body: JSON.stringify({ chat }),
        headers: { 'Content-Type': 'application/json', }
    })
    const text = await response.json()
    console.log("Result", text)

    return text
}