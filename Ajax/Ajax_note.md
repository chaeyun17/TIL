# Ajax 공부 메모

### 발췌&참고
1. https://ko.wikipedia.org/wiki/Ajax
2. https://en.wikipedia.org/wiki/Ajax_(programming)
3. http://adaptivepath.org/ideas/ajax-new-approach-web-applications/

## Ajax 정의

Ajax(Asynchronous Javascript and Xml)는 비동기적인 웹 어플리케이션의 제작을 위해 아래와 같은 조합을 이용하는 웹 개발 기법이다.
- 표현 정보를 위한 HTML (또는 XHTML) 과 CSS
- 동적인 화면 출력 및 표시 정보와의 상호작용을 위한 DOM, 자바스크립트
- 웹 서버와 비동기적으로 데이터를 교환하고 조작하기 위한 XML, XSLT, XMLHttpRequest
DHTML이나 LAMP와 같이 Ajax는 자체가 하나의 특정한 기술을 마하는 것이 아니며, 함께 사용하는 기술의 묶음을 지칭하는 용어이다. 실제로 AFAX와 같이 사실상 Ajax에 바탕을 두고 있는 유사/복합 기술들이 속속 나타나고 있다.

Ajax 어플리케이션은 실행을 위한 플랫폼으로 위에서 열거한 기술들을 지원하는 웹 브라우저를 이용한다.

## Ajax 역사
이것은 이미 존재하던 기술이었지만 2000년도 중반 이후로 인기를 끌기 시작했다. 구글은 2004년에 G메일, 2005년에 구글 지도 등의 웹 어플리케이션을 만들기 위해 비동기식 통신을 사용했다. Ajax라는 용어는 공식적으로 Ajax: A new Approach for a new application 기사에서 구글이 Google pages 에서 사용한 기술에 기반하여 등장했다. 2006년 W3C는 공식적인 웹 표준을 만들기 위한 시도로 규격 초안을 발행했다.

- 1996년, `iframe` 태그가 인터넷 익스플로러를 통해 등장했다. 객체 엘리먼트를 비동기적으로 컨텐츠를 load 또는 fetch 할 수 있었다.
- 1998년, MS Outlook Web App팀이 XMLHttpRequest scripting 객체 컨셉을 개발했다.
- 1999년, XMLHTTP가 등장했다. MSXML 라이브러리의 두 번째 버전에 포함되었다. 인터넷 익스플로러 5.0에 탑재됐다.
- 모질라, 사파리, 오페라에 XMLHTTP 기능을 가진 ActiveX 컨트롤이 사용됐다. XMLHttpRequest Javascript object를 사용. 하지만 아직 제대로 사용되지 않았다.
- 2004-2005년에 구글이 G메일과 구글맵스를 넓고 유동적으로 사용할 수 있는 크로스 브라우징 Ajax를 만들었다. Ajax 개발팀은 한 기사를 통해 Ajax에 대해 발표했다.
- 2006년, W3C에서 XMLHttpRequest 객체를 표준화하기 시작했다. 2014년이 최근 수정안이다.

현재 Ajax를 사용하는 웹 어플리케이션이 급격히 늘어나고 있으며, 이는 부분적으로 이용할 수 있는 어플리케이션 툴킷(예: Ruby on Rails, DWR)이 늘어나 프로그램더르이 구현하기 쉬워진 때문이다.

## Ajax 역할
기존의 웹 어플리케이션은 브라우저에서 폼을 채우고 이를 웹 서버로 제출을 하면 하나의 요청으로 웹 서버는 요청된 내용에 따라서 데이터를 가공하여 새로운 웹 페이지를 작성하고 응답으로 되돌려준다. 이때 최초에 폼을 가지고 있던 페이지와 사용자가 이 폼을 채워 결과물로서 되돌려 받은 페이지는 일반적으로 유사한 내용을 가지고 있는 경우가 많다. 결과적으로 중복되는 HTML 코드를 다시 한번 전송을 받음으로써 많은 대역폭을 낭비하게 된다. 대역폭의 낭비는 금전적 손실을 야기할 수 있으며 사용자와 대화(상호 반응)하는 서비스를 만들기 어렵게도 한다.

반면에 Ajax 애플리케이션은 필요한 데이터만을 웹서버에 요청해서 받은 후 클라이언트에서 데이터에 대한 처리를 할 수 있다. 보통 SOAP이나 XML 기반의 웹 서비스 프로토콜이 사용되며, 웹 서버의 응답을 처리하기 위해 클라이언트 쪽에서는 자바스크립트를 쓴다. 웹 서버에서 전적으로 처리되던 데이터 처리의 일부분이 클라이언트 쪽에서 처리 되므로 웹 브라우저와 웹 서버 사이에 교환되는 데이터량과 웹 서버의 데이터 처리량도 줄어들기 때문에 애플리케이션의 응답성이 좋아진다. 또한 웹서버의 데이터 처리에 대한 부하를 줄여주는 일이 요청을 주는 수많은 컴퓨터에 대해서 일어나기 떄문에 전체적인 웹 서버 처리량도 줄어들게 된다.

#### 장점
- 페이지 이동없이 고속으로 화면을 전환할 수 있다.
- 서버 처리를 기다리지 않고, 비동기 요청이 가능하다.
- 수신하느 데이터 양을 줄일 수 있고, 클라이언트에게 처리를 위임할 수 있다.

#### 단점
- Ajax를 쓸 수 없는 브라우저에 대한 문제가 있다.
- HTTP 클라이언트의 기능이 한정되어 있다.
- 페이지 이동없는 통신으로 보안상의 문제
- 지원하는 Charset이 한정되어 있다.
- 스크립트로 작성되므로 디버깅이 용이하지 않다.
- 요청을 남발하면 역으로 서버 부하가 늘 수 있음.
- 동일-출처 정책으로 인해 다른 도메인과는 통신이 불가능하다.

## Ajax 동작원리
![Ajax통신원리1](http://adaptivepath.org/uploads/archive/images/publications/essays/ajax-fig1.png)
![Ajax통신원리2](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Ajax-vergleich-en.svg/585px-Ajax-vergleich-en.svg.png)

## Ajax 구현
### Javascript 예시
많은 개발자들이 XMLHttpRequest 객체 문법을 싫어한다. 그래서 우회방법들을 만들었다.

```javascript
// This is the client-side script.

// Initialize the HTTP request.
var xhr = new XMLHttpRequest();
xhr.open('GET', 'send-ajax-data.php');

// Track the state changes of the request.
xhr.onreadystatechange = function () {
	var DONE = 4; // readyState 4 means the request is done.
	var OK = 200; // status 200 is a successful return.
	if (xhr.readyState === DONE) {
		if (xhr.status === OK) {
			console.log(xhr.responseText); // 'This is the output.'
		} else {
			console.log('Error: ' + xhr.status); // An error occurred during the request.
		}
	}
};

// Send the request to send-ajax-data.php
xhr.send(null);
```

```php
// This is the server-side script.

// Set the content type.
header('Content-Type: text/plain');

// Send the data back.
echo "This is the output.";
```

### Fetch 방식
Fetch는 새로운 네이티브 자바스크립트 API이다. 비록 아직 모든 브라우저를 지원하진 않는다. 점점 유명해지고 있다. 구글 개발자 문서에선 "Fetch는 오래된 XMLHttpRequest보다 web 요청과 응답을 쉽게 만들어준다"고 말한다. 자바스크립트 `promises`가 연관되어 있다. (`promises` 객체는 비동기 작동의 이벤트적인 성공 또는 실패를 나타낸다. 그리고 그것들의 결과값도 나타낸다.)
```javascript
fetch('send-ajax-data.php').then(function(response) {
	return response.text();
}).then(function(data) {
	console.log(data);
}).catch(function(error) {
	console.log('Error: ' + error);
});
```

### JQuery 방식
JQuery는 개발자들에게 AJax를 효과적으로 사용하도록 추상화를 제공한다. 비록 화면 뒤에서 XMLHttpRequest가 여전히 사용되고 있지만.
```Javascript
$.ajax({
	type: 'GET',
	url: 'send-ajax-data.php',
	dataType: "JSON", // data type expected from server
	success: function (data) {
		console.log(data);
	},
	error: function() {
		console.log('Error: ' + data);
	}
});
```
JQuery는 get 메소드 방법도 제공한다. 위 코드보다 조금더 간략화되었다.
```javascript
$.get('send-ajax-data.php').done(function(data) {
	console.log(data);
}).fail(function(data) {
	console.log('Error: ' + data);
});
```
