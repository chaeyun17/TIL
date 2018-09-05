# 우분투 사용 팁

## 앱 목록
- 프로세스 관리: htop
- gnome 화면 관리: tweak

## zip 압축풀기
`unzip 압축파일명`
`unzip 압축파일명 -d 압축풀장소`

## BOOT 용량 초과일 시
리눅스 커널 업데이트 파일들이 많아서 발생한다. 현재 버전과 오랜된 버전(백업용)은 놓아두고 그 외 버전을 삭제한다.
### 방법
1. `uname -r` : 현재 커널 버전을 확인한다.
2. `dpkg -S vmlinuz` : 설치된 커널 버전들을 체크
3. 현재 버전과 제일 오래된 버전을 제외하고 하나씩 제거를 시작한다.
4. `dpkg -l "*3.13.0.29*"` : 해당 버전에 관련된 패키지들의 리스트
5. `sudo apt-get purge 삭제할패키지명` : 패키지를 삭제한다.

### 출처
[출처 블로그](http://mizzhinp.tistory.com/entry/UBUNTU-%EC%9A%B0%EB%B6%84%ED%88%AC-BOOT-%EC%9A%A9%EB%9F%89%ED%99%95%EB%B3%B4-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%ED%98%B9%EC%9D%80-%EB%B6%80%ED%8C%85%EC%9D%B4-%EC%95%88%EB%90%A0%EB%95%8C)

## 각 파티션 별로 용량 확인
- `df`
- `df -h` : 사람이 보기에 편하게 출력

[출처 블로그](http://ngee.tistory.com/377)

## 폴더 바로가기 생성(링크 생성)

### 방법
`ln -s /my/folder /my/link`

### 출처
https://askubuntu.com/questions/1035562/how-to-create-folder-shortcut-in-ubuntu-18-4

## JDK uninstall 삭제하기
### 방법
1. `java -version` 자바 현재 사용 버전 확인
2. `sudo dpkg --list | grep -i jdk` 설치된 jdk 패키지 목록 확인
3. `sudo apt-get purge oracle-java8-installer`
4. `sudo apt-get autoremove` 관련 패키지 삭제
5. `sudo dpkg --list | grep -i jdk` 정상 삭제가 되었는지 확인

### 출처
https://askubuntu.com/questions/850729/how-to-uninstall-oracle-jdk-in-ubuntu-16-04-lts?rq=1

## jdk 설치하기
### 방법
1. `java -version` 현재 설치 자바 버전확인
2. `apt-get update` 패키지 정보 업데이트
3. `apt-get install default-jre` 자바 실행 버전 설치. ubuntu 18.04는 openjdk-11-jre
4. `apt-get install default-jdk` 자바 개발 버전 설치

### 출처
https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-18-04

## MYSQL 제거 및 설치
### 방법
```
$ sudo mkdir /var/run/mysqld; sudo chown mysql /var/run/mysqld
$ sudo mysqld_safe --skip-grant-tables&
$ sudo mysql --user=root mysql
update user set authentication_string=PASSWORD('new-password') where user='root';
flush privileges;
$ sudo service mysql stop
$ sudo service mysql start
$ sudo mysqladmin shutdown
$ sudo service mysql start
$ sudo mysql -uroot -p
```
### 출처
https://askubuntu.com/questions/766900/mysql-doesnt-ask-for-root-password-when-installing
