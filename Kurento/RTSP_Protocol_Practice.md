# RTSP Protocl practice

## vlc log 연결 로그
```
 131 Sending request: OPTIONS rtsp://192.168.11.200:554/1/stream1 RTSP/1.0^M
 132 CSeq: 2^M
 133 User-Agent: LibVLC/3.0.4 (LIVE555 Streaming Media v2018.02.18)^M
 134 ^M
 135
 136 Received 115 new bytes of response data.
 137 Received a complete OPTIONS response:
 138 RTSP/1.0 200 OK^M
 139 CSeq: 2^M
 140 Public: DESCRIBE, SETUP, TEARDOWN, PLAY, PAUSE, SET_PARAMETER, GET_PARAMETE     R, OPTIONS^M
 141 ^M
 142
 143 Sending request: DESCRIBE rtsp://192.168.11.200:554/1/stream1 RTSP/1.0^M
 144 CSeq: 3^M
 145 User-Agent: LibVLC/3.0.4 (LIVE555 Streaming Media v2018.02.18)^M
 146 Accept: application/sdp^M
 147 ^M
 
 193 Sending request: SETUP rtsp://192.168.11.200/1/stream1/video RTSP/1.0^M
 194 CSeq: 4^M
 195 User-Agent: LibVLC/3.0.4 (LIVE555 Streaming Media v2018.02.18)^M
 196 Transport: RTP/AVP;unicast;client_port=41954-41955^M

```

## Pratice Log
```
telnet 192.168.11.200 554

OPTIONS rtsp://192.168.11.200:554/1/stream1 \r\n CSeq: 1

DESCRIBE rtsp://192.168.11.200:554/1/stream1 RTSP/1.0

SETUP rtsp://192.168.11.200/1/stream1/video RTSP/1.0^MCSeq: 4^MUser-Agent: LibVLC/3.0.4 (LIVE555 Streaming Media v2018.02.18)^MTransport: RTP/AVP;unicast;client_port=41954-41955^M