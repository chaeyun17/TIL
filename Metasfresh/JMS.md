# JMS
Java Messaging Service. API. Java Message-Oriented middleware.

## 정의
- Java EE 구현. SUN 사에서 만듦
- 자바 컴포넌트들 간의 통신을 위한 서비스.
- TCP나 다른 통신보다 느슨한 관계를 형성한다. 컴포넌트들 끼리 간접적인 통신. 메시지를 전송하는 측에서 받는 측의 정보를 알 필요가 없다는 장점이 있다.
- 느슨한 관계, 신뢰할만한, 비동기적
- 서로 좀 다른 컴포넌트들끼리 연결할 수 있고, 시스템의 병목현상을 줄일 수 있고, 규모를 증가시킬 수 있다. 그리고 변화에 빠르게 응답한다.

## 구성 요소
- JMS provider: Message-Oriented middleware(MOM)을 위해 JMS 인터페이스를 구현. JMS 구현 또는 자바가 아닌 MOM Adapter를 구현한다.
- JMS client: 어플리케이션. 또는 메시지 생산 또는 받는자.
- JMS producer/publisher: 메시지를 보내는 JMS 클라이언트 
- JMS consumer/subscriber: 메시지를 받는 JMS 클라이언트.
- JMS message: JSM 클라이언트들 간에 전송하는 데이터를 담은 오브젝트
- JMS queue: 메시지를 담은 스테이징 영역.
- JMS topic: 다양한 수신자들에게 전송될 메시지를 만드는 배분 동작방식 

## 참고
- https://en.wikipedia.org/wiki/Java_Message_Service