# Inteface의 Default Method

## 들어가며
Java 8 에서는 람다 표현식, 함수형 인터페이스, 메소드 참조, 스트림, Optional, 인터페이스의 static 과 default 메서드와 같은 기능들이 추가되었습니다.

Inteface의 메소드들은 추상 메소드들 밖에 사용할 수 없었는데, 왜 static과 default 메소드가 추가되었을까요?

## 필요성

다음과 같이 default 키워드를 메소드명 앞에 추가하면, 메소드를 구현할 수 있습니다.

```java
public interface MyInterface {
    
    // regular interface methods
    
    default void defaultMethod() {
        // default method implementation
    }
}
```

원래 설계상 인터페이스는 추상화를 위해서입니다. inteface 하나에 여러 구현체들이 존재할 수 있습니다.

실제로 개발을 하다보면, interface에 새로운 메소드를 추가하는 상황이 발생합니다. 인터페이스에 새로운 메소드를 추가하면, 구현체들은 `필수적`으로 해당 메소드를 구현해야 합니다. 하지만 inteface에서 default method로 메소드를 추가하면 구현체들에서 해당 필수적으로 구현할 필요가 없어집니다.

**따라서, 구현체를 수정하지 않아도 되어 이전 버전과의 호환성을 확보할 수 있습니다.**




