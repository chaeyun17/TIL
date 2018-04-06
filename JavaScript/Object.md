# Object

## 내장형 객체(build in Object)
Javscript 언어에 미리 내장되어 있는 객체들.
```
var str = '내장형 객체';
console.log(str.length);
```

### Wrapper Object
- 모든 초기값은 프로퍼티를 가지지 않는다. 하지만 이렇게 쓸 수 있다. `console.log(str.toUpperCase());` 어떻게 된 것일까?
- `str`의 프로퍼티에 접근하려고 하면 JavaScript는 값에서 오브젝트로 변화시킨다. 이 오브젝트가 `Wrapper Object`이다. string 메서드들이 상속된다. 참조가 끝나면 wrapper Object는 해체된다.
- [원문 블로그](https://javascriptrefined.io/the-wrapper-object-400311b29151)
- 래퍼 객체란 단순하 값에 불과한 기본형의 데이터를 포장(래핑)해서 객체로서의 기능(메소드)을 추가하기 위한 객체다.	
  책: Javascript 마스터북, 야마다 요시히로, 제이펍 