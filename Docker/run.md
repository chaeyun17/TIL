# 도커 배워보자

- 학습교재: [가장 빨리 만나는 도커](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter20/26)
- 참고: https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html

## mysql 도커 사용하기
- `docker run --detach --name=test-mysql --env="MYSQL_ROOT_PASSWORD=mypassword" --publish 6603:3306 mysql`
- https://severalnines.com/blog/mysql-docker-containers-understanding-basics

## tomcat 컨테이너 사용하기
- http://www.w3big.com/docker/docker-install-tomcat.html

## 명령어
- `docker logs 컨테이너별명`: 컨테이너 설정 진행 사항 보기
- `docker exec -it test-wordpress bash`: 컨테이너 내부 터미널 접속
- `docer inspect 이름`: 컨테이너 설정 보기
- `docker run --rm 이름`: 컨테이너를 종료했을 시, 로그와 설정파일도 다 자동 삭제
