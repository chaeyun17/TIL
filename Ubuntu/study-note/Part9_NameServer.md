# 9장 네임 서버 설치와 운영
네임서버는 URL로 된 주소를 IP로 바꿔주는 서버
## 학습 흐름
- [ ] 네임 서버의 작동 방식을 이해한다
- [ ] URL이 IP 주소로 변환되는 흐름을 학습한다
- [ ] 도메인 이름 체게에 대해서 이해한다
- [ ] 캐싱 전용 네임 서버를 이해하고 구축한다
- [ ] 마스터 네임 서버를 이해하고 구축한다
- [ ] 라운드 로빈 방식의 네임 서버를 이해한다

## 학습

### 사이드 지식
- /etc/host.conf : 우선순위 확인  
  - order hosts, bind : etc/hosts 파일 먼저 체크
  - order bind, hosts : /etc/resolv.conf 파일 먼저 체크(네임 서버에 먼저 질의)
- /etc/hosts : IP address 기록됨.
- /etc/resolv.conf : name server IP address 저장됨.

### 리눅스PC가 www.nate.com의 IP주소를 획득하는 과정
1. 웹브라우저에 www.nate.com 을 입력한다
2. 리눅스일 경우, /etc/resolv.conf 에서 nameserver 네임서버IP 부분을 찾는다.
3. 로컬 네임 서버에 www.nate.com 의 IP 주소를 묻는다.
4. 로컬 네임 서버는 자신의 캐시 DB를 검사해 www.nate.com의 정보가 들어 있는지를 확인한다.
5. 로컬 네임 서버가 'ROOT 네임 서버'에 www.nate.com의 주소를 물어본다.
6. 'ROOT 네임 서버'도 www.nate.com 주소를 모르므로, 'com 네임 서버' 주소를 알려주면서 'com 네임서버'에 물어보라고 한다.
7. 로컬 네임 서버가 com 네임서버에게 www.nate.com 주소를 물어본다.
8. 'com 네임서버'도 www.nate.com 주소를 모르므로, 'nate.com'을 관리하는 네임서버의 주소를 알려주면서 nate.com 네임 서버에 물어보라고 하낟.
9. 로컬 네임서버가 nate.com 네임서버에 www.nate.com 주소를 물어본다.
10. nate.com 네임 서버는 네이트에서 구축한 네임 서버이므로 xxx.nate.com 이라는 이름을 가진 컴퓨터의 목록은 모두 있다. www.nate.com 의 IP 주소도 알기 떄문에 IP주소를 알려준다.
11. 로컬 네임 서버는 www.nate.com 의 IP주소를 요구한 PC에 IP주소를 알려준다.
12. PC는 획득한 IP 주소로 접속을 시도한다.
