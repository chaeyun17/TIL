# Spring Data JPA

- JPA는 인터페이스를 통해 DAO객체를 자동으로 생성해주는 강력한 기능을 가지고 있다.

- `@SpringBootApplication` 다음과 같은 어노테이션을 추가하는 편리한 어노테이션이다.

  - `@Configuration` 어플리케이션 컨텍스트를 위한 Bean 정의 소스 클래스를 태그하기 위함이다.
  - `@EnableAutoConfiguration` 는 스프링 부트가 빈들을 추가하면서 시작하는 것을 뜻한다. 이 빈들은 classpath 설정, 다른 빈들, 그리고 다양한 프로퍼티 설정들을 기초로 한다.
  - `@EnableWebMvc`: Spring Boot는 class path에 `spring-webmvc`가 보이면 해당 어노테이션을 자동으로 설정한다. web application이라는 것을 상징한다. 그리고 `DispatcherServlet`을 세팅하는 중요한 행동을 한다.
  - `@ComponetScan`: 스프링이 다른 컴포넌트들, 설정들(Configurations), 그리고 서비스들을 같은 패키지에서 찾는다. 그리고 컨트롤러도 찾는다.

## 연동 관계 엔티티 JSON 반환 문제
**에러**  
json 형태로 response할 때, 에러가 뜬다. 연관된 엔티티에 무한루프에 든다는 추측이다. 확인필요
```
com.fasterxml.jackson.databind.exc.InvalidDefinitionException: No serializer found for class org.hibernate.proxy.pojo.javassist.JavassistLazyInitializer and no properties discovered to create BeanSerializer (to avoid exception, disable SerializationFeature.FAIL_ON_EMPTY_BEANS) (through reference chain: io.iochord.dev.bhias_client.domain.Member["role"]->io.iochord.dev.bhias_client.domain.Role_$$_jvstaae_1["handler"])
```

**해결법** 

- `@JsonBackReference`: 참조 하위까지 json으로 다루지 않는다. 생략
- `@JsonManagedReference`: 참조를 json에 포함한다.


```java
private class Player {
    public int id;
    @JsonManagedReference
    public Info info;
}

private class Info {
    public int id;
    @JsonBackReference
    public Player parentPlayer;
}
```

**참고**
- https://stackoverflow.com/questions/37392733/difference-between-jsonignore-and-jsonbackreference-jsonmanagedreference/37394318
- https://www.baeldung.com/jackson-bidirectional-relationships-and-infinite-recursion
- http://spring.io/projects/spring-data-jpa
- [예제들](https://github.com/spring-projects/spring-data-examples/tree/master/jpa)
- [튜토리얼](https://spring.io/guides/gs/accessing-data-jpa/)

## Initialize a Database Using Hibernate

### Database Schema 생성
```
spring.jpa.hibernate.ddl-auto=create-drop
```
spring.jpa.hibernate.ddl-auto 값으로는 none, validate, update, create, create-drop이 있다.

- validate: validate the schema, makes no changes to the database.
- update: update the schema.
- create: creates the schema, destroying previous data.
- create-drop: drop the schema at the end of the session
- none: is all other cases.

### Data Insert
`src/main/resources/import.sql` 을 생성을 합니다. 내용에 insert sql문을 작성합니다.

### Initalize a Database using Spring
`spring.datasource.platform` 설정을 통해 h2, mysql, mariadb를 정합니다. 그리고 `scheme-{$platform}.sql` 과 `data-{$platform}.sql` 을 생성을 합니다. `scheme-{$platform}.sql` 내용으로 초기 테이블을 생성하는 DDL(Create table 등)이 들어가며, `data-{$platform}.sql` 내용에는 초기 데이터를 삽입하는 DML(Insert 등)이 들어갑니다. 따로 platform을 설정하지 않을 경우에는 `scheme.sql` 과 `data.sql` 이름 명칭을 사용합니다.

`spring.jpa.hibernate.ddl-auto` 를 사용하는 경우에, schema.sql은 중복이 되기 떄문에 hiberante 방식 또는 spring 방식 중 하나를 선택하여야 합니다. 테스트를 해본 결과, embeded DB 에서는 data.sql이 작동하지만, DBMS에서는 data.sql 스크립트 실행이 되질 않습니다. DBMS를 사용하는 경우에는 Hibernate 방식 사용을 추천드립니다.

**참고**
- https://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html#howto-initialize-a-database-using-hibernate

## @JoinColumn Annotaion

The `@JoinColumn` annotation defines that actual physical mapping on the owning side.

the value of `mappedBy` is the name of the association-mapping attribute on the owning side. 

`@JoinColumn`은 컬럼 소유 엔티티에서 물리적으로 mapping되는 DB 컬럼을 지정한다. 

`mappedBy`는 컬럼 소유 엔티티 쪽의 맵핑된 속성명이다. 양방향으로 Join.

**OneToOne**

```java
@Entity
public class Office {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "addressId")
    private Address address;
}
```
  
**OneToMany**
```java
@Entity
public class Employee {
  
    @Id
    private Long id;
 
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "employee")
    private List<Email> emails;
}
 
@Entity
public class Email {
  
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
```
**참고**
- https://www.baeldung.com/jpa-join-column
- https://www.baeldung.com/jpa-joincolumn-vs-mappedby