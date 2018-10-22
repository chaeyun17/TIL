# 스프링 부트 시큐리티
- authentication(인증) 과 authorization(허가) 의 기능을 수행한다.
- `AuthenticationManager` 인터페이스가 주요한 역할을 한다. `authenticate()` 메소드만을 가지고 있다.
- `AuthenticationManager` 인터페이스 구현으로는 주로 `ProviderManager` 클래스를 사용한다.
- `ProviderManager`는 `AuthenticationProvider ` 인스턴스들 체인의 최상단에 위치한다.
- 스프링 시큐리티에서는 일반적인 세팅이 된 Authentication manger 요소들을 제공한다. 거의 대부분 `AuthenticationManagerBuilder`를 사용한다.
- `AuthenticaionManagerBuilder`는 메모리, JDBC 또는 LDAP 유저 상세, 또는 커스텀 `UserDetailsService` 을 사용할 수 있다.
- `UserDetailsService` 클래스를 가지고 Spring JPA 연동을 할 수 있다.
- Authentication이 완료된 다음에는 Authorizaition이 있다. 핵심은 `AccessDecisionManager`이다.
- `AccessDecisionVoter`가 `AccessDicisionManager` 구현의 대표를 한다.
- `AccessDecisionVoter`는 `Authentication `과 `ConfigAttributes`로 장식된 secure Object를 참고한다.
- `ConfigAttribute`는 하나의 메소드를 가진 인터페이스다. `ROLE_ADMIN`과 같은 문자열을 반환한다. 

![시큐리티](https://i.stack.imgur.com/3gLa3.jpg)

## 인증 과정
출처: [스프링 시큐리티 동작 흐름](https://springbootdev.com/2017/08/23/spring-security-authentication-architecture/)
![Spring Security : Authentication Architecture](https://chathurangat.files.wordpress.com/2017/08/blogpost-spring-security-architecture.png?w=1108)


### 1. Http Request 받기
스프링 시큐리티는 필터들의 체인을 가진다. 그러므로 Request가 왔을 때, 인증과 권한부여를 위해서 필터들의 체인을 통과할 것이다. 유저 인증 요청이 있을 경우에도, 인증 작동방식/모델에 기초한 관련된 Authentication Filter를 찾을 때 까지 평소처럼 필터들의 체인을 통과할 것이다.

- 예시: HTTP 기본 인증 Request는 **BasicAuthenticationFilter** 를 만날 때까지 필터들의 체인을 통과할 것이다.
- Http Digest Authentication reqeust는 **DigestAuthenticationFilter** 를 만날 때까지 필터들의 체인을 통과한다.
- 로그인 폼 제출 request(로그인 폼 인증 요청)는 **UsernamePasswordAuthenticationFilter** 에 도달할 때까지 필터 체인들 통과한다.
- x509 인증 request는 **X509AuthenticationFilter**를 만날 때까지 필터 체인을 통과한다.

### 2. 유저 credential(자격정보)에 기반한 AuthenticationToken 생성
관련된 AuthenticationFilter가 인증요청을 받으면, 받은 요청으로부터 유저이름과 비밀번호를 추출한다(대부분의 인증 방식에는 유저이름과 비밀번호를 요구한다). 그런 다음, 유저 자격정보에서 추출한 것을 기반으로 인증 객체(Authentication Object)를 만든다.

추출된 자격 증명이 유저명과 비밀번호라면, 추출된 유저명과 비밀번호를 사용하여 UsernamePasswordAuthenticationToken 이 만들어진다.

### 3. 만들어진 AuthenticationToken을 AuthenticationManager에게 넘기기

UsernamePasswordAuthenticationToken 객체가 만들어지면, AuthenticationManager의 authenticate 메소드를 호출하는데 사용될 것이다. AuthenticationManager 는 단지 인터페이스일 뿐이고 구현은 ProviderManager 가 한다.

```java
public interface AuthenticationManager
{
Authentication authenticate(Authentication authentication)throws AuthenticationException;
}
```

ProviderManager가 인증 유저 요청에 사용되는 설정된 AuthenticationProvider들의 리스트를 가진다. ProviderManager 는 각각의 AuthenticationProvider를 통과할 것이다. 그리고 인증 객체(예: UsernamePasswordAuthenticationToken)에 기초하여 유저를 인증하려고 할 것이다.

### 4. AuthenticationProvider는 제공된 인증 객체를 가지고 유저 인증을 시도한다.
```java
public interface AuthenticationProvider {
    Authentication authenticate(Authentication authentication) throws AuthenticationException;
    boolean supports(Class<?> authentication);
}
```
아래는 프레임워크에서 제공하는 authentication provider 이다.
- CasAuthenticationProvider
- JaasAuthenticationProvider
- DaoAuthenticationProvider
- OpenIDAuthenticationProvider
- RememberMeAuthenticationProvider
- LdapAuthenticationProvider

### 5. UserDetailsService 가 요구될까?  
어떤 AuthenticationProvider는 유저명을 기반한 유저 상세정보를 얻기 위해 UserDetailsService를 사용할 수도 있다.(예: DaoAuthenticationProvider)
```java
public interface UserDetailsService
{
  UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
```

### 6 과 7. UserDetails 또는 User Object?
UserDetailsService는 유저명에 기초한 UserDetails(실제 구현은 User)를 획득할 것이다. 

### 8. Authentication Object 또는 AuthenticationException?
유저가 성공적으로 인증이 됐다면, 완전히 채워진 인증 객체가 반환될 것이다. 반대의 경우, AuthenticationException이 던져진다.

AuthenticationProvider 인터페이스에 따르면, AuthenticationProvider는 정확하게 완전히 채워진 인증 객체를 반환한다(인증이 성공적으로 됐을 시) 또는 AuthenticationException 던진다(인증 실패 시).

완전히 채워진 인증 객체는
- authenticated – true
- grant authorities list
- user credentials (username only)
의 정보를 담는다.

만약 AuthenticationException이 발생한다면, 인증 작동방식을 지원하는 설정된 AuthenticationEntryPoint 에서 처리될 것이다.

### 9. 인증 완료!
AuthenticationManager는 관련된 인증 필터에게 완전히 채워진 인증 객체를 반환한다.

### 10. SecurityContext 에서 인증 객체를 설정한다.
관련된 인증필터는 앞으로 사용될 필터를 위해 Security Context에 획득한 인증 객체를 저장한다.
`SecurityContextHolder.getContext().setAuthentication(authentication);`



## 참고
- [스프링 시큐리티 설계 개념](https://spring.io/guides/topicals/spring-security-architecture/)
- [스프링 시큐리티 동작 흐름](https://springbootdev.com/2017/08/23/spring-security-authentication-architecture/)
- [Spring Security: Authentication with a Database-backed UserDetailsService](https://www.baeldung.com/spring-security-authentication-with-a-database)
