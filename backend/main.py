from typing import Union

from transformers import pipeline

from fastapi import FastAPI, File, UploadFile
import uuid
# from fastapi import Response
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
import json
import uvicorn

# import google.generativeai as genai

from ultralytics import YOLO

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://127.0.0.1:8000/docs#",
    "http://localhost:5173/face_detection?ASD_image="
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

# genai.configure(api_key='AIzaSyBTByEfM8_C6mK2XuNm9hR0VCRUIWLXwy8')
# model = genai.GenerativeModel('gemini-pro')

# response = model.generate_content("Write a story about a magic backpack.")
# print(response.text)

# @app.post("/text")
# def read_root(chatText:GeminiChatText):
#     response = model.generate_content(chatText.text)
#     print(response.text)
#     return {"GeminiChat":response.text} 

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

#Classificate ASD Image
@app.post("/autism_image")
async def read_image(asdImageFile:UploadFile = File(...)):
    model = YOLO('ASD_face_detecter/models/ASD_Face_detecter_v2.pt')
    asdImageFile.filename = f"{uuid.uuid4()}.png"
    
    contents = await asdImageFile.read()
    
    with open(f"save_ASD_face_image/{asdImageFile.filename}", "wb") as f:
        f.write(contents)
    
    resultPath = f"save_ASD_face_image/{asdImageFile.filename}"
    result = model(f.name)
    for r in result:
        try:
            print(jsonable_encoder(r.tojson()))
            asd_result = json.loads(r.tojson())
            # boxes = r.boxes
            r.save(filename="save_ASD_face_image/result.jpg")
            r.show()
        except:
            print("NO ASD detected")
            asd_result = [{"name":"Face no detected", "confidence":0}]
    
    print(asd_result[0]['name'])
    print(asd_result[0]['confidence'])
    return {"filepath":resultPath, "resultType":asd_result[0]['name'], "resultConfidence":asd_result[0]['confidence']}


@app.post("/autism_video")
async def read_video(file:UploadFile = File(...)):
    file.filename = f"{uuid.uuid4()}.mp4"
    pipe = pipeline(model="kanlo/ASD_Behavour-trainining2")
    contents = await file.read()
    with open(f"save_ASD_face_video/{file.filename}", "wb") as f:
        f.write(contents)
    result = pipe(f.name)
    return result
    
    
if __name__ == '__main__':
    uvicorn.run(app, port=3000)

    