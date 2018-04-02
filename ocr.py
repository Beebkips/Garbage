# Import the base64 encoding library.
import base64
import requests
import ast

def main():
    url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDG6fbiYQL7u_G7gihVcElVmLIJ5AyXEr8'

    json = { 'requests': [ { 'image': { 'content': encode_image('test.png') }, 'features': [ { 'type': 'DOCUMENT_TEXT_DETECTION' } ] } ] }

    r = requests.post(url, json=json)
    print(r.status_code, r.reason)
    print(r.text[r.text.index("\"text\":"):])

# Pass the image data to an encoding function.
def encode_image(image):
    with open(image, 'rb') as f:
        image_content = f.read()
        return base64.b64encode(image_content)

if __name__ == '__main__':
    main()