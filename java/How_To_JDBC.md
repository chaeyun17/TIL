# JDBC JAVA 연동
ojdbc5.jar: 10g  
ojdbc6.jar: 11g  
ojdbc6_g.jar: 11g compact version  

## 작업
1. DB 라이브러리 파일 가져오기
경로: `C:\oraclexe\app\oracle\product\11.2.0\server\jdbc\lib`  
파일명: `ojdbc6.jar`  
2. 이클립스 자바 프로젝트 생성
3. lib 새 폴더 생성
4. `ojdbc6.jar` lib 폴더에 붙여넣기
5. 이클립스 프로젝트 설정에서 class path -> library -> add 


## oracle database 라이브러리 사용하기
1. oracle 설치 폴더에서 `ojdbc6.jar` 파일 복사하기  
	D:\app\유저명\product\11.2.0\dbhome_1\jdbc\lib\
2. jre 폴더에 `ojdbc6.jar` 라이브러리 파일 붙여넣기  
	C:\Program Files\Java\jre1.8.0_172\lib\ext
3. 프로젝트 오른쪽 클릭 -> Properties -> Build Path -> Libaries 탭 -> Add External JARs
-> `ojdbc6.jar` 불러오기  
  
출처: [자바와 오라클 연동하기 <1> - JDBC 드라이버, 세상의모든기록](http://all-record.tistory.com/69)
