from ultralytics import YOLO, checks, hub
checks()

hub.login('5d79aeed8058a8c6d4e201acc3a14607e6d87e5d72')

if __name__ == "__main__":
    model = YOLO('https://hub.ultralytics.com/models/mp0Diidt6AT4XEqU6FOs')
    results = model.train()
