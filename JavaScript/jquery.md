# JQUERY

## 이야기
[JQuery,칸아카데미](https://ko.khanacademy.org/computing/computer-programming/html-js-jquery/jquery-dom-access/a/history-of-jquery)  
[Learn JQuery](https://learn.jquery.com/)
## 시작
[JQuery CDN](https://code.jquery.com/)
```
<script
  src="https://code.jquery.com/jquery-3.3.1.js"
  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>
```

## CORE
### JQuery() || $()
전달된 매개변수를 통해 DOM 에서 찾은 엘리먼트들 또는 전달된 HTML 문자열에 의해 만들어진 일치된 엘리먼트들의 컬렉션을 반환한다. 

Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string.  

[참고](http://api.jquery.com/jQuery/#jQuery-selector-context)
#### 예시
- foo 클래스를 가지고 있는 div 태그 
```
$( "div.foo" );
```
- 이벤트 리스너 추가와 클래스 추가
```javascript
$( "div.foo" ).click(function() {
  $( "span", this ).addClass( "bar" );
});
```
- 하위 엘리먼트 찾기
```
$( "span", this )` is equivalent to  `$( this ).find( "span" )
```  
- 스타일 변경
```html
<body>
<p>one</p>
<div><p>two</p></div>
<p>three</p>
<script>
$( "div > p" ).css( "border", "1px solid gray" );
</script>
</body>
```
- 새로운 엘리먼트 생성
```
var divEle = $("<div></div").addClass("first");
var inputEle = $("<input/>).attr("type","text");
```
## 자주 쓰는 API
[JQuery API](http://api.jquery.com/)