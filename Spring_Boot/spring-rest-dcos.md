# Spring REST Docs

## Get Started
### 1. build.gradle 설정
Gralde Dependency에 Spring REST Docs 추가 
```groovy
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	compileOnly 'org.projectlombok:lombok'
	developmentOnly 'org.springframework.boot:spring-boot-devtools'
	runtimeOnly 'com.h2database:h2'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation('org.springframework.boot:spring-boot-starter-test') {
		exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
	}
  // handling for junit5 execute error
  testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
  // spring restdocs
  testImplementation 'org.springframework.restdocs:spring-restdocs-mockmvc'
  asciidoctor 'org.springframework.restdocs:spring-restdocs-asciidoctor:2.0.4.RELEASE'
}
```


ASCIIDoctor Gradle 플러그인 추가
```groovy
plugins {
	id 'org.springframework.boot' version '2.2.6.RELEASE'
	id 'io.spring.dependency-management' version '1.0.9.RELEASE'
	id 'java'
  id 'org.asciidoctor.convert' version '1.5.9'
}
```


ASCIIDOCTOR Task 추가
```groovy
asciidoctor {
    sourceDir 'src/main/asciidoc'
    attributes \
      'snippets': file('target/snippets')
}
```

### 2. 테스트용 REST API 생성
- UserController, UserRepository, User 생성
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
  public User findById(@PathVariable Long id){
    User persist = get(id);
    userRepository.deleteById(id);
    return persist;
  }
  
}
```
```java
public interface UserRepository extends JpaRepository<User, Long>{

}
```
```java
@Entity
@Getter
@AllArgsConstructor @NoArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
}
```

### 5. MVC 테스트 작성
```java
@WebMvcTest(UserController.class)
@AutoConfigureRestDocs(outputDir = "target/snippets/user")
public class UserWebTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private UserRepository userRepository;

  @Test
  public void Given_none_When_GetAll_Then_Users() throws Exception{
    List<User> mockUsers = new ArrayList<>();
    mockUsers.add(new User(1L, "j1"));
    mockUsers.add(new User(2L, "j2"));
    mockUsers.add(new User(3L, "j3"));

    when(userRepository.findAll()).thenReturn(mockUsers);
    this.mockMvc.perform(get("/api/users")).andDo(print())
      .andExpect(status().isOk())
      .andDo(document("find_all", preprocessResponse(prettyPrint())));
  }

  @Test
  public void Given_UserId_When_findById_Then_User() throws Exception{
    Long id = 1L;
    User mockUser = new User(id, "j1");
    when(userRepository.findById(id)).thenReturn(Optional.of(mockUser));
    this.mockMvc.perform(get("/api/users/"+id))
      .andExpect(status().isOk())
      .andDo(document("find_by_id", preprocessResponse(prettyPrint())));
  }

  @Test
  public void Given_User_When_Save_Then_User() throws Exception{
    String name = "john";
    User mockUser = new User(1L, name);
    User requestUser = new User(0L, name);
    when(userRepository.save(any())).thenReturn(mockUser);

    String content = new ObjectMapper().writeValueAsString(requestUser);
    this.mockMvc.perform(post("/api/users").content(content).contentType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk())
      .andExpect(content().string(containsString(requestUser.getName())))
      .andDo(document("save", preprocessResponse(prettyPrint())));
  }

  @Test
  public void Given_UserId_When_Delete_Then_User() throws Exception{
    Long id = 1L;
    User mockUser = new User(id, "j1");
    when(userRepository.findById(id)).thenReturn(Optional.of(mockUser));

    this.mockMvc.perform(delete("/api/users/"+id))
      .andExpect(status().isOk())
      .andDo(document("delete", preprocessResponse(prettyPrint())));
  }
}
```

### 6. Snippet 생성
테스트를 실행하고, 디렉토리 경로 `target/snippets/user`에서 결과물인 Request, Response Snippet 확인

### 7. ASCIIDOC 템플릿 작성
USER API용 템플릿 문서 작성. 경로 `src/main/asciidoc/user-index.adoc`
```asciidoc
= USER REST API Doc

This is an User output for a service running at http://localhost:8080:


=== Get all

.request
include::{snippets}/user/find_all/http-request.adoc[]

.response
include::{snippets}/user/find_all/http-response.adoc[]


=== Find by id

.request
include::{snippets}/user/find_by_id/http-request.adoc[]

.response
include::{snippets}/user/find_by_id/http-response.adoc[]


=== Save

.request
include::{snippets}/user/save/http-request.adoc[]

.response
include::{snippets}/user/save/http-response.adoc[]


=== Delete

.request
include::{snippets}/user/delete/http-request.adoc[]

.response
include::{snippets}/user/delete/http-response.adoc[]


As you can see the format is very simple, and in fact you always get the same message.
```

### 8. 문서 생성
build.gradle에서 작성한 `asciidoctor` Task를 통해 Snippet와 ASCIIDOC 템플릿을 통합해서 최종 문서 생성
```
gradle asciidoctor
```

### 9. 문서 결과물 확인
경로 `build/asciidoc/html5/user-index.html` 파일을 확인


## 참고문서
- https://asciidoctor.org/docs/asciidoctor-gradle-plugin/