# raspberry_Pi

## 1. 라즈베리파이 설치하기(Ubuntu)

1.1 노트북에 sd카드 장착

1.2 balenaEtcher 프로그램 실행

1.3 Select image

1.4 2019-04-08-raspbian-stretch-full 선택

1.5 flash



##  2. Python 3.6.7 설치  

 https://gist.github.com/dschep/24aa61672a2092246eaca2824400d37f 

2.1

```
sudo apt-get update
```

- 안될 경우 update, upgrade, autoremove 한번씩 해보기

- 와이파이 연결 확인하기

- 와이파이 문제일 가능성이 매우 큼

2.2

```
sudo apt-get install build-essential tk-dev libncurses5-dev libncursesw5-dev libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev
```

```
wget https://www.python.org/ftp/python/3.6.7/Python-3.6.7.tar.xz
```

```
tar xf Python-3.6.7
```

```
cd Python-3.6.7
```

```
./configure
```

```
make
```

```
sudo make altinstall
```

 

## 3. pip 업그레이드

```
sudo python3.6 –m pip install --upgrade pip
```



## 4. django 설치

```
pip install Django
```

```
git clone https://github.com/django/django.git
```

```
sudo python3.6 –m pip install django
```



## 5. 모니터 없이 라즈베리파이 사용하기

[http://blog.naver.com/PostView.nhn?blogId=specialist0&logNo=221232983680&parentCategoryNo=&categoryNo=78&viewDate=&isShowPopularPosts=true&from=search](http://blog.naver.com/PostView.nhn\?blogId=specialist0&logNo=221232983680&parentCategoryNo=&categoryNo=78&viewDate=&isShowPopularPosts=true&from=search)

5.1 준비물

- 라즈베리파이 & 라즈베리파이용 sd카드
- sd카드 리더기(노트북에 sd카드 삽입구가 따로 있으면 상관없음)
- 공유기(인터넷 이용 가능여부 상관없음)
  - 만약 라즈베리파이에서 프로그램 다운로드 필요시 인터넷 연결 돼야함
- 노트북

5.2 필요 프로그램

- Putty : 라즈베리파이 연동 시 필요
- VNC Viewer : 라즈베리파이 사용 시 모니터 역할
- 파일 에디터 : 라즈베리파이 sd카드에 추가할 파일 내용 변경에 필요

5.3 연동

​	5.3.1 라즈베리파이 sd카드를 노트북과 연결 (라즈베리파이 설치)

​	5.3.2 새 메모장으로 파일 생성 후 ‘SSH’ 이름으로 저장 (내용x, 확장자x) 

​	5.3.3 ‘wpa_supplicant.conf’ 파일 생성

​	5.3.4 파일 에디터로 내용 작성

```
country=GB
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
ssid="공유기 이름"
psk="공유기 비밀번호"
key_mgmt=WPA-PSK
}
```

- country : 라즈베리파이 실행 후 국가 설정을 했다면 설정 한 국가로 바꿔야 함
  - US로 설정해 두었음 / 초기 GB
- ssid : 공유기 이름
- psk : 공유기 비밀번호
-  key_mgmt : 공유기 보안 프로토콜
  - 만약 공유기 비밀번호 설정 안했으면 공백

5.4  라즈베리파이 sd카드 내부에 복사

5.5 노트북에서 sd카드 제거 

5.6 인터넷 창에 공유기 정보를 볼 수 있는 페이지 들어가기

- iptime : 192.168.0.1

5.7 장치 목록과 내부 IP를 볼 수 있는 페이지 들어가기

5.8 sd카드 라즈베리파이에 장착

5.9 전원 공급

5.10 내부 IP 중 Client Name이 raspberrypi인 것의 IPv4 확인(IP Address)

5.11 Putty 프로그램 실행

5.12 Host Name (or IP address) 부분에 11번에서 확인한 IP 입력

5.13 Open 클릭

5.14 login하기 id : pi / pw : raspberry

5.15 ‘sudo systemctl start vncserver-x11-serviced.service’ 입력

5.16 ‘sudo systemctl enable vncserver-x11-serviced.service’ 입력

- Created ~~~ 나오면 성공 아니면 다시 입력

5.17 VNC Viewer 프로그램 실행

5.18 해상도 설정 및 Hostname 변경하기(다른 라즈베리파이와 구분)



## 6.라즈베리파이 센서 HAT 사용법 

6.1 소프트웨어 다운로드

```
sudo apt-get update
sudo apt-get install sense-hat
sudo reboot
```

```
\- cp /usr/src/sense-hat/examples ~/ -a
```

6.2 홈 디렉토리로 파일 복사

6.3 https://pythonhosted.org/sense-hat 지원하는 라이브러리

​	6.3.1 센서 사용 코드

​	6.3.2 현제 사용하는 코드



## 7. error 코드 및 해결

7.1 unable to locate package openssl-devel

https://abc2080.tistory.com/entry/%EC%97%90%EB%9F%AC-E-Unable-to-locate-package-openssldevel](https://abc2080.tistory.com/entry/에러-E-Unable-to-locate-package-openssldevel)

```
sudo apt-get install libssl-dev
sudo yum install openssl-devel
```

7.2 TypeError: the JSON object must be str, not 'bytes' 

https://godpeople.or.kr/board/3409846

```
sudo apt-get update / upgrade
sudo apt-get apt-get install build-essential checkinstall
sudo apt-getinstall libreadline-gplv2-dev libncursesw5-dev\ libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev

```

7.3 공유기로 통신 뚫기, 외부 아이피 허용

https://compunication.tistory.com/4

1. 