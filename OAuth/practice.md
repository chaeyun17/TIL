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

## Auth App Server 구현
```yml
server.port=8081
server.servlet.context-path=/auth
```

```JAVA
@Configuration
@EnableAuthorizationServer
public class AuthServerConfig extends AuthorizationServerConfigurerAdapter {
     
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
 
    @Override
    public void configure(
      AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
        oauthServer.tokenKeyAccess("permitAll()")
          .checkTokenAccess("isAuthenticated()");
    }
 
    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory()
          .withClient("SampleClientId")
          .secret(passwordEncoder.encode("secret"))
          .authorizedGrantTypes("authorization_code")
          .scopes("user_info")
          .autoApprove(true) 
          .redirectUris("http://localhost:8082/ui/login","http://localhost:8083/ui2/login"); 
    }
}
```

```JAVA
@Configuration
@Order(1)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.requestMatchers()
          .antMatchers("/login", "/oauth/authorize")
          .and()
          .authorizeRequests()
          .anyRequest().authenticated()
          .and()
          .formLogin().permitAll();
    }
 
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
            .withUser("john")
            .password(passwordEncoder().encode("123"))
            .roles("USER");
    }
     
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){ 
        return new BCryptPasswordEncoder(); 
    }
}
```

```JAVA
@RestController
public class UserController {
    @GetMapping("/user/me")
    public Principal user(Principal principal) {
        return principal;
    }
}
```


### 시나리오
1. `localhost:8082/ui/securedPage` : 클라이언트 앱에서 원하는 페이지로 들어가려고 한다.
2. `localhost:8082/ui/login` 클라이언트 앱의 스프링 시큐리티에서 인증을 요구한다. 인증을 하기 위해 시큐리티 기본설정에 따라 `/ui/login`로 리다이렉션 된다.
3. `http://localhost:8081/auth/oauth/authorize?client_id=SampleClientId&redirect_uri=http://localhost:8082/ui/login&response_type=code&state=RrdypY`: OAuth 방식 인증을 설정했기 때문에, OAuth 설정대로 인증서버로 Redirect 한다.
4. `http://localhost:8081/auth/login` : 인증서버의 `AuthServerConfig` 설정에서 토큰키 유무를 검사한다. 토큰키가 없으면 시큐리티 인증 과정인 로그인을 진행한다.
5. `http://localhost:8081/auth/oauth/authorize?client_id=SampleClientId&redirect_uri=http://localhost:8082/ui/login&response_type=code&state=RrdypY`: POST 방식으로 아이디/비밀번호를 Http Request 로 하면 해당 URL Redirect을 Http Response 한다.
6. `http://localhost:8082/ui/login?code=GqSHOF&state=RrdypY` : HTTP response 이다. 클라이언트앱으로 리다이렉트하면서 인증코드를 전달한다. 이 인증코드가 있으면 원래 접속하려던 곳으로 리다이렉트한다.
7. `http://localhost:8082/ui/securedPage`: 처음에 접속하려던 페이지.

---

## Spring boot OAuth2 Tutorials - Facebook
원본 자료: https://spring.io/guides/tutorials/spring-boot-oauth2/

### 소스코드
1. pom.xml
  - webjars들은 프론트 페이지를 위한 라이브러리.
  - OAuth2를 사용하기 위해서, spring-boot-starter-security, spring-security-oauth2-autoconfigure를 추가
  - CSRF를 위해 js-cookie 라이브러리 추가

```XML
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
  <scope>test</scope>
</dependency>

<dependency>
  <groupId>org.webjars</groupId>
  <artifactId>jquery</artifactId>
  <version>2.1.1</version>
</dependency>
<dependency>
  <groupId>org.webjars</groupId>
  <artifactId>bootstrap</artifactId>
  <version>3.2.0</version>
</dependency>
<dependency>
  <groupId>org.webjars</groupId>
  <artifactId>webjars-locator-core</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.security.oauth.boot</groupId>
  <artifactId>spring-security-oauth2-autoconfigure</artifactId>
  <version>2.0.0.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.webjars</groupId>
    <artifactId>js-cookie</artifactId>
    <version>2.1.0</version>
</dependency>
```

2. Application.java
  - controller 기능과 Security 세팅 둘 다 함께 있음.
  - `@EnableOAuth2Sso`로 자동으로 OAuth2 관련 기본 세팅.
  - `@EnableOauth2Sso`을 가진 클래스에 `WebSecurityConfigurerAdapter`를 상속하면, 스프링 시큐리티 필터 체인은 OAuth2 인증 프로세서를 포함한다.
  - CSERF 보안을 위해 csrfTokenRepository 세팅
  - `/user`의 `Principal` 객체에 유저 정보가 저장되어 있다. 이것을 JSON 형태로 response한다.

```JAVA
import java.security.Principal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableOAuth2Sso
@RestController
public class OAuthTutoApplication extends WebSecurityConfigurerAdapter{

	@RequestMapping("/user")
	public Principal user(Principal principal) {
		return principal;
	}

	public static void main(String[] args) {
		SpringApplication.run(OAuthTutoApplication.class, args);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception{
		http
			.antMatcher("/**")
			.authorizeRequests()
				.antMatchers("/","/login**","/webjars/**","/error**")
				.permitAll()
			.anyRequest()
				.authenticated()
			.and().logout().logoutSuccessUrl("/").permitAll()
			.and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
	}
}
```
3. application.yml
  - OAuth2Sso 세팅.
  - OAuth 프로토콜 형식에 필요한 정보들을 명시. https://tools.ietf.org/html/rfc6749

```YML
security:
  oauth2:
    client:
      clientId: 페이스북에 앱 만들기를 통해 만든 앱 ID
      clientSecret: 페이스북에 앱 만들기를 통해 만든 앱 Password
      accessTokenUri: https://graph.facebook.com/oauth/access_token
      userAuthorizationUri: https://www.facebook.com/dialog/oauth
      tokenName: oauth_token
      authenticationScheme: query
      clientAuthenticationScheme: form
    resource:
      userInfoUri: https://graph.facebook.com/me
```

4. index.html
  - 메인 페이지로, 로그인과 로그아웃 기능이 있다.
  - `/user`에게 AJAX 통신을 하여 유저 정보를 가져오고 인증 상태를 확인한다.
  - `logout()`에서는 logout 처리를 한다.
  - `$.ajaxSetup()`은 CSRF 보안 기능을 사용하기 위해, AJAX 기본 세팅으로 `XSRF-TOKEN`을 Http Request Header에 담는다.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>Demo</title>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width"/>
    <base href="/"/>
    <link rel="stylesheet" type="text/css" href="/webjars/bootstrap/css/bootstrap.min.css"/>
    <script type="text/javascript" src="/webjars/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="/webjars/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/webjars/js-cookie/js.cookie.js"></script>
</head>
<body>
	<div class="container unauthenticated">
		With Facebook: <a href="/login">click here</a>
	</div>
	<div class="container authenticated" style="display:none">
		Logged in as : <span id="user"></span>
		<div><button onclick="logout()" class="btn btn-primary">Logout</button></div>
	</div>
	<script type="text/javascript">
		$.get("/user", function(data){
			$("#user").html(data.userAuthentication.details.name);
			$(".unauthenticated").hide();
			$(".authenticated").show();
		});

		var logout = function(){
			$.post("/logout", function(){
				$("#user").html();
				$(".unauthenticated").show();
				$(".authenticated").hide();
			});
			return true;
		}

		$.ajaxSetup({
			beforeSend: function(xhr, settings){
				if(settings.type == 'POST' || settings.type == 'PUT' || settings.type == 'DELETE'){
					if( !( /^http:.*/.test(settings.url) || /^https:.*/.test(settings.url) ) ){
						xhr.setRequestHeader("X-XSRF-TOKEN", Cookies.get('XSRF-TOKEN'));
					}
				}
			}
		});
	</script>
</body>
</html>
```

## 실습 자료
- [Welcome Spring OAuth Project](http://projects.spring.io/spring-security-oauth/docs/Home.html)
- [Tutorials](http://projects.spring.io/spring-security-oauth/docs/tutorial.html)
- [Samples Code](https://github.com/spring-projects/spring-security-oauth/tree/master/samples)
- [Spring Boot OAuth2 AutoConfig Reference](https://docs.spring.io/spring-security-oauth2-boot/docs/current-SNAPSHOT/reference/htmlsingle/#boot-features-security-oauth2-authorization-server)
