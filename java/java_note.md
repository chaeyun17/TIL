# JAVA 학습 노트

## Ubuntu에 JAVA JDK 설치하기
원본: [How to Install Java on Ubuntu](https://thishosting.rocks/install-java-ubuntu/#comment-6661)  
자바를 설치하는 방법으로 3가지를 소개한다. 한 가지 방법을 선택해서 설치한 후, 자바 세팅까지 마쳐야 한다.

### 첫번째 방법
기존 설치된 자바를 업데이트 하는 방식
1. `sudo apt-get update && sudo apt-get upgrade`
2. `sudo apt-get install default-jdk`

### 두번째 방법
Oracle JDK를 사용해서 설치해보기
1. `sudo apt-get update && sudo apt-get upgrade`
2. `apt-get install softwate-properties-common`
3. `add-apt-repository ppa:webupd8team/java`  
  써드파티에서 oracle jdk를 다운받는 명령어
4. `apt-get update`
5. `apt-get install oracle-java9-installer`

### 세번째 방법
수동으로 Oracle JDK를 설치하기. 초심자에게 비추천.
1. `apt-get update && apt-get upgrade`
2. `wget -c --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/9.0.4+11/c2514751926b4512b076cc82f959763f/jdk-9.0.4_linux-x64_bin.tar.gz`
3. `mkdir /opt/java`
4. `tar -zxf jdk-9.0.4_linux-x64_bin.tar.gz -C /opt/java`

### 자바 세팅
위 세 가지 방법 중 하나로 설치를 완료 후, 이 단계를 수행한다. 모든 프로그램에서 자바를 사용하기 위해서이다.
1. `java -version`
	제대로 설치됐는지 확인.
2. `update-alternatives --config java`  
  - 다른 자바 버전들이 설치되었는지 확인
  - 자바 설치 경로를 복사하기
3. `sudo nano /etc/environment`
4. `JAVA_HOME=설치경로 붙여넣기`  
  이 문장을 PATH=".." 다음 줄에 작성
5. `source /etc/enviroment`
6. `echo $JAVA_HOME`
