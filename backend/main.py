from typing import Union

from fastapi import FastAPI
# from fastapi import Response
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

import uvicorn

import google.generativeai as genai

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GeminiChatText(BaseModel):
    text:str

genai.configure(api_key='AIzaSyBTByEfM8_C6mK2XuNm9hR0VCRUIWLXwy8')
model = genai.GenerativeModel('gemini-pro')

response = model.generate_content("Write a story about a magic backpack.")
print(response.text)

@app.post("/text")
def read_root(chatText:GeminiChatText):
    response = model.generate_content(chatText.text)
    print(response.text)
    return {"GeminiChat":response.text} 

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

if __name__ == '__main__':
    uvicorn.run(app, port=3000)