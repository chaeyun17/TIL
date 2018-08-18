# Spring 공부 필기장
참고서: 스프링4 입문, 하세가와 유이치, 오오노 와타루, 토키 코헤이 지음, 한빛미디어 출판

### 궁금한 것
#### Schema 스키마란?
개요, 도표.  XML 문서의 내용, 구조, 형식을 규정하는 명세(明細)로, 그 서술 자체를 XML로 한다.

## DI(Dependency Injection)
- 오브젝트 사이의 의존 관계를 만드는 것.
- 어떤 오브젝트에 의존할 오브젝트를 주입 혹은 인젝션(프로퍼티에 설정).
- 인터페이스를 이용해 컴포넌트화를 실현하는 것.
- DI 컨테이너는 클래스의 인스턴스화 등의 생명 주기 관리 기능이 있음.
- 클래스에 new 연산자가 사라짐으로써 개발자가 팩토리 메서드 같은 디자인 패턴을 구사하지 않아도 
DI 컨테이너가 건네주는 인스턴스를 인터페이스로 받아서 인터페이스 기반의 컴포넌트화를 구현할 수 있게 됐음.

### 구현
- DI 를 이용할 때는 완전한 부품화를 위해서 인터페이스, 구현클래스를 따로 설계할 필요가 있다. ex) interface ProductDAO, class ProductDAOImpl
- 인터페이스는 외부에 공개된 부품의 접속부분이다.
- 컨트롤러-서비스, 서비스-DAO 관계에서 DI를 사용. 도메인 오브젝트(VO)와 의존관계를 DI로 구축하면 안됨.

### 어노테이션을 사용한 DI
**@Autowired 와 @Component**
- 인스턴스 변수 앞에 `@Autowired`를 붙이면 DI 컨테이너가 그 인스턴스 변수의 형에 대입할 수 있는 클래스를 `@Component`가 붙은 클래스 중에서
찾아내 그 인스턴스를 인젝션해준다. 참고로 Bean정의(applicationContext.xml)에서 스캔범위를 정의해줘야 한다.
- 형을 보고 인젝션하는 방법을 **byType**

```xml
<!-- applicationContext.xml :: Bean 정의 -->
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="
		http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context
		http://www.springframework.org/schema/context/spring-context.xsd">
	<context:annotation-config />
	<context:component-scan base-package="sample"/>
</beans>
```

- `<context:annotation-config />`는 `@Autowired`, `@Resource`를 이용할 때의 선언. 
- `<context:component-scan base-package="패키지명"/>`: 패키지명 아래의 컴포넌트를 검색. 정규표현식을 이용하거나 어노테이션을 이용하여 포함과 제외를 할 수 있다.
- `use-default-filters="false"` 는 어노테이션들을 읽어들이지 않는다. `@Component`,`@Repository`, `@Service` 등

```xml
<!-- 예시 -->
<context:annotation-config/>

<context:component-scan base-package="sample"/>

<context:component-scan base-package="sample.di.business"/>
<context:component-scan base-package="sample.di.dataaccess"/>

<context:component-scan base-package="sample.di.business"/>
<context:component-scan base-package="sample.di.dataaccess">
	<context:include-filter type="regex" expression="sample\.di\.dataaccess\.Mock.*"/>
	<context:include-filter type="annotation" expression="javax.annotation.Resource"/>
	<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Repository"/>
</context:component-scan>

<bean id="productDao" class="sample.di.dataaccess.ProductDaoImpl"/>
<bean id="productService" class="sample.di.business.service.ProductServiceImpl">
	<property name="productDAO" ref="productDao"/>
</bean>

<context:component-scan base-package="sample.di.dataaccess" use-default-filters="false">
	<context:include-filter type="regex" expression="sample\.di\.dataaccess\.Mock.*"/>
	<context:include-filter type="regex" expression="sample\.di\.dataaccess\.Pro.*" />
	<context:include-filter type="annotation" expression="javax.annotation.Resource"/>
	<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Repository"/>
</context:component-scan>
```
**@Controller, @Service, @Repository, @Configuration**
`@Component` 와 를 대체할 수 있다. 레이어 역할을 명시해서 사용한 것이다. 취향에 따라 사용. `@Configuration`은 JavaConfig용이다.

**@Scope("value")**
`@Component`와 함께 사용한다. 인스턴스화와 소멸을 제언한다.
- `value`에는 `singleton, prototype, request, session, apllication` 이 있다.
- singleton이 기본값이고, prototype은 사용될 때마다 인스턴스를 생성, request는 Servlet API의 request 스코프인 동안만 인스턴스가 생존한다.
- prototype은 context로부터 getBean을 할 때마다 인스턴스가 새로 생성된다.


### 생명 주기 관리
스프링 DI 컨테이너에는 인스턴스 생성과 소멸 타이밍에 호출되는 메서드를 설정하기 위해 `@PostContruct`와 `@PreDestroy` 어노테이션이 있다.
- `@PostConstruct`은 초기처리를 하는 메서드 선언. 메서드와 인수 없이 반환형은 void형으로 해야 한다. DI 컨테이너에 의해 인스턴스 변수에
무언가 인젝션된 다음에 호출된다.
- `@PreDestroy`는 종료 처리를 하는 메서드 선언. 메서드 인수없이 반환형은 void형으로 해야 한다. 자바에서는 소멸자가 없기 때문이다.
- 테스트를 해보려면, Bean Factory를 종료시키는 clsoe 메서드를 사용하면 된다. bean 인스턴스가 소멸되기 때문에 종료 메서드가 호출된다. 
- [Spring Bean Life Cycle (빈 생명주기 관리), 전산쟁이 블로그](http://javaslave.tistory.com/48)


### Bean 정의 파일을 이용한 DI
어노테이션은 소규모 개발에 사용하면 편리하다. 하지만 다양한 사람들과 일할 때는 어노테이션을 빼먹는 실수를 막고, Bean 객체 관리를 위해 
Bean 정의파일을 사용한다.

**Bean Factory**
Bean Factory는 실행 시 건네지는 Bean 정의파일을 바탕으로 인스턴스를 생성하고 인스턴스의 인젝션을 처리한다.
- DI 컨테이너로부터 인스턴스를 얻는다는 말은 구체적으로 Bean Factory로부터 인스턴스를 얻는 것이다.

**@Autowired 와 @Component를 대신 XML 파일**
인젝션을 부여할 인스턴스에 대한 setter 메서드 구현이 필요하다.
```java
/* ProductServiceImpl.java */
private ProductDAO productDAO;

public void setProductDAO(ProductDAO productDAO) {
    this.productDAO = productDAO;
}
```
```xml
<!-- applicationContext.xml -->
<!-- byType -->
<bean id="productService"
    class="sample.di.business.service.ProductServiceImpl"
    autowire="byType"/>
<bean id="productDAO" class="sample.di.dataaccess.ProductDaoImpl"/> 
	
<!-- 명시적으로 인젝션 byName -->
<bean id="productDAO" class="sample.di.dataaccess.ProductDaoImpl"/>
<bean id="productService" class="sample.di.business.service.ProductServiceImpl">
    <property name="productDAO" ref="productDAO"/>
</bean>
```

**bean 정의 파일 분할**
- 개별적 참조: `<ref="datasource">`를 이용해 다른 Bean 정의파일을 참조할 수 있다.
- 전체 참조: `<import resource="applicationContext.xml"/>` 
  

    
### ApplicationContext
BeanFactory를 확장한 것이다. Bean 정의 파일 읽기, 메시지 소스, 이벤트 처리 등의 기능 추가.

**웹 어플리케이션에서 Bean 정의 파일 읽기**
웹 어플리케이션은 ContextLoaderListener 클래스나 ContextLoaderServlet 클래스에 의해 자동으로 ApplicationContext가 로드된다.
```xml
<!-- web.xml -->
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>/WEB-INF/Bean 정의 파일.xml</param-value>
</context-param>
<listener>
    <listener-class>org.framework.web.context.ContextLoaderListener</listener-class>
</listener>
```
또는
```xml
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>/WEB-INF/Bean 정의 파일.xml</param-value>
</context-param>
<servlet>
    <servlet-name>context</servlet-name>
    <servlet-class>org.springframework.web.context.ContextLoaderServlet</servlet-class>
    <load-on-startup>1</load-on-startup>
</servlet>
```
정의파일이 여러 개일 때는 공백, 세미콜론, 콤마로 구분한다.

ApplicationContext를 Main 클래스 내에서 사용하고 싶을 때는 다음과 같다.
```java
ApplicationContext context = new ClassPathXmlApplicationContext("a.xml","b.xml","c.xml");
```
또, POJO 클래스 내에서 사용하고 싶을 때는 `@Autowired`를 사용하여 인젝션한다.
```java
public class ProductServiceImpl implements ProductService{
    @Autowired
    private ApplicationContext ac;
}
```
**이벤트 처리**
ApplicationContext가 발생시킨 이벤트는 ApplicationListener 인터페이스를 구현한 클래스를 DI컨테이너에 등록함으로써 받을 수 있다.
```java
public class CustomEventListener implements ApplicationListener {
	@Override
	public void onApplicationEvent(ApplicationEvent event) {
		if(event instanceof ContextRefreshedEvent ) {
			System.out.println("** Bean 생명주기의 초기화 상태 후 발생 **");
		}else if(event instanceof ContextStartedEvent) {
			System.out.println("** Application context가 시작! **");
		}else if(event instanceof ContextStoppedEvent) {
			System.out.println("** Application Context 정지! **");
		}else if(event instanceof ContextClosedEvent) {
			System.out.println("** Application Context closed **");
		}else if(event instanceof RequestHandledEvent) {
			System.out.println("웹 시스템 고유 이벤트. HTTP 요청에 의해 서비스 호출 시");
		}
	}
}
```
```java
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
public class CustomListener implements ApplicationListener<ContextRefreshedEvent>{
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		System.out.println("** custom : context 초기화 **");
	}
}

```

**Bean 정의 파일 프로파일 기능**
Bean 정의 파일 내에 그룹화가 가능하다.
```xml
<beans>
    <beans profile="xmlBean">
        <bean id="productDAO" class="sample.di.dataaccess.ProductDaoImpl"/>
        <bean id="productService" class="sample.di.business.service.ProductServiceImpl">
            <property name="productDAO" ref="productDAO"/>
        </bean>
    </beans>
    <beans profile="annoBean">
	  	<context:annotation-config/>
		<context:component-scan base-package="sample"/>
	</beans>
</beans>
```
```java
GenericXmlApplicationContext factory = new GenericXmlApplicationContext();
factory.getEnvironment().setActiveProfiles("xmlBean");
factory.load("classpath:/sample/config/applicationContext.xml");
factory.refresh();
ProductService productService = factory.getBean(ProductService.class);
```
웹 어플리케이션에서도 프로파일을 지정할 수 있다. 웹 어플리케이션에서는 크게 두 곳에서 DI 컨테이너를 설정한다. 첫째는 ContextLoaderListener 이고, 둘째는 DispatcherServlet 이다.
```xml
<!-- ContextLoaderListener -->
<context-param>
    <param-name>spring.profiles.active</param-name>
    <param-value>production</param-value>
</context-param>
```
```xml
<!-- DispatcherServlet -->
<servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <init-param>
        <param-name>spring.profiles.active</param-name>
        <param-value>production</param-value>
    </init-param>
</servlet>
```

### 생명주기
스프링이 관리하는 애플리케이션의 생명주기. 초기화, 이용, 종료의 세 단계로 진행된다.
- Initalization: 이용(Use)하기 위해서 어플리케이션을 생성함. 시스템의 리소스 확보.
- Use: 애플리케이션에서 이용됨
- Destruction: 종료 처리. 시스템의 리소스를 돌려줌. 애플리케이션은 가비지 콜렉션의 대상이 됨.

**초기화**
Bean 정의 로드와 Bean 생성 및 초기화를 한다.

**이용**
ApplicationContext 인스턴스에서 Service 인스턴스 및 Dao 인스턴스를 getBean 메서드로 취득. 사용.

**종료**
애플리케이션 종료 단계. `@PreDestroy` 및 bean 태그의 destroy-method 속성에 지정된 메서드를 불러들이고 종료 처리.