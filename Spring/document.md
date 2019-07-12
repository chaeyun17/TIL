# 스프링
https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans

# 핵심기술
스프링 프레임워크 중에서는 Inversion of Control(IOC) container가 가장 중요합니다. 
Spring's Aspect-Oriented Programming(AOP) 기술이 배경으로 사용된다.
Spring framework는 자신만의 AOP 프레임워크를 가지고 있으며, 개념적으로 이해하기가 쉽고 그리고 Java Enterprise Programming 에서 AOP 요구사항의 80%를 만족한다.

Spring은 AspectJ와의 통합을 제공한다. AspectJ는 현재 기능적으로 가장 풍부하고 Java Enterprise Programming에서 AOP 구현이 가장 잘 되었다.

# 1. The IoC Container
이 챕터는 Spring의 Inversion of Control(IoC) container 를 다룬다.

## 1.1 Spring IoC Container 그리고 Beans 소개
이 챕터는 Inversion of Control(IoC) 원칙을 구현한 스프링 프레임워크에 대해 다룬다. IoC 는 dependecy injection(DI) 라고도 알려져있다. 객체들이 그들의 의존성들을 정의하는 과정이다. (이 의존성들은 그것들과 협동하는 다른 객체들이다). 의존성 주입은 생성자 매개변수들, 팩토리 메서드 매개변수들, 또는 생성되거나 팩토리 메소드로부터 리턴된 객체 인스턴스에 설정된 프로퍼티들을 통해 이루어진다. 컨테이너는 빈을 생성할 때, 의존성을 주입한다. 
이 과정은 기본적으로 직접적은 클래스들의 생성을 사용하거나 Service Locator pattern 같은 매커니즘을 사용하여 인스턴스화 또는 의존성의 위치를 제어하는 빈 자신을 뒤집는 것이다.

`org.springframework.beans` 와 `org.springframework.context` 패키지들은 스프링 프레임워크 IoC 컨테이너의 기초이다. `BeanFactory` 인터페이스는 어떠한 타입의 객체들도 관리할 수 있는 고급 설정 매커니즘 제공한다. ApplicationoContext는 BeanFactory의 하위 인터페이스이다. 이것은 다음과 같은 것을 더한다.

- Spring의 AOP 요소들을 쉽게 통합할 수 있게 한다.
- 메시지 리소스를 처리(국제화를 위한)
- Event publication
- 웹앱에서 사용되는 `WebApplicationContext`와 같은 어플리케이션 별 contexts. 

요약하자면, `BeanFactory`는 프레임워크 설정과 기능적인 기초를 제공한다. 그리고 `ApplicationContext`는 더 enterprise에 맞는 기능들을 추가한다. `ApplicationContext`는 `BeanFactory`의 전체 상위 집합이다. 그리고 `ApplicationContext`는 스프링 IoC 컨테이너 설명을 하는 이번 챕터에서 전적으로 다뤄진다. `ApplicationContext` 대신 `BeanFactory`를 다루는 더 많은 정보들은 [The BeanFactory](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-beanfactory)를 보면 된다.

스프링에선 당신의 어플리케이션 중추를 담당하며 Spring IoC 컨테이너에 의해 관리되는 객체들을 beans라고 부른다. 한 Bean은 스프링 IoC 컨테이너에 의해 인스턴스화된, 조합된, 아니면 다른 방식들로 관리되는 객체이다.
그렇지 않다면, 한 bean은 당신의 어플리케이션에서 단순하게 많은 객체들 중 하나일 것이다. Bena들은 그리고 그들 사이의 의존성들은 한 컨테이너에서 사용하는 설정 메타데이터들에서 보여준다.

## Container Overview
`org.springframework.context.ApplictaionContext` 인터페이스는 Spring IoC 컨테이너를 나타낸다. 그리고 인스턴스화, 설정, 그리고 bean들의 조립에 대해 책임을 맡는다. 컨테이너는 설정 메타데이터를 읽음으로써 인스턴스화, 설정 그리고 조립할 객체들에 대한 지시를 받는다. 그 설정 메타데이터들은 XML, Java annotaions, 또는 java code 형태로 표현된다. 이것으로 어플리케이션을 구성하는 객체들과 이 객체들 사이의 많은 상호의존성을 표현할 수 있다.

`ApplicationContext` 인터페이스의 여러 구현에서 Spring의 지원을 받는다. 독립 실행형 어플리케이션에서, `ClassPathXmlApplicationContext` 또는 `FileSystemXmlApplicationContext` 인스턴스를 생성하는 것이 일반적이다. XML은 설정 메타데이터를 정의하는 데 전통적인 포맷인 반면, 이러한 추가 메타데이터 형식을 지원할 수 있도록 작은 양의 XML 설정을 제공함으로써 메타데이터 포맷으로써 Java annotation 또는 java code를 사용해서 컨테이너에 지시할 수 있다. 

