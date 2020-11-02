# Null Safe 한 코드 작성 팁
코드를 작성하고 프로그램을 돌리다보면 NullPointerException 버그가 많이 발생한다. Null 예외는 많은 뜻을 포함하고 있기 때문에 디버그 모드로 다시 디버깅을 해야 정확하게 잡을 수 있다. 이러한 NullPointerException 예외를 줄이기만 해도 디버깅 시간을 단축시킬 수 있다. 그래서 코드를 작성할 때부터 Null 예방을 해보려고 한다.

NullPointerException 은 어플리케이션이 이런 상황에서 null을 사용하려고 할 때 발생한다. 
- Null Object 의 인스턴스 메서드 호출할 때
- Null Object 내의 필드 접근과 수정할 때
- null의 길이를 배열 인 것처럼 사용
- 배열인 것처럼 null 슬롯 액세스 또는 수정
- Throwable 값인 것처럼 null 던지기

```java
public void doSomthing(){
  String result = doSomthingElse();
  if(result.equalsIgnoreCase("Success")){

  }
}

private String doSomthingElse(){
  return null;
}
```

```java
public static void main(String[] args){
  findMax(null);
}

private static void findMax(int[] arr){
  int max = arr[0];

}
```

다음과 같이 null 인지 아닌지 체크를 해야한다.
```java
public void doSomething(){
  String result = doSomethingElse();
  if(result != null && result.equalsIgnoreCase("Success")){
  
  }else{

  }
}

private String doSomethingElse(){
  return null;
}
```
하지만 현실에서는 프로그래머들은 어떤 오브젝트가 null인지 발견하기가 쉽지 않다. 극단적으로 null safe하게 하려면 모든 오브젝트에 대해서 null 체크를 해야한다. 그러나 불필요한 많은 null 체크를 해야 하고 코드 가독성이 떨어진다.

## null safe 하게

### 1. API 내에서 null 처리하기
첫번째 방법으로는, API 내에서 null 처리를 미리 하는 것이다. 그러면 null 인 오브젝트를 절대로 반환하지 않는다.
```java
public Object process() throws Exception{
  Object result = doSomething();
  if(result == null){
    throw new Exception("Processing fail. Got a null response");
  }else{
    return result;
  }
}
```
하지만 단점은 JavaDoc에 null을 반환하지 않는다고 명시해야 한다.


## 참고
- https://www.baeldung.com/java-avoid-null-check