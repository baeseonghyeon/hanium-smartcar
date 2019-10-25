from .models import IMG
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from PIL import Image
import io
import os, glob, numpy as np
from keras.models import load_model
import tensorflow as tf

@csrf_exempt
def img(request):
    data = request.GET
    pi_cam = data.dict()
    print(pi_cam)
    pi_cam2 = pi_cam['cam']
    # IMG.ojbects.create()
    # imgin = IMG.objects.get(id=1)
    # imgin.IMG = pi_cam2
    # print(type(pi_cam2))
    # print(pi_cam2)
    # imgin.save()
    # with open('./02.jpg', 'rb') as f:
    #     data = f.read()
    #     print(type(data))
    #     print(data)
    image_data = pi_cam2
    image = Image.open(io.BytesIO(image_data))
    img = image.convert('RGB')
    img.save('03.jpg')
    print(img)
    img.show()
    # img = pi_cam2
    # print(type(img))
    # print(img)
    # seed = 5
    # tf.set_random_seed(seed)
    # np.random.seed(seed)
    # width = 64
    # height = 64
    #
    # img = img.convert("RGB")
    # img = img.resize((width, height))
    # data = np.asarray(img)
    # X = np.array(data)
    # X = X.astype(float) / 255
    #
    # json_file = open("./model.json", "r")
    # loaded_model_json = json_file.read()
    # json_file.close()
    # loaded_model = model_from_json(loaded_model_json)
    # loaded_model.load_weights("./model.h5")
    #
    # pred = loaded_model.predict(X)
    # np.set_printoptions(formatter={'float': lambda x: "{0:0.3f}".format(x)})
    # if (pred > 0.9):
    #     print("true")
    # else:
    #     print("false")
    return HttpResponse('')

