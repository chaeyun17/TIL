# OAuth
정보 접근 권한을 위임하는 공개 표준이다. 보통 인터넷 유저들이 웹 또는 앱에 있는 자신의 인증 정보를 다른 웹사이트에게도 부여하는 데에 사용된다. 이 때, 다른 웹사이트에 비밀번호를 전달하지 않는다. 이 동작방식은 아마존, 구글, 페이스북, 마이크로소프트, 그리고 트위터 같은 회사에서 사용한다. 유저들이 그들의 계정 정보를 제 3의 앱 또는 웹사이트에 공유하는 것을 허가하기 위해서다.

- Federated Identity: 연합 식별자. 다른 서비스와 연합을 통해서 사용자를 식별.
- Open Auth. Auth는 Authentication(인증)과 Authorization(허가)를 포함한다.
- OpenID의 주요 목적은 인증(Authentication)이고, OAuth의 주요 목적은 Authorization(허가)이다. OpenId는 로그인에 초점이 맞춰져 있고, OAuth는 가입한 웹사이트 또는 앱의 기능(API)을 사용할 수 있도록 허가를 받는 것이다. 예를 들면, 페이스북의 친구 목록을 가져오거나 사용자 타임라인에 바로 글을 쓸 수 있는 기능.
- Oauth 1.0은 복잡한 과정이 있고, Oauth 2.0은 1.0보다 간단한 과정으로 따로 암호화 없이 Https를 사용한다.

## OAuth2 동작 원리

### 등장인물
- Resource Owner: 유저. 개인정보 소유자.
- Client: 유저가 사용하려는 웹사이트 또는 앱 서비스. 제 3의 서비스로, 유저에 대한 특정 정보를 필요로 함.
- Resource Server: 유저의 개인정보를 저장한 곳이며 API도 제공. 예를 들면 페이스북, 구글이 될 수 있음. 설명을 위해 Authorization Server도 여기에 포함하기로 함.
- client id, client secret, Authorized redirects url, scope

### 시나리오
페이스북(Resource Server)을 사용하는 유저(Resource Owner)가 인스타그램(Client)에 가입하려고 한다.
0. 준비.
  - Resource Server에 인스타그램에 대응하는 앱을 생성하여, Client ID와 Client Password를 발급받고, Authorized Redirect URL, Scope(사용할 정보, 사용할 API 선택 정보)을 설정한다.

1. 유저가 인스타그램에 가입하기 위해서, 회원가입 페이지에 있는 login with facebook 링크를 클릭한다.
    - 이 링크에는 Client Id, Redirect URL, Scope 정보가 URL 매개변수에 담겨있다.
    - 이 링크를 통해 페이스북 회원 인증 페이지를 요청한다.

2. 로그인이 안되어 있다면, 유저는 ID, PW를 입력하여 페이스북에 로그인을 하고, 개인정보 및 API 사용에 대해 허가한다.
    - Client가 Access Token을 얻기 위한 과정이다. 로그인 인증, scope 허가, 인증 코드가 필요하다.
    - 로그인 성공 시, 링크에 담겨 있던 Client Id, Redierect URL, Scope 정보를 Resource Server에서 확인한다.
    - Resource Server에서 Client에서 보낸 정보들을 검증이 성공하면, Resource User에게 Scope에 사용에 대한 허락을 묻는다.
    - Resource Server는 해당 유저가 해당 Scope의 사용허가 사실을 저장한다.
    - Resource Server는 Resource Owner에게 Authentication Code를 전달한다. redirect url을 사용.
    - Client는 Resource Owner가 받은 Authentication Code를 자동으로 가져간다. redirect url에 request에 인증코드를 담아서 전송.
    - client는 인증코드와 client secret 정보를 resource server로부터 인증을 받은 뒤, access token을 발급받는다.
    - access token은 client와 resource server 두 공간에 저장하고, 인증코드는 삭제한다.

4. 유저는 인스타그램에 로그인이 완료되어, 인스타그램을 사용한다.
    - 인증과 허가를 유지하기 위해서 Refresh key가 필요하다.
    - 일정 시간이 지나서 access key가 resource server로 부터 인증이 실패한다.
    - 인증이 실패하면 refresh key를 전송하여 인증 받는다.
    - refresh key 가 검증이 되면, 새로운 Access key를 재발급 받는다. 선택사항으로 refesh key를 재발급 받을 수도 있다.
    - 새로운 access key로 api를 사용한다.


## 참고자료
- [OAuth 2.0, 생활코딩](https://opentutorials.org/course/3405)
- [OAuth 2.0 Framework - RFC 6749](https://tools.ietf.org/html/rfc6749)
- [OAuth, Naver D2](https://d2.naver.com/helloworld/24942)
- [OAuth, Wikipedia](https://en.wikipedia.org/wiki/OAuth)
- [Spring boot - OAuth2 실습 튜토리얼, 블로그](https://redstapler.co/facebook-login-oauth2-spring-boot/)
- [Spring boot - OAuth2 실습 가이드, 스프링](https://spring.io/guides/tutorials/spring-boot-oauth2/#_social_login_simple)
- https://www.baeldung.com/sso-spring-security-oauth2

## 더보기
- OAUTH 2.0 실습해보기
- REST API 알아보기: 요즘엔 Restful API를 많이 사용하고 있다. 데이터타입은 JSON 또는 XML 형태로 많이 사용한다.
    - Restful : http://blog.remotty.com/blog/2014/01/28/lets-study-rest/
    - API
    - JSON
