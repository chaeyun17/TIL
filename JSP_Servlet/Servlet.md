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

## http 메소드
- GET 방식: 255바이트 미만. 인코딩/디코딩하는 추가 작업이 필요 없어서 처리속도가 빠르다. URL을 통해 전달한다. 파라미터가 노출된다.
- POST 방식: 문자열 크기 제한 없음. 요청 몸체에서 담긴다. FORM 태그를 통해서만 데이터 전달이 가능하다.

## 서블릿 환경설정
ServletConfig 객체에 설정들이 존재한다. 최초로 요청이 들어왔을 때 서블릿 객체 생성 다음으로 ServletConfig 객체가 생성된다.  
web.xml에서 정의한 설정값을 특정 메소드를 통해 값을 가져올 수 있다. 2번과 3번 방법 중 하나의 방법을 사용하면 된다.  

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
GenericServlet 클래스로부터 해당 메소드를 상속받았기 때문에, 바로 사용할 수 있다.
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
- session: 클라이언트 별 상태정보를 서버에 저장. 
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