# MySQL

## 시작하기

### 설치
```
sudo apt-get update;
sudo apt-get install mysql-server;
```
### 로그인하기
`mysql -uroot -p`

### 유저 생성
`CREATE USER '유저명'@'localhost' IDENTIFIED BY '비밀번호';`  
참고: https://dev.mysql.com/doc/refman/5.7/en/assigning-passwords.html

### 비밀번호 바꾸기
`ALTER USER '유저명'@'localhost' IDENTIFIED BY '비밀번호';`  
참고: https://dev.mysql.com/doc/refman/5.7/en/resetting-permissions.html

### 유저 리스트
`SELECT USER FROM mysql.user;`  
`SELECT * FROM mysql.user;`  
참고: https://www.fastwebhost.in/blog/mysql-list-users-how-to-list-mysql-user-accounts-via-command-line/

### Database 스키마
`CREATE DATABASE 명칭;`  
`SHOW DATABASES;`

### TABLE 생성
