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
