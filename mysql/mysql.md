# MySQL

## 시작하기

### 설치
```
sudo apt-get update;
sudo apt-get install mysql-server;
```
### 로그인하기
`mysql -uroot -p`

**윈도우**  
`설치경로\bin\mysql.exe -uroot -p`

### 유저 생성
`CREATE USER '유저명'@'localhost' IDENTIFIED BY '비밀번호';`  
참고: https://dev.mysql.com/doc/refman/5.7/en/assigning-passwords.html

### 비밀번호 바꾸기
`ALTER USER '유저명'@'localhost' IDENTIFIED BY '비밀번호';`  
참고: https://dev.mysql.com/doc/refman/5.7/en/resetting-permissions.html

#### ROOT 비밀번호 리셋
##### 윈도우
1. 윈도우 서비스 관리자에서 mysql 끄기 (bitnami일 경우, mysql 서버 끄기)
2. 새로운 텍스트 파일 생성
3. `ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';` 내용 작성 후, 저장
4. CMD를 통해 mysql 초기화 명령 실행
```
C:\> cd "C:\Program Files\MySQL\MySQL Server 5.7\bin"
C:\> mysqld --init-file=C:\\mysql-init.txt
```
5. cmd를 종료하고, mysql 서버 재가동
6. 새로운 비밀번호로 로그인

참고: https://dev.mysql.com/doc/refman/5.7/en/resetting-permissions.html

### 유저 리스트
`SELECT USER FROM mysql.user;`  
`SELECT * FROM mysql.user;`  
참고: https://www.fastwebhost.in/blog/mysql-list-users-how-to-list-mysql-user-accounts-via-command-line/

### Database 스키마
`CREATE DATABASE 명칭;`  
`SHOW DATABASES;`

### TABLE 생성
