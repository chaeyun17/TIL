# Kurento

## 설계
- Presentation layer(client side)
- Application logic: 특정한 멀티미디어 로직을 제공하는 계층. 적절한 파이프라인을 만드는 역할.
- Service layer: recording, media 계산 등과 같은 어플리케이션 로직을 보조. 멀티미디어 서비스를 제공하는 계층.

### 어플리케이션 구조도
- Signaling Plane: 통신 관리를 맡은 시스템의 한 부분 . QoS parametrization, call establishment, user registration, user presence, etc
- Media Plane: 미디어를 다루는 부분. 미디어 전송, 인코딩/디코딩, 미디어 처리
- 쿠렌토는 media negotiation 을 필수로 하고 있다. 다른 웹 앱처럼 미디어를 요청하고 받는 것이 아니다. 이렇게 복잡하게 만든 이유는 복잡한 미디어 처리를 파이프라인으로 쉽게 처리하기 위해서다.

## API
- 쿠렌토는 API를 제공한다. 이 API는 웹소켓통신 위에서 JSON-RPC로 쿼리가 이루어진다. 하지만 권장하는 방식은 쿠렌토 클라이언트 라이브러리를 사용할 것은 권장한다.
- [그림1]
- 쿠렌토 API는 **Media Elements** 개념이 기반이다. 미디어 엘리먼트는 특정한 미디어 기능을 가진다. WebRTCEndPoint는 WebRTC  미디어 스트림들을 전송하고 수신할 수 있다.

## Kurento Modules
- Kurento 는 pluggable 프레임워크로 설계됐다. 쿠렌토 미디어 서버는 kms-core, kms-elements, kms-filters 라는 기본 모듈들을 사용한다. 또한 내장된 다른 모듈들도 존재한다. kms-crowddetector(사람들이 뭉쳐있음을 감지하는 필터), kms-pointerdetector(색상을 추적하여 포인터들을 감지하는 필터), kms-chorma(상단 레이어에서 색상 범위를 가져와서 투명하게 만드는 필터), kms-platedetector 이 있다. 마지막으로, 쿠렌토 미디어 서버를 커스텀 모듈들로 확장시킬 수 있다.

## Kurento Utils JS
- a wrapper object of an `RTCPeerConnection`.
- [Link to Kurento Utils JS documentation](https://doc-kurento.readthedocs.io/en/stable/features/kurento_utils_js.html)
- `RTCPeerConnection`: is the core of the peer-to-peer connection between each of the broswers.
- [Link to RTCPeerConnection Tutorials](https://www.tutorialspoint.com/webrtc/webrtc_rtcpeerconnection_apis.htm)
- This object is aimed to simplify the development of WebRTC-based applications.
- Kurento Utils JS library offers a `WebRtcPeer` object, which is a wrapper of the browser's RTCPeerConnection API.

## 기능 구현

## Transcoding
- WebRTCEndpoint 에서 Transcoding 작업을 함.
- bandwidth에 따라 자동으로 bitrate를 변경하는 인코딩을 함.
- Google Congestion Control Alogorithm을 구현함.(223p)
    - RTP Media Congestion Avoidance Techniques(RMCAT)
- If both input and output formats are compatible (at the codec level), then the media can be transferred directly without any extra processing. If the input and output media formats are not compatible, the internal transcoding module will get enabled to convert the input media format to be compatible with the required output.
- http://www.kurento.org/blog/kurento-67-moving-forward
- Kurento 의 Filter 중 하나인 GStreamer-filter를 사용해야 함.
- kurento 필터 한 개당 gstreamer element 하나만 사용 가능.
- Gstreamer 명령어 사용법을 알야함.

## 대역폭 조절
- SDP 명세에서 조절함.
### kms -> peer 대역폭 조절
- WebRtcEndPoint.setMaxVideoSendBandwidth 
- Output bandwidth control mechanism: Configuration interval used to control bitrate of the output video stream sent to remote peer. It is important to keep in mind that pushed bitrate depends on network and remote peer capabilities. Remote peers can also announce bandwidth limitation in their SDPs (through the b=: tag). Kurento will always enforce bitrate limitations specified by the remote peer over internal configurations.
    - setMinVideoSendBandwidth: sets the minimum bitrate for video to be sent to remote peer. 0 is considered unconstrained.
- https://doc-kurento.readthedocs.io/en/6.9.0/_static/client-javadoc/index.html
- 테스트를 해보니, 최대 대역폭은 100kbs 까지 됨.

### peer -> kms 대역폭 조절
- interface SDPEndPoint
- `void setMaxVideoRecvBandwidth(int maxVideoRecvBandwidth)`
- Set Maximum bandwidth for video reception, in kbps. The default value is 500. A value of 0 sets this as unconstrained.
- https://doc-kurento.readthedocs.io/en/6.9.0/_static/client-javadoc/org/kurento/client/SdpEndpoint.html#setMaxVideoRecvBandwidth-int-
- 테스트 결과, 50kbps 도 가능.

## 녹화 장치 선택 및 변경 기능
- Client Server의 JS 파일 중 `Kurento Utils JS` 라이브러리의 `WebRtcPeer` 오브젝트의 옵션값을 수정해야함.
- [Link to Kurento Utils JS documentation](https://doc-kurento.readthedocs.io/en/stable/features/kurento_utils_js.html)
- default device 를 바꾸는 법을 봐야함.

## 해상도 조절(작업중)
### MediaDevices.getuserMedia()
- 클라이언트의 영상 화면 크기 제어

### Not Working
- `kurento-utils-js` 라이브리러 중 `WebRtcPeer` 오브젝트에서 담당. options 오브젝트의 mediaConstraints의 video 값을 수정해야함.
```Javascript
mediaConstraints = { 
                     audio : true, 
                     video : {  
                              mandatory : {  
                                           maxWidth : 320,  
                                           maxFrameRate : 15,  
                                            minFrameRate : 15 
                                          }  
                              }  
                   };
```

## 한 기기에서 2개 장치 녹화 및 접속
- 기존 기기 선택 방법으로 서비스를 실행하고 2개의 클라이언트로 접속이 되는지 테스트.
    - chorme private tab으로 시도 
    - 전송 확인 완료


---

## Receiving RTSP 
- While HTTP is stateless, RTSP has state; an identifier is used when needed to track concurrent sessions.
- Like HTTP, RTSP uses TCP to maintain an end-to-end connection
- ,while most RTSP control messages are sent by the client to the server, some commands travel in the other direction.