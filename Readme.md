### ‼️Please install the Anaconda environment on your computer to run the backend!

### ‼️Please noted that the enviroment maybe too old, maybe cannot run

# Main page shortcut
![image](https://github.com/user-attachments/assets/7445f1a6-09cb-4225-b857-86db3c5a6ef7)

## Hieracrchy Diagram
![image](https://github.com/user-attachments/assets/07da68e6-2760-4abc-bc87-1ee6d38fec84)

# Lanuch backend

```
cd backend
fastapi dev
```

# Lanuch fontend

```
cd fontend
npm install
yarn start
```
# Face Detection YOLOv8 pre-train model
This part aims at the efficacy of fine-tuning the YOLOv8n pre-trained model for
accurate face detection within a custom dataset designed to capture ASD related
facial features. Leveraging the model's computational efficiency for resource-
constrained GPU environments, the project aims to achieve a high mean Average
Precision (mAP) on face detection tasks is comparable to the performance observed
on large-scale object detection benchmarks like the COCO dataset.
![image](https://github.com/user-attachments/assets/373bcab9-cd8c-4db2-89d3-cb5b4f5aa239)
![image](https://github.com/user-attachments/assets/5746e5fe-189f-472e-8c1c-3d04477982db)

# ASD behaviour video model
This model is a fine-tuned version of MCG-NJU/videomae-base on an unknown dataset. It achieves the following results on the evaluation set:
https://huggingface.co/kanlo/videomae-base-ASD_Behavour_v5

# ASD eye-contact model
This model is a fine-tuned version of MCG-NJU/videomae-base on an unknown dataset. It achieves the following results on the evaluation set:
https://huggingface.co/kanlo/videomae-base-ASD_Eye_Contact_v1


# 🔆Methodology/Design
## 👆Implementation
This application aims to create a user-friendly platform where users can upload
images of their children's faces and videos depicting their behaviours. Through AI
detection, the platform will diagnose whether the children are affected by autism
spectrum disorder (ASD).
In addition to the diagnostic feature, the website also includes an AI chatbot
designed to interact with ASD children. This chatbot utilises LLM (Large Language
Model) technology to generate prompts and engage in conversations tailored to
the needs of ASD children.


## 🌟Upload Face image
![image](https://github.com/user-attachments/assets/81c65015-024b-4584-95fb-9ba5fb2af99c)

Users can upload image files in JPG or PNG format to the website. The website will
Then, transmit this data to the backend, where the algorithm will compare the
Similarity of the faces of ASD children. Subsequently, the website will provide the
probability result indicating the likelihood of the child having ASD based on their
facial features.

## 🌟Upload eye-contact or action behaviours video
![image](https://github.com/user-attachments/assets/2d400c15-26d9-4bd2-b5d5-5c6ccddd2cf3)
![image](https://github.com/user-attachments/assets/3679f3b6-b533-4d47-a4ff-099d2a19ed52)

Users can upload one-minute videos in MP4 format to the website. The
recommended video resolution is 1920 x 1080, as this format balances quality and
file size. Choosing a smaller resolution helps prevent potential issues with the
server's processing speed during data transmission. After the video is uploaded,
the website will display the result, indicating behaviours matching ASD symptoms,
highlighted in green on the list. This notifies the user of the potential presence of
ASD-related behaviours in their child.

## 🌟AI Chatbot
![image](https://github.com/user-attachments/assets/cc8fb215-0ae3-41db-9042-488a14db4d3c)
![image](https://github.com/user-attachments/assets/469a575f-4e2f-4fae-bc47-eea49c1e4db2)
The AI chatbot is equipped with the capability for users to engage in conversation
through typing or speaking, providing accessibility for children who may not have
developed typing skills yet. One of the key advantages of this functionality is its
ability to tailor conversations to match the user's age group, ensuring that
interactions are relatable and appropriate. This personalised approach helps
create a more engaging and comfortable experience for children using the
platform. This AI Chatbot use Cantonese to communicate with children.

