# Openvidu Session Management

## Create Session
1. openvidu-clinet는 openvidu-server로부터 세션을 생성 요청을 한다. 

## Join Session
1. openvidu-client에서 session 오브젝트와 UserId, Role 정보를 조합하여 Token을 생성한다.
1. Client는 Java Client에게 Token을 전달받아서, 이를 통해 세션에 접속한다.

## Leave Session
1. Client는 Session.disconnect를 통해서 접속해제를 한다.
