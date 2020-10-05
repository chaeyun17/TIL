# SpringFox
Spring 프레임워크에서 자동으로 JSON API 문서를 생성해주는 라이브러리.

## 첫 시작하기
### 환경
- Spring Boot 2.2.6
- JDK 1.8
- Gradle 5.4

### 실습

#### 1. STS를 통해 Spring Boot 2.2.6 프로젝트 생성

#### 2. 다음과 같은 오류로 테스트가 진행되지 않는 버그가 있어서 
`testRuntimeOnly 'org.junit.platform:junit-platform-launcher'`를 build.gradle의 dependecies에 추가한다.
```
java.lang.NoClassDefFoundError: org/junit/platform/engine/EngineDiscoveryListener
	at java.base/java.lang.ClassLoader.defineClass1(Native Method)
	at java.base/java.lang.ClassLoader.defineClass(ClassLoader.java:1016)
	at java.base/java.security.SecureClassLoader.defineClass(SecureClassLoader.java:174)
	at java.base/jdk.internal.loader.BuiltinClassLoader.defineClass(BuiltinClassLoader.java:802)
	at java.base/jdk.internal.loader.BuiltinClassLoader.findClassOnClassPathOrNull(BuiltinClassLoader.java:700)
	at java.base/jdk.internal.loader.BuiltinClassLoader.loadClassOrNull(BuiltinClassLoader.java:623)
	at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:581)
	at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:178)
	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:521)
	at org.junit.platform.launcher.core.LauncherDiscoveryRequestBuilder.getLauncherDiscoveryListener(LauncherDiscoveryRequestBuilder.java:241)
	at org.junit.platform.launcher.core.LauncherDiscoveryRequestBuilder.build(LauncherDiscoveryRequestBuilder.java:235)
	at org.eclipse.jdt.internal.junit5.runner.JUnit5TestLoader.createUnfilteredTest(JUnit5TestLoader.java:75)
	at org.eclipse.jdt.internal.junit5.runner.JUnit5TestLoader.createTest(JUnit5TestLoader.java:66)
	at org.eclipse.jdt.internal.junit5.runner.JUnit5TestLoader.loadTests(JUnit5TestLoader.java:53)
	at org.eclipse.jdt.internal.junit.runner.RemoteTestRunner.runTests(RemoteTestRunner.java:526)
	at org.eclipse.jdt.internal.junit.runner.RemoteTestRunner.runTests(RemoteTestRunner.java:770)
	at org.eclipse.jdt.internal.junit.runner.RemoteTestRunner.run(RemoteTestRunner.java:464)
	at org.eclipse.jdt.internal.junit.runner.RemoteTestRunner.main(RemoteTestRunner.java:210)
Caused by: java.lang.ClassNotFoundException: org.junit.platform.engine.EngineDiscoveryListener
	at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:583)
	at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:178)
	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:521)
	... 18 more
```

#### 3. springfox-swagger 라이브러리를 추가한다.
```groovy
compile "io.springfox:springfox-swagger2:2.9.2"
compile 'io.springfox:springfox-swagger-ui:2.9.2'
```

#### 4. Springfox-swagger 설정을 하는 Bean을 생성한다.  
어떤 API를 문서에 추가할지에 대한 조건을 설정한다.
```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

  @Bean
  public Docket api(){
    return new Docket(DocumentationType.SWAGGER_2)
      .select()
        .apis(RequestHandlerSelectors.any())
        .paths(PathSelectors.any())
        .build();
  }
}
```


#### 5. REST API를 구성하는 Entity, Controller, Repository 를 만든다.
**Controller만 있어도 문서를 자동으로 생성한다**
```java
@Entity
@Getter
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
}
```
```java
public interface UserRepository extends JpaRepository<User, Long>{
}
```
```java
@RestController
@RequiredArgsConstructor
public class UserController {

  private final UserRepository userRepository;

  @GetMapping("/api/users/{id}")
  public User get(@PathVariable Long id){
    return userRepository.findById(id)
            .orElseThrow(()->new RuntimeException("유저를 찾을 수 없습니다."));
  }

  @GetMapping(value="/api/users")
  public Collection<User> getAll() {
    return userRepository.findAll();
  }

  @PostMapping("/api/users")
  public User save(@RequestBody User user){
    return userRepository.save(user);
  }

  @DeleteMapping("/api/users/{id}")
  public User findById(Long id){
    User persist = get(id);
    userRepository.deleteById(id);
    return persist;
  }
  
}
```

#### 6. 테스트를 위해 서버를 실행해서 Swagger documnet 데이터를 반환하는지 확인힌다.
```
http://localhost:8080/v2/api-docs
```

#### 7. Swagger UI 페이지를 생성하기 위해, bootJar 로 빌드해서 실행한다.
```
./gradlew bootJar
```
```
java -jar build/libs/springfox-getstarted-0.0.1-SNAPSHOT.jar
```

#### 8. Swagger UI 페이지를 확인한다.
```
http://localhost:8080/swagger-ui.html
```


### 기능
#### 문서에서 특정 API 파라미터 제외하기
Controller 에서 메서드 매개변수로 `Authentication`이나 `Principal` 같은 `Securty` 관련 객체들 가져오는 경우가 있다. API 문서에는 포함되지 말아야 한다.
```java
@GetMapping(value="/api/users")
public Collection<User> getAll(@ApiIgnore Principal principal) {
  return userRepository.findAll();
}
```


## 정리

### Docket
API 문서를 만들기 위한. 추상적으로 문서 내용들에 대해 간략하게 나타내며 관련 설정을 쉽게 할 수 있도록 한다.

### @ApiModelProperty
```java
@ApiModelProperty(
  value = "first name of the user",
  name = "firstName",
  dataType = "String",
  example = "Vatsal")
String firstName;
```

### Description 설정
```java
// SomeController.java
public class SomeController{
  ​@ApiOperation( value = "Find pet by Status",
      ​           notes = "${SomeController.findPetsByStatus.notes}"...)￼
  ​@RequestMapping(value = "/findByStatus", method = RequestMethod.GET, params = {"status"})
  ​public Pet findPetsByStatus(​@ApiParam(value = "${SomeController.findPetsByStatus.status}",￼
                                        ​required = true,...)
                              @RequestParam("status",
                                            ​defaultValue="${SomeController.findPetsByStatus.status.default}") 
                              String status)
  {
  ￼
      ​//...
  ​}

  ​@ApiOperation(notes = "Operation 2", value = "${SomeController.operation2.value}"...)￼
  ​@ApiImplicitParams(
      ​@ApiImplicitParam(name="header1", value = "${SomeController.operation2.header1}", ...)￼
  ​)
  ​@RequestMapping(value = "operation2", method = RequestMethod.POST)
  ​public ResponseEntity<String> operation2() {
    ​return ResponseEntity.ok("");
  }
}
```
```java
// SomeModel.java
​public class SomeModel {
   ​@ApiModelProperty(value = "${SomeModel.someProperty}", ...)￼
   ​private long someProperty;
}
```
```
### application.properties ###
SomeController.findPetsByStatus.notes=Finds pets by status
SomeController.findPetsByStatus.status=Status could be one of ...
SomeController.operation2.header1=Header for bla bla...
SomeController.operation2.value=Operation 2 do something...
SomeModel.someProperty=Some property description
```

## SprngFox - JAVADOC Plugin
https://github.com/springfox/springfox-javadoc


## 참고
- [Spring Fox Reference](https://springfox.github.io/springfox/)
- [Configuring spring-fox, Spring Fox Reference](http://springfox.github.io/springfox/docs/current/#configuring-springfox)
- [API 설명 설정 법, Spring Fox Reference](http://springfox.github.io/springfox/docs/current/#property-file-lookup)
- [Documenting your REST API with Swagger and Springfox, blog](https://dimitr.im/documenting-rest-api-swagger-springfox)
