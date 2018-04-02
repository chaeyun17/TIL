### Literal
리터럴이란 소스코드에서 고정된 값을 뜻하는 기호이다.

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
- Boolean이 아닌 값을 Boolean으로 변화시키기 위해서 Boolean 객체를 사용하지 마세요. 대신 다음과 같이 함수처럼 사용하세요.
- [MDN 더보기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

```JavaScript
var x = Boolean(expression);      //preferred
var x = new Boolean(expression);  //don't use
```

### Wrapper Object
- 모든 초기값은 프로퍼티를 가지지 않는다. 하지만 이렇게 쓸 수 있다. `console.log(str.toUpperCase());` 어떻게 된 것일까?
- `str`의 프로퍼티에 접근하려고 하면 JavaScript는 값에서 오브젝트로 변화시킨다. 이 오브젝트가 `Wrapper Object`이다. string 메서드들이 상속된다. 참조가 끝나면 wrapper Object는 해체된다.
- [원문](https://javascriptrefined.io/the-wrapper-object-400311b29151)
- 래퍼 객체란 단순하 값에 불과한 기본형의 데이터를 포장(래핑)해서 객체로서의 기능(메소드)을 추가하기 위한 객체다.
- 책: Javascript 마스터북, 야마다 요시히로, 제이펍 

### 함수
자바스크립트는 해당 스코프에서 함수 선언을 가장 먼저 처리하는데, 이런 특징을 끌어올림(hosting)이라고 합니다. 따라서 함수를 선언하기 전에 참조할 수 있습니다.

```JavaScript
function foo(){
  bar();    // 정상 출력. 참조됨
  function bar(){
    return 0;
  }
}
```
```JavaScript
function foo(){
  bar();    // undefined 출력. 참조되지 않음.
  var bar = function(){
    return 0;
  }
}
```

### 특별한 변수: arguments
매개변수는 모두 특별한 변수인 arguments에 담깁니다. arguments는 배열처럼 보이지만 배열 메서드는 하나도 없습니다.

```JavaScript
function f() { return arguments; }
var args = f('a','b','c');
console.log(args.length); // 3
console.log(args[0]);     // 'a'
```  

Array.prototype.slice.all()을 사용해서, arguments 를 배열로 만들 수 있습니다. 그리고 배열 메서드를 사용할 수 있습니다.

```JavaScript
function f(x,y) {
  return Array.prototype.slice.call(arguments);
}
function f_text(){
  var arrayArgs = f('a','b','c');
  console.log(arrayArgs); // [ 'a', 'b', 'c' ]
}
f_text();
```   

다음은 매개변수에 기본값을 할당할 때 널리 쓰이는 패턴입니다.

```JavaScript
function pair(x, y){
  x = x || 0;
  y = y || 0;
  return [x, y];
}
function test_pair(){
  console.log(pair());    // [ 0, 0 ]
  console.log(pair(1));   // [ 1, 0 ]  
  console.log(pair(1,2)); // [ 1, 2 ]
}
test_pair();
```

매개변수 갯수를 강제할 수도 있습니다.

```JavaScript
function pair2(x, y){
  if(arguments.length !== 2){
    throw new Error('Need exactly 2 arguments');
  }
}
function test_pair2(){
  console.log(pair2(1,2,3));  // Error: Need exactly 2 arguments
}
test_pair2();
```

### 예외 처리
try절에는 예외 가능성이 있는 코드를 쓰고, catch 절에는 try 절에서 예외가 일어났을 때 실행할 코드를 씁니다. 위 코드는 다음과 같이 실행합니다.
```JavaScript
function getPerson(id){
  if(id < 0){
    throw new Error('ID must not be negative: '+id);
  }
  return { id: id };
}

function getPersons(ids){
  var result = [];
  ids.forEach(function(id){
    try{
      var person = getPerson(id);
      result.push(person);
    }catch(exception){
      console.log(exception);
    }
  });
  return result;
}
console.log(getPersons([2, -5, 137]));
// Error: ID must not be negative: -5
// ...
// [ { id: 2 }, { id: 137 } ]
```

### 변수의 스코프
변수의 스코프는 현재 블록이 아니라 항상 함수 전체입니다.
```JavaScript
function foo(){
  var x = -512;
  if(x<0){
    var tmp = -x;
  }
  console.log(tmp);
}
foo(); // 512
```

### 변수의 끌어올림
변수 선언문은 함수 맨 앞으로 이동하고, 할당은 그 자리에서 있습니다.   
아래와 같이 작성했지만,
```JavaScript
function foo(){
  console.log(tmp); // undefined;
  if(false){
    var tmp = 3;    // 선언, 할당
  }
}
```
실제로는 이렇게 작동됩니다.
```JavaScript
function foo(){
  var tmp;          // 선언이 끌어올려짐
  console.log(tmp); // undefined;
  if(false){
    tmp = 3;        // 그 자리에서 할당됨
  }
}
```

### 클로저
클로저는 함수와 함수가 선언된 언어적 환경과의 조합이다. 내부함수는 외부함수의 변수를 참조할 수 있다.   
[MDN 더보기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)

### IIFE 패턴
어떤 변수가 전역 변수가 되지 않게 하기 위해, 새 변수 스코프가 필요할 때가 있습니다. 함수를 블록처럼 사용하는 패턴이 있습니다. 이러한 패털은 Immediately invoked function expression 이라고 합니다. 함수 내부에 새 스코프를 생성하여 tmp가 전역으로 올라가지 못하게 막습니다.
```JavaScript
(function (){
  var tmp = 1;
}());
```

### 연산자
- `+` : 피연산자들을 문자열로 형 강제변환. 배열도 마찬가지
```JavaScript
> [1,2] + [3]
'1,23'
```
- `*` : 피연산자들을 숫자로 형 강제변환.

### 복합 할당연산자
`A 연산자= B`
```JavaScript
> var x = 2;
> x += 3;
5
```

### 동일 연산자
- 일치연산자 `===` : 두 값의 타입까지 같아야 참
- 동등연산자 `==` : 두 값의 타입을 일치시킨 후, 값이 같으면 참   
- 동등연산자는 타입을 맞추는 방식이 혼란스럽기 때문에, 일치연산자 사용을 권고함.

#### 일치 연산자
- NaN 과 NaN 은 일치하지 않는 함정이 있음.
```JavaScript
> undefined === undefined
true
> null === null
true
> x === x
true
> +0 === -0
true
> NaN === NaN
false
```
#### 동등 연산자
```JavaScript
> undefined == null
true
> '123' == 123
true
> var obj1 = { 'num':123 };
> obj1.num == 123
true
```
