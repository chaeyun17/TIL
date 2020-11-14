# 스프링 기본 개념들

## IoC
- Inversion Of Control.
- 의존관계를 개발자가 직접 코딩으로 설정하지 않고, Spring Framework가 의존관계를 설정하고 관리하는 방식이다.
- IOC 방식을 사용하면 장점들
    - 객체를 Bean으로 설정하면 기본 설정으로 싱글톤으로 생성된다. 디자인패턴을 쉽게 사용할 수 있다.
    - 객체 생성 전이나 후에 특정한 행동을 하도록 라이프 사이클을 이용할 수 있다.

## IoC Contaier
- 스프링 Container에서 Bean들을 관리한다. 컨테이너에서 IOC 방식을 사용하는 것이다.

## Bean
- 스프링 IoC Container에서 관리하는 객체들이다.
- 이 Bean들은 IoC Container에 의해 초기화 생성되고, 조립되고, 관리된다.

