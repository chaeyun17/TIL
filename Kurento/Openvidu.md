# Openvidu

## openvidu-broswer-VERSION.js
Openvidu의 클라이언트 쪽 JS를 구현하기 위한 라이브러리이다. [Document](https://openvidu.io/api/openvidu-browser/index.html)

1. WebRTC API Wrapper 역할  
WebRTC 통신을 위해서 브라우저는 WebRTC API를 제공한다. 이 라이브러리를 통해 WebRTC API를 쉽게 제어할 수 있다. 비디오, 오디오 녹화 장치를 제어할 수 있으며, WebRTC 연결에 필요한 작업들을 내부적으로 동작한다.

2. Openvidu Server와의 통신  
Session을 관리하는 Openvidu Server와 WebScoket 통신을 한다. OpenVidu Server에게 Session 정보를 요청한다. Session을 통해서 화상채팅방을 관리하며, 화상회의 참가자들은 모두 같은 Session 정보를 가지고 있다. Session으로 연결된 다른 참석자들과 멀티미디어를 송수신을 한다.

3. Kurento Media Server와의 통신  
 Kurento Media Server와 WebRTC 통신을 한다. 멀티미디어 스트림을 Kurento Media Server에 전송을 한다(Kurento Media Server는 다른 Peer에서 멀티미디어를 전송한다). 반대로 다른 Peer들의 멀티미디어를 KMS로부터 수신받아 재생한다.

### 주요 오브젝트
#### OpenVidu
openvidu-broswer 라이브러리를 사용할 수 있게 하는 오브젝트이다. 즉, EntryPoint 역할이다. 주요 오브젝트인 Session과 Publisher를 생성 및 초기화해서 사용할 수 있게 한다.

#### Session
화상채팅의 세션 관리 오브젝트이다. 화상채팅방이 즉 세션이다. 세션을 통해서 다른 Peer의 멀티미디어를 수신받을 수 있으며, 반대로 자신의 멀티미디어를 전송할 수도 있다. OpenVidu만의 특정 Event가 있으며, Evnet Handler를 통해서 다른 Peer의 멀티미디어를 수신받고 처리할 수 있다. OpenVidu 오브젝트를 통해 Session 오브젝트를 생성할 수 있다. 
```Javascript
var OV = new OpenVidu();
var session = OV.initSession();

session.on('streamCreated', function (event) {
  session.subscribe(event.stream, 'subscriber');
});
```
session.on(event, eventHandler) 메서드는 event dispatcher이다. 특정 Event가 발생하면 해당 Handler가 실행된다. session.off() 메서드는 특정 이벤트와 핸들러가 연결되어 있는 연결을 해제한다. 이러한 Event Dispatcher 인터페이스로 Publisher, Session, Stream, StreamManager, Subscriber 주요 오브젝트에 구현이 되어 있다. 

Session 오브젝트는 OpenVidu Client Server에서 발급 받은 Token을 통해 세션 연결을 한다. 참고로 Token은 주로 Peer의 Publisher 또는 Subscriber라는 권한명과 Session 이름을 기반으로 생성된다.
```Javascript
session.connect(token)
    .then(() => {
        var publisher = OV.initPublisher("publisher");
        session.publish(publisher);
    })
```

#### Publisher
로컬 미디어 스트림을 제어한다. Sesion 오브젝트를 통해 스트림을 전송한다. OpenVidu 오브젝트의 initPublisher 메서드를 통해 생성할 수 있다. Sessinoh 오브젝트 설명의 2번째 예제 코드를 참고.