import requests

def ablesci(headers):
    url = "https://www.ablesci.com/user/sign"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        print("成功访问")
        print(response.json())