# 이슈 정리

## Logging JPA Queries
**1. To Standard Output**  
The simplest way is to dump the queries to standard out is to add the following to application.properties
```
spring.jpa.show-sql=true 
```
To Beautify or pretty print SQL, we can add
```
spring.jpa.properties.hibernate.format_sql=true
```

**2. Via logger**
```
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descripter.sql.BasicBinder=TRACE
```
The first line logs the SQL queries, and the second statement logs the prepared statement parameters.

참고: https://www.baeldung.com/sql-logging-spring-boot

## Loggin Level 조절
- dependency: spring-boot-starter
```
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate=ERROR
```
- src/main/resources/application.preoperties
- 참고: https://docs.spring.io/spring-boot/docs/current/reference/html/howto-logging.html

