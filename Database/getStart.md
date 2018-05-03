# 설치

## 오라클 Express 11g를 리눅스에 설치하기
참고: http://html5around.com/wordpress/tutorials/ubuntu-oracle-xe-11gr2-install/

## 세팅
실행  
`sqlplus system`  

## SQL DEVELOPER 영어로 설정
1. /opt/sqldeveloper/sqldeveloper/bin/sqldeveloper.conf 열기
2. `AddVMOption -Duser.language=en` 적기

## SQL Developer 한글 깨짐
자바에 한글 폰트를 찾지 못해서 발생하는 현상이다. 해당 폴더에 한글 지원 폰트를 복사해넣으면 해결된다.
1. `sudo mkdir /usr/lib/jvm/java-9-oracle/lib/fonts/fallback`
2. `sudo cp /usr/share/fonts/truetype/baekmuk/* /usr/lib/jvm/java-9-oracle/lib/fonts/fallback`

참고:
- https://blog.naver.com/dohan71/110069878905
- https://dev.kooklog.net/archives/53

## ECU-KR TO UTF-8 변환
`iconv -c -f euc-kr -t utf-8 test.txt > test-utf8.txt`  
출처: http://awesometic.tistory.com/93
