# WebHook

## 정의
Webhook은 HTTP를 통해 전송되는 알림 이벤트이다. 웹훅은 웹앱, 모바일 앱, 소프트웨어 등 어디에서든 구축될 수 있다. 웹훅 또는 HTTP Callbacks를 생성하도록 특정 이벤트를 프로그래밍할 수 있다. HTTP CalLbacks 는 HTTP로 보내는 알림 이벤트이다. 데이터 형식은 개발자가 원하는대로 사용할 수 있다. XML, JSON 등.

## WebHook과 API의 다른 점
첫째, 호출되는 방식이 다르다. API는 웹서버에 데이터가 새로 업데이트 됐는지 안됐는지 상관 없이 호출이 있을 때 데이터를 주고 받는다. 반면에, Webhook은 웹 서버에 데이터가 업데이트가 되면 자동으로 웹훅이 호출되어 연결된 다른 앱 또는 플랫폼으로 데이터를 전송한다. 

둘째, 사용용도가 다르다. API는 알상적으로 데이터를 주고 받을 수 있다. Webhook은 데이터가 업데이트되는 상황 발생했을 때만 호출된다. 그래서 웹훅 서버가 살아있는지 죽어있는지 연결된 다른 시스템에서 알 수가 없다. 하지만 API는 언제든지 데이터를 요청하거나 받을 수 있다. 이러한 특성 때문에, 웹훅은 real time 앱에서 주로 사용된다. 또, 웹훅은 작은 데이터만 보내는 것이 적절하다.

## 참고
- https://techterms.com/definition/webhook
- https://hackernoon.com/webhook-vs-api-whats-the-difference-8d41e6661652