# JDBC
Java Database Connectivity. 자바에서 데이터베이스에 접속할 수 있도록 하는 자바 API이다. JDBC는 데이터베이스에서 자료를 쿼리하거나 업데이트하는 방법을 제공한다.
- JDBC 드라이버: JDBC 드라이버들은 자바 프로그램의 요청을 DBMS가 이해할 수 있는 프로토콜로 변환해주는 클라이언트 사이드 어댑터이다.
  
[JDBC, WIKI백과](https://ko.wikipedia.org/wiki/JDBC)

## method
package java.sql
- stmt.executUpdate(sql): 인자로 전달된 sql문 실행. 반환값은 실행된 행의 갯수.
- stmt.executeQuery(sql): 인자로 전달된 sql문 실행. 반환값은 ResultSet 데이터 타입. 테이블이 반환.

## ResultSet 타입
- rst.hasNext(): 반환값은 Boolen 타입. 다음행이 있을 경우 TRUE. 행 커서 넘기기.
- rst.getInt(String Column || int ColumnIDX): 반환값은 컬럼에 해당하는 값. 컬럼명을 String으로 인자로 전달 또는 인자로 정수를 전달할 경우는 N번째 컬럼이 반환.

[ResultSet, java8 doc](https://docs.oracle.com/javase/8/docs/api/java/sql/ResultSet.html)

## Mapping types JDBC-JAVA
![JDBC-JAVA MAPPING TYPE](https://image.slidesharecdn.com/jdbcoracle-100512134001-phpapp02/95/jdbc-java-database-connectivity-25-728.jpg?cb=1273671644)

## JDBC Interface
- PreparedStatement: SQL문이 컴파일 된 상태로 DB에 저장되어 있다.
- CallableStatement: 저장된 프로시저를 실행한다.

### PreparedStatement
- setInt(idx, value), setString() 으로 "?"안에 value를 넣음
```java
public void insertData(int pnum, String name, String email, int bYear) {
	String sql = "insert into (pnum, name, email, bYear) ";
	sql += " values (?, ?, ?, ?)";
	
	try {
		pstmt = conn.prepareStatement(sql);
		
		pstmt.setInt(1, pnum);
		pstmt.setString(2, name);
		pstmt.setString(3, email);
		pstmt.setInt(4, bYear);
		
		pstmt.executeUpdate();
		
	} catch (SQLException e) {
		e.printStackTrace();
	}
}
```

## DTO DAO
- DTO: Data Transfer Object
- DAO: Data Access Object
- VO: Value Object. simular DTO.

## DBCP
CONNECTION POOL

관련 자료: [jdbc, dbcp 차이?](http://leminity.tistory.com/20#rp)

## Eclipse Data Source Explore 기능
1. Window - Show View - other - Data Management - Data Source Explorer
2. Data Connection 폴더에서 오른쪽 클릭 NEW
3. 설정
- connection url : jdbc:oracle:thin:@localhost:1521:xe
- user name , password 입력
4. xe - Schemas - MYJAVA - Tables - 해당 테이블
5. 해당 테이블 오른쪽 클릭 - data - edit


