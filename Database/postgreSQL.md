# PostgreSQL

## Remote 접속 설정
### 1. 설정 파일 찾기
```bash
find / -name "postgresql.conf"
```

### 2. 연결 허용 설정
다음 줄을 추가하기
```bash
sudo vim /etc/postgresql/10/main/postgresql.conf
```
```
listen_addresses = '*'
```

### 3. 허용 아이피 대역 설정
```bash
sudo vim /etc/postgresql/10/main/pg_hba.conf
```
```
host all all 0.0.0.0/0 md5
```

### 5. 재시작
```
sudo service postgresql restart
```

### 출처
https://support.plesk.com/hc/en-us/articles/115003321434-How-to-enable-remote-access-to-PostgreSQL-server-on-a-Plesk-server-
