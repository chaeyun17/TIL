# JDBC
Java Database Connectivity. 자바에서 데이터베이스에 접속할 수 있도록 하는 자바 API이다. JDBC는 데이터베이스에서 자료를 쿼리하거나 업데이트하는 방법을 제공한다.
- JDBC 드라이버: JDBC 드라이버들은 자바 프로그램의 요청을 DBMS가 이해할 수 있는 프로토콜로 변환해주는 클라이언트 사이드 어댑터이다.

[JDBC, WIKI백과](https://ko.wikipedia.org/wiki/JDBC)

자바 언어로 다양한 종류의 관계형 데이터베이스에 접속하고 SQL문을 수행하여 처리하고자 할 때 사용되는 표준 SQL 인터페이스 API이다.
JDBC는 자바의 표준 에디션(SE)에서 지원하는 기술이다. 접속하려는 DBMS 서버에 따른 JDBC 드라이버가 필요하다.
- 연동 과정: JDBC 프로그램 - DB API(java.sql 패키지) - JDBC 드라이버 - DB

출처: <처음해보는 Servlet&JSP 웹 프로그래밍, 오정임 저>

## JDBC 인터페이스
JDBC 인터페이스(interface)는 JDBC 프로그래밍을 하기 위한 API들이다. SE에서 제공하는 java.sql 패키지를 의미한다. 
주로 인터페이스를 클래스로 구현하면서 JDBC 프로그래밍한다. 이미 구현한 클래스 파일들이 JDBC 드라이버에 있다. DB 벤더사에서 내려받는다.

## JDBC 드라이버
java.sql 패키지의 인터페이스들을 상속하여 구현한 JDBC 드라이버 파일을 준비해서 자바 프로그램에 연동해야 한다. 

### 드라이버 파일 
`C:\oraclexe\app\oracle\product\11.2.0\server\jdbc\lib` 에 ojdbc6.jar 파일.
또는 오라클 홈페이지에서 다운받을 수 있다.

### 드라이버 파일 연결
- WAS가 설치된 HOME 폴더 밑의 lib 폴더: 모든 웹 어플리케이션에 사용 가능.
- 각 어플리케이션의 `/WEB-INF/lib` 폴더: 해당 어플리케이션에만 사용.

## 구현
1. JDBC 드라이버 로딩
2. DBMS 서버와 접속하기
3. Statement 또는 preparedStatement 객체 생성
4. SQL 문 실행
5. 자원 해제

### 1. JDBC 드라이버 로딩
`Class.forName("oracle.jdbc.driver.OracleDriver")`
forName() 메소드는 static으로 선언되어 있어서 사용할 때 "클래스이름.메소드이름()" 형태로 사용한다. 
JDBC 드라이버 파일 안에 드라이버 인터페이스를 상속하고 있는 클래스 이름을 패키지 이름과 함께 명시한다.
Class.forName()에 의해 JDBC 드라이버 파일의 드라이버 인터페이스를 상속한 클래스가 동적으로 로딩될 때, 자동으로 JDBC 드라이버 인스턴스가 생성되어 사용준비가 완료된다.

### 2. DBMS 서버 접속
연결작업은 java.sql 패키지의 DriverManager 클래스의 getConnection() 메소드를 사용한다.
`static Connection getConnection(String url, String user, String password)`
`Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "scott", "tiger")`
- `jdbc:oracle:thin@`: 오라클 protocol
- `localhost`: 서버주소
- `1521`: 서버 포트
- `xe`: DB 이름
Connection 객체는 네트워크상의 연결 자체를 의미한다.

### 3-1. Statement 객체
DB와 Java 프로그램 간에 sql 또는 처리결과를 전달하는 객체.
`Statement stmt = conn.createStatement()`

### 3-2. PreparedStatement 객체
Statement를 통해 SQL문을 동적으로 작성할 때는 일일이 작은 따음표와 쉼표를 챙겨야 한다. 이 작업을 쉽게 하도록 하는 객체가 PreparedStatement 이다.
prepareStatement() 메소드를 통해 PreparedStatement 객체를 생성할 때 인자값으로 실행할 SQL문을 지정하는데, 값을 동적으로 지정할 때는 ? 기호로 대체할 수 있다.
```java
PreparedStatement pstmt = conn.prepareStatemnet("INSERT INTO test VALUES (?,?)");
pstmt.setString(1, id);
pstmt.setString(2, pwd);
pstmt.executeUpdate();
```
PreparedStatement 메소드
- setString(int parameterIndex, String x)
- setTime(int parameterIndex, Time x)

### 4. SQL문 실행
`ResultSet executeQuery(String sql)`
`int executeUpdate(String sql)`
ResultSet 객체는 내부적으로 위치를 나타내는 cursor 개념이 있다. 시작 빈행과 끝 빈행을 가지고 있다.
- void afterLast(), void beforeFirst(), boolean next()
- String getString(int columIndex), String getString(String columnLabel)
- [ResultSet, java8 doc](https://docs.oracle.com/javase/8/docs/api/java/sql/ResultSet.html)
- ![JDBC-JAVA MAPPING TYPE](https://image.slidesharecdn.com/jdbcoracle-100512134001-phpapp02/95/jdbc-java-database-connectivity-25-728.jpg?cb=1273671644)

### 자원해제
Connection, Statement 또는 PreparedStatement, ResultSet 을 메모리 자원에서 해제해야 한다.
close() 메소드를 사용한다.


-----
-----

## JNDI
Java Naming and Directory Interface는 API와 SPI로 이루어져 있으며, API는 어플리케이션에서 네이밍 혹은 디텍터리 서비스에 접근하는데 사용하며, SPI는 새로운 서비스를 개발할 때 사용한다. 

### Naming & Directory 서비스
분산환경에서 자원을 연결해주는 기능.

분산 컴퓨팅과 엔터프라이즈 컴퓨팅 환경에서의 자원 획득과 이용의 효율성을 위해 제공하는 서비스가 Naming & Directory이다.

실제로 자원을 서비스하는 것이 아니라, 어떤 서버나 어플리케이션에서 분산환경에 서비스하고자 하는 자원을 이 Naming & Directory 서버에 이름값과 실제 자원을 연결하여 등록하면,

해당 자원을 이용하고자 하는 아른 어플리케이션에서 Naming & Directory 서버에 접근하여 이름값만을 가지고 자원을 연결하여 이용하는 개념이다.

### 구현
1. server.xml 설정  
Connection Pool은 서버에서 관리하는 자원이다. WAS_HOME/conf/server.xml
```xml
<GlobalNamingResources>
	<Resource driverClassName="oracle.jdbc.driver.OracleDriver"
			  url = "jdbc:oracle:thin:@127.0.0.1:1521:xe"
			  username="scott"
			  password="tiger"
			  name="jdbc/myoracle"
			  type="javax.sql.DataSource"
			  maxActive="4"
			  maxIdle="2"
			  maxWait="5000"
	/>
</GlobalNamingResources>
```
2. context.xml 설정  
서버에 등록된 리소스를 웹 어플리케이션에서 찾아서 사용할 수 있도록 글로벌한 이름을 지정.
WAS_HOME/conf/context.xml
```xml
<ResourceLink global="jdbc/myoracle" name="jdbc/myoracle" type="javax.sql.DataSource"/>
```
3. web.xml 설정  
서버에서 관리하는 리소스를 웹 어플리케이션에서 사용하기 위하여 설정.
`/WEB-INF/web.xml`
```xml
<resource-ref>
	<description>Oracle Datasource example</description>
	<res-ref-name>jdbc/myoracle</res-ref-name>
	<res-type>javax.sql.DataSource</res-type>
	<res-auth>Container</res-auth>
</resource-ref>
```
4. DB 작업  
```jsp
<%@ page language="java" 
		 contentType="text/html;charset=UTF-8"
		 pageEncoding="UTF-8"
%>
<%@ page import="java.sql.*" %>
<%@ page import="javax.sql.*" %>
<%@ page import="javax.naming.*" %>
<%
	//1. JDNI 서버 객체 생성
	InitialContext ic = new InitialContext();
	//2. lookup()
	DataSource ds = (DataSource) ic.lookup("java:comp/env/jdbc/myoracle");
	//3. getConnection()
	Connection conn = ds.getConnection();
	
	Statement stmt = conn.createStatement();
	ResultSet rs = stmt.executeQuery("select * from test");
	
	while(rs.next()){
		out.print("<br>"+rs.getString("id")+":"+rs.getString(2));
	}
	
	rs.close();
	stmt.close();
	conn.close();
%>
```

## DTO DAO
- DTO: Data Transfer Object
- DAO: Data Access Object
- VO: Value Object. simular DTO.

## Eclipse Data Source Explore 기능
1. Window - Show View - other - Data Management - Data Source Explorer
2. Data Connection 폴더에서 오른쪽 클릭 NEW
3. 설정
- connection url : jdbc:oracle:thin:@localhost:1521:xe
- user name , password 입력
4. xe - Schemas - MYJAVA - Tables - 해당 테이블
5. 해당 테이블 오른쪽 클릭 - data - edit


