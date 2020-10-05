# 서블릿

## Servlet Life Cycle 
![Servlet Life Cylce](http://www.javachain.com/wp-content/uploads/2014/06/ServletLifeCycle.png)

## 서블릿 컨테이너 동작
1. 클라이언트가 HTTP 서버로 요청한다.
2. HTTP 서버는 서블릿 컨테이너로 요청한다.
3. 서블릿 컨테이너는 서블릿 클래스를 실행한다.
4. HttpServlet 클래스를 상속한 클래스를 실행한다. HttpServlet은 GenericServlet 클래스를 상속했다. GenericServlet은 Servlet 인터페이스를 구현한 클래스다.
5. init() 메소드를 호출한다. GenericServlet 클래스에 있는 메소드.
6. Service() 메소드를 호출한다. GenericServlet의 추상메소드로, HttpServlet에서 구현한 메소드다. HTTP 메서드에 대응하는 메소드를 호출한다. 
7. 만약 HTTP 요청 메서드가 GET이라면, doGet() 메소드를 호출한다. HttpServlet에서 개발자가 오버라이딩을 통해 구현한다. 

## 서블릿 클래스 예시
```java
package com.chaeyun.test;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.io.*;
//@WebServlet("/addInfo")
public class AddInfo extends HttpServlet{
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		res.setContentType("text/html;charset=utf8");
		PrintWriter out = res.getWriter();
		out.print("<html><head>");
		out.print("<title>URI Info</title></head><body>");
		out.print("Request Method: "+req.getMethod() +"<br>");
		out.print("Path Info: "+req.getPathInfo() +"<br>");
		out.print("Path Translated: "+req.getPathTranslated()+"<br>");
		out.print("Query String: "+req.getQueryString()+"<br>");
		out.print("Content Length: "+req.getContentLength()+"<br>");
		out.print("Content Type: "+req.getContentType()+"<br>");
		out.print("</body></html>");
		out.close();
	}
}
```

## HTTP 메소드
- GET 방식: 255바이트 미만. 인코딩/디코딩하는 추가 작업이 필요 없어서 처리속도가 빠르다. URL을 통해 전달한다. 파라미터가 노출된다.
- POST 방식: 문자열 크기 제한 없음. 요청 몸체에서 담긴다. FORM 태그를 통해서만 데이터 전달이 가능하다.

## 서블릿 환경설정
ServletConfig 객체에 설정들이 존재한다. 최초로 요청이 들어왔을 때 서블릿 객체 생성 다음으로 ServletConfig 객체가 생성된다.  
web.xml에서 정의한 설정값을 특정 메소드를 통해 값을 가져올 수 있다. `ServletConfig.getInitParameter()` 또는 `this.getInitParameter()`을 사용하면 된다.  

1. web.xml 설정  
`<servlet>` 태그 내에서 `<init-param>` 태그를 사용한다.  
`<load-on-startup>`은 최초 요청이 없어도 먼저 객체를 만들어둔다. 태그 내 값은 서블릿 간의 우선순위이다. 숫자가 낮을수록 우선순위가 높다.  
```xml
<servlet>
	<servlet-name>initParam</servlet-name>
	<servlet-class>com.chaeyun.test.InitParamServlet</servlet-class>
	<init-param>
		<param-name>charset</param-name>
		<param-value>UTF-8</param-value>
	</init-param>
	<load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
	<servlet-name>initParam</servlet-name>
	<url-pattern>/initParamTest</url-pattern>
</servlet-mapping>
```
2. init() 메소드 사용  
init 매개변수로 ServletConfig 객체가 전달되기 때문에 해당 객체의 메소드를 사용한다.
```java
String id, pw;
@Override
public void init(ServletConfig config) throws ServletException{
	id = config.getInitParameter("id");
	pw = config.getInitParameter("password");
}
```
3. this.getInitParameter() 메소드 사용  
ServletConfig 인터페이스를 GenericServlet 클래스에서 구현하였기 때문에, 메소드를 통해 설정값을 얻을 수 있다.
```java
@Override
public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	// config 가져오기
	String charset = this.getInitParameter("charset");
	resp.setCharacterEncoding(charset);
	resp.setContentType("text/html");
}
```

## 서블릿 상태정보 유지
- servletContext: 상태정보를 서버에 저장하며, 웹어플리케이션과 함께 생성되고 소멸한다. 다른 서블릿들과 데이터를 공유할 수 있다.
- cookie: 상태정보를 클라이언트에 저장. 클라이언트 웹 브라우저에 저장.
- session: 클라이언트 별 상태정보를 서버에 저장. 클라이언트에는 세션ID를 쿠키로 저장.
- servletRequest: 하나의 요청에 따른 상태 정보. 요청과 응답을 하고나면 소멸. 

### Context
```java
// Set Context
ShareObject obj1 = new ShareObject();
obj1.setCount(100);
obj1.setStr("객체 공유 테스트 - 1");
sc.setAttribute("data1", (ShareObject)obj1);
```
```java
// Get Context
ServletContext sContxt = this.getServletContext();
out.print(sContxt.getAttribute("data1"));
```

### Cookie
```java
// 쿠키 세팅 server -> client
Cookie c1 = new Cookie("id","guest");
c1.setPath("/");
resp.addCookie(c1);
```

### Session
```java
// 세션 생성
HttpSession session = request.getSession();
// 세션 속성 지정
session.setAttribute("id",usr_id);
```

### ServletRequest
요청 재지정. 페이지 간에 정보를 공유.
1. HttpServletResponse 요청 재지정  
`HttpServletResponse.sendRedirect(String location)`  
`resp.sendRedirect("https://www.naver.com");`  
2. RequestDispatcher  요청 재지정
같은 어플리케이션에서만 가능.
forward는 요청, 응답을 해당 path 서블릿에서 처리한다. include는 path 서블릿에서 처리한 다음, 그 결과를 기존 서블릿 처리결과와 합친다.
```java
// 포워딩
RequestDispatcher rd = sc.getRequestDispatcher("/dispatcher2");
rd.forward(req,resp);
```
```java
// include
RequestDispatcher rd = sc.getRequestDispatcher("/dispatcher2");
rd.include(req, resp);
```
3. Request 단위 정보 공유
같은 어플리케이션에서는 HttpServletRequest를 공유할 수 있다. 해당 객체의 Atrribute에 사용자 객체를 저장해서 공유가 가능하다.
```java
// bookReg 서블릿에서...
req.setAttribute("book", book);
RequestDispatcher rqDisp = req.getRequestDispatcher("/bookOutput");
rqDisp.forward(req, resp);
```
```java
// bookOutput 서블릿으로 request 포워딩하여 속성값 이용

Book usrBook = (Book)req.getAttribute("book");
out.print(usrBook.toString());
```

## Filter 필터
javax.servlet.filter 인터페이스 구현. 서블릿을 실행하기 전 또는 후에 정해진 처리를 하기 위함.
- `init()`: 초기화
- `fileter(ServletRequest req, ServletResponse res, FilterChain chain)`: 필터링 처리.
- `chain.doFilter(req, resp)`: 필터 연결 
- `destroy()`: 자원 해제
- FilterChain 객체: web.xml의 `<filter-mapping>` 태그 정보를 가지고 있음.
```java
// 필터 객체
public class HangulFilter implements Filter {
	private String charset = "";
	@Override
	public void init(FilterConfig fconfig) throws ServletException{
		System.out.println("HangulFilter init 실행");
		this.charset = fconfig.getInitParameter("encoding"); 
	}
	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException{
		req.setCharacterEncoding(this.charset);
		resp.setContentType("text/html");
		resp.setCharacterEncoding(this.charset);
		chain.doFilter(req, resp);
	}
}
```
```xml
<!-- web.xml -->
<filter>
	<filter-name>HangulFilter</filter-name>
	<filter-class>com.chaeyun.join.HangulFilter</filter-class>
	<init-param>
		<param-name>encoidng</param-name>
		<param-value>UTF-8</param-value>
	<init-param>
</filter>
<filter-mapping>
	<filter-name>HangulFilter</filter-name>
	<url-pattern>/writeHangul</url-pattern>
</filter-mapping>
```
## 이벤트
웹어플리케이션이 실행될 때, 클라이언트로부터 요청이 일어났을 때, 세션이 생성됐을 때, 객체 속성에 변화가 일어났을 때 등 이벤트 발생에 대한 처리를 할 수 있다.
- ServletContextListener(ServletContextEvent)
- ServletRequestListener(ServletRequestEvnet)
- HttpSessionListener(HttpSessionEvent)
```java
// 이벤트 예제
@WebListener
public class TestServletContextListener implements ServletContextListener{
	public TestServletContextListener() {
		System.out.println("ServletContext 객체 생성");
	}
	@Override
	public void contextInitialized(ServletContextEvent e) {
		System.out.println("이벤트: ServletContext 객체 초기화");
	}
	@Override
	public void contextDestroyed(ServletContextEvent e ) {
		System.out.println("이벤트: ServletContext 객체 해제");
	}
}
```
```xml
<!-- web.xml -->
<!-- annotaion 대신 web.xml 사용-->
<listener>
	<listener-class>com.chaeyun.test.TestServletContextListener</listener-class>
</listener>
```
## 오류처리
### 코드 내에서 에러 처리
- try-catch 문 또는 thorws 
- try-catch-finally 에서 finally 부분에서는 자원 해제 코드가 주로 위치한다.
- Override 메소드는 원래 메소드에서 선언하고 있는 예외객체 외에 추가할 수 없다. 이런 경우에는 메소드 내에서 try-catch 문을 사용해야 한다.

### 오류 페이지로 에러 처리 

#### 오류 설정 
web.xml을 이용하면 오류 처리 범위를 웹 어플리케이션으로 확장할 수 있다.
```xml
<error-page>
	<error-code>405</error-code>
	<location>/errorHandle</location>
</error-page>
<error-page>
	<exception-type>java.lang.NullPointerException</exception-type>
	<location>/errorHandle</location>
</error-page>
```
- `<error-code>`: 오류 코드로 값을 지정
- `<exception-type>`: 오류가 정의된 객체 이름 지정
- `<location>`: 오류가 발생했을 때 실행할 페이지 경로

### 오류 정보
현재 발생한 오류에 대한 정보를 HttpServletRequest 객체에 등록하고, 오류 페이지에 HttpServletRequest와 HttpServletResponse를 전달한다.  

#### 과정
1. 클라이언트 page 요청
2. page 실행
3. 오류 발생
4. HttpServletRequest 속성에 오류 정보 등록 (status_code, exception_type 등)
5. 오류 처리 page로 이동
6. servie(HttpServletRequest, HttpServletResponse) 에 HttpServletRequest 객체 전달
7. 오류 처리 page에서 HttpServletRequest 객체에서 오류 정보 추출
8. 오류 처리

밑 예제는 다른 서블릿에서 발생한 에러를 받아서 처리하는 서블릿이다.

```java
@WebServlet("/errorHandle")
public class ErrorHandleServlet extends HttpServlet{
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException{
		res.setContentType("text/html;charset=UTF-8");
		PrintWriter out = res.getWriter();
		
		Integer code = (Integer)req.getAttribute("javax.servlet.error.status_code");
		String message = (String)req.getAttribute("javax.servlet.error.message");
		Object type = req.getAttribute("javax.servlet.error.exception_type");
		Throwable exception = (Throwable) req.getAttribute("javax.servlet.error.exception");
		String uri = (String)req.getAttribute("javax.servlet.error.request_uri");
		
		out.print("<h2>Error Code : "+code+"</h2>");
		out.print("<h2>Error Message : "+message+"</h2>");
		out.print("<h2>Error Type : "+type+"</h2>");
		out.print("<h2>Error Exception : "+exception+"</h2>");
		out.print("<h2>Error Uri : "+uri+"</h2>");
		
		out.close();
	}
}
```

## web.xml 작성 시 태그 순서
`?`가 표시된 태그는 사용되지 않을 수도 있고, 사용된다면 한 번만 나올 수 있는 태그.  
`*`가 표시된 태그는 사용되지 않을 수도 있고, 또는 여러 번 사용될 수 있는 태그.
```xml
<display-name?>
<description?>
<distributable?>
<context-param*>
<filter*>
<filter-mapping*>
<listener*>
<servlet*>
<servlet-mapping*>
<welcome-file-list?>
<error-page*>
``` 