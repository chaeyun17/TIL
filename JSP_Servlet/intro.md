# JSP & Servlet Intro
책 '처음해보는 Servelt&JSP 웹프로그래밍(오정임 지음, Ruby Paper)'를 참고하였습니다.
## Java EE
Java Enterprise Edition. 
Java SE에 웹 서버 기능을 추가하였다. JSP, Servlet, JDBC 등 웹 프로그래밍에 관련된 기술들이 포함되어 있다. 이것을 기반으로 웹 어플리케이션 서버(WAS)를 만든다.

## JSP vs Servlet 
자바 언어를 가지고 HTML 페이지를 생성한다는 기능은 똑같다.
하지만 역할이 다르다. JSP는 사용자에게 데이터를 보여주는 뷰를 담당하고, Servlet은 데이터를 받아서 가공하는 컨트롤러를 담당한다.

## 웹 어플리케이션의 파일 구조는 어떻게 만들어야할까?
![tomcat directory sturcture](https://image.slidesharecdn.com/tomcatconfiguration1-090403015310-phpapp01/95/tomcat-configuration-1-25-728.jpg?cb=1238723733)

## web.xml vs @webServlet 어떤 것을 사용할까?
web.xml에 정리를 해두면 전체적인 url 매핑을 볼 수 있기 때문에 유지보수에 도움이 된다. URL 패턴을 다르게 하려면 자바 파일을 다시 컴파일해야한다.
- 이클립스에서는 web.xml을 자동으로 생성하지 않는다. Java EE6 와 Servlet3 에서는 web.xml 중요도를 낮추려고 하고 있기 때문이다.
- 출처: https://crunchify.com/eclipse-missing-web-xml-file-how-can-i-create-web-xml-in-eclipse/
- web.xml 대신 `@WebServlet` 어노테이션을 사용한다.
## CGI vs Servlet
서블릿은 한 번 생성한 객체를 재사용하기 때문에 처리양이 적고, 메모리 사용이 절약이 된다. CGI는 처음부터 끝까지 다시 처리하기 때문에 서블릿보다 비효율적이다. 

## CGI는 어떻게 동작할까?

## tomcat java doc 을 이클립스에 연동하기
servlet documents를 이클립스에서 즉석해서 보려고 한다. 하지만 document를 찾을 수 없다는 에러가 뜬다.
1. tomcat 홈페이지에서 버전에 맞는 document를 다운 받는다.
2. 이클립스 화면으로 온다. 프로젝트 익스플로러에서 `Libraries`-`Apache Tomcat v9.0`의 리스트를 펼친다. `servlet-api.jar` 오른쪽 클릭을 통해, 파일의 프로퍼티 설정창을 연다. 
3. javadoc Location 탭에서 javadoc URL에 `servletapi` 폴더 경로를 입력한다. 예시: `file:/D:/chaeyun/Documents/tomcat-9.0-doc/servletapi/`

출처: https://stackoverflow.com/questions/2869485/how-to-add-javadoc-for-servlet-api-in-eclipse

## MIME type files
**What is a MIME type?**

MIME stands for "Multipurpose Internet Mail Extensions. It's a way of identifying files on the Internet according to their nature and format. For example, using the "Content-type" header value defined in a HTTP response, the browser can open the file with the proper extension/plugin.

**What is an Internet Media Type?**

"Internet Media Type" is the same as a MIME type. MIME types were originally created for emails sent using the SMTP protocol. Nowadays, this standard is used in a lot of other protocols, hence the new naming convention "Internet Media Type".

출처: https://www.freeformatter.com/mime-types-list.html

