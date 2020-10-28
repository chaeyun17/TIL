# 웹브라우저 엔진
웹 브라우저 엔진은 크게 2개가 있다. 첫째는 레이아웃 엔진과 렌더링 엔진. 둘째는 Javascript 엔진이다. 세 엔진 모두 DOM(Document Object Model)을 공유해서 사용한다.

## 레이아웃 엔진과 렌더링 엔진
레이아웃 엔진은 화면을 그리는 역할을 한다. 렌더링 엔진과 분리되어 있지만, 서로 깊이 연관되어 있다. 레이아웃 엔진은 CSS(Cascading Style Sheets)를 담당한다. 레아아웃 엔진은 여러 연관된 CSS 룰들을 통합 조정하여 스크린 위에 그린다. 몇몇 엔진은 페이지의 리소스가 모두 다운되기 전부터 렌더링을 시작하기도 한다. 이미지가 점차적으로 채워가는 것처럼.

## Javascript 엔진
주요 웹브라우저에서는 JS 엔진을 별도 엔진으로 사용한다. 브라우저 엔진과 의존도(결합도)가 적다. 그래서 브라우저 뿐만 아니라 다른 용도로도 많이 사용된다. 
초기에 JS엔진은 단순히 Interpreter(해석기)였지만, 현대 엔진은 성능 향상을 위해 Just In Time 컴파일을 사용한다. 모든 브라우저에는 자신만의 JS 엔진을 가지고 있다. 렌더링 엔진과 JS엔진은 DOM을 통해 같이 실행된다. JS 엔진은 브라우저에서만 사용되지만 않는다. 구글의 V8 엔진은 Node.js 런타임 시스템의 주요 컴포넌트이다.

1995년 넷스케이프 네비게이터 웹 브라우저를 위해 자바스크립트 엔진이 개발됐다. Interpreter 방식이다. 2008년 최초 모던 자바스크립트 엔진인 V8이 등장해싿. 구글에서 크롬 브라우저를 위해 만들었다. 이전과 다른 크게 다른 점은 Just-In-time Complitaion 방식인 점이다. 실행 시간을 눈에 띄게 단축시켰다. 그 후, Apple 사는 Nitro 엔진을 사파리 브라우저를 위해 개발했다. 이 엔진은 전 엔진보다 30% 성능이 향상된 것이다. Mozila에서는 Nitro 엔진을 부분 활용하여 자사의 SpiderMonkey 엔진을 향상 시켰다. Opera 사는 인터프리터 엔진을 Caraken 엔진으로 대체하였다. 전보다 몇몇 부분에서 2배만큼 성능이 향상 되었다.

2017년 이후로, 위의 브라우저들은 WebAssembly를 지원해오고 있다. WebAssembly는 pre-compiled executables 방식을 할 수 있게 한다. 이 점은 페이지 스크립트의 성능에 중요한 부분이다. JS 엔진은 같은 sandbox에서 평범한 JS code처럼 WebAssembly code를 실행한다. 

***Sandbox***: 여기서 sandbox란 프로그램들을 분리해서 따로 실행하는 보안 동작방식이다. 시스템 실패 또는 소프트웨어 취약성을 완하시키기 위한 노력으로 이용하는 동작방식이다. 종종 신뢰되지 않은 프로그램 또는 코드 실행에 사용한다.

## 주요 엔진들
웹 플랫폼이 오픈 스탠다드의 묶음이기 때문에 다양한 브라우저 엔진이 구현되어 있다.
1. Gecko: Mozila 에서 개발하였고, Firefox 브라우저에서 사용한다. 
2. WebKit(Apple): Apple 사에서 Safari 브라우저를 위해 개발했다. KDE 프로젝트의 KHTML 엔진을 fork하여 개발한 것이다.
3. Webkit, Blink(Google): 원래 Chorme 브라우저는 Webkit을 사용하였다. 하지만 Webkit을 fork하여 Blink 엔진을 개발했다. 모든 Chromium 기반 브라우저들은 Blink 엔진을 사용한다. 
4. Trident, EdgeHTML: Microsoft 사에서 예전에는 자신 소유의 브라우저 엔진을 개발한 것이다. 하지만 현재 Edge broswer는 Blink 엔진을 사용한다.

## 참고
- https://en.wikipedia.org/wiki/Browser_engine
- https://en.wikipedia.org/wiki/JavaScript_engine
- https://en.wikipedia.org/wiki/KDE
