# Spring Data JPA

- JPA는 인터페이스를 통해 DAO객체를 자동으로 생성해주는 강력한 기능을 가지고 있다.

- `@SpringBootApplication` 다음과 같은 어노테이션을 추가하는 편리한 어노테이션이다.

  - `@Configuration` 어플리케이션 컨텍스트를 위한 Bean 정의 소스 클래스를 태그하기 위함이다.
  - `@EnableAutoConfiguration` 는 스프링 부트가 빈들을 추가하면서 시작하는 것을 뜻한다. 이 빈들은 classpath 설정, 다른 빈들, 그리고 다양한 프로퍼티 설정들을 기초로 한다.
  - `@EnableWebMvc`: Spring Boot는 class path에 `spring-webmvc`가 보이면 해당 어노테이션을 자동으로 설정한다. web application이라는 것을 상징한다. 그리고 `DispatcherServlet`을 세팅하는 중요한 행동을 한다.
  - `@ComponetScan`: 스프링이 다른 컴포넌트들, 설정들(Configurations), 그리고 서비스들을 같은 패키지에서 찾는다. 그리고 컨트롤러도 찾는다.

## 참고

- http://spring.io/projects/spring-data-jpa
- [예제들](https://github.com/spring-projects/spring-data-examples/tree/master/jpa)
- [튜토리얼](https://spring.io/guides/gs/accessing-data-jpa/)