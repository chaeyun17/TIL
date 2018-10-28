# Maven
Java 프로젝트들을 빌드하고 관리하는 자동화 도구이다.  

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