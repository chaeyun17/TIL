# STUN
STUN은 사설망 뒤에 있는 호스트들 간 통신을 위한 유틸리티 기술이다. 호스트들 간 서로의 IP를 모르기 때문에, 통신을 할 수가 없다. STUN 서버는 호스트 자신의 공인 IP가 무엇인지 알려준다. 각 호스트들은 알아낸 자신의 공인 IP를 가지고 호스트들 간 통신을 한다.

Session traversal Utilities for NAT (STUN) 은 프로토콜이다. Network Address Translator (NAT) travelsal을 다루는 다른 프로토콜들을 위한 도구이다. 
NAT에서 할당된 IP 주소와 port를 결정하기 위해 endpoint는 STUN을 사용한다. STUN은 NAT travelsal 솔루션이 아니라, Nat traversal 한 맥락으로써 도구로 사용된다.
- STUN 프로토콜을 구현한 서버를 STUN Server라 부른다.
- STUN Message는 고정된 헤더로 시작한다. 헤더는 한 Method, 한 Class, Transaction ID를 포함한다. Method는 이 문서에서는 Binding만 정의한다. Class는 request, a success response, an error response, indication 을 가리킨다. 
- Binding Method는 request/response 둘 다 사용 가능하다. 

- STUN 서버로 STUN 클라이언트가 request를 보낸다. 이 request는 여러 NAT을 거치면서 출발지의 아이피가 게속 바뀐다. 그리고 마지막에는 Public IP와 Port로 변환이 되서 STUN 서버로 REQUEST가 도착한다. reflexive transport address 라고 부른다. 서버는 response의 XOR-MAPPED-ADDRESS이라는 속성에 client의 public address와 port를 담아서 보낸다. response의 destination transport address는 NAT에 의해 게속 바뀌지만, XOR-MAPPED-ADDRESS 속성에 있는 address와 port 데이터는 바뀌질 않는다.

# TURN
TURN은 여러 사설망과 방화벽으로 인해 호스트들 간 주소를 알 수 없을 때 사용한다. TURN Server는 패킷 중계 서버이다. 호스트들 중간에 위치해 있어서 TURN Server가 호스틀 간 패킷을 교환해주는 역할을 한다. TURN Server는 대역폭을 많이 사용하기 때문에 비용이 많이 든다. 그래서 STUN Server가 제대로 작동을 하지 않을 때만 TURN 서버를 사용하는 것을 권장한다. ICE 에서는 STUN과 TURN 서버 정보를 둘 다 가지고 있기 때문에 자동으로 STURN 서버와 TURN 서버를 상황에 맞게 사용할 수 있다.

Traversal Using Relays around NAT (TURN): Relay Extensions to Session Traversal Utilities for NAT (STUN)

특정한 상황에서, NAT 뒤에 위치한 호스트는 다른 호스트들(peers)와 직접적으로 통신을 못할 수도 있다. 이러한 상황에서는 중간의 노드가 통신 중계자 역할을 해줘야 한다. 이것이 TURN(Traversal using Relays around NAT) 프로토콜이다. 호스트가 중계 작업을 컨트롤하고 중계를 통해 다른 호스트들(peers)과 패킷들을 교환한다. TURN이 다른 중계 컨트롤 프로토콜과 다른 점이 있다. 단 하나의 중계 주소만 가지고, 한 클라이언트가 여러명의 다른 피어들(peers)과 통신할 수 있다. 

TURN Client는 TURN Server의 IP Address와 Port, Peer의 IP Address와 Port 둘 다 알아야 한다. Peer의 IP Address와 Port를 알아내는 것은 STUN Protocol의 밖의 영역이다. 그래서 이메일로 서로의 주소를 교환하든지 방법을 구해야한다. 한 방법으로는 ICE와 함께 TURN을 사용한다면, ICE candidate information에 중계 주소와 peers의 주소를 함께 가진다. ICE candidate information은 랑데뷰 프로토콜이 운반한다. 

SIP 서버는 랑데뷰 프로토콜 역할을 한다. ICE candidate 정보는 SIP 메시지 body에 담겨 있다.

TURN 서버는 큰 대역폭을 사용하기 때문에 큰 비용을 감수해야 한다. 그래서 direct 통신하는 길이 없을 때만 사용하는 것이 좋다. 클라이언트와 peer가 통신로를 결정하면 ICE는 hole punching 기술을 사용한다.  direct path를 찾는다. 통신로를 찾을 수 없을 때만 TURN 서버를 사용한다.