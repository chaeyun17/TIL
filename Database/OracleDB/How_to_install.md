# Oracle Database 11g express 설치법

## OS Window에 설치법

### 다운로드
1. oracle.com
2. menu - Downloads and trials - Database - Oracle database
3. oracle expresss 11g 다운로드

### 설치 세팅
- 설지 진행 중 암호 설정은 SYS, system 관리자계정 암호이다.
- DB 서버 포트는 1521 , Http 서버 포트는 8080이 기본값으로 지정된다.

### 계정 생성
참고: https://docs.oracle.com/cd/E17781_01/admin.112/e18585/toc.htm#XEGSG110

1. 명령창에서 `sqlplus` 실행
2. `conn` 명령어로 접속. 아이디(system)와 비밀번호(설치시 세팅한 비번) 입력
3. `create user 사용자명 identified by 비밀번호;`
4. 권한 부여 
```SQL
grant CREATE SESSION, ALTER SESSION, CREATE DATABASE LINK, CREATE MATERIALIZED VIEW, CREATE PROCEDURE, CREATE PUBLIC SYNONYM, CREATE ROLE, CREATE SEQUENCE, CREATE SYNONYM, CREATE TABLE, CREATE TRIGGER, CREATE TYPE, CREATE VIEW, UNLIMITED TABLESPACE to 사용자명;
```
5. `exit` 종료


**scott 계정 활성화**
1. 명령 프롬프트에서 `sqlplus`
2. `conn` 명령어로 접속. 아이디와 비밀번호를 입력. usr-name: system , password: 설치 시 세팅한 비밀번호
3. `@C:\oraclexe\app\oracle\product\11.2.0\server\rdbms\admin\scott.sql` 명령 입력. scott 계정 생성
4. `alter user scott identified by tiger;` 입력. 비밀번호 세팅
5. `conn scott/tiger` 데이터베이스 서버 접속
6. `set linesize 100` , `select * from tab;` 테스트 실행

## 오라클 Express 11g를 리눅스에 설치하기
참고: http://html5around.com/wordpress/tutorials/ubuntu-oracle-xe-11gr2-install/

### Ubuntu에 SQL Developer 설치법
1. oracle.com
2. menu - Downloads and trials - Developer Tools
3. SQL Developer 다운로드

### 세팅
실행  
`sqlplus system`  

### SQL DEVELOPER 영어로 설정
1. /opt/sqldeveloper/sqldeveloper/bin/sqldeveloper.conf 열기
2. `AddVMOption -Duser.language=en` 적기

### SQL Developer 한글 깨짐
자바에 한글 폰트를 찾지 못해서 발생하는 현상이다. 해당 폴더에 한글 지원 폰트를 복사해넣으면 해결된다.
1. `sudo mkdir /usr/lib/jvm/java-9-oracle/lib/fonts/fallback`
2. `sudo cp /usr/share/fonts/truetype/baekmuk/* /usr/lib/jvm/java-9-oracle/lib/fonts/fallback`

참고:
- https://blog.naver.com/dohan71/110069878905
- https://dev.kooklog.net/archives/53

### ECU-KR TO UTF-8 변환
`iconv -c -f euc-kr -t utf-8 test.txt > test-utf8.txt`  
출처: http://awesometic.tistory.com/93

