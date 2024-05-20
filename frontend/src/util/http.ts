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

export async function sendAsdImage(file:FormData){
    const response = await fetch(`http://127.0.0.1:8000/autism_image`, {
        method: 'POST',
        body: file,
        // headers: { 'Content-Type': , }
    })
    const result = await response.json()
    return result
}