# Head Of Line (HOL) Blocking

컴퓨터 네트워킹에서 패킷 큐(FIFO)가 있을 때 맨 앞의 패킷 때문에 뒤에 패킷들이 처리되지 못하는 성능 저하 현상이다. 

HTTP 1.1 은 요청 하나당 TCP 연결을 하나씩 만든다. 웹 브라우저에서 TCP 연결 만들고 유지하는데 한계가 있다. 이 한계가 3개까지라고 가정하면, 3개의 요청이 응답을 못 받은 경우에 4번째 요청은 기다려야 하는 상황이 발생한다.

HTTP 2 방식은 요청당 TCP 연결 하나씩 만들지 말고, 브라우저와 서버 간 한 TCP 연결만 만든다. 그리고 한 연결로 여러 요청을 보낸다. 요청 구분자는 메시지 안에 담는다. 이렇게 할 경우, TCP 연결을 만들지 않아도 한 번에 여러 요청을 보낼 수 있다. 

이렇게 TCP 연결을 하나로 해서 큐를 하나로 줄였다. 그렇다고 큐가 없어진 것이 아니기 때문에 TCP 계층에서의 HOL은 발생한다. 앞에 요청이 ACCEPT 되는데 밀린다면 나머지들도 밀리게 되기 때문이다.


## 참고
- https://en.wikipedia.org/wiki/Head-of-line_blocking