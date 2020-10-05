# JAVA - AJAX

## 참고자료
- js 구현: https://blog.garstasio.com/you-dont-need-jquery/ajax/
- java 구현: https://www.tutorialspoint.com/gson/gson_first_application.htm
- https://google.github.io/gson/apidocs/

## 예시코드
```js
/* js */
form.addEventListener("submit",function(evt){
  var xhr = new XMLHttpRequest();
  xhr.open('put','./loginValid.ajax');
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.onload = function(){
	if(xhr.status === 200){
	  var userInfo = JSON.parse(xhr.responseText);
	  console.log(userInfo);
	}
  };
  xhr.send(JSON.stringify({
	id : document.querySelector("#id").value,
	passwd : document.querySelector("#passwd").value
  }));
  evt.preventDefault();
});
```
```java
/* Servlet, java */
BufferedReader br = request.getReader();
Gson gson = new Gson();
MemberVO member = gson.fromJson(br.readLine(), MemberVO.class);
System.out.println(member.toString());
System.out.println(member.getId() + "," + member.getPasswd());
```