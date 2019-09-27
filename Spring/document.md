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

### 1.3.1. Naming Beans
모든 빈은 하나 또는 하나 이상의 식별이름을 갖는다. 이러한 식별자는 컨테이너 내에서 유일해야 한다. 보통 빈은 한 개의 식별자만을 가진다. 하지만 식별자를 하나 이상을 원할 경우, 추가 가명을 사용할 수 있다. XML 기반 설정 메타데이터에서는 id 속성과 name 속성을 사용하거나 둘 다를 빈 식별자로 사용한다. id 속성은 정확히 한 가지 아이디를 특정한다. 관습적으로, 이러한 이름들은 alphanumeric 이다. (myBean, someService 등). 그러나그들은 특별한 문자열들을 포함할 수 있다. 빈에 다른 가명을 사용하려면, name 속성을 통해 할 수 있다. 콤마(,)또는 세미콜론으로 나눌 수 있거나 whitespace로 나눌 수 있다.

설정에서 빈에 id 또는 name 둘 다 설정하지 않을 경우, 컨테이너는 유일한 이름을 생성한다. 그러나 이름으로 빈을 참조하고 싶을 떈, ref 엘리먼트를 사용하거나 service locator style lookup을 통해 이름을 설정해야 한다. 이름을 설정하지 않는 Motivation은 inner beans 와 autowiring collaborators를 사용하는 것과 관계가 있다.

빈 이름은 보통 소문자로 시작하는 CamealCase 방식을 컨벤션으로 사용한다. `accountManager`, `accountService` 등이 있다.

classpath에서 컴포넌트 스캔과 함께, 스프링은 이름이 없는 빈의 이름을 생성한다. 위에서 말한 camelcase 방식을 사용하여 이름을 자동 생성한다.

JavaConfiguration에서는 `@Bean` 어노테이션을 통해 alias를 설정할 수 있다.

### 1.3.2. Instantiating Beans
일반적으로 xml로 빈을 정의할 때, bean 태그 안에 class 속성을 사용해서 인스턴스화를 할 수 있다. 이것은 해당 class의 생성자를 호출해서 직접적으로 인스턴스화를 하는 것과 같다. Java code의 new 를 사용하는 것과 비슷하다.

class에 `static` 팩토리 메서드가 있다면, 컨테이너는 static 팩토리 메서드를 통해 빈을 생성한다. static 팩토리 메서드를 반환되는 객체 타입은 같은 클래스 일수도 있고 다른 클래스 일수도 있다.

#### Instatiation with a constructor
생성자 접근을 통해 빈을 생성할 떄, 모든 보통의 class들은 보통 스프링에서 사용할 수 있으며, 호환될 수 있다. 이 점은 클래스가 인터페이스를 구현하거나 specific fashion을 코딩할 필요하가 없다는 것이다. 하지만 해당 빈에 사용하는 IoC 유형에 따라 기본 생성자가 필요할 수도 있다.

스프링 컨테이너는 어떠한 클래스든 관리할 수 있다. 대부분 스프링 사용자들은 기본 생성자에다가 컨테이너의 프로퍼티를 본뜬 게터와 세터를 함께 사용한다. 컨테이너에서 빈 스타일이 아닌 클래스도 사용할 수 있다. 예를 들면, JavaBean 스펙에 절대로 충실하지 않은 레거시 컨넥션 풀을 사용할 필요가 있을 때다. 스프링은 이러한 것도 관리할 수 있다.

```
<bean id="exampleBean" class="examples.ExampleBean"/>
<bean name="anotherExample" class="examples.ExampleBeanTwo"/>
```

생성자에 매개변수를 제공하고 객체 생성 이후에 인스턴스 프로퍼티에 세팅하는 매커니즘은 Injection Dependency를 참고하면 된다.

#### Instantiation with a static Factory Method
```
<bean id="clientService"
    class="examples.ClientService"
    factory-method="createInstance"/>
```
이 static factory method를 호출할 수 있다. 그리고 마치 생성자를 통해 만든 것과 같은 live object를 리턴한다. 
```
public class ClientService {
    private static ClientService clientService = new ClientService();
    private ClientService() {}

    public static ClientService createInstance() {
        return clientService;
    }
}
```

팩토리 메서드에 (선택적인) 매개변수를 제공하고 팩토리를 통해 반환된 오브젝트에 오브젝트 인스턴스 프로퍼티를 설정하는 메커니즘에 대한 것은 Dependencies and Configuration in DeTail 을 보면 된다.

#### Instantiation by Using an Instance Factory Method
```
<!-- the factory bean, which contains a method called createInstance() -->
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- inject any dependencies required by this locator bean -->
</bean>

<!-- the bean to be created via the factory bean -->
<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>

```
```
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }
}
```
static factory method를 통해 인스턴스화를 하는 것과 비슷하게, 인스턴스 팩토리 메서드를 통한 인스턴스화는 이미 생성된 빈의 non-static 메서드를 호출한다. 이 매커니즘을 사용하기 위해서는, `class` 속성은 비워 두고, `factory-bean` 속성에서, 객체를 생성하는 인스턴스 팩토리 메서드를 가진 빈 이름을 지정한다. 빈에는 여러 개의 팩토리 메서드를 가질 수 있다.

이 방식은 팩토리 빈 자체가 DI를 통해 관리되고 설정되는 것을 볼 수 있다. 

스프링 문서에서, "factory bean"은 스프링 컨테이너를 통해 설정되고, 인스턴스 또는 static factory method를 통해 객체들을 생성하는 빈을 뜻한다. 반대로 `FactoryBean`은 스프링의 FactoryBean을 뜻한다.

### 1.4 Dependencis
엔터프라이즈 어플리케이션은 수많은 빈들을 가지고, 간단한 어플리케이션도 몇 개의 빈들을 가진다. 이 빈들은 서로 협력하여 엔드 유저에게 하나의 완벽한 어플리케이션으로 나타난다. 이 섹션에서는 빈 정의를 어떻게 하는지부터 시작해서 객체들의 협력을 통해 어떻게 완벽한 어플리케이션을 만드는지에 대해 설명한다.

### 1.4.1 Dependency Injection
Dependecy Injection(DI)는 객체들의 Dependency를 정의하는 절차이다. 생성자 매개변수, 팩토리 메서드 매개변수, 프로터티를 통해서만 정의한다. DI는 직접적인 클래스 생성 또는 Service Locator Pattern 을 통해 종속물들의 위치와 인스턴스화를 스스로 관리하는 빈을 뒤집는 것이다.  


-----


# 2. 리소스들

java.net.URL만 사용해서는 모든 리소스들에 접근하기에 부족하다. 클래스패스, 서블릿 컨텍스트 등이 그 예시이다. 스프링의 Resource 인터페이스는 로우레벨 리소스들을 접근하는 것을 추상화하였다. 이 Resource 인터페이스는 InputStreamSource 인터페이스를 상속한 것이다. 인터페이스 메서드들을 살펴보면, 여러가지 편리한 메소드들이 있다. 직접적으로 파일 데이터를 읽을 수 있는 inpustream도 있다.

스프링 안에서도 이 Resource 를 많이 사용한다. 유틸리티 클래스이다. 참고로 Resource 추상화는 기존 기능을 대체하거나 하지 않고, warpper의 역할을 한다. 예를 들어, UrlResource는 URL의 기능의 wrapper 역할을 한다.

Resource 구현체 종류
- UrlResource
- ClassPathResource
- FileSystemResource
- ServletContextResource
- InputStreamResource
- ByteArrayResource

2.3.1 UrlResource
UrlResource는 java.net.URl을 감싼 것이다. URL로 파일들, HTTP 대상, FTP 대상 등을 접근할 수 있다. 문자열 앞에 file: 이면 파일을 가르키고, http: 면 http를 가르키고, ftp: 면 ftp를 가르킨다. classpath: 처럼 많이 알려진 prefix는 자동으로 인식해서 url을 만든다.

2.3.2 ClassPathResource
classpath를 통해 resource를 접근하는 클래스. thread context class loader 에서 주로 사용한다. 

2.3.3 FileSystemResource
java.io.File 과 java.nio.file.Path를 다루기 위한 Resource 구현체이다.

2.3.4. ServletContextResource
웹 어플리케이션의 root 디렉토리에 연관된 상대 경로를 변환한 ServletContext 자원들을 위한 구현체이다. 이것은 항상 stream 접근과 URL 접근을한다. 

2.3.5. InputStreamResource
InputStream을 위한 구현체. 여러번 stream을 읽어야할 필요가 있을 떄 사용해서는 안된다.

2.3.6. ByteArrayResource
byte array를 위한 구현체.

2.4. The ResourceLoader
ResourceLoader는 Resource를 반환하는 인터페이스이다. 모든 Application context는 ResourceLoader 인터페이스를 구현한다. 그러므로 모든 어플리케이션 컨텍스트에는 Resource 인스턴스들을 사용한다. 각각의 어플리케이션 컨텍스트는 getResource를 호출하면, 컨텍스트에 맞는 Resource 구현체들이 반환된다. 예를 들어, ClassPathXmlApplicationContext는 ClassPathResource를 반환한다. FileSystemXmlApplicationContext 는 FileSystemResource 를 반환한다. WebApplicationContext 는 ServletContextResource 를 반환한다. 

앞에 prefix로 classpath: , file:// , https:// 를 붙여서 getResource 인자로 제공하면 해당 Resource 타입으로 변경될 수 있다. 

2.5. The ResourceLoaderAware Interface
이 인터페이스는 
