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

#### 어노테이션을 사용한 DI
##### @Autowired 와 @Component
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

