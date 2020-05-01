# Junit

Junit은 Java 프로그래밍 언어를 위한 유닛 테스트 프레임워크이다. TDD 테스트 주도 개발에서 중요하다. Junit은 Jar 형태로 컴파일 타임에 링크된다. 프레임워크 패키지는 Junit 3.8 버전에서는 `junit.framework` 이고, Junit 4 이후부터는 `org.junit`이다.

- 켄트백이 개발자들 중 한 명이다. 
- [Github Repository](https://github.com/junit-team/junit5)
- 라이선스는 이클립스 퍼블릭 라이선스
- [junit.org](http://junit.org/)

Junit 기본형태는 다음과 같다. 기본 유닛테스트는 `@Test` 어노테이션을 작성한다. 각 테스트 시작 전은 `@Before`, 마친 후는 `@After` 이다. 이 클래스 내의 모든 테스트 시작 전은 `@BeforeClass` 이며, 마친 후는 `@AfterClass`이다.

```java
import org.junit.*;

public class FoobarTest {
    @BeforeClass
    public static void setUpClass() throws Exception {
        // Code executed before the first test method
    }

    @Before
    public void setUp() throws Exception {
        // Code executed before each test
    }
 
    @Test
    public void testOneThing() {
        // Code that tests one thing
    }

    @Test
    public void testAnotherThing() {
        // Code that tests another thing
    }

    @Test
    public void testSomethingElse() {
        // Code that tests something else
    }

    @After
    public void tearDown() throws Exception {
        // Code executed after each test 
    }
 
    @AfterClass
    public static void tearDownClass() throws Exception {
        // Code executed after the last test method 
    }
}
```

## JUnit Runner
***아래 내용은 [Understanding JUnit's Runner architecture](https://dzone.com/articles/understanding-junits-runner) 포스팅을 간단하게 번역한 것입니다.***

IDE에서 JUnit으로 작성한 테스트는 Run 버튼을 클릭하면 자동으로 테스트가 실행된다. JUnit Runner는 Junit 테스트를 동작시키는 일을 담당한다. 

JUnit Runer는 Junit의 `Runner`추상클래스를 상속(extends)한 것이다. `@RunWith` 어노테이션을 사용해서 설정한다.
```java
@RunWith(SpringRunner.class)
public class UserServiceTest{
    @Test
    public void getOne(){}
}
```

상세하게 더 설명하면, JUnit 테스트를 실행하기 위해 `JUnitCore` 클래스를 사용한다. 커맨드라인으로 실행할 수도 있으며, run() 메서드를 통해서도 실행할 수 있다.

```java
JUnitCore.runClasses(MyTestClass.class);
```

그리고 JUnitCore는 reflection을 사용해서 전달받은 test 클래스에 맞는 Runner를 찾는다. 만약 다른 Runner를 찾지 못한다면, default runner인 [BlockJunit4ClassRunner](http://junit.sourceforge.net/javadoc/org/junit/runners/BlockJUnit4ClassRunner.html)가 실행된다. 그리고 Runner는 초기화 작업을 하며 Runner에게 테스트 클래스가 전달된다.

**그렇다면 Runner는 어떻게 동작하는 것일까?**

```java
public abstract class Runner implements Describable {
    public abstract Description getDescription();
    public abstract void run(RunNotifier notifier);
}
```
`Description`은 나중에 공개될 정보들을 담으며 다양한 도구들에서 사용된다. IDE에서는 Test 결과를 보여줄 때 사용되기도 한다. `run()` 메서드는 test class 또는 test suite을 동작하는데 사용된다. 이처럼 Runner 클래스는 단순하기 때문에 상속 extend하여 사용하는데 맞지 않을 것이다.

ParentRunner는 좀 더 구체적이다. 다양한 자식 Runner들의 부모가 되는 추상클래스이다. 여기서 중요한 점은 테스트는 계층적으로 구조를 가지고 있다. 한 Test Suite를 실행하면 다른 여러 Test Suite를 포함해있을 것이며, 여러 테스트 클래스도 포함하고 있고, 여러 테스트 메서드들을 가지고 있을 것이다.

```java
public abstract class ParentRunner<T> extends Runner implements Filterable, Sortable { 
    protected abstract List<T> getChildren();
    protected abstract Description describeChild(T child);
    protected abstract void runChild(T child, RunNotifier notifier);
}
```

ParentRunner는 어떤 자식들이 있는지 목록을 얻은 다음, 각 자식들에 대한 Description 정보를 얻는다. 그리고 해당 자식을 실행한다. `BlockJunit4ClassRunner`구현체를 한 번 살펴보자. 

```java
public class BlockJUnit4ClassRunner extends ParentRunner<FrameworkMethod> {

@Override
protected List<FrameworkMethod> getChildren() {
// scan test class for methonds annotated with @Test
}

@Override
protected Description describeChild(FrameworkMethod method) {
// create Description based on method name
}

@Override
protected void runChild(final FrameworkMethod method, RunNotifier notifier) {
if (/* method not annotated with @Ignore */) {
// run methods annotated with @Before
// run test method
// run methods annotated with @After
}}}
```
getChildren() 메서드는 reflection을 사용해서 테스트 클래스 내의 @Test 어노테이션을 단 메서드들을 스캔한다. 그 메서드들은 FrameworkMethod 라는 객체로 감싸져서 리턴된다. describeChildren()은 메서드 이름을 통해 Description을 생성한다. 그리고 runChild()에서 테스트 메서드를 실행한다.

다른 예제들로는 [SpringJUnit4ClassRunner](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/test/context/junit4/SpringJUnit4ClassRunner.html)가 있다. 테스트 클래스에 의존성 주입 또는 트랜잭션 테스트 메서드를 만들 수 있도록 해준다.

JUnit Runner는 커스터마이징을 할 수 있도록 제공하고 있다. 그래서 테스트 실행 프로세스를 변경할 수 있다. 변경하더라도 IDE, build server 등에는 영향을 끼치지 않는다. 약간의 변화만 필요하다면, BlockJunit4ClassRunner의 protected 메서드들을 보는 것이 좋다.


## SpringJUnit4ClassRunner는 무엇?
SpringJUnit4ClassRunner는 BlockJUnit4ClassRunner을 확장하여 커스터마이징한 것이다. JUnit에 스프링의 테스트 기능들을 제공한다. `@RunWith(SpringJUnit4ClassRunner.class)` or `@RunWith(SpringRunner.class)`를 JUnit4 테스트 대상 클래스에 세팅하면 사용할 수 있다. 다음은 제공하는 어노테이션이다. Spring TestContext Framework 에서 사용된다.

- @Test(expected=...)
- @Test(timeout=...)
- @Timed
- @Repeat
- @Ignore
- @ProfileValueSourceConfiguration
- @IfProfileValue


## 참고자료
- [Junit, wiki](https://en.wikipedia.org/wiki/JUnit)
- [Understanding JUnit's Runner architecture](https://dzone.com/articles/understanding-junits-runner)
- [Class SpringJUnit4ClassRunner, Spring API](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/test/context/junit4/SpringJUnit4ClassRunner.html)

## 질문
- java 에서 reflection 은 무엇인가?

