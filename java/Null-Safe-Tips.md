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

## 1. API 내에서 null 처리하기
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

## 2. 도구를 사용하여 자동 Null 체크
### 써드파티 도구들
다음은 도구를 사용해서 Null 체크를 하는 방법이다. [Static code analysis](https://www.baeldung.com/java-static-analysis-tools) 도구를 사용하면 코드 퀄리티를 향상시킬 수 있다. 몇개의 다른 툴들도 개발자들에게 null 처리를 할 수 있도록 도와준다. 하나의 예로 [FindBugs](https://www.baeldung.com/intro-to-findbugs) 가 있다.

FindBugs를 사용하면 `@Nullable`과 `@NonNull` 어노테이션을 통해서 null contract를 관리할 수 있다. 어떤 메소드, 필드, 지역변수들, 파라미터에 사용할 수 있다. 이것은 명시적으로 not null 일지 null 일지 확일 할 수 있다.
```java
public void accept(@Nonnull Object param){
  System.out.println(param.toString());
}
```
여기서, `@NonNull`은 파라미터가 null이 될 수 없다는 것을 확실하게 나타낸다. 만약 null 가능성이 있다면, 컴파일 시에 FindBugs 도구가 Warning을 발생시킨다.

### IDE 이용
몇몇 IDE에서는 다른 도구들을 사용할 필요가 없이 기능을 지원해준다. IntelliJ IDEA 는 `@NonNull`과 `@Nullable` 어노테이션을 제공한다. 다음과 같은 Dependency 만 추가해주면 된다.
```xml
<dependency>
    <groupId>org.jetbrains</groupId>
    <artifactId>annotations</artifactId>
    <version>16.0.2</version>
</dependency>
```
InteliJ는 null 체크를 하지 않을 시, Warning을 발생시킨다.

## 3. Assertions
지금까지는 클라이언트 코드에서 Null 체크를 할 필요가 없도록 하였지만. 실제로 개발하다보면 클라이언트 코드 쪽에서 null 체크를 해야하는 경우들이 있다. API 파라미터로 null이 들어가지 못하도록 하거나 API 반환값으로 null이 반환될 수도 있다. [Java Assertions](https://www.baeldung.com/java-assert) 을 통해 처리해보자.

```java
public void accept(Object param){
  assert param != null;
  doSomething(param);
}
```

param 파라미터가 null일 경우, `AssertionError`가 발생한다.

이러한 방법에는 2가지 문제가 있다. 
1. Assertions 는 JVM을 멈추게 할 수 있다.
2. 잘못된 어설 션으로 인해 복구 할 수없는 확인되지 않은 오류가 발생한다.
게다가, 이 방식은 프로그래머들에게 추천되지 않는다. 다음 세션에서 null 유효성을 다루는 몇가지 방법에 대해 얘기해볼 것이다.

## 4. Coding Practice 를 통해 null 체크를 피해보기

### 전제조건들


## 참고
- https://www.baeldung.com/java-avoid-null-check