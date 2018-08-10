# 노트 템플릿 파일

## pom.xml
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.chaeyun.summer</groupId>
  <artifactId>summer01</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  
  <dependencies>
	 <!-- https://mvnrepository.com/artifact/org.springframework/spring-core -->
	<dependency>
	    <groupId>org.springframework</groupId>
	    <artifactId>spring-core</artifactId>
	    <version>4.1.0.RELEASE</version>
	</dependency>
  	<!-- https://mvnrepository.com/artifact/org.springframework/spring-beans -->
  	<dependency>
	    <groupId>org.springframework</groupId>
	    <artifactId>spring-beans</artifactId>
	    <version>4.1.0.RELEASE</version>
	</dependency>
	<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
	<dependency>
	    <groupId>org.springframework</groupId>
	    <artifactId>spring-context</artifactId>
	    <version>4.1.0.RELEASE</version>
	</dependency>
  </dependencies>
  
</project>
```

## applicationContext.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="
		http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context
		http://www.springframework.org/schema/context/spring-context.xsd">
	<context:annotation-config/>
	<context:component-scan base-package="sample"/>
</beans>
```
## 빈 정의 2
```xml
<!-- byName -->
<bean id="productDao" class="sample.di.dataaccess.ProductDaoImpl"/>
<bean id="productService" class="sample.di.business.service.ProductServiceImpl">
	<property name="productDAO" ref="productDao"/>
</bean>
```
```xml
<!-- byType -->

<bean id="productDao" class="sample.di.dataaccess.ProductDaoImpl"/>
<bean id="productService" class="sample.di.business.service.ProductServiceImpl" autowire="byType"/>
```
