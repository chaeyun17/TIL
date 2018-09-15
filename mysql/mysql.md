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

#### 윈도우
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

### 권한 부여
1. `mysql -u root -p`
2. `GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' IDENTIFIED BY 'password'`
**출처**  
https://www.a2hosting.com/kb/developer-corner/mysql/managing-mysql-databases-and-users-from-the-command-line

### sql 스크립트 실행
`mysql -u username -p < example.sql`
`mysql -u yourusername -p yourpassword yourdatabase < text_file`
`mysql> source \home\user\Desktop\test.sql;`

## 포트 변경
`vi /etc/mysql/mysql.conf.d/mysqld.cnf`

## 원격 접속
- https://stackoverflow.com/questions/14779104/how-to-allow-remote-connection-to-mysql
- `service mysql restart`
---

## 기타

### 유저 리스트
`SELECT USER FROM mysql.user;`  
`SELECT * FROM mysql.user;`  
참고: https://www.fastwebhost.in/blog/mysql-list-users-how-to-list-mysql-user-accounts-via-command-line/

### Database 스키마
`CREATE DATABASE 명칭;`  
`SHOW DATABASES;`

### 서버 포트 변경
1. `sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf`
2. port 부분 수정(기본 3306)
3. systemctl restart mysql
4. `sudo mysql -h localhost -u root -p`
5. `mysql> show variables like 'port`
**참고**  
https://www.tecmint.com/change-default-mysql-mariadb-port-in-linux/
