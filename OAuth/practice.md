# OAuth Spring boot 실습하기

## Client App Server 구현
- OAuth2 Sso(Single Sign On)를 사용한다.
- sso는 `Authentication` token으로 인증을 하나.
OAuth2 기능 구현은 스프링 부트 시큐리티에 있다. `@EnableOAuth2Sso` 사용하면, 허가되지 않은 접속은 `application.yml`에 적힌대로 OAuth 인증이 시작된다.
```JAVA
@Configuration
@EnableOAuth2Sso
public class UiSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/**")
          .authorizeRequests()
          .antMatchers("/", "/login**")
          .permitAll()
          .anyRequest()
          .authenticated();
    }
}

```

```YML
server:
    port: 8082
    servlet:
        context-path: /ui
    session:
      cookie:
        name: UISESSION
security:
  basic:
    enabled: false
  oauth2:
    client:
      clientId: SampleClientId
      clientSecret: secret
      accessTokenUri: http://localhost:8081/auth/oauth/token
      userAuthorizationUri: http://localhost:8081/auth/oauth/authorize
    resource:
      userInfoUri: http://localhost:8081/auth/user/me
spring:
  thymeleaf:
    cache: false
```
- accessTokenUri: 토큰을 얻기 위한 요청 경로
- userAuthorizationUri: 허가 경로. 유저가 리다이렉션되는 목적지
- userInfoUri: 인증절차를 마치고, 유저의 마지막 도착지점. 여기선 유저의 상세정보를 볼 수 있는 페이지로 설정됨.
- resource: 이 설정은 리소스 서버에 해당한다. 여기선 유저 정보를 얻고 있다.

### 시나리오
1. `localhost:8082/ui/securedPage` : 클라이언트 앱에서 원하는 페이지로 들어가려고 한다.
2. `localhost:8082/ui/login` 클라이언트 앱의 스프링 시큐리티에서 인증을 요구한다. 인증을 하기 위해 시큐리티 기본설정에 따라 `/ui/login`로 리다이렉션 된다.
3. `http://localhost:8081/auth/oauth/authorize?client_id=SampleClientId&redirect_uri=http://localhost:8082/ui/login&response_type=code&state=RrdypY`: OAuth 방식 인증을 설정했기 때문에, OAuth 설정대로 인증서버로 Redirect 한다.
4. `http://localhost:8081/auth/login` : 인증서버의 `AuthServerConfig` 설정에서 토큰키 유무를 검사한다. 토큰키가 없으면 시큐리티 인증 과정인 로그인을 진행한다.
5. `http://localhost:8081/auth/oauth/authorize?client_id=SampleClientId&redirect_uri=http://localhost:8082/ui/login&response_type=code&state=RrdypY`: POST 방식으로 아이디/비밀번호를 Http Request 로 하면 해당 URL Redirect을 Http Response 한다.
6. `http://localhost:8082/ui/login?code=GqSHOF&state=RrdypY` : HTTP response 이다. 클라이언트앱으로 리다이렉트하면서 인증코드를 전달한다. 이 인증코드가 있으면 원래 접속하려던 곳으로 리다이렉트한다.
7. `http://localhost:8082/ui/securedPage`: 처음에 접속하려던 페이지.


## 실습 자료
- [Welcome Spring OAuth Project](http://projects.spring.io/spring-security-oauth/docs/Home.html)
- [Tutorials](http://projects.spring.io/spring-security-oauth/docs/tutorial.html)
- [Samples Code](https://github.com/spring-projects/spring-security-oauth/tree/master/samples)
- [Spring Boot OAuth2 AutoConfig Reference](https://docs.spring.io/spring-security-oauth2-boot/docs/current-SNAPSHOT/reference/htmlsingle/#boot-features-security-oauth2-authorization-server)
