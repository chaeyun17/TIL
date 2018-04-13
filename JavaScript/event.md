# Event 

## 캡쳐링 과 버블링
![HTML layer](https://javascript.info/article/bubbling-and-capturing/event-order-bubbling.png) 

HTML 태그들은 서로 겹쳐있다. 하위 엘리먼트에 이벤트가 발생하면 겹쳐있는 부모 엘리먼트에 이벤트가 전달될 수 있다.

`Capturing`은 이벤트 발생이 부모 엘리먼트에서 발생 지점 엘리먼트로 점차 내려가는 것이다.

`Bubbling`은 이벤트 발생 지점에서 부모 엘리먼트로 점점 확산되는 것이다.


![Capturing and Bubbling](https://javascript.info/article/bubbling-and-capturing/eventflow.png)

## 이벤트 리스너
`element.addEventListener(type, handlerFunc, useCapture)`  

useCapture가 true 이면 이벤트 캡쳐링으로 작동하고,
useCapture가 false 이면 이벤트 버블링으로 작동한다.  
 
원하는 지점에서 이벤트 확산을 막으려면, `event.stopPropagation();` 메서드를 사용하면 된다.

ie9 이전의 브라우저에서는 이벤트 전파을 막기 위해서 `event.cancelBubble` 프로퍼티를 사용해야 한다.

## 예시
```
<html>
    <head>
        <style>
            html{border:5px solid red;padding:30px;}
            body{border:5px solid green;padding:30px;}
            fieldset{border:5px solid blue;padding:30px;}
            input{border:5px solid black;padding:30px;}
        </style>
    </head>
    <body>
        <fieldset>
            <legend>event propagation</legend>
            <input type="button" id="target" value="target">          
        </fieldset>
        <script>
        function handler(event){
            var phases = ['capturing', 'target', 'bubbling']
            console.log(event.target.nodeName, this.nodeName, phases[event.eventPhase-1]);
        }
        document.getElementById('target').addEventListener('click', handler, true);
        document.querySelector('fieldset').addEventListener('click', handler, true);
        document.querySelector('body').addEventListener('click', handler, true);
        document.querySelector('html').addEventListener('click', handler, true);
        </script>
    </body>
</html>
```
## 실행 결과
```
INPUT HTML capturing
INPUT BODY capturing
INPUT FIELDSET capturing
INPUT INPUT target
```

## 출처 및 참고자료
1. [JavaScript 이벤트 전파, 생활코딩](https://opentutorials.org/course/1375/6768)  
2. [Bubbling and capturing, JS Info](https://javascript.info/bubbling-and-capturing)

