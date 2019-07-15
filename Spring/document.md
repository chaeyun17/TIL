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

## 1.2 Container Overview
`org.springframework.context.ApplictaionContext` 인터페이스는 Spring IoC 컨테이너를 나타낸다. 그리고 인스턴스화, 설정, 그리고 bean들의 조립에 대해 책임을 맡는다. 컨테이너는 설정 메타데이터를 읽음으로써 인스턴스화, 설정 그리고 조립할 객체들에 대한 지시를 받는다. 그 설정 메타데이터들은 XML, Java annotaions, 또는 java code 형태로 표현된다. 이것으로 어플리케이션을 구성하는 객체들과 이 객체들 사이의 많은 상호의존성을 표현할 수 있다.

`ApplicationContext` 인터페이스의 여러 구현에서 Spring의 지원을 받는다. 독립 실행형 어플리케이션에서, `ClassPathXmlApplicationContext` 또는 `FileSystemXmlApplicationContext` 인스턴스를 생성하는 것이 일반적이다. XML은 설정 메타데이터를 정의하는 데 전통적인 포맷인 반면, 이러한 추가 메타데이터 형식을 지원할 수 있도록 작은 양의 XML 설정을 제공함으로써 메타데이터 포맷으로써 Java annotation 또는 java code를 사용해서 컨테이너에 지시할 수 있다. 

![the spring IoC container](https://docs.spring.io/spring/docs/5.1.6.RELEASE/spring-framework-reference/images/container-magic.png)

### 1.2.1 Configuration Metadata
요즘 java-based configureation을 많이 사용하고 있다.

Annoation-based configureation은 spring 2.5 버저에서 소개되었다. `Java-based configuration`은 Spring 3.0부터 시작되었다. 많은 점들이 JavaConfig로 제공되었다. XML 파일 대신 Java를 사용하여 어플리케이션 클래스 외부에서 Bean을 정의할 수 있다.

Bena 정의를 XML에서는 `<beans>` 하위에 `<bean>`으로 정의할 수 있고, JavaConfig 방식으로는 `@Configuration` 클래스 내부에 `@Bean` 어노테이션을 붙인 메소드들로 정의할 수 있다.

이러한 Bean 정의는 어플리케이션을 구성하는 실제 객체들과 일치한다. 일반적으로 서비스층 객체, DAO 객체들, Structs의 Action 인스턴스와 같은 presentation 객체들, Hibernate의 `SessionFactories`, JMS `Queues`와 같은 infrastructure 객체들을 정의한다. 일반적으로, 세분화된 도메인 객체들을 컨테이너에 설정하지 않는다. 왜냐하면, 도메인 객체들은 도메인 객체를 생성하고 사용하는 비지니스 로직과 DAO 객체들의 책임이기 때문이다. 하지만, Spring의 AspectJ 통합을 사용하여, IoC 컨테이너 제어 밖에서 생성된 객체들을 Configure 할 수 있다.

### 1.2.3 Using Container
ApplicationContext는 다양한 빈들과 그들의 의존성을 유지할 수 있는 향상된 팩토리 인터페이스이다. ApplicationContext는 bean 정의를 읽을 수 있고 접근할 수 있다. 

```
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// use configured instance
List<String> userList = service.getUsernameList();
```

ApplicationContext에서 bean들을 직접적으로 꺼내서 사용할 수 있는 메서드들을 가지고 있지만, 이상적으로 당신의 어플리케이션 코드에서는 이렇게 사용하면 안된다. 게다가 `getBeans()` 메서드가 어플리케이션 코드 내에 호출되서는 안된다. 스프링 API에 의존하지 않아야 한다. 예를 들자면, 웹 프레임워크과의 스프링 통합은 controllers와 JSF-managed 빈과 같은 다양한 웹 프레임워크 컴포넌트들을 의존성으로 제공한다. autowiring 어노테이션과 같은 메타데이터를 통해 특정한 빈에 의존성을 정의할 수 있다.

### 1.3 Bean Overview
IoC 컨테이너에는 많은 빈들을 관리하고 있다. 이 빈들은 컨테이너에 제공한 설정 메타데이터를 통해 만들어진다. 

컨테이너 내부에서, `BeanDefinition` 객체들을 통해 빈 정의를 나타낸다. 여기엔 다음과 같은 메타데이터들이 담겨있다.

- `A package-qualified class name`: 정의된 빈의 실제 구현 클래스.
- 빈 행동을 설정하는 요소들. 컨테이너에서 빈들이 어떻게 행동해야하는지에 대한 상태를 담은 것.
- 다른 빈들의 참조. 해당 빈이 일을 하는데 필요한 빈들. 이 참조는 collaborators 또는 dependencies로 불린다.
- 새롭게 생성되는 객체들에 설정될 설정 값들. 예를 들면, 컨넥션 풀을 관리하는 빈에서의 몇 개의 컨넥션 또는 풀 사이즈의 한계 같은 설정.

어떻게 빈을 생성할 것인지에 대한 정보를 담은 빈 정의 뿐만 아니라, `ApplicationContext` 구현체들은 (유저가 생성한) 컨테이너 밖에서 존재하는 객체들을 등록하도록 할 수 있다. 이 작업은 `getBeanFactory()` 메서드를 통한 ApplicationContext의 BeanFactory 접근을 통해 이루어진다. 이 메서드는 BeanFactory 구현체인 `DefaultListableBeanFactory`를 반환하는 메서드이다. `DefaultListableBeanFactory`는 `registerSingleton()` 과 `registerBeanDefinition()` 메서드를 통해 객체들을 등록할 수 있다. 하지만 일반적으로 어플리케이션은 빈 정의 메타데이터를 통해 정의된 빈들과만 일을 한다.

