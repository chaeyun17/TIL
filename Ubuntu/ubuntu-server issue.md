# ubuntu 18.04 server issue 정리

## 우분투 설치 후, 자바 설치할 시 
`sudo apt-get install openjdk-8-jre`를 통해 자바를 설치하려고 하면, `E:unable locate package ...` 이라고 에러가 뜬다. 
이럴 때는 `sudo apt-get install default-jre`로 설치하면 된다. jdk도 마찬가지다.

## 파일 전송
1. putty 프로그램 설치
2. 옮길 파일 위치에서 `shift+right-click` 으로 명령프롬프트 실행
3. `pscp 대상파일위치정보 로그인유저@서버주소:저장할경로` 실행
```
C:\chaeyun\test-foler>pscp .\hi.txt yun@192.168.9.133:/home/yun/tmp
yun@192.168.9.133's password:
hi.txt                    | 0 kB |   0.0 kB/s | ETA: 00:00:00 | 100%
```
