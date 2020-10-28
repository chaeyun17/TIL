# 8장. 원격지 시스템 관리하기
멀리 있는 장소의 PC에서 리눅스 서버에 접속하는 원격접속에 대해서 학습한다. 원격 접속 서버의 종류로 텔넷, SSH, VNC 서버를 구축한다.

## 학습흐름
- [x] 텔넷 서버 이해와 구축
- [x] SSH 서버의 이해와 구축
- [x] VNC 서버의 이해와 구축

## 학습

### 텔넷 서버
텟넷은 오랫동안 전통적으로 사용되어 온 원격 접속 방법이다. 보안 등에 취약하기에 요즘은 텟넷만 사용하지는 않는 추세다. 최근에는 텔넷에 보안 기능을 더해서 사용한다.[더보기](https://ko.wikipedia.org/wiki/%ED%85%94%EB%84%B7)
#### 운영
1. 텔넷 서버 설치  
  `apt-get install xinetd telnetd`
2. 설정 파일 편집  
   /etc/xinetd.d/telnet 파일 편집
3. 텔넷 전용 사용자 생성  
  `add user 사용자명`
4. 텔넷 서비스 가동  
  `systemctl restart xinetd`
5. 방화벽 설정(포트 열기)  
  `ufw allow 23/tcp`
6. 클라이언트에서 접속  
  `telnet 서버IP`

### oepnSSH 서버
텔넷과 거의 동일하지만, 테이터 전송 시 암호화를 한다는 차이점이 있다.
#### 운영
1. ssh 서버 설치/가동  
`apt-get install`  
`openssh-server`  
`systemctl restart ssh`
2. 방화벽 설정  
`ufw allow 22/tcp`
3. 리눅스 클라이언트 접속  
  ssh 사용자명@서버IP
4. 윈도우 클라이언트 접속  
  한글 PUTTY 설치(SSH 클라이언트 사용)

### VNC 서버
X 윈도 환경을 원격지에서 사용할 수 있음. 텍스트만 전송하는 텔넷과 비교했을 때 속도가 많이 느려지는 단점이 있음.
#### 운영
1. VNC 서버 설치  
`apt-get install vnc4server`  
2. 서버 설정 파일 수정  
`xstartup`  
3. VNC 서비스 가동  
`vncserver :1`  
4. 방화벽 설정  
`ufw allow 5901/tcp`  
5. vnc 클라이언트 설치   
`리눅스: apt-get install xlightvncviewer`  
`Windows: www.tigervnc.com 다운로드`   
6. vnc 클라이언트 실행  
`리눅스: vncviewer <ip>:<번호>`  
`Windows: TigerVNC Viewer 실행`  
7. 해상도 조절  
`Options Color level`  






### 사이드 지식

- xinetd: Extended Internet Deamon. 오픈 소스 슈퍼 서버 데몬으로서 많은 유닉스 계열 시스템에서 돌아가며 인터넷 기반 연결을 관리한다. 이것은 오래된 inetd의 대체로서 더 강력한 보안을 제공하며, 대부분의 현대 리눅스 배포판에서는 이것을 사용한다.

- systemd: systemd는 일부 리눅스 배포판에서 유닉스 시스템 V나 BSD init 시스템 대신 사용자 공간을 부트스트래핑하고 최종적으로 모든 프로세스들을 관리하는 init 시스템이다. systemd라는 이름 뒤에 추가된 d는 유닉스에서의 데몬(daemon)을 나타낸다. GNU LGPL 버전 2.1 이상으로 허가된 자유 및 오픈 소스 소프트웨어로 출시되었다. systemd의 기본 목표들 가운데 하나는 모든 배포판들에 대하여 기본 리눅스 구성과 서비스 동작을 통일하는 것이다. [더보기](https://ko.wikipedia.org/wiki/Systemd)

- 포트(port): TCP 포트 또는 UDP 포트를 줄여서 부른다. 가상의 논리적인 통신 연결 번호를 말한다. 컴퓨터를 건물이라고 가정하면 IP주소는 건물의 정문이고, 포트 번호는 건물 안의 각 방의 번호라고 생각하면 된다. 모든 컴퓨터는 0 ~ 65535까지 포트 번호가 있다. 그런데 일반적으로 0 ~ 1023까지는 예약된 포트 번호가 많다.  

  - 0번 ~ 1023번: 잘 알려진 포트 (well-known port)
  - 1024번 ~ 49151번: 등록된 포트 (registered port)
  - 49152번 ~ 65535번: 동적 포트 (dynamic port)
  - 20 : FTP(data)
  - 21 : FTP(제어)
  - 22 : SSH
  - 23 : 텔넷
  - 53 : DNS
  - 80 : 월드 와이드 웹 HTTP
  - 119 : NNTP
  - 443 : TLS/SSL 방식의 HTTP

- `$ifconfig`: 자신의 IP 정보 확인

- Putty : PuTTY는 SSH, 텔넷, rlogin, raw TCP를 위한 클라이언트로 동작하는 자유 및 오픈 소스 단말 에뮬레이터 응용 프로그램이다. PuTTY라는 이름에는 특별한 뜻이 없으나 tty는 유닉스 전통의 터미널의 이름을 가리키며 teletype를 짧게 줄인 것이다. PuTTY는 본래 마이크로소프트 윈도용으로 작성되었으나 다른 다양한 운영 체제에도 포팅되었다. [더보기](https://ko.wikipedia.org/wiki/PuTTY)

- 데몬(Deamon): 멀티태스킹 운영 체제에서 데몬은 사용자가 직접적으로 제어하지 않고, 백그라운드에서 돌면서 여러 작업을 하는 프로그램을 말한다. 시스템 로그를 남기는 syslogd처럼 보통 데몬을 뜻하는 ‘d’를 이름 끝에 달고 있으며, 일반적으로 프로세스로 실행된다.[더보기](https://ko.wikipedia.org/wiki/%EB%8D%B0%EB%AA%AC_(%EC%BB%B4%ED%93%A8%ED%8C%85))

- Telnet, SSH 둘 다 root로 로그인이 불가능하다. 보안상의 이유이다. root 권한이 필요할 경우 `sudo`를 사용하자.
