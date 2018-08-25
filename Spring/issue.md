# 이슈

## ojdbc6.jar를 로컬 maven 에 추가하기
ojdbc 드라이버는 maven repository에 존재하지 않는다. ojdbc6 파일을 oracle 사이트에서 다운 받아서, maven 에 등록하여야 한다. 명령어를 통해 ojdbc6 파일을 local repository에 추가하여야 한다.

### 방법
1. ojdbc6를 oracle 사이트에서 다운로드한다.
2. 프로젝트가 저장된 폴더에 lib라는 새 폴더를 생성하고, 그 곳에 ojdbc6.jar를 이동시킨다.
3. 이클립스에서 프로젝트 오른쪽 클릭 -> Run As -> Run Configuration 선택
4. 왼쪽 리스트에서 `Maven Build` 하위리스트인 `내 프로젝트 이름` 선택
5. 아래의 명령어를 빈칸에 맞게 입력.
```
mvn install:install-file
	-Dfile=ojdbc6.jar
	-DgroupId=com.oracle
	-DartifactId=ojdbc6
	-Dversion=11.2.0
	-Dpackaging=jar
```
- Goals 칸에는 `install:install-file `
- 밑에 Parameter Name / Value 에서 Add 하기
- Name: `file` , Value: `lib\ojdbc6.jar` 를 입력 후, Ok
- Name: `groupId` , Value: `com.oracle` 를 입력 후, Ok
- Name: `artifactId`, Value: `ojdbc6` 를 입력 후, Ok
- Name: `version`, Value: `11.2.0` 를 입력 후, Ok
- Name: `packaging`, Value: `jar` 를 입력 후, Ok

6. Apply 를 하고, Run 클릭. console 창에 build success 확인.
7. 프로젝트 pom.xml에 denpendency 추가
```xml
<!-- ojdbc6.jar -->
<dependency>
	<groupId>com.oracle</groupId>
	<artifactId>ojdbc6</artifactId>
	<version>11.2.0</version>
</dependency>
```
8. 테스트로 프로젝트 실행해보기

### 참고
- https://www.mkyong.com/maven/how-to-add-oracle-jdbc-driver-in-your-maven-local-repository/
- https://www.slipp.net/wiki/pages/viewpage.action?pageId=21004440


## jdk 1.8로 기본설정 세팅하기
기존 maven-compiler-plugin 은 jdk1.5 버전이다. 그래서 pom.xml에 설정을 추가하여 jdk1.8로 버전을 변경해야 한다.
pom.xml 은 기존 부모설정을 오버라이드하는 원리이다.

### 방법
1. pom.xml에 해당 코드를 추가한다.
```xml
<build>
	<plugins>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>3.6.1</version>
			<configuration>
				<source>1.8</source>
				<target>1.8</target>
			</configuration>
		</plugin>
	</plugins>
</build>
```
2. 프로젝트 오른쪽 클릭 maven - Update project 실행

** 테스트 중 실행금지 **
2. 프로젝트 오른쪽 클릭 - Rus As - Configureation 선택
테스트필요: goals에 `eclipse:clean eclipse:eclipse` 입력
3. Run

### 참고
- https://www.slipp.net/wiki/pages/viewpage.action?pageId=21004440



## 스프링 프로젝트 테스트 해보기
junit 알아보기

## sql 에러
**에러 코드**  
java.sql.SQLIntegrityConstraintViolationException: Cannot add or update a child row: a foreign key constraint fails
**원인**  
존재하지 않는 참조키를 추가하려고 했음. 먼저 참조대상이 되는 부모 테이블에 참조 데이터가 필요함.


**에러 코드**
WARN: Establishing SSL connection without server's identity verification is not recommended. According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn't set.
**원인**
mysql 접속 url에 `&autoReconnect=true&useSSL=false` 추가하여 세팅

## jsp에서 자기 앱 홈 주소로 이동하기
`${pageContext.request.contextPath}` 결과는 `/앱이름` 이다. 이것을 사용하면 된다.

출처: https://stackoverflow.com/questions/2204870/how-to-get-domain-url-and-application-name

## jsp에서 java 함수 사용하기
1. `<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>`
2. `<c:set var = "string2" value = "${fn:substring(string1, 5, 15)}" />`

출처: https://www.tutorialspoint.com/jsp/jstl_function_substring.htm

## Date에서 String 으로 데이터타입 변환
```java
public void convertDateToString(Date dt){
	DataFormat df = new SimpleDateFormat("dd/MM/yyyy");
	Stirng dateStr = df.format(dt);
	return dateStr;
}

public String convertDateToString(Date dt, String pattern){
	DateFormat df = new SimpleDateFormat(pattern);
	String dateToString = df.format(df);
	return dateToString;
}
```

출처: https://stackoverflow.com/questions/17207600/convert-date-to-string-in-spring-3   
패턴: http://tutorials.jenkov.com/java-internationalization/simpledateformat.html

## ResultSet에서 Date 와 Time 받기
resultSet 에서 getTimestamp() 사용.

## Mysql 연결 에러
- timezone 에러일 경우: 5.1 이하 버전을 사용해서 해결하거나 접속할 때 timezone을 Asia/Seoul로 설정하면된다.  
`jdbc.url=jdbc:mysql://localhost:3307/board02?user=board02&password=1111&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=Asia/Seoul&autoReconnect=true&useSSL=false`

## 서버 배포
참고: http://luckyyowu.tistory.com/124
