# Java 설치하기

## Ubuntu에 JAVA JDK 설치하기
원본: [How to Install Java on Ubuntu](https://thishosting.rocks/install-java-ubuntu/#comment-6661)  
본문에는 자바를 설치하는 방법 세 가지를 소개한다. 원하는 방법을 한 가지 선택해서 진행한다. 마지막으로 자바 세팅 과정을 진행하면 된다.

### 첫번째 방법
기존 설치된 자바를 업데이트 하는 방식
1. `sudo apt-get update && sudo apt-get upgrade`
2. `sudo apt-get install default-jdk`

### 두번째 방법
Oracle JDK를 사용해서 설치해보기
1. `sudo apt-get update && sudo apt-get upgrade`
2. `sudo apt-get install softwate-properties-common`
3. `sudo add-apt-repository ppa:webupd8team/java`  
  써드파티에서 oracle jdk를 다운받는 명령어
4. `sudo apt-get update`
5. `sudo apt-get install oracle-java9-installer`

### 세번째 방법
수동으로 Oracle JDK를 설치하기. 초심자에게 비추천.
1. `sudo apt-get update && apt-get upgrade`
2. `sudo wget -c --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/9.0.4+11/c2514751926b4512b076cc82f959763f/jdk-9.0.4_linux-x64_bin.tar.gz`
3. `sudo mkdir /opt/java`
4. `sudo tar -zxf jdk-9.0.4_linux-x64_bin.tar.gz -C /opt/java`

### 자바 세팅
위 세 가지 방법 중 하나로 설치를 완료 후, 이 단계를 수행한다. 모든 프로그램에서 자바를 사용하기 위해서이다.
1. `java -version`
	제대로 설치됐는지 확인.
2. `update-alternatives --config java`  
  - 다른 자바 버전들이 설치되었는지 확인
  - 자바 설치 경로를 복사하기
3. `sudo nano /etc/environment`
4. `JAVA_HOME=설치경로 붙여넣기`  
  위 문장을 PATH=".." 다음 줄에 작성
5. `source /etc/enviroment`
6. `echo $JAVA_HOME`

## Window 에 JAVA JDK를 설치하기
1. JAVA JDK를 ORACLE.COM 에서 다운받기. 
	- 공부용은 JAVA 1.8 
2. 환경변수 설정 하기
3. 내 컴퓨터 -> 오른쪽클릭 속성-> 고급 시스템 속성 -> 환경변수 열기
4. 시스템변수에 JAVA_HOME 추가
	- 변수명: `JAVA_HOME`
	- 경로명: 자바 설치 경로
	- 경로명 예제: `C:\Program Files\Java\jdk1.8.0_171`
5. 시스템변수 Path 편집
	- 경로명에 `%JAVA_HOME%\bin;` 추가
6. Window 검색에서 `cmd` 검색 그리고 실행하기
7. `java` 와 `javac` 명령어 테스트
8. 정상적으로 실행되면 설치완료
