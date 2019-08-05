# REST(Representaional State Transfer)
- REST는 아키텍처 스타일이다. 아키텍쳐 스타일은 제약 조건들의 집합이다. 하이브리드 아키텍쳐 스타일이라고도 불리는데, 아키텍쳐 스타일들의 집합이기도 하기 때문이다. [Representational state transfer, wikipedia참조](https://en.wikipedia.org/wiki/Representational_state_transfer)
- Hypertext 기반이다. Hypertext란 참조(Hyperlink)를 통해 독자가 한 문서에서 다른 문서로 바로 접근할 수 있는 텍스트를 말한다. [REST APIs must be hypertext-driven, Roy.T.Fielding](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)

## 역사
- 1991년 World Wide Web의 창시: 팀 버너스 리(Tim Berners-Lee)는'인터넷을 사용하여 어떻게 정보를 공유할 것인가?' 라는 고민에 웹을 만들었다. 그리고 그 안에서 'Hypertext'형식을 만들었다. Hypertext는 위에서 말했듯이, 독자가 한 문서에서 다른 문서로 바로 접근할 수 있는 Hyperlink(참조)가 있는 텍스트이다. 웹은 표현형식으로 `HTML`, 식별자로 `URI`, 전송방식으로 `HTTP`를 사용한다.
- 1994-1996년 HTTP 1.0: Roy.T.Fielding이 HTTP 1.0 작업에 참여한다. '어떻게 Web를 망가트리지 않으면서 HTTP를 개선할 수 있을까?'의 고민에 HTTP Object Model 이라는 개념을 만들었다. 이것이 REST의 기초가 된다.
- 1998년 REST 발표: Roy.T.Fielding 은 Microsoft Research에서 발표를 하는데, REST라는 단어를 세계최초로 공개했다.
- 2000년 REST 논문 발표: Roy.T.Fielding은 박사 논문을 발표한다. 'Architectural Styles and the Design of Network-based Software Architectures'. 이 때 구체적인 REST에 대해 정의를 했다.

## API의 역사
- 2000년 Salesforce에서 SOAP API를 공개했다.
- 2004년 Flicker는 기존 SOAP과 REST API를 공개했다.
- 이후 사람들은 SOAP API와 REST API를 비교하기 시작했고, 더 간단해 보이는 REST API를 더 많이 사용하기 시작했다.
- 2008년 CMIS에서 REST 바인딩에 대한 표준 발표: CMIS는 CMS 서비스를 하는 기업들이 참여하는 CMS 표준기관이다. REST 바인딩에 대한 표준을 발표했다. 하지만 Roy.T.Fielding은 CMS에는 REST 아키텍쳐가 적용되지 않았다고 말했다.
- 2016년 Microsoft REST API Guidelines 발표: MS에서 REST API 가이드라인을 발표했다. 하지만 식별자 URI와, HTTP Method만 제약사항을 주로 두었다. 이에 Roy.T.Fielding은 REST가 아니라고 말하였다.

## Roy.T.Fielding의 REST와 차이가 무엇인가?
REST는 분산 하이퍼 미디어 시스템인 웹을 위한 아키텍쳐 스타일이다. 웹은 REST 아키텍쳐 스타일을 지키고 있다. 왜냐하면 HTTP 표준, 웹 브라우저, 웹어플리케이션 간에 독립성을 보장하고 있다. HTTP 표준 버전이 올라갔다고 해서, 웹 서버를 업데이트 해야 할 일은 없다. 그리고 웹 브라우저가 업데이트가 되었다고 해서 HTTP 표준이 업데이트되어야 하는 것은 없다.

### 웹
- **표준형식: HTML**
- **대상: 사람**
- 식별자: URI
- 전송방식: HTTP

### REST API
- **표준형식: JSON**
- **대상: 기계**
- 식별자: URI
- 전송방식 HTTP

웹과 REST API 차이점은 표준형식과 대상이 다르다. 그리고 HTML 표준형식에 대한 명세가 명확하다. 각 태그 별로 명세가 나와있으며 웹 브라우저에서 적용된다. 하지만 REST API에서 JSON은 명세가 없다. 이 key 값이 무엇을 뜻하는지는 등에 대한 설명이 없다. 그리고 하이퍼링크가 없다. REST는 Hypertext-driven 이라는 제약조건이 있다. 하지만 우리가 REST API를 설계할 때, hypertext의 핵심 기능인 hyperlink의 역할을 하는 것이 전혀 없다.

## REST를 구성하는 스타일
1. Client - Server 구조: 다양한 플랫폼 지원을 위해 유저 인터페이스와 데이터 저장 부분을 분리해야 한다.
2. Stateless: 요청 메시지에는 요청에 대한 모든 정보가 들어가야 되며, 서버에 따로 클라이언트의 상태를 저장하면 안된다. 세션 상태는 클라이언트가 전적으로 책임을 맡아야한다. [Do sessions really violate RESTfulness?,stackoverflow](https://stackoverflow.com/questions/6068113/do-sessions-really-violate-restfulness), [5.1.3 Stateless, Roy.T.Fielding 논문](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_1_3)
3. Cache
4. Uniform interface
5. Layered System
6. Code-on-demand(Optional): 필요하다면 Javacript 코드와 같은 실행 가능한 코드를 전송할 수도 있다.

### Uniform interface
1. Resource 식별자
2. 변경할 때 http 메시지에 표현을 담아서 전송
3. Self-descriptive Mesages
4. Hyermedia as the engine of application state(HATEOAS)


## 단어
### stateless VS stateful
1. Stateful Protocol: 클라이언트가 서버에게 요청을 하면, 특정 응답을 기다린다. 응답이 없으면 클라이언트는 다시 요청을 보낸다. 여러 요청들 간의 상태가 존재한다. 각 요청마다 필수적으로 세션 정보를 유지해야 한다. 예로 telnet과 FTP 프로토콜이 있다.

2. Stateless Protocol: 클라이언트는 요청하면, 서버는 현재의 상태에 따라 응답을 한다. 각 통신에서 서버에게 세션을 유지하라고 요구하거나, 여러 요청들 간에 상태를 요구하지 않는다. HTTP, UDP, DNS가 대표적이다.

## 참조
- [그런 REST API로 괜찮은가, Naver D2](https://www.youtube.com/watch?v=RP_f5dMoHFc): 주로 이 영상의 내용을 메모한 것임.
- [Representational State Transfer (REST), Roy.T.Fielding Disertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
- [RESTFul이란 무엇인가?](http://blog.remotty.com/blog/2014/01/28/lets-study-rest/)
- [REST, Wikipedia ko](https://ko.wikipedia.org/wiki/REST)
