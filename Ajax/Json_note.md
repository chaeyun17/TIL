# JSON 학습 노트

## JSON 정의
Javascript Object Notation은 경량의 DATA-교환 형식이다. 

JSON은 두 개의 구조를 기본으로 두고 있다.
- name/value 형태: collection 타입. 다른 언어들에서는 object, record, struct, dictionary, hash table, 키가 있는 list, 연상배열로서 실현 되었다.
- 값들의 순서화된 리스트. 대부분의 언어들에서, 이는 array, vector, list, 또는 sequence로서 실현 되었다.

## 부가 설명
이 형식은 사람이 읽고 쓰기에 용이하며, 기계가 분석하고 생성함에도 용이하다. JSON은 완벽하게 언어로 부터 독립적이지만 C-family 언어 - C, C++, C#, Java, JavaScript, Perl, Python 그외 다수 - 의 프로그래머들에게 친숙한 관습을 사용하는 텍스트 형식이다. 이러한 속성들이 JSON을 이상적인 DATA-교환 언어로 만들고 있다.

이러한 것들은 보편적인 DATA 구조이다. 사실상 모든 현대의 프로그래밍 언어들은 어떠한 형태로든 이것들을 지원한다. 프로그래밍 언어들을 이용하여 호환성 있는 DATA 형식이 이러한 구조들을 근간에 두고 있는 것은 당연하다.

## JSON 역할
브라우저와 서버는 text 형식으로 데이터를 주고 받는다. JSON은 text이기 때문에, JavaScript의 오브젝트를 JSON 형태를 사용하여 서버로 데이터를 보낼 수 있다. 물론, JSON 형태로 서버로부터 데이터를 받을 수도 있다.

## JSON 사용 사례
AJAX(Asynchronous Javascript And Xml)에서 주로 사용.

## JSON 사용법
### JavaScript 예시
- **JSON.stringify()**: JS object => JSON	
```javascript
var sampleObj = {"name": "chaeyun", "age": 10};
var sampleJson = JSON.stringify(sampleObj);
console.log(sampleJson);
// 결과: {"name":"chaeyun","age":10}
```
- **JSON.parse()** : JSON => JS Object
```javascript
var myObj = JSON.parse(sampleJson);
console.log(typeof myObj);
// object
console.log(myObj);
// {name: "chaeyun", age: 10}
```

### 데이터 형식 별
![Json object](https://www.json.org/object.gif)
![JSON array](https://www.json.org/array.gif)
![JSON value](https://www.json.org/value.gif)
![JSON string](https://www.json.org/string.gif)
![JSON string](https://www.json.org/string.gif)
![JSON number](https://www.json.org/number.gif)

## 자료 출처
- [JSON.org](https://www.json.org/json-ko.html)
- [JSON Introduction, W3School.com](https://www.w3schools.com/js/js_json_intro.asp)
