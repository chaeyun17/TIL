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

## Query DSL 

- Unified Queries for Java. [QueryDSL](https://querydsl.com/)
- Java 엔터프라이즈에서 Object-relational mapping 프레임워크는 핵심이다. DB의 테이블 구조와 Java의 객체 구조 간 데이터구조를 변환해주는 작업을 대신 해주기 때문이다. JPA 구현체인 Hibernate 가 그 예시이다. Hibernate는 문자열로 작성하는 JPQL, SQL 을 지원한다. 하지만 타입 세이프하게, 쿼리 체크는 하질 못한다. 런타임 시 요청에 따라 동적으로 쿼리를 만들진 못한다. 
- 그래서 JPA 2.0 에서는 Criteria Query API 형식이 등장해서, 타입 세이프하게 쿼리를 작성 할 수 있게 되었다. 하지만 사용하기에는 매우 장황하고 가독성이 많이 떨어진다. 아래 코드 참고.
- 이러한 쿼리 작성 불편함과 가독성 한계가 있는 JPA 표준의 한계로 인해, 이런 문제점을 해결하기 위해 Query DSL 이라는 JPA 활용을 도와주는 오픈소스가 등장하게 되었다.
- [내용 참조](https://www.baeldung.com/intro-to-querydsl)

```java
// JPQL
String jpql = "SELECT p FROM Pet p":

// Criterai API
EntityManager em = ...;
CriteriaBuilder cb = em.getCriteriaBuilder();
CriteriaQuery<Pet> cq = cb.createQuery(Pet.class);
Root<Pet> pet = cq.from(Pet.class);
cq.select(pet);
TypedQuery<Pet> q = em.createQuery(cq);
List<Pet> allPets = q.getResultList();


// QueryDSL
List<Pet> list = queryFactor.selectFrom(p)
                              .fetch();

```


### 장점
- 기존에는 JPQL, SQL로 작성했던 쿼리문을 Java Code로 작성함으로써, 컴파일 단계에서 잘못된 쿼리를 잡을 수 있어서 실수 방지를 막을 수 있다. 또, Java Code로 관리하기 때문에 더 프로그래밍적으로 쿼리를 동적으로 관리할 수 있다.

### 단점
- QueryDSL을 사용하기위해 초반에 설정들이 있다.

# 참고
- https://www.tutorialspoint.com/jpa/jpa_introduction.htm
- https://dzone.com/articles/what-is-the-difference-between-hibernate-and-sprin-1