# Maven
Java 프로젝트들을 빌드하고 관리하는 자동화 도구이다.  

## maven 설치
1. apache-maven-3.3.1-bin.zip [다운로드](https://maven.apache.org/download.cgi?Preferred=http%3A%2F%2Fmirror.apache-kr.org%2F)
2. 환경변수 설정: `M2_HOME=C:\Program Files\Apache Software Foundation\apache-maven-3.3.1 M2=%M2_HOME%\bin MAVEN_OPTS=-Xms256m -Xmx512m` 
3. path 에 설정: `%M2_HOME%\bin`
4. `mvn --version` 테스트


## mvn site
메이븐을 처음 설치하고 `mvn site`를 하면 해당 관련 플러그인들을 .m2 폴더에서 찾을 수 없어서 에러가 뜬다.
POM.xml 에서 해당 plugin 을 명시해줘야한다.
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.chaeyun</groupId>
  <artifactId>my-web</artifactId>
  <packaging>war</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>my-web Maven Webapp</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
    <finalName>my-web</finalName>
	<plugins>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-site-plugin</artifactId>
			<version>3.3</version>
		</plugin>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-project-info-reports-plugin</artifactId>
			<version>2.7</version>
		</plugin>
	</plugins>
  </build>
</project>
```

## dependency confilct
라이브러리는 같지만, 서로 다른 버전일 경우 충돌이 일어나는 경우가 있다. root 프로젝트에 가장 근접하게 선언된 dependency 라이브러리 버전이 사용된다. root 프로젝트에서 더 먼 라이브러리 버전에서 충돌이 일어나느 것이다. 해결하기 위해서는 root 프로젝트의 pom.xml 에서 직접적으로 사용할 dependency 라이브러리 버전을 명시하면 해결될 수도 있다.

```xml
<plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-enforcer-plugin</artifactId>
        <version>1.4.1</version>
        <configuration>
            <rules><dependencyConvergence/></rules>
        </configuration>
    </plugin>
</plugins>
```
위를 root 프로젝트 pom에 설정한다면, maven cli를 통해 어떤 곳에서 충돌이 일어나는지 확인할 수 있다.

출처 : https://dzone.com/articles/solving-dependency-conflicts-in-maven

## 상속 구조
- 부모 프로젝트 pom.xml 에서 packing 방식을 `pom` 으로 설정하면, 상속 구조가 된다.
- 자식 pom 에게  `artifactId, name, prerequisties` 를 빼고 대부분 상속한다.

## Dependency Management
- 부모와 자식 프로젝트가 구조 일 때, 자식의 dependcy를 부모에서 관리할 수 있다.
- 부모 pom에서 dependency 설정을 하고, 자식 pom의 depenecy 설정에서 간단한 정보만 명시하면 된다. 