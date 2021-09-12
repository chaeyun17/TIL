# HTTP

## HTTP 2

HTTP2는 클라이언트 요청과 응답 트랜잭션을 레이어를 하나 더 만들어 캡슐화하였다. 

HTTP 1.1 에는 클라이언트(브라우저)에서 한 요청당 하나의 TCP 연결을 만들었다면, HTTP 2에서는 한 클라이언트 당 한 TCP 연결을 만드는 씩으로 변경되었다. 

![HTTP/2 Multiplexing](https://blog.cloudflare.com/content/images/2015/12/http-2-multiplexing.png)



그리고 요청 식별은 메시지 내에 담았다. 그리고 기존에는 메시지가 텍스트였는데 바이너리화하여, 바이너리 프레이밍 계층이 생겼다.

![HTTP/2 바이너리 프레이밍 계층](https://developers.google.com/web/fundamentals/performance/http2/images/binary_framing_layer01.svg)



이제 메시지 내에 헤더프레임과 데이터 프레임으로 분리되어 메시지 안에 담긴다.

![HTTP/2 스트림, 메시지 및 프레임](https://developers.google.com/web/fundamentals/performance/http2/images/streams_messages_frames01.svg)



## 서버 푸시

이러한 변경사항으로 이제 클라이언트가 요청하지 않은 리소스도 서버에서 보낼 수 있게 되었다. 불온한 목적으로 서버가 클라이언트에게 위험한 데이터를 전송할 수 있기 때문에, 서버를 인증하는 SSL/TLS 는 HTTP 2의 필수사항이다.

![HTTP/1.1 file concatenation](https://blog.cloudflare.com/content/images/2015/12/http-1-1-file-concatenation.png)

![HTTP/2 file concatenation](https://blog.cloudflare.com/content/images/2015/12/http-2-file-concatenation.png)

자바의 서블릿에서는 HTTPServletRequest 의 [PushBuilder](https://javaee.github.io/javaee-spec/javadocs/javax/servlet/http/HttpServletRequest.html)로 서버 푸시를 사용할 수 있다. 



## HTTP 3

HTTP 3는 TCP 기반에서 UDP 기반 새 프로토콜 `QUIC` 변경하였다. 왜냐하면 기존 TCP 프로토콜의 한계를 뛰어넘기 위해서이다. UDP 프로토콜은 필수로 정의한 것이 적기 때문에 커스텀해서 새 프로토콜을 만들기 쉽다. 즉 HTTP 3는 기존과 다른 새 프로토콜을 만듦으로써 효율성을 취했다.

기존 HTTP 1.1 또는 HTTP 2로 TLS를 적용하면, 연결 할 때 3 핸드쉐이크를 하고, TLS 를 위해 또한번 대칭키 생성을 위한 교환을 해야한다. (HTTP 2에서는 한 클라이언트당 한 연결로 TCP 연결 횟수가 줄었지만)

그래서 `QUIC` 프로토콜은 한 번의 핸드쉐이크로 TLS 연결 과정까지 완료한다. 그리고 TCP의 장점인 패킷 손실 재전송과 같은 오류 제어 기능도 넣었다. TCP 방식을 차용했지만 몇가지 개선 및 추가하였다고 한다. https://datatracker.ietf.org/doc/rfc9002	



### 참고

- https://evan-moon.github.io/2019/10/08/what-is-http3/



# 참고

- https://blog.cloudflare.com/http-2-for-web-developers/
- https://developers.google.com/web/fundamentals/performance/http2
