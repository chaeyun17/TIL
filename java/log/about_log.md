# Log 

Java 앱에서 로깅하는데 주로 사용하는 인터페이스 라이브러리는 SLF4J 이다. Simple Loggging Facade For Java 의 약자. 이름에서도 있듯이 로깅하는데 Facade(퍼사드) Layer 인터페이스 역할을 담당한다. 
대표적인 Log4j, Logback 로깅 라이브러리를 포함하여 다양한 SLF4J 구현체 라이브러리들을 부품을 갈아끼우듯 사용할 수 있다.


## Slf4j

- Simple Logging Facade for Java (SLF4J)
- 다양한 로깅 프레임워크들에게 facade 또는 추상화 계층 역할. 덕분에 로깅 프레임워크에 변경에 따라 로깅 관련 코드를 바꾸지 않아도 된다. 

![SLF4J 2.0 Bound Provider](https://www.slf4j.org/images/concrete-bindings.png)

- https://www.slf4j.org/manual.html

## Facade Pattern 퍼사드 패턴

![퍼사드 패턴 다이어그램](https://refactoring.guru/images/patterns/diagrams/facade/example-2x.png?id=f2c846d74041626c923ff3e8919b68a9)

퍼사드 패턴은 복잡하거나 변경이 잦은 하위 시스템을 캡슐화하여 상위 시스템과의 연결점을 추상화 및 최소화하여 의존성을 낮출 수 있다. 

프록시 패턴과 많이 유사하지만, 프록시는 타겟 객체와 동일한 인터페이스를 가지는 점에서 다르다.

중재자 패턴과 유사하다. 다른 점은 중재자 패턴은 새로운 기능을 추가할 수도 있지만 퍼사드는 단순히 인터페이스 역할만 수행한다. 퍼사드 패턴은 하위 시스템 컴포넌트끼리 통신이 가능하지만, 중재자 패턴을 불가능하다. 


참고: https://refactoring.guru/ko/design-patterns/facade

## Logback

로깅 프레임워크. 기존 `Log4j 1.x`를 개선한 프로젝트. 

- 특정 케이스에서 10배 더 빠른 성능 발휘하며 메모리 공간도 적게 사용.
- 광범위한 케이스에 대한 테스트가 잘 마련되어 있기에 신뢰를 가지고 사용할 수 있음.
- logback-classic 은 SLF4J 구현.

## Logback Appender

Logback 에서 로그를 write 하는 역할을 대신 수행하는 컴포넌트. Logback 의 컴포넌트 개념이기 때문에 Logback 의 인터페이스를 구현한다. ConsoleAppender, FileAppender, AWS Cloud Watch 등 로그를 write 하는 대상에 따라 다양한 컴포넌트를 만들 수 있다. 

```java
package ch.qos.logback.core;
  
import ch.qos.logback.core.spi.ContextAware;
import ch.qos.logback.core.spi.FilterAttachable;
import ch.qos.logback.core.spi.LifeCycle;
  

public interface Appender<E> extends LifeCycle, ContextAware, FilterAttachable {

  public String getName();
  public void setName(String name);
  void doAppend(E event);
  
}
```




