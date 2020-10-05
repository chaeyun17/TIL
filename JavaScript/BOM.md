2018.04.04
# BOM(Browser Object Model)

## window.open(url, name, specs) 메서드
- 팝업창을 연다.
- url: html 주소
- name:
  - `_blank`가 기본값이지만, 브라우저 설정에 따라 팝업이 아니라 새탭이 뜰 수도 있다. 그런 경우 명시하면 해결된다.
  - 2개 메서드를 사용해서 같은 이름으로 할 경우 창이 한 개만 뜬다.
- specs: `,`로 구분하여 width, height 등 팝업창 설정 가능하다.
- 출처  
[Window open() Method, W3Schools](https://www.w3schools.com/jsref/met_win_open.asp)   
[Window.open(), MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)  

## window.opener 프로퍼티
- The opener property returns a reference to the window that created the window.
- 원래 윈도우를 가르키는 참조값
```
window.opener.document.write("<p>This is the source window!</p>");
```

## window.postMessage()
The `window.postMessage()` method safely enables cross-origin communication between Window objects; e.g., between a page and a pop-up that it spawned, or between a page and an iframe embedded within it.
```
targetWindow.postMessage(message, targetOrigin, [transfer]);
```
```
window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
  if (event.origin !== "http://example.org:8080")
    return;

  // ...
}
```
[Window.postMessage(),MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
