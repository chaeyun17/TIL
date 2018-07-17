# JSP

## 1. 동작 구조
1. jsp 파일에 대한 클라이언트의 최초 요청
2. JSP 컨테이너가 .jsp 파일을 .java로 변환
3. jsp 컨테이너가 .java 파일을 컴파일 하여 .class 파일 생성
4. 서블릿 컨테이너가 .class 파일을 서블릿처럼 실행
5. 변환과 컴파일 작업은 최초 요청 또는 JSP가 변경되었을 때만 수행.

## 2. JSP 구문 요소
JSP 페이지는 HTML, 텍스트 등과 같은 정적인 데이터와 함께 JSP의 구문 요소를 이용해서 텍스트 기반으로 작성할 수 있다. 
스크립트 기반 태그와 XML기반 태그로 나눌 수 있다.

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

## 3. 내장객체
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

