# JSP

## 1. 동작 구조
1. jsp 파일에 대한 클라이언트의 최초 요청
2. JSP 컨테이너가 .jsp 파일을 .java로 변환
3. jsp 컨테이너가 .java 파일을 컴파일 하여 .class 파일 생성
4. 서블릿 컨테이너가 .class 파일을 서블릿처럼 실행
5. 변환과 컴파일 작업은 최초 요청 또는 JSP가 변경되었을 때만 수행.

## 2. JSP 구문 요소
JSP 페이지는 HTML, 텍스트 등과 같은 정적인 데이터와 함께 JSP의 구문 요소를 이용해서 텍스트 기반으로 작성할 수 있다. 
**스크립트 기반 태그**와 **XML기반 태그**로 나눌 수 있다.

### 2-1. 스크립트 기반 태그
- 주석문(comment)
- 지시자(directive)
- 스크립트릿(scriptlet)
- 표현식(expression)
- 선언문(declaration)

`<%@ ... %>`: 페이지에 대한 정보 설정
`<%@ ... %>`: 멤버변수 또는 메소드 선언
`<%= ... %>`: out.print()

#### 주석문
- `<%-- --%>`: JSP 주석. 서블릿 코드로 변환될 때
- `<!-- -->`: HTML 주석. 브라우저에 응답할 때
-- `//`,`/* */`: JAVA 주석. 서블릿 소스가 컴파일될 떄

#### 지시자
지시자는 JSP 컨테이너가 JSP 페이지를 파싱하여 자바 소스로 변환하는 데 필요한 정보들이다.
.JSP -> .JAVA 에 필요한 정보들.

##### 페이지 지시자
JSP 페이지의 설정
```jsp
<%@ page autoFlush = "true | false"
		 buffer = "none | 숫자kb"
		 contentType = "mimeType;charset=문자코드"
		 deferedSyntaxAllowedAsLiteral = "true | false"
		 errorPage = "파일명"
		 extends = "클래스이름"
		 import = "패키지이름"
		 info = "text"
		 isELIgnored = "true | false"
		 isErrorPage = "true | false"
		 isThreadSafe = "true | false"
		 language = "언어이름"
		 pageEncoding = "문자코드"
		 session = "true | false"
		 trimDirectiveWhitespaces = "true | false"
%>
```
##### include 지시자
다른 파일의 코드를 가져올 수 있다. 코드 중복성을 낮출 수 있다.
```JSP
<%-- include 지시자 예제 --%>

<% page contentType="text/html;charset=UTF-8"
		pageEncoding="UTF-8"
%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>예제6: include 지시자 예제</title>
</head>
<body>
	<h2>My Name is...</h2>
	<%@
		include = "./myName.jsp"
	%>
</body>
</html>
```

### 스크립트릿(Scriptlet)
**자바** 코드를 추가하고자 할 때 사용한다. JPS 컨테이너가 .JSP -> .JAVA 파일 변환할 때, 스크립트릿 코드는 `_jspService()` 메소드 내로 코드 그대로 옮겨진다.
중첩 태그가 불가능해서 가독성이 떨어진다는 단점이 있다.
```jsp
<%-- 구구단 출력 --%>
<%
	for(int i=1; i<=9; i++){
		for(int j=1; j<=9; j++){
			out.print(i +" * " + j + " = " + j*j); %> <br>
	<% } %>
	<br>
<%	} %>
```

### 표현식(expression)
동적인 데이터를 응답 결과에 포함하기 위해 사용. 예) 변수 출력

| .jsp | .java | 
| -------- | -------- |
| `<%=var %>`     | `out.print(var)`  |

```jsp
<%
for(int i=1; i<=9; i++){
	for(int j=1; j<=9; j++){ %>
	<%=i %> * <%=j %> = <%=i*j %><br>
<% } %><br>
<%	} %>
```

### 선언문(declaration)
JSP 페이지 내의 스크립트 코드에서 **인스턴스 변수** 또는 **메소드**를 정의할 때 사용.
```jsp
<%!
	public int sum(int a, int b){
		return a+b;
	}
%>
<h1>덧셈의 결과: <%=this.sum(3,4) %></h1>
```

## 2-2 내장객체
JSP 페이지에서 별도의 선언 및 초기화 작업 없이 바로 사용할 수 있는 객체. JSP 파일이 자바 소스 파일로 변환될 때, `_jspService()` 메소드 내에 자동으로 선언 및 초기화 되는 변수들을 내장객체라고 한다.
- request, response, session, application(Servlet Context), config, out, pageContext(jsp.PageContext)
### request, response, session
```jsp
<% if(request.getMethod().equals("POST")){ %>
<% 
	request.setCharacterEncoding("UTF-8"); 
	String id = request.getParameter("id");
	String pwd = request.getParameter("pwd");
	
	if(id.isEmpty() || pwd.isEmpty()){
		RequestDispatcher rd = request.getRequestDispatcher("./logInOut.jsp");
		request.setAttribute("errorMsg", "제대로 입력해주세요");
		rd.forward(request, response);
		//response.sendRedirect("./logInOut.jsp");
		return ;
	}
	// 로그인 처리
	if(session.isNew() || session.getAttribute("id") == null){
		session.setAttribute("id", id);
		out.print("로그인 처리되었습니다.");
	}else{
		out.print("이미 로그인 상태입니다.");
	}
%>
<h1>id: <%=id %></h1>
<h1>비밀번호: <%=pwd %></h1>
<%
	} else if(request.getMethod().equals("GET")){	
		// 로그아웃
		if(session != null && session.getAttribute("id") != null){
			session.invalidate();
			out.print("로그아웃 되었습니다");
		}else{
			out.print("현재 로그인 상태가 아닙니다.");
		}
	} 
%>
<%
	RequestDispatcher rd = request.getRequestDispatcher("logInOut.jsp");
	rd.forward(request,response);
%>
```

### Out
```jsp
<%
	int total = out.getBufferSize();
	out.print("첫번째 텍스트입니다.");
	out.clearBuffer();
	out.print("출력 버퍼의 크기 :"+total);
	out.print("<br>사용되지 않은 버퍼의 크기: "+out.getRemaining());
	out.flush();
	out.print("<br>flush 후 버퍼의 크기: "+out.getRemaining());
%>
<br>
<h3>out.print() 메소드</h3>
<%
	out.print(100);
	out.print(true);
	out.print(3.14);
	out.print("Test");
	out.print('가');
	out.print(new java.io.File("//"));
	out.print("버퍼의 크기: "+ out.getRemaining());
%>
```
### Application
어플리케이션 당 하나의 context. 서블릿 context와 같다.
```jsp
서버명: <%= application.getServerInfo() %>
서블릿 버전: <%= application.getMajorVersion() %>.<%= application.getMinorVersion() %><br>
<h3>/myServlet01 리스트</h3>
<%
	java.util.Set<String> list = application.getResourcePaths("/");
	if(list != null){
		Object[] obj = list.toArray();
		for(int i=0; i<obj.length; i++){
			out.print(obj[i]+"<br>");
		}
	}
%>
```

### Page Context
JSP 페이지 당 하나의 context 객체가 생성된다.
```jsp
<%! public void work(String p, PageContext pc){
	try{
		JspWriter out = pc.getOut();
		if(p.equals("include")){
			out.print("-- include 전 -- <br>");
			pc.include("test.jsp");
			out.print("-- include 후 -- <br>");
		}else if(p.equals("forward")){
			pc.forward("test.jsp");
		}
	} catch(Exception e){
			System.out.println("오류 발생!!");
	}
} 
%>
<%
	String p = request.getParameter("p");
	this.work(p, pageContext);
%>
```

## 2-3. 표준 액션 태그
XML기반 JSP 태그도 내장 객체와 동일한 장점이 있다. XML 기반 JSP태그는 JSP페이지 작성 시 자주 사용하는 기능을 미리 구현해 놓고 XML 문법형태로 실행할 수 있다.
- 표준 액션 태그: JSP 컨테이너에서 기본으로 제공하는 태그
- 커스텀 태그: 개발자가 만들어 사용하는 태그

### 표준 액션 태그
모든 JSP 컨테이너에서 기본으로 제공하고 있어서 기본 액션 태그라고도 불림.
- 태그 라이브러리: `<라이브러리 이름 : 태그 이름>` 관련 있는 태그들 끼리 묶어놓은 단위.

#### 표준 액션 태그 종류
- jsp:attribute
- jsp:body
- jsp:element
- jsp:fallback
- jsp:forward
- jsp:getProperty
- jsp:include
- jsp:output
- jsp:param
- jsp:plugin
- jsp:setProperty
- jsp:useBean

#### 예제
```jsp
<h3>ex14</h3>
<jsp:forward page="test.jsp"/>
```
```jsp
<%
	String p = request.getParameter("p");
%>	
<jsp:forward page="<%=p %>" />
```
```jsp
<h3>-- include 전 --</h3>
<jsp:include page="test.jsp" />
<h3>-- include 후 --</h3>
```
include는 자바 소스로 변환할 때 포함하는 `<@ include file`> JSP 지시자와 다르게, 실행할 때 포함된다. 

### 2-4. JSP 자바빈즈
Java Beans란, jsp의 표준 액션 태그로 접근할 수 있는 자바 클래스이다. 인스턴스 변수, setter 메소드, getter 메소드를 가지고 있다. 여러 JSP에서 사용할 수 있다.
다른 자바 클래스와 마찬가지로 자바 객체이다. 다음과 같은 특징이 있다.
- 클라이언트로부터 전달된 데이터를 쉽게 추출하고 다른 페이지에 참조할 수 있게 한다.
- 여러 페이지에 상태정보를 사용해야할 때 유용하다.
- JSP 내에 필요한 비즈니스 로직을 컴포넌트로 만들어 활용할 수 있다. JSP 페이지 크기는 작아지고 재활용성을 높일 수 있다.

### 자바빈즈 개발 규약
자바빈즈로서 동작하기 위해 자바진즈를 생성할 때 지켜야 하는 규칙이다. 자바빈의 활용은 표준 액션 태그로 수행한다. 
`<jsp:userBean>`,`<jsp:setProperty>`, `<jsp:getProperty>`

1. 패키지화
기본 패키지에 있으면 안되고, 반드시 패키지화가 되어 있어야 한다. 
```java
package com.edu.bean
public class HelloBean{}
```
2. 기본 생성자 존재
인자값이 없는 생성자가 기본 생성자이다.
```java
package com.edu.bean
public class HelloBean{
	public HelloBean(){}
}
```
3. getter 메소드
항상 getter/setter 메소드를 선언해야 하는 것이 아니다. 읽기 전용, 쓰기 전용에 따라 정의하면 된다.
4. setter 메소드
5. getter와 setter 접근자 public 선언
6. 직렬화 구현(선택 사항)
`java.io.Serializable`클래스 상속을 통해 객체 직렬화가 가능하다. 

**객체 직렬화**란 객체 정보를 기본형 데이터와 같이 입출력할 수 있도록 객체의 맴버들을 바이트 형태로 변환시켜 입출력하는 것이다. 자바 객체의 내용을 파일이나 DB테이블에 저장했다가 필요할 때 다시 자바 객체로 복원할 수 있다. 객체를 일련의 바이트 스트림으로 변환하여 출력하는 것을 '마셜링(Marshalling)'이라고 한다. 출력된 내용을 읽고 다시 자바 객체를 만들어 내는 과정을 언마셜링이라고 한다.

### 자바빈즈 사용
#### 정의
```java
/* java beans 정의 */
package com.chaeyun.beans;

public class HelloBean {
	private String name;
	private String number;
	
	public HelloBean() {
		this.name = "이름이 없습니다";
		this.number = "번호가 없습니다";
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getNumber() {
		return this.number;
	}
	
	public void setNumber(String number) {
		this.number = number;
		
	}
}
```

#### 인스턴스 생성
`<jsp:useBean class="com.edu.beans.HelloBean" id="hello1"/>`
- class 속성: 실제 클래스명을 패키지명과 함께 지정
- type 속성: 자바빈즈 클래스 객체에 접근할 때 어떠한 타입으로 접근할 것인지 지정.
- scope 속성: 유효범위. 속성값으로 page, request, session, application 중 하나를 지정할 수 있다. 기본값은 page이다.

#### Getter
`<jsp:getProperty property="number" name="hello" />`
- property에는 인스턴스 변수명을, name에는 인스턴스 객체명을 적는다.

#### Setter
`<jsp:setProperty property="number" name="hello" value="123"/>`
- value 속성에는 값을 지정한다.
- param 속성에는 request의 파라미터 변수 값을 지정한다.
`<jsp:setProperty property="number" name="hello" param="usrNum"/>`

#### 설정값 생략
여러 request 파라미터값들을 자바빈즈 인스턴스 변수들에 함꺼번에 지정 할 수 있다.

`<jsp:setProperty property="*" name="book">`은 다음과 같은 의미의 코드이다.
```
book.setNo(request.getParameter("no"));
book.setTitle(request.getPrameter("title"));
```

#### 예제
```jsp
<%@ page language="java" 
		 contentType="text/html;charset=UTF-8"
		 pageEncoding="UTF-8"
%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>예제17: java beans</title>
</head>
<body>
	<jsp:useBean class="com.chaeyun.beans.HelloBean" id="hello"/>
	
	<jsp:getProperty property="name" name="hello"/><br>
	<jsp:getProperty property="number" name="hello"/><br>
	
	<jsp:setProperty property="*" name="hello"/>
	
	<hr>
	
	<jsp:getProperty property="name" name="hello"/><br>
	<jsp:getProperty property="number" name="hello"/><br>
		
</body>
</html>
```




