# 우분투에 톰캣9 설치하기

## 순서
1. tomcat 9 설치
2. `톰캣홈/webapps/` war 파일을 톰캣홈으로 이동
3. mysql dumps.sql 파일을 읽기

  `mysql db_name < text_file`

4. 톰캣 실행
- https://tecadmin.net/install-tomcat-9-on-ubuntu/

## 원격 접속 허용
- https://www.digitalocean.com/community/tutorials/install-tomcat-9-ubuntu-1804

## 80 포트를 8080포트로 리다이렉트
`iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080`
## 되돌리기
`iptables -t nat -D PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080`
- https://o7planning.org/en/11363/redirecting-port-80-443-on-ubuntu-server-using-iptables
- https://coderanch.com/t/109718/os/Linux-Tomcat-java-net-BindException

## 참고

- [https://www.digitalocean.com/community/tutorials/install-tomcat-9-ubuntu-1804](https://www.digitalocean.com/community/tutorials/install-tomcat-9-ubuntu-1804)
- [http://mirror.apache-kr.org/tomcat/tomcat-9/v9.0.11/bin/apache-tomcat-9.0.11.tar.gz](http://mirror.apache-kr.org/tomcat/tomcat-9/v9.0.11/bin/apache-tomcat-9.0.11.tar.gz)
- `/usr/lib/jvm/java-1.11.0-openjdk-amd64`
- [https://dev.mysql.com/doc/refman/8.0/en/mysql-batch-commands.html](https://dev.mysql.com/doc/refman/8.0/en/mysql-batch-commands.html)
