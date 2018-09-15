# docker로 oracle db 사용해보기!
## 준비물
- SQLcl (http://www.oracle.com/technetwork/developer-tools/sqlcl/overview/index.html)

## 과정
1. SQLcl을 다운로드하여 unzip 하여서 bin 폴더 내에 있는 sqlcl 실행 확인
2. 도커를 설치 한다
3. 컨테이너를 받는다. https://hub.docker.com/r/wnameless/oracle-xe-11g/
4. 컨테이너를 다운받고 실행한다 `docker run -d -it --name Oracledb -p 49161:1521 wnameless/oracle-xe-11g`
5. `./sql system/oracle@localhost:49161:xe`

# 참고
- https://www.talkapex.com/2017/10/how-to-setup-oracle-db-12-2-docker-container/
- [oracle 11g xe conatiner](https://hub.docker.com/r/wnameless/oracle-xe-11g/)
- [To use external database servers with your hosting server:](https://docs.plesk.com/en-US/12.5/administrator-guide/database-servers/adding-and-removing-database-servers.59428/)
- http://www.nakov.com/blog/2008/11/20/connect-to-oracle-express-edition-from-remote-machine/

## 명령어 참고
- `docer run - it` : Assign name and allocate pseudo-TTY (--name, -it) , [doc](https://docs.docker.com/engine/reference/commandline/run/#extended-description)
