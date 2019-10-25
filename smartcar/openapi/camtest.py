from PIL import Image
import io
from textwrap import wrap
def main():
    with open('./02.jpg', 'rb') as f:
        data = f.read()
        print(type(data))
        print(data)
        data3 = data.encode('utf-8')
        data2 = wrap(data3, 50)
        print(data2)
        image_data = data
        image = Image.open(io.BytesIO(image_data))
        img = image.convert('RGB')
        img.save('03.jpg')
        print(img)
        img.show()
main()