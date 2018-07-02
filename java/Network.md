# Network

## OSI MODEL
http://fiberbit.com.tw/tcpip-model-vs-osi-model/
![OSI Model](http://fiberbit.com.tw/wp-content/uploads/2013/12/TCP-IP-model-vs-OSI-model.png)

## HTTP
HTTP(HyperText Transfer Protocol, 문화어: 초본문전송규약, 하이퍼본문전송규약)는 WWW 상에서 정보를 주고받을 수 있는 프로토콜이다. 주로 HTML 문서를 주고받는 데에 쓰인다. TCP와 UDP를 사용하며, 80번 포트를 사용한다. 1996년 버전 1.0, 그리고 1999년 1.1이 각각 발표되었다.

HTTP는 클라이언트와 서버 사이에 이루어지는 요청/응답(request/response) 프로토콜이다. 예를 들면, 클라이언트인 웹 브라우저가 HTTP를 통하여 서버로부터 웹페이지나 그림 정보를 요청하면, 서버는 이 요청에 응답하여 필요한 정보를 해당 사용자에게 전달하게 된다. 이 정보가 모니터와 같은 출력 장치를 통해 사용자에게 나타나는 것이다.

HTTP를 통해 전달되는 자료는 http:로 시작하는 URL(인터넷 주소)로 조회할 수 있다. 

**출처 및 참고**  
[HTTP ,wiki](https://ko.wikipedia.org/wiki/HTTP)  
https://developer.mozilla.org/ko/docs/Web/HTTP/Overview

## HTTP GET 방식의 URI 기본 인코딩은 무엇일까?
QUERY문은 IRI 문법을 쓴다. 전송할 데이터(문서) 인코딩에 따라 URI에 들어갈 QUERY문이 생성된다. 인코딩이 다르면 QUERY문도 다르다.
**참고**  
[IRI ,wiki](https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier)  
[What's the correct encoding of HTTP get request strings? ,stackoverflow](https://stackoverflow.com/questions/1549213/whats-the-correct-encoding-of-http-get-request-strings)

## UDP vs TCP
![TCP & UDP](https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory&fname=http%3A%2F%2Fcfile7.uf.tistory.com%2Fimage%2F99B8A03359E8882C2DA818)

## 질문거리
### Q. HTTP에서 TCP는 언제 쓰이는건가?
- 클라이언트->서버 간의 관계에서만 TCP 연결이 쓰인다. 서버->클라이언트 사이에서는 TCP 연결이 아니다. 클라이언트가 다시 요청하면 되기 때문이다. 
- UDP는 음성, 영상 전송에서만 사용된다. TCP는 패킷 순서가 틀어졌거나 유실 됐을 경우, 데이터를 다시 보내기 때문에. 재생 중 끊킴 문제가 발생할 수 있기 때문이다.
1. TCP 패킷 전송 용량이 UDP보다 크다.
2. 서버로의 데이터 전송이 보장된다. UDP는 그렇지 않다.
3. FTP를 썼던 옛날부터 TCP를 썼다. 
https://www.quora.com/Does-HTTP-use-TCP-or-UDP-Why , https://www.quora.com/Does-HTTP-use-TCP-Why
