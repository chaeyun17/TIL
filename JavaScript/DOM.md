# Document Object Model

## IE 에서 innerHTML 속성 문제

### 상황
여러 테이블 엘리먼트들을 배열에 저장해두고 한 개의 테이블만을 DOM에 출력되고, 버튼을 누르면 다른 테이블을 출력하는 UI를 제작 중이었다.
innerHTML 속성을 사용해서 기존 테이블을 지우고, appendChild 메소드를 사용하여 새로운 테이블을 삽입하도록 코드를 작성했다.
`document.querySelector(".tablesBox").innerHTML = "";`
`document.querySelector(".tablesBox").appendChild(tables[tableIndex]);`

### 오류
`<table></table>` 만 남게 됐다. 내부 HTML은 삭제됐다.
배열에 저장된 테이블 오브젝트 안의 내용이 지워져서, 다시 테이블을 사용하지 못하는 오류가 발생했다.

### 해결
`innerHTML` 속성 말고 `node.reaplceChild(new, old)` 를 사용하니 해결됐다.

### 결론
엘리먼트는 엘리먼트 메소드를 사용하여 DOM 조작을 해야 맞는 것 같다. MDN에서도 브라우저 별로 innerHTML 작동이 각기 다르다고 언급하였다.

### 참고
innerHTML 프로퍼티는 다음과 같은 HTML 오브젝트에 대해서는 read-only이다.   
`COL, COLGROUP, FRAMESET, HEAD, HTML, STYLE, TABLE, TBODY, TFOOT, THEAD, TITLE, TR `  
컨텐츠를 바꾸려면 ,table object model 을 사용해야 한다. 부분적 셀의 컨텐츠 변경은 innerHTML을 사용해도 된다.

출처: [MSDN](https://msdn.microsoft.com/en-us/ie/ms533897\(v=vs.94\))
