# Spring Boot 업데이트 소식

## 2.5.0 버전
- 2021.05.25
- [요약 블로그 포스팅](https://spring.io/blog/2021/05/20/spring-boot-2-5-is-now-ga)
- [릴리즈 노트](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.5-Release-Notes)

### 주요
- JAVA 16 지원
- Gradle 7 지원
- 최소 Gradle 버전 6.8 이상 사용가능
- 도커 이미지 빌드 강화
- 새로운 Datasource 초기화 매커니즘

### Dependecy

- Spring Data 2021.0
- Spring HATEOAS 1.3
- Spring Integration 5.5
- Spring Kafka 2.7
- Spring Retry 1.3
- Spring Security 5.5
- Spring Session 2021.0


### 상세내용

#### SQL 스크립트 데이터소스 초기화 기능

기존 `schema.sql`과 `data.sql` 스크립트로 데이터소스를 초기화하는 방법에 변경이 있습니다. `spring.datasource.*` 에 datasource 초기화 관련 프로퍼티가 사라지고, `spring.sql.init.*` 프로퍼티로 변경되었습니다. `R2DBC` SQL DB 에서도 적용됩니다.


#### schema.sql과 data.sql 적용

기본값으로 인메모리 DB에서만 `schema.sql`과 `data.sql` 스크립트이 실행됩니다. `spring.sql.init.mode`에서 `always`를 설정함으로써 모든 SQL DB에서도 해당 스크립트가 실행됩니다.


#### Hibernate 와 data.sql

기본값으로, `data.sql` 스크립트는 Hibernate 초기화 전에 실행됩니다. Hibernate 초기화 후에 `data.sql`을 실행되도록 하고 싶다면, `spring.jpa-defer-datasource-initialzation` 프로퍼티 값을 `true`로 하면 됩니다. 데이터베이스 초기화 기술 혼합해서 사용하는 것을 권장하진 않지만, Hibernate 초기화가 작동한 후 `data.sql` 실행 전에 `schema.sql`이 실행되도록 할 수 있습니다. 


### Info Endpoint 보안화
`/info` actuator 엔드포인트는 더이상 기본설정으로 공개되지 않습니다.

### Gradle Default jar and war Tasks

Spring Boot Gradle 플러그인은 더이상 자동으로 Gradle `jar`와 `war` 테스크를 무력화(disable)시키지 않습니다. 대신에, `classifier` 를 해당 테스크에 적용하였습니다.

만약 이 테스크들을 무력화(disable)시키고 싶다면, [해당 링크](https://docs.spring.io/spring-boot/docs/2.5.0/gradle-plugin/reference/htmlsingle/#packaging-executable.and-plain-archives)를 참고하시길 바랍니다.


#### Hibernate Validator 6.2

Hibernate Validate 버전이 6.2.x로 업그레이드 됐습니다. [제약사항 메시지 방식](https://in.relation.to/2021/01/06/hibernate-validator-700-62-final-released/)이 변경되었으니, 해당 블로그 포스트를 참고하시길 바랍니다.
