from PIL import Image
import os, glob, numpy as np
from keras.models import load_model

image_w = 64
image_h = 64

pixels = image_h * image_w * 3

X = []
img = Image.open("C:\SmartCar\smartcar\openapi/yahait4.jpg")
img = img.convert("RGB")
img = img.resize((image_w, image_h))
data = np.asarray(img)
X.append(data)

X = np.array(X)
X = X.astype(float) / 255
model1 = load_model('C:\SmartCar\smartcar\openapi/111601.model')

prediction1 = model1.predict(X)
np.set_printoptions(formatter={'float': lambda x: "{0:0.3f}".format(x)})
print(prediction1)