# EL (Expression Language)
서블릿 기능을 JSP보다 간단하게 표현할 수 있는 기술이다.

JSP2.0에 추가된 개념. 원래는 JSTL 1.0 규약에 소개된 내용으로 자바 코드를 대신해 실행 시간에 태그의 속성값을 지정하는 역할을 했음.

초기의 EL은 JSTL의 액션 태그에서만 작동하는 문제가 있었는데, JSP 2.0 부터는 JSP 컨테이너가 EL 표현식을 해석할 수 있게 되어 표준 액션 태그, 커스텀 태그,
탬플릿 데이터와 같이 자바 코드를 사용해야 했던 모든 곳에 EL을 사용할 수 있다.

EL은 자바스크립트에서 확장된 XPath에서 힌트를 언어 만들어진 언어이다. 그러나 EL은 값이 없는 변수 null에 대해 좀 더 관대하고 데이터 형변환을 
자동으로 해준다. 서버 프로그램 내에서는 int, boolean 으로 사용해야 할 때가 있다. EL을 사용하면 값이 겂거나 형변환 등에 전혀 신경을 쓸 필요가 없다.

## EL 구문
- `${ }`
- 변수, 연산자 문자를 사용하여 표현식을 작성.
- 논리, 숫자, 문자, 연산자, 변수 사용 가능.

## 내장객체
요청정보, scope에 관한 내장객체를 지원한다. 주로 KEY:VALUE 로 된 map 객체로 되어있다.
- pageContext, pageScope, reuqestScope, sessionScope, applicationScope, param, paramValue, header, headerValues, cookie, initParam
```jsp
	${param.id} / ${param.pwd } <br>
	${param["id"] } / ${param["pwd"] }
```

## 정보 추출
EL로 구현했을 때 최대 장점은 코드의 간소화에 있다. 여러 페이지에서 사용하기 위해 HttpServletRequest, HttpSession, ServletContext 객체에 등록한
 데이터를 접근할 떄 간단한 코드로 처리할 수 있다.

 ```html
 	<form action="example22.jsp" method="post">
		책제목: <input type="text" name="title"><br>
		책저자: <input type="text" name="author"><br>
		출판사: <input type="text" name="publisher"><br>
		<input type="submit" value="등록">
	</form>
 ```
 ```jsp
 	<% request.setCharacterEncoding("UTF-8"); %>
	<jsp:useBean class="com.chaeyun.test.BookBean" id="book"/>
	<jsp:setProperty property="*" name="book"/>
	<% request.setAttribute("book", book); %>
	<jsp:forward page="bookOutput.jsp"/>
 ```
 ```jsp
 	책제목: ${book.title } <br>
	책저자: ${book.author }<br>
	출판사: ${book.publisher }<br>
 ```
 EL 구문은 `${book}`처럼 표현할 경우는 
 1. request. session, application 객체 순서로 `getAttribute("book")` 메소드를 실행한다. 
 2. 추출된 정보를 등록된 객체의 타입으로 캐스팅한다.
 3. ${book.title}은 book객체의 getter 메소드를 실행한다.
 4. `((Book)request.getAttribute("book").getTitle();` 과 같은 뜻이다. 