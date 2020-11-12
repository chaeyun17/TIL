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

### 4.1.전제조건들
빨리 실패하는 코드를 작성하는 것은 좋은 practice 입니다. 그러므로 만약 API가 null이 되면 안되는 여러 파라미터들을 받는다면, API 전제조건으로 null이 아닌 모든 매개 변수를 확인하는 것이 좋습니다.

```java
// good
public void goodAccept(String one, String two, String three) {
    if (one == null || two == null || three == null) {
        throw new IllegalArgumentException();
    }
 
    process(one);
    process(two);
    process(three);
}

// bad
public void badAccept(String one, String two, String three) {
  if (one == null) {
      throw new IllegalArgumentException();
  } else {
      process(one);
  }

  if (two == null) {
      throw new IllegalArgumentException();
  } else {
      process(two);
  }

  if (three == null) {
      throw new IllegalArgumentException();
  } else {
      process(three);
  }
}
```

위 예처럼 할 수도 있지만, [Guava's Preconditions](https://www.baeldung.com/guava-preconditions) 을 사용하면 API 파라미터들을 유효성을 체크할 수 있습니다.

### 4.2 Wrapper 클래스 대신 Primitives 를 사용하기
int 와 같은 Primitives는 애초에 null을 가질 수 없습니다. 그래서 우리는 Integer 와 같은 Wrapper 클래스를 되도록 사용을 줄여야 합니다.

```java
public static int primitivesSum(int a, int b){
  return a + b;
}

public static Integer wrapperSum(Integer a, Integer b){
  return a + b;
}
```
```java
assertThrows(NullPointerException.class, ()->wrapperSum(null,2));
```

Wrapper 클래스보다 Primitives를 사용해야하는 지를 더 알고 싶다면, [Java Primitives](https://www.baeldung.com/java-primitives-vs-objects)

### 4.3 Empty Collections
때때로 우리는 메소드의 응답으로 컬렉션을 반환할 필요가 있을 때가 있습니다. 이 때, 우리는 null을 반환하기보다는 empty collection을 반환하는 것이 좋습니다.
```java
public List<String> names(){
  if(userExists()){
    return Stream.of(readName()).collect(Collectors.toList());
  } else {
    return Collections.emptyList();
  }
}
```
이렇게 하면, API 사용자는 null 체크를 하지 않아도 됩니다.

### 5. Objects 을 사용하라
Java7 에서 새로운 `Objects` API를 나왔다. 이 API는 몇개의 static 유틸리티성 메소드들을 가지고 있다. 불필요한 코드들을 치워버릴 수 있다. 

```java
public void accpet(Object param){
  Objects.requireNonNull(param);
  // doSomething()
}
```
```java
assertThrows(NullPointerException.class, ()->accept(null));
```
이 클래스에는 `isNull()`과 `nonNull()` 메소드들도 포함되어 있다. 

### 6. Optional 을 사용하라
#### 6.1 orElseThrow
Java8 에서는 [Optional](https://www.baeldung.com/java-optional) API 새로 나왔다. 이것은 null에 비해 선택적 값을 처리하기 위해 더 나은 약속을 제공합니다. 

```java
public Optional<Object> process(boolean processed){
  String response = doSomething(processed);

  if(response == null){
    return Optional.empty();
  }

  return Optional.of(response);
}

private String doSomething(boolean processed){
  if(processed){
    return "passed"
  }else{
    return null;
  }
}
```

process 메소드에서 호출자에게 응답이 비어있을 수도 있으며 반드시 컴파일 타임에 처리를 해줘야한다고 명화갛게 하고 있습니다.

이렇게 하면 클라이언트 측에서 null 체크를 할 필요가 없습니다. empty response 만 Optional API를 사용하여 null 과 다르게 선언적 스타일로 처리해주면 됩니다. 

```java
assertThrows(Exceptoin.class, ()->process(false).orElseThrow(()->new Exceptoin()));
```

비록 API 호출자가 null check 필요성을 없앨 수 있었지만, 우리는 빈 응답을 사용했습니다. Optional은 null인 경우 특정 값 또는 empty 를 반환할 수 있는 `ofNullable` 메소드를 제공합니다.

```java
public Optional<Object> process(boolean processed){
  String response = doSomething(processed);
  return Optional.ofNullable(resposne);
}
```

#### 6.2. Collection 과 함께 사용하는 Optional

```java
public String findFirst(){
  return getList().stream()
          .findFirst()
          .orElse(DEFAULT_VALUE);
}
```

이 함수는 리스트의 첫번째 아이템을 반환한다. Stream API의 `findFirst` 함수는 데이터가 없을 경우 빈 Optional을 반환할 것이다. `orElse` 함수를 통해서 기본값을 대신에 반환할 수 있다. 이것은 비어있는 리스트들도 다룰 수 있게 한다. 

```java
public Optional<String> findOptionalFirst(){
  return getList().stream().findFirst();
}
```
대신에 클라이언트가 empty를 다룰 수 있게 Optional을 반환할 수도 있다. Optional을 Collection과 함께 사용하면 non-null 값들을 반환할 수 있도록 API를 설계할 수 있다. 클라이언트는 null 체크를 하지 않아도 된다.

#### 6.3 Optional 조합

```java
public Optional<String> optionalListFirst(){
  return getOptionalList().flatMap(list->list.stream().findFirst());
}
```

getOptional 함수에서 리턴한 Optional에 flatMap 함수를 사용함으로써 Optional을 반환하는 내부 표현식의 결과를 압축 해제할 수 있습니다. flatMap을 사용하지 않는다면, 그 결과는 `Optional<Optional<String>>`이 될 것입니다. flatMap 작업은 Optional이 empty가 아닐 때만 작동합니다.


### 7. 라이브러리

#### 7.1 Lobmok
Lombok은 상용적 코드들의 양을 줄이는데 좋은 라이브러리입니다. 일반 코드들에 어노테이션을 통해서 설정할 수 있습니다. 그 중에 `@NonNull` 어노테이션이 있습니다. `@NonNull`은 null 체크를 대체할 수 있습니다.

```java
public void accept(@NonNull Object param){
  System.out.println(param);
}
```
`@NonNull` 어노테이션을 통해 null 체크를 할 수 있습니다.

Lombok 은 컴파일된 클래스를 생성합니다.

```java
public void accept(@NonNull Object param){
  if(param == null){
    throw new NullPointerException("param");
  } else {
    System.out.println(param);
  }
}
```
만약 파라미터가 null이면, 이 메소드는 NullPointerException을 발생시킨다. 클라이언트에서는 exception을 처리해야 한다.

#### 7.2. StringUtils
String 유효성 검사는 null값 뿐만아니라 빈 값까지 체크를 포함합니다. 그러므로 일반적인 유효성 검사는 다음처럼 할 수 있습니다.

```java
public void accept(String param){
  if(null != param && !param.isEmpty())
    System.out.println(param);
}
```

많은 문자열 타입을 다뤄야할 경우에는 빠르게 중복 코드가 늘어납니다. `StringUtils`이 이것을 편하게 해결해줍니다. `commons-lang3` Dependency를 추가해줍니다.

```java
public void accept(String param){
  if(StringUtils.isNotEmpty(param)){
    System.out.println(param);
  }
}
```

그래서 우리는 null 또는 빈 값을 체크하는 코드를 `isNotEmpty()` 정적 유틸리티 메소드로 대체할 수 있습니다. 이 API는 일반적인 String 기능들을 다룰 수 있는 다른 [강력한 유틸리티 메소드](https://www.baeldung.com/string-processing-commons-lang)들을 제공해줍니다.

## 참고
- https://www.baeldung.com/java-avoid-null-check