# How to ...?

## 유저 추가하기
### 참고
- https://www.digitalocean.com/community/tutorials/how-to-create-a-sudo-user-on-ubuntu-quickstart

## 파일 전송하기
`pscp -P 포트번호 전송파일 유저명@주소:디렉토리`

## pputy ssh 연결하기
1. putty gen 실행해서 암호화키 생성
2. private key는 접속자가 저장
3. public key 는 
`[root@ ~]# mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys << EOL` 명령어를 통해 입력
마지막에 EOL 작성
4. putty 설정->ssh->Auth 에서 2번의 private key를 첨부.
5. putty 를 통해 접속

## oracle 11g xe 설치하기
- http://meandmyubuntulinux.blogspot.com/2012/05/installing-oracle-11g-r2-express.html