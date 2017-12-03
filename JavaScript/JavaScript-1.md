### Literal
리터럴이란 소스코드에서 고정된 값을 뜻하는 기호이다. [더보기][literal_wiki]
[literal_wiki]: https://en.wikipedia.org/wiki/Literal_(computer_programming)

### == 와 ===
- `==` : 피연산자들을 같은 형으로 변환한 뒤, 값을 비교한다. 추상적 비교.
- `===` : 형과 값을 둘 다 비교한다. 엄격한 비교.

### undefiend 와 null
- undefined 는 초기화 되지 않는 변수. 값이 없음을 뜻한다.
- null 은 객체가 아니다라는 뜻. 오브젝트가 올 곳에 오브젝트가 오지 않은 것도 뜻한다.
```JavaScript
/* Undefined 와 null */
function ex6_Undefined(){
  var foo;
  console.log(foo); //undefined :: 초기화하지 않은 변수

  function f(x){return x;}
  console.log(f()); // undefined :: 생략된 매개변수

  var obj = {};
  console.log(obj.foo); // undefined :: 정의하지 않은 프로퍼티

  var x;
  if( x === undefined || x === null){ console.log("x is undefined or null");}
  if( !x ){console.log("x is undefined or null");}

}
```

### null
Null 값은 리터럴이다. null 은 undefiend과 같은 글로벌 객체 프로퍼티를 위한 식별자가 아니다. 대신에, 객체가 아니라는 다양한 점들을 가르키는 식별 부족을 null은 표현한다. API들에서, null은 종종 객체가 오기를 기대하지만 해당되는 객체가 없는 장소에서 검색된다.

### typeof
| 피연산자         | 결과        |
|------------------|-------------|
| undefined        | 'undefined' |
| null             | object      |
| 불리언 값        | 'boolean'   |
| 숫자 값          | 'number'    |
| 문자열 값        | 'string'    |
| 함수             | 'function'  |
| 다른 일반적인 값 | 'object'    |
```JavaScript
/* typeof */
function checkTypeof(){
  console.log(typeof true);
}
```

### instanceof
instancof 연산자는 object의 프토토타입 체인에서 constructor.prototype이 존재하는지를 테스트한다.  
[MDN 더보기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
```JavaScript
/* instancof */
function instanceof1(){
  function C(){}
  function D(){}

  var o = new C();
  console.log(o instanceof C);  //true
  console.log(o instanceof D);  //false
  console.log(o instanceof Object); // true

}
function instanceof2(){
  var simplestr = "hello i'm yun.";
  var namestr = new String();
  var myname = new String("My name is yun");

  console.log(simplestr instanceof String); // false
  console.log(Object.getPrototypeOf(simplestr)); // String
  console.log(namestr instanceof String); // true
  console.log(myname instanceof String);  // true
}

```

### Object.getPrototypeOf()
- 매개변수: 프토토타입을 체크할 오브젝트
- 반환값: 매개변수 오브젝트의 프토토타입. 만약 상속된 프로퍼티가 없다면, null을 반환한다.
- [MDN 더보기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)

### 참 같은 값, 거짓 같은 값
- false로 해석되는 값
  - undefiend, null
  - 숫자: -0, 0, NaN
  - 문자열: ''  
- true로 해석되는 값
  - 이외 다른 모든 값 모두 true로 해석됨

### Boolean()
- Boolean 값의 wrapper 오브젝트.
- Boolean이 아닌 값을 Boolean으로 변화시키기 위해서 Boolean 객체를 사용하지 마세요. 대신 다음과 같이 함수처럼 사용하세요. [MDN 더보기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
```JavaScript
var x = Boolean(expression);      //preferred
var x = new Boolean(expression);  //don't use
```
