# 이슈

## ojdbc6.jar를 로컬 maven 에 추가하기
ojdbc 드라이버는 maven repository에 존재하지 않는다. ojdbc6 파일을 oracle 사이트에서 다운 받아서, maven 에 등록하여야 한다. 명령어를 통해 ojdbc6 파일을 local repository에 추가하여야 한다.

### 방법
1. ojdbc6를 oracle 사이트에서 다운로드한다.
2. 프로젝트가 저장된 폴더에 lib라는 새 폴더를 생성하고, 그 곳에 ojdbc6.jar를 이동시킨다.
3. 이클립스에서 프로젝트 오른쪽 클릭 -> Run As -> Run Configuration 선택
4. 왼쪽 리스트에서 `Maven Build` 하위리스트인 `내 프로젝트 이름` 선택
5. 아래의 명령어를 빈칸에 맞게 입력.
```
mvn install:install-file
	-Dfile=ojdbc6.jar
	-DgroupId=com.oracle
	-DartifactId=ojdbc6
	-Dversion=11.2.0
	-Dpackaging=jar
```
- Goals 칸에는 `install:install-file `
- 밑에 Parameter Name / Value 에서 Add 하기
- Name: `file` , Value: `lib\ojdbc6.jar` 를 입력 후, Ok
- Name: `groupId` , Value: `com.oracle` 를 입력 후, Ok
- Name: `artifactId`, Value: `ojdbc6` 를 입력 후, Ok
- Name: `version`, Value: `11.2.0` 를 입력 후, Ok
- Name: `packaging`, Value: `jar` 를 입력 후, Ok

6. Apply 를 하고, Run 클릭. console 창에 build success 확인.
7. 프로젝트 pom.xml에 denpendency 추가
```xml
<!-- ojdbc6.jar -->
<dependency>
	<groupId>com.oracle</groupId>
	<artifactId>ojdbc6</artifactId>
	<version>11.2.0</version>
</dependency>
```
8. 테스트로 프로젝트 실행해보기

### 참고
- https://www.mkyong.com/maven/how-to-add-oracle-jdbc-driver-in-your-maven-local-repository/
- https://www.slipp.net/wiki/pages/viewpage.action?pageId=21004440


## jdk 1.8로 기본설정 세팅하기
기존 maven-compiler-plugin 은 jdk1.5 버전이다. 그래서 pom.xml에 설정을 추가하여 jdk1.8로 버전을 변경해야 한다.
pom.xml 은 기존 부모설정을 오버라이드하는 원리이다.

### 방법
1. pom.xml에 해당 코드를 추가한다.
```xml
<build>
	<plugins>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>3.6.1</version>
			<configuration>
				<source>1.8</source>
				<target>1.8</target>
			</configuration>
		</plugin>
	</plugins>
</build>
```
2. 프로젝트 오른쪽 클릭 maven - Update project 실행

** 테스트 중 실행금지 **
2. 프로젝트 오른쪽 클릭 - Rus As - Configureation 선택
테스트필요: goals에 `eclipse:clean eclipse:eclipse` 입력
3. Run

### 참고
- https://www.slipp.net/wiki/pages/viewpage.action?pageId=21004440



## 스프링 프로젝트 테스트 해보기
junit 알아보기

## sql 에러
**에러 코드**  
java.sql.SQLIntegrityConstraintViolationException: Cannot add or update a child row: a foreign key constraint fails
**원인**  
존재하지 않는 참조키를 추가하려고 했음. 먼저 참조대상이 되는 부모 테이블에 참조 데이터가 필요함.


**에러 코드**
WARN: Establishing SSL connection without server's identity verification is not recommended. According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn't set.
**원인**
mysql 접속 url에 `&autoReconnect=true&useSSL=false` 추가하여 세팅

## jsp에서 자기 앱 홈 주소로 이동하기
`${pageContext.request.contextPath}` 결과는 `/앱이름` 이다. 이것을 사용하면 된다.

출처: https://stackoverflow.com/questions/2204870/how-to-get-domain-url-and-application-name

## jsp에서 java 함수 사용하기
1. `<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>`
2. `<c:set var = "string2" value = "${fn:substring(string1, 5, 15)}" />`

출처: https://www.tutorialspoint.com/jsp/jstl_function_substring.htm

## Date에서 String 으로 데이터타입 변환
```java
public void convertDateToString(Date dt){
	DataFormat df = new SimpleDateFormat("dd/MM/yyyy");
	Stirng dateStr = df.format(dt);
	return dateStr;
}

public String convertDateToString(Date dt, String pattern){
	DateFormat df = new SimpleDateFormat(pattern);
	String dateToString = df.format(df);
	return dateToString;
}
```

출처: https://stackoverflow.com/questions/17207600/convert-date-to-string-in-spring-3   
패턴: http://tutorials.jenkov.com/java-internationalization/simpledateformat.html

## ResultSet에서 Date 와 Time 받기
resultSet 에서 getTimestamp() 사용.

## Mysql 연결 에러
- timezone 에러일 경우: 5.1 이하 버전을 사용해서 해결하거나 접속할 때 timezone을 Asia/Seoul로 설정하면된다.  
`jdbc.url=jdbc:mysql://localhost:3307/board02?user=board02&password=1111&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=Asia/Seoul&autoReconnect=true&useSSL=false`

## 서버 배포
참고: http://luckyyowu.tistory.com/124

## 로그 출력하기 (print log)
```java
package com.tutorialspoint;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.apache.log4j.Logger;

public class MainApp {
   static Logger log = Logger.getLogger(MainApp.class.getName());

   public static void main(String[] args) {
      ApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");
      log.info("Going to create HelloWord Obj");
      HelloWorld obj = (HelloWorld) context.getBean("helloWorld");
      obj.getMessage();

      log.info("Exiting the program");
   }
}
```
**참고**  
- https://www.tutorialspoint.com/spring/logging_with_log4j.htm
- https://www.codejava.net/frameworks/spring/how-to-use-log4j-in-spring-mvc

## JSTL에서 변수가 비어있는지 확인하는 연산자
```JSP
<c:choose>
    <c:when test="${empty var1}">
        var1 is empty or null.
    </c:when>
    <c:otherwise>
        var1 is NOT empty or null.
    </c:otherwise>
</c:choose>
```
```jsp
<c:if test="${empty var1}">
    var1 is empty or null.
</c:if>
<c:if test="${not empty var1}">
    var1 is NOT empty or null.
</c:if>
```
출처: https://stackoverflow.com/questions/2811626/evaluate-empty-or-null-jstl-c-tags

## 스프링에서 세션 관리

### 세션 만들기

1. 컨트롤러에 어노테이션
```java
@SessionAttributes("loginUser")
@Controller
public class UserController {...}
```

2. 메서드 내에서 해당 이름으로 모델에 속성 추가
`model.addAttribute("loginUser", dbUser);`

```java
@RequestMapping(value="/user/login.do", method=RequestMethod.POST)
public String loginUser(User user, Model model) {
	User dbUser = null;
	try {
		dbUser = service.loginUser(user);
	}catch(EmptyResultDataAccessException err) {
		model.addAttribute("err_title","로그인 에러");
		model.addAttribute("err_msg","회원정보가 존재하지 않거나 일치하지 않습니다");
		return "error/errorPage";
	}

	model.addAttribute("loginUser", dbUser);
	return "redirect:/";
}
```

### 세션 삭제
`sessionStatus.setComplete();`

```java
@RequestMapping(value="*/logout.do")
public String logoutUser(SessionStatus sessionStatus, HttpServletRequest req) {
	sessionStatus.setComplete();
	return "redirect:/";
}
```

## 파일 업로드/다운로드
```java

package com.journaldev.spring.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 * Handles requests for the application file upload requests
 */
@Controller
public class FileUploadController {

	private static final Logger logger = LoggerFactory
			.getLogger(FileUploadController.class);

	/**
	 * Upload single file using Spring Controller
	 */
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	public @ResponseBody
	String uploadFileHandler(@RequestParam("name") String name,
			@RequestParam("file") MultipartFile file) {

		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();

				// Creating the directory to store file
				String rootPath = System.getProperty("catalina.home");
				File dir = new File(rootPath + File.separator + "tmpFiles");
				if (!dir.exists())
					dir.mkdirs();

				// Create the file on server
				File serverFile = new File(dir.getAbsolutePath()
						+ File.separator + name);
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();

				logger.info("Server File Location="
						+ serverFile.getAbsolutePath());

				return "You successfully uploaded file=" + name;
			} catch (Exception e) {
				return "You failed to upload " + name + " => " + e.getMessage();
			}
		} else {
			return "You failed to upload " + name
					+ " because the file was empty.";
		}
	}

	/**
	 * Upload multiple file using Spring Controller
	 */
	@RequestMapping(value = "/uploadMultipleFile", method = RequestMethod.POST)
	public @ResponseBody
	String uploadMultipleFileHandler(@RequestParam("name") String[] names,
			@RequestParam("file") MultipartFile[] files) {

		if (files.length != names.length)
			return "Mandatory information missing";

		String message = "";
		for (int i = 0; i < files.length; i++) {
			MultipartFile file = files[i];
			String name = names[i];
			try {
				byte[] bytes = file.getBytes();

				// Creating the directory to store file
				String rootPath = System.getProperty("catalina.home");
				File dir = new File(rootPath + File.separator + "tmpFiles");
				if (!dir.exists())
					dir.mkdirs();

				// Create the file on server
				File serverFile = new File(dir.getAbsolutePath()
						+ File.separator + name);
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();

				logger.info("Server File Location="
						+ serverFile.getAbsolutePath());

				message = message + "You successfully uploaded file=" + name
						+ "<br />";
			} catch (Exception e) {
				return "You failed to upload " + name + " => " + e.getMessage();
			}
		}
		return message;
	}
}

```
### 참고
- https://www.edwith.org/boostcourse-web/lecture/16817/
- https://www.journaldev.com/2573/spring-mvc-file-upload-example-single-multiple-files

## MYSQL foreign key 설정 검사 해제
```sql
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS user_tbl CASCADE;
DROP TABLE IF EXISTS post_tbl CASCADE;
DROP TABLE IF EXISTS filelist_tbl CASCADE;
SET FOREIGN_KEY_CHECKS = 1;
```

## MYSQL에서 방금 insert한 row id 얻기
```sql
select LAST_INSERT_ID();
```

## 이미지/데이터를 스프링 컨트롤러에서 라우팅하여 얻기
뷰인 jsp에서 사용할 이미지 또는 데이터는 자신의 서버로 해당 이미지와 데이터를 요청해야한다.
요청받은 스프링 컨트롤러에서는 로컬저장소에서 요청한 파일을 찾아서 HTTP CONTENT-TYPE을 요청파일 타입에 맞게 변환해서 리턴해준다.

### 출처: https://www.baeldung.com/spring-controller-return-image-file


## 스프링 트랜잭션 구현
- 필요배경: 첨부이미지파일을 저장하는 처리와 글을 저장하는 처리가 같이 이루어져야 한다. 어느 한 개가 실패하면 둘다 롤백이 되어야한다.
- AOP로 구현
- 트랜잭션 매니저를 통해 스프링에서 제공하는 AOP 어드바이스 사용 .
- 책 214 P

## `@Transactional` 작동 안하는 에러
컴포넌트 오토 스캔과 트랜잭션 오토 스캔이 같은 context xml에 있지 않았기 때문이다.
root-context.xml에 있는 내용을 servlet-context.xml로 옮기면 해결된다.

### 출처
- https://stackoverflow.com/questions/10019426/spring-transactional-not-working
- https://stackoverflow.com/questions/11708967/what-is-the-difference-between-applicationcontext-and-webapplicationcontext-in-s

## 트랜잭션 로그 출력법 (log4j)
java/resources/log4j.xml 열어서 다음과 같은 문법으로 추가한다.
```xml
<logger name="org.springframework.jdbc.datasource.DataSourceTransactionManager">
	<level value="debug" />
</logger>
```
아래의 root logger 설정을 info에서 debug로 고쳐준다
```xml
<!-- Root Logger -->
<root>
	<!-- <priority value="warn" /> -->
	<priority value="debug" />
	<appender-ref ref="console" />
</root>
```

## 파일 삭제 오류
file.delete()가 false를 리턴하면서 삭제가 안되는 경우가 있다. 이런 경우에는 stream을 close를 하지 않아서 일 경우이다.  
Files 클래스를 통해 delete를 해보면 자세한 에러가 뜬다.

## bean property 에 연산식 넣기
- Spring Expression Language (SpEl) 을 사용하면 된다.
- `#{1+1}`
### 출처
- https://www.baeldung.com/spring-expression-language


## 인텔리J 로 스프링 프로젝트 만들기
### 출처
https://nesoy.github.io/articles/2017-02/SpringMVC

## 배포하기
### 참고
- https://stackoverflow.com/questions/18943355/deploying-spring-mvc-project
- http://www.mkyong.com/maven/how-to-deploy-maven-based-war-file-to-tomcat/


## [maven] maven build시 unmappable character for encoding 에러
```
   <plugin>

                <groupId>org.apache.maven.plugins</groupId>

                <artifactId>maven-compiler-plugin</artifactId>

                <version>2.5.1</version>

                <configuration>

                    <source>1.6</source>

                    <target>1.6</target>

                    <compilerArgument>-Xlint:all</compilerArgument>

                    <showWarnings>true</showWarnings>

                    <showDeprecation>true</showDeprecation>

                    <encoding>UTF-8</encoding>

                </configuration>

            </plugin>


출처: http://blog.taeseong.me/305 [사과 냄새나는 IT이야기 TAESTORY,]
```

출처: http://blog.taeseong.me/305 [사과 냄새나는 IT이야기 TAESTORY,]