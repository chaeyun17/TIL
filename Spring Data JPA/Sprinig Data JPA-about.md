# JPA
- Java Persistence API
- 관계형 데이터베이스를 java로 관리하기 위한 클래스들과 메소드들의 모음이다. 
- 관계형 데이터베이스를 사용하기 위해 프로그래머들은 많은 코드를 작성해야한다. JPA Provider 프레임워크로 이런 코드 작성 작업을 줄일 수 있다.
- JPA는 자바의 object models 과 데이터베이스의 relational models 간의 다리 역할을 한다.
- 오픈소스이기 때문에 Enterprise vendors 이 있다. Oracle, Redhat, Eclipse 등. 이들은 JPA를 취향에 맞게 새로운 제품에 추가하여 제공한다. 이 제품들로는 Hiberante, Eclipselink, Toplink, Spring Data JPA 등이 있다.

## Spring Data JPA
- persistence 영역 구현 도와주는 역할을 하는 컴포넌트이다. Repostiroy 기반으로 JPA를 사용할 수 있다. Repository 를 interface로 만들면, spring data jpa가 자동으로 구현을 해준다.
- Spring Data JPA는 JPA Data Access Abstraction 이다. JPA 데이터에 접근하기 위한 추상화한 스프링의 한 부분이다. 그래서 여러 데이터베이스 제품에 코드를 바꾸지 않아도 사용이 가능하다.
- Spring framework의 한 부분이다. data access layer에 대한 구현 코드들을 줄이는 일을 한다. 
- Spring Data JPA는 JPA Provider가 아니다. JPA Provider 위로 추가적인 추상 Layer를 추가하는 라이브러리/프레임워크이다.

## Hibernate
- Hibernate는 자동으로 구현을 도와주도록 한다. 
- Hibernate는 자바 기반의 ORM 툴이다.
- Object-Relational Mapping. ORM 이라고 부른다.
- domain model objects 와 relational database tables 간 맵핑을 한다.
- Hibernate는 JPA 구현체이다.
- Hibernate는 Database와 통신을 할 때, JDBC를 사용한다.

# 참고
- https://www.tutorialspoint.com/jpa/jpa_introduction.htm
- https://dzone.com/articles/what-is-the-difference-between-hibernate-and-sprin-1