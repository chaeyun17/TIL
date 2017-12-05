

/* 이피 IIFE */
var result = [];
for(var i=0; i<5; i++){
  result.push(function(){return i});
}


var result = [];
for(var i=0; i<5; i++){
  (function (){
    var i2 = i;
    result.push(function(){ return i2});
  }());
}
//console.log(result[1]());
//console.log(result[3]());

/* 클로저 */
function createIncrementor(start){
  return function(){
    start++;
    return start;
  }
}
function text_creat(){
  var inc = createIncrementor(5);
  console.log(inc());
  console.log(inc());
  console.log(inc());
}
//text_creat();

/* 예외 처리 */
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
//console.log(getPersons([2, -5, 137]))

/* 자릿수 강제 */
function pair2(x, y){
  if(arguments.length !== 2){
    throw new Error('Need exactly 2 arguments');
  }
}
function test_pair2(){
  console.log(pair2(1,2,3));
}

/* 옵션 매개변수 */
function pair(x, y){
  x = x || 0;
  y = y || 0;
  return [x, y];
}
function test_pair(){
  console.log(pair());
  console.log(pair(1));
  console.log(pair(1,2));
}

/* arguments */
function f(x,y) {
  return Array.prototype.slice.call(arguments);
}
function f_text(){B
  var arrayArgs = f('a','b','c');
  console.log(arrayArgs); // 3
  //console.log(args[0]);     // 'a'
}

/* 함수 */
var add = function(param1, param2){
  return param1 + param2;
};

/* 문자열 */
function strings(){
  console.log('Isn\'t lovely~' ); // 제어문자 \
  console.log('Line1\nLine2');    // 줄바꿈 \n
  console.log('\\');              // 백슬레쉬 \
}

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

/* typeof */
function checkTypeof(){
  console.log(typeof true);
}


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


/* 객체 */
function ex5_Object(){
  var me = {
    firstName : 'Chaeyun',
    lastName : 'LEE'
  };

  // 참조 비교
  var obj1 = {};
  console.log(me === obj1); // false
  obj1 = me;
  console.log(me === obj1); // true

  // 프로퍼티 값 변경
  obj1.firstName = 'john';
  console.log(me === obj1); // true
}

/* 원시값 */
function ex4(){
  console.log(3===3);
  console.log('abc'==='abc');

  var str = 'abc';
  str.length = 1;
  console.log(str.length);  // 3 출력. 프로퍼티 값을 바꿀 수 없다.

  str.foo = 3;
  console.log(str.foo);   // undefined. 프로퍼티를 추가할 수 없다.
}

/* 객체 비교 */
function ex3(){
  var obj1 = {};
  var obj2 = {};
  console.log(obj1 === obj2); // false :: 객체라도 다른 객체는 다르다.
  console.log(obj1 === obj1); // true  :: 객체는 고유하다.
}

/* 값 */
function ex2(){
  var obj = {};   // 빈 객체
  obj.foo = 123;  // obj 객체에 foo 프로퍼티 생성. foo 프로퍼티에 123을 할당.
  console.log(obj.foo);
}

/* 음수를 입력하면 양수를 반환하는 함수입니다. */
function ConvertToPositiveEx(){
  // if-then-else 문 함수
  function ConvertPositive(y){
    var x;
    if( y >= 0 ){
      x = y;
    }else{
      x = -y;
    }
    return x;
  }
  // 매개변수일 때 계산하고 들어온 식
  function ConvertPositive2(y){
    return y;
  }

  function Test(input){
    console.log(ConvertPositive(input));
    console.log(ConvertPositive2(input >= 0 ? input : -input));
  }
  Test(-7);
}
