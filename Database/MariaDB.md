# 초기설정

- 데이터베이스 생성: `CREATE DATABASE `mydb`;`
- 유저 생성: `CREATE USER 'myuser' IDENTIFIED BY 'mypassword'`
- Grant permissions to access and use the MySQL server: `GRANT USAGE ON *.* TO 'myuser'@localhost IDENTIFIED BY 'mypassword'`
- Grant all privileges to a user on a specific database: `GRANT ALL privileges ON `mydb`.* TO 'myuser'@localhost;`
- Verify your new user has the right permissions: `SHOW GRANTS FOR 'myuser'@localhost;`

# 참고
- http://www.daniloaz.com/en/how-to-create-a-user-in-mysql-mariadb-and-grant-permissions-on-a-specific-database/