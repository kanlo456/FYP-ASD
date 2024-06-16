from typing import Union
from typing import Annotated

import ollama
import json
from transformers import pipeline
from firebase import firebase
import time
from fastapi import FastAPI, File,  UploadFile, Form, Depends
import uuid
# from fastapi import Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
import json
import uvicorn
import torch
from fastapi.staticfiles import StaticFiles
from firebase_admin import auth
import firebase_admin
from firebase_admin import credentials, db


import textwrap

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown

from ultralytics import YOLO

app = FastAPI()

app.mount("/public",
          StaticFiles(directory="public"), name="save_ASD_face_image")

origins = [
    "*"
    # "http://localhost.tiangolo.com",
    # "https://localhost.tiangolo.com",
    # "http://localhost",
    # "http://localhost:8080",
    # "http://localhost:5173",
    # "http://127.0.0.1:8000/docs#",
    # "http://localhost:5173/face_detection?ASD_image="
    # "http://localhost:5173/chatbot"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_url = 'https://cu-fyp-asd-default-rtdb.firebaseio.com/'
fdb = firebase.FirebaseApplication(db_url, None)

genai.configure(api_key='AIzaSyBTByEfM8_C6mK2XuNm9hR0VCRUIWLXwy8')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

cred = credentials.Certificate("./firebase_key.json")
firebase_admin.initialize_app(
    cred, {'databaseURL': 'https://cu-fyp-asd-default-rtdb.firebaseio.com/ '})


class ChatText(BaseModel):
    chatText: str
    token: str


class Token(BaseModel):
    token: str


def to_markdown(text):
    text = text.replace('•', '  *')
    return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


@app.post("/get_user")
async def get_user(token):

    decoded_token = auth.verify_id_token(token)
    email = decoded_token['email']
    uid = decoded_token['uid']
    ref = db.reference(uid)
    user_ref = ref.child('chatData')
    print(user_ref)
    user_ref.push().set({'role': 'user',
                         'parts': ["me"]})

    return uid
    # return result


@app.post("/get_chat_user_history")
async def get_user_history(token: Token):
    print(token.token)
    decoded_token = auth.verify_id_token(token.token)
    uid = decoded_token['uid']
    ref = db.reference(f'/{uid}/chatData')
    print(token)

    result = ref.get()
    if result == None:
        return []

    print(result)
    firebaseData = json.dumps(result)
    convertData = json.loads(firebaseData)
    history = []
    print(convertData)

    for value, key in convertData.items():
        convertedData = {
            "role": [key[0]['role']],
            "parts": [key[0]["parts"][0]]
        }
        print([key[0]])
        # print(converted_data)
        history.append(convertedData)

    return history


@app.post("/geminChat")
async def geminChat(chatText: ChatText):
    print(chatText)
    started_chat = False
    model = genai.GenerativeModel('gemini-1.5-flash')
    decoded_token = auth.verify_id_token(chatText.token)
    uid = decoded_token['uid']
    ref = db.reference(f'{uid}/chatData')
    # user_ref = ref.child('chatData')
    chat = model.start_chat(history=[])

    result = ref.get()
    if not result:
        messages = [
            {'role': 'user',
             'parts': [
                 """
                你將扮演一位自閉症治療師，與一位患有自閉症的5歲小朋友進行對話。對話將全程使用廣東話。
                請遵循以下指引:
                - 每次只問一個問題或說一句話
                - 第一句話要問小朋友的名字
                - 除了第一句，之後的對話只用中文，不要使用任何英文
                - 用簡單易懂的詞彙和語氣，讓5歲小朋友能夠理解
                - 要有耐心，要鼓勵小朋友多說話，表達自己
                - 不要給小朋友壓力，營造輕鬆愉快的聊天氣氛
                請開始與小朋友對話。
                """
             ]}
        ]
        ref.push().set(messages)
        response = model.generate_content(messages)
        ref.push().set([{'role': 'model',
                         'parts': [response.text]}])
        return response.text

    if result:
        print('call result')
        firebaseData = json.dumps(result)
        convertData = json.loads(firebaseData)
        # print(convertData)
        history = []
        for value, key in convertData.items():
            convertedData = {
                "role": key[0]['role'],
                "parts": [key[0]["parts"][0]]
            }
            history.append(convertedData)
        history.append({'role': 'user',
                        'parts': [chatText.chatText]})
        ref.push([{'role': 'user',
                  'parts': [chatText.chatText]}])
        print("history", history)
        response = model.generate_content(history)
        ref.push().set([{'role': 'model',
                         'parts': [response.text]}])
        print(response.text)
        return response.text

    return 'successflly'


@ app.post("/autism_image")
async def read_image(token: str = Form(...), asdImageFile: UploadFile = File(...)):
    model = YOLO('ASD_face_detecter/models/ASD_Face_detecter_v2.pt')
    asdImageFile.filename = f"{uuid.uuid4()}.png"
    decoded_token = auth.verify_id_token(token)
    uid = decoded_token['uid']
    ref = db.reference(f'{uid}/asd_image')
    contents = await asdImageFile.read()

    with open(f"public/save_ASD_face_image/{asdImageFile.filename}", "wb") as f:
        f.write(contents)

    resultPath = f"public/save_ASD_face_image/{asdImageFile.filename}"
    result = model(f.name)
    for r in result:
        try:
            print(jsonable_encoder(r.tojson()))
            asd_result = json.loads(r.tojson())
            # boxes = r.boxes
            r.save(
                filename=f"public/result_image/{asdImageFile.filename}")
            # r.show()
        except:
            print("NO ASD detected")
            asd_result = [{"name": "Face no detected", "confidence": 0}]

    print(asd_result[0]['name'])
    print(asd_result[0]['confidence'])
    ref.push().set(
        {'filePath': f"public/result_image/{asdImageFile.filename}"})
    return {"filepath": f"public/result_image/{asdImageFile.filename}", "resultType": asd_result[0]['name'], "resultConfidence": asd_result[0]['confidence']}


@ app.post("/autism_video")
async def read_video(token: str = Form(...), asdVideoFile: UploadFile = File(...)):
    asdVideoFile.filename = f"{uuid.uuid4()}.mp4"
    decoded_token = auth.verify_id_token(token)
    uid = decoded_token['uid']
    ref = db.reference(f'{uid}/asd_video')
    pipe = pipeline(model="kanlo/videomae-base-ASD_Behavour_v5")
    contents = await asdVideoFile.read()
    with open(f"public/save_ASD_face_video/{asdVideoFile.filename}", "wb") as f:
        f.write(contents)
    result = pipe(f.name)
    ref.push().set(
        {'filePath': f"public/save_ASD_face_video/{asdVideoFile.filename}", 'result': result}, )

    return {'filePath': f"public/save_ASD_face_video/{asdVideoFile.filename}", 'result': result}

@ app.post("/autism_eye_video")
async def read_video(token: str = Form(...), asdVideoFile: UploadFile = File(...)):
    asdVideoFile.filename = f"{uuid.uuid4()}.mp4"
    decoded_token = auth.verify_id_token(token)
    uid = decoded_token['uid']
    ref = db.reference(f'{uid}/asd_video')
    pipe = pipeline(model="kanlo/videomae-base-ASD_Eye_Contact_v2")
    contents = await asdVideoFile.read()
    with open(f"public/save_ASD_eye_video/{asdVideoFile.filename}", "wb") as f:
        f.write(contents)
    result = pipe(f.name)
    ref.push().set(
        {'filePath': f"public/save_ASD_eye_video/{asdVideoFile.filename}", 'result': result}, )

    return {'filePath': f"public/save_ASD_eye_video/{asdVideoFile.filename}", 'result': result}

@ app.post('/asd_doctor_chat')
async def asd_doctor_chat(chat):
    response = ollama.chat(model='llama3', messages=[
        {
            "role": "assistant",
            "content": """
                    背景信息：
                        你是一位自閉症治療師，專門幫助自閉症小朋友提升語言能力。你正在與一位5歲的小朋友進行廣東話對話，目的是通過簡單易懂的問題和回應，了解小朋友的興趣、喜好和感受。

                        角色設置：
                        你是一位經驗豐富的自閉症治療師，擅長運用溝通技巧來提升孩子的語言能力。

                        具體問題：
                        設計一組廣東話對話提示詞，與5歲的自閉症小朋友進行交流，開始問小朋友的名字，並根據對方的回答進行後續提問和回應。

                        期望格式：
                        請以對話形式呈現，根據小朋友的回答，設計連貫的問題和回應。

                        風格：
                        請用簡潔明了且鼓勵的寫作風格，讓小朋友感到輕鬆和自信。

                        語氣：
                        請用溫和且支持的語氣回答。

                        """
        },
        {
            "role": "user",
            "content": "開始"
        }

    ])

    return response['message']['content']


if __name__ == '__main__':
    uvicorn.run(app, port=3000)
