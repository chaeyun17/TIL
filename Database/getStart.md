# 설치
oracle expresss 11g

## 다운로드

### 오라클 DB
1. oracle.com
2. menu - Downloads and trials - Database - Oracle database
3. oracle expresss 11g 다운로드

### SQL Developer
1. oracle.com
2. menu - Downloads and trials - Developer Tools
3. SQL Developer 다운로드

## 리눅스에 설치하기
참고: http://html5around.com/wordpress/tutorials/ubuntu-oracle-xe-11gr2-install/


## 세팅
<<<<<<< HEAD
1. RUN SQL Command Line 실행
2. `CONN SYSTEM AS DBA;` 되는지 확인
3. SQL Developer 실행
4. 새 접속
5. 접속이름: 사용자 임의   
   사용자이름: system    
   비밀번호: 설치할 때 지정한 비밀번호

## 기존 계정들 확인
```
SELECT * FROM DBA_USERS;
```
=======
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
>>>>>>> 54e8424c2b0f66f8ed0070f034c7e75300ececd3
