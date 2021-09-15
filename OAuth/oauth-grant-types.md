# OAuth2 Grant Types

## Resource Owner Password Credentials Grant
[OAuth 2.0 Password Grant](https://oauth.net/2/grant-types/password/) 라고도 부른다. 이 방식은 OAuth.com 에 따르면 Implicit 방식과 함께 Legacy 로 분류되어 있다. [참고](https://oauth.net/2/grant-types/)

     +----------+
     | Resource |
     |  Owner   |
     |          |
     +----------+
          v
          |    Resource Owner
         (A) Password Credentials
          |
          v
     +---------+                                  +---------------+
     |         |>--(B)---- Resource Owner ------->|               |
     |         |         Password Credentials     | Authorization |
     | Client  |                                  |     Server    |
     |         |<--(C)---- Access Token ---------<|               |
     |         |    (w/ Optional Refresh Token)   |               |
     +---------+                                  +---------------+

            Figure 5: Resource Owner Password Credentials Flow

이 방식은 Resource Owner(사용자)가 Client에 Password를 넘겨서 Client가 인증서버로부터 Access Token을 획득하는 간단한 방식이다. 이 방식은 간단하지만 보안에 유의해야한다. 

모든 주체들이 이미 신뢰된 관계여야 한다. 써드파티 앱에는 사용하면 안되는 방식이다. 왜냐하면, Resource Owner의 암호를 Client에게 알려주는 방식이기 때문에 Client는 믿을만한 주체여야 한다. 그래서 실무적으로 사용할 땐 세 가지 주체인 Resource Owner, Client, Authorization Server가 같은 회사 조직이거나 자체 서비스로 통합되어 있으면 괜찮다. 예를 들면, 트위터 앱을 다운로드 받아서 트위터 로그인 패스워드를 묻는 것은 정상적이라고 느낀다. 반대로 다른 회사 앱 내에서 G메일 서비스 연동해서 사용하려면 반드시 구글 인증 서버를 사용해야한다. 

[Best Practice 문서](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-16#section-2.4)에서는 이 방식을 허용하지 않는다. 애초에 Client에게 password를 넘기는 것을 막기 위해 OAuth2가 나온 것이다. [참고](https://developer.okta.com/blog/2018/06/29/what-is-the-oauth2-password-grant#when-to-use-the-password-grant-type) 위에서 말한 특정한 상황에서만 사용할 수 있다.

직접 인증 체계와 비슷하기 때문에 기존 방식을 OAuth 방식으로 마이그레이션할 때 이런 Grant Type을 사용할 수 있다. [참고](https://tools.ietf.org/html/rfc6749#section-4.3). 직접 인증 체계에서 왜 이 Grant Type으로 변환할까? 바로 Access Token과 Refresh Token 방식과 관리 기능을 사용할 수 있기 때문이다. 세션(상태)을 사용하지 않는 REST API 방식으로 앱을 개발하면, 프론트엔드와 백엔드 간 Token 기반으로 통신할 수 밖에 없다. 아무런 제약이 없는 토큰은 보안에 취약하다. 만에 하나 토큰이 탈취된다면 서버 측에서는 막을 방법이 없다. 그래서 토큰 만료일, 재발급 등의 제약조건들을 추가하면 보안을 강화할 수 있다. [참고](https://developer.okta.com/blog/2018/06/29/what-is-the-oauth2-password-grant#when-to-use-the-password-grant-type)

다음은 Access Token 요청 에제이다. 한 번의 호출만 하면 획득할 수 있다.
[참고](https://www.oauth.com/oauth2-servers/access-tokens/password-grant/)

```
POST /oauth/token HTTP/1.1
Host: authorization-server.com
 
grant_type=password
&username=user@example.com
&password=1234luggage
&client_id=xxxxxxxxxx
&client_secret=xxxxxxxxxx
```

추가적으로 고민 지점이 있다. 아무리 자사 서비스라고 하더라도, OAuth 상의 클라이언트가 프론트엔드(웹브라우저)가 될 경우 Client Crendential(ID와 Password)가 노출될 위험이 항상 존재한다. 인증서버 측에서는 클라이언트 Credential이 다른 곳에서 사용한다는 것을 확인하지 못한다. 이 문제를 해결하려면, 인증서버에 Client의 서버 도메인을 저장해두고 체크하는 방식으로 보완해야한다. 그래서 Authorization Code Grant Type에서 client redirect url을 사용하는 이유인 것 같다. 보안을 최대한 안전하게 하려면 권고한대로 Authorization Code 방식을 사용하는 것이 바람직하다.

### Resource Owner Password Crendential Grant Type을 사용하지 말아야 하는 이유
어떤 이유에서든 Resource Owner password Credential Grant 방식을 사용하지 말아야 한다고 자세히 설명한 [블로그 글](https://www.scottbrady91.com/OAuth/Why-the-Resource-Owner-Password-Credentials-Grant-Type-is-not-Authentication-nor-Suitable-for-Modern-Applications)이 있다. 

1. 인증 서버와 Resource Owner(유저) 간 직접적으로 인증을 하지 않으면 제대로 된 인증이 아니다. client 나 중간자가 들어가게 되면 인증서버 측에서는 해당 유저로 인증한 것인지 확신할 수 없다. 그럼으로 보안상 위험하다.
1. 사용자에게 피싱 사이트에 접속할 확률을 높이게 된다. 써드파티 서비스(OAuth Client)마다 다른 인증 페이지를 통해 인증을 계속 할 수 밖에 없다. 나중에되면 사용자는 어떤 것이 연계된 서비스인지 알기 어려우며, 가짜로 만든 피싱사이트에서 로그인 정보를 입력하는 실수를 할 수 있다. Authorization Code 방식을 사용하면, 한 개의 동일한 인증 페이지를 사용하기 때문에 피싱 공격 확률을 낮출 수 있다.
1. OAuth Client를 아무리 신뢰한다고 해도, 누구나 접속할 수 있는 웹을 사용한다면 보안상 위험하다. 웹은 캐시를 남길 수 있기 때문에 username 과 PW 가 남을 수 있다. 또한 Client ID와 PW 정보를 복호화할 위험도 있고, 자바스크립트를 변조할 수도 있다.
1. 이 방식은 기술부채이다. 이미 Legacy로 지정이 되었고, 유지보수가 어려워질 것이며 보안 상 위험하다.
1. 특정 디바이스가 OAuth Client이여도 마찬가지이다. Device를 위한 Grant Type이 따로 존재한다. 



## Client Credential Grant Type
이 방식은 리소스 서버 간 통신을 할 때 쓰인다. 유저이름과 패스워드 같은 인증 없이 Client 정보만 있으면 Access Token을 발급받을 수 있다. 유의할 점은 Client 정보만으로 쉽게 토큰을 발급할 수 있으므로, scope를 최소한으로 제한을 해야한다. [RFC 문서 참고](https://tools.ietf.org/html/rfc6749#section-1.3.4)

API 명세는 [참고](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)
```
POST /token HTTP/1.1
Host: authorization-server.com
 
grant_type=client_credentials
&client_id=xxxxxxxxxx
&client_secret=xxxxxxxxxx
```



### 참조
- [Resource Owner Password Credentials Grant, oauth2](https://tools.ietf.org/html/rfc6749#section-4.3)
- [Resource Owner Password Credentials Grant, Best practice oauth2](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-16#section-2.4)
- https://oauth.net/2/grant-types/password/
- https://www.oauth.com/oauth2-servers/access-tokens/password-grant/