from ablesci import ablesci

Cookie = "_identity-frontendXXXXXXX" # 替换自己在浏览器中的Cookie

headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cookie": f"{Cookie}",
    "DNT": "1",
    "Referer": "https://www.ablesci.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
}

def main():
    ablesci(headers=headers)

if __name__ == "__main__":
    main()