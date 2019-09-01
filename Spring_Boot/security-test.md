# Security Test

## WebMvcTest and Security
`@WithMockUser`를 사용하면, 특정 사용자로 인증을 얻은 상태로 테스트를 진행할 수 있다. 기본값은 다음과 같다.
- 항목: 기본값
- user: user
- password: password
- roles: ROLE_USER

그리고 다음과 같은 사실들이 있다.
- WithMockUser의 "user"는 실제로 존재하지 않는 Mock 유저이다.
- `SecurityContext`에 존재하는 `Authentication`은 `UsernamePasswordAuthenticationToken`의 종류이다.
- `Authentication`의 principal은 스프링 시큐리티의 `User` 오브젝트이다.
-  스프링 시큐리티의 `User` 오브젝트의 username은 "user", 암호는 "password"이며, "ROLE_USER"라는 하나의 `GrantAuthority`르 사용한다.

예제

- `@WithMockUser("customUsername")`
- `@WithMockUser(username="admin",roles={"USER","ADMIN"})`
- `@WithMockUser(username = "admin", authorities = { "ADMIN", "USER" })`
- `@WithMockUser(username="admin",roles={"USER","ADMIN"})`

```java
@RunWith(SpringRunner.class)
@WebMvcTest
public class TestMvcSecurity {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private WorkService workService;

    @WithMockUser
    @Test
    public void getIndex() throws Exception{
        this.mvc.perform(get("/")).andDo(print()).andExpect(status().isOk());
    }
```

## TestRestTemplate And Basic Auth
`TestRestTemplate` 에는 Basic Authentication을 지원한다. 

```java
public TestRestTemplate withBasicAuth(String username, String password)
```

```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class TestRestSecurity {

    @LocalServerPort
    private int port;

    @Autowired
    TestRestTemplate restTemplate;

    @Test
    public void test_UnAuth(){
        ResponseEntity<String> response = this.restTemplate.getForEntity("/api/user/secure", String.class);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    public void test_mock_auth(){
        ResponseEntity<String> response = this.restTemplate.withBasicAuth("admin", "admin")
                                            .getForEntity("/api/user/secure", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void test_mock_UnAuth(){
        ResponseEntity<String> response = this.restTemplate.withBasicAuth("admin", "123")
                                            .getForEntity("/api/user/secure", String.class);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }
}
```

## InMemory Authentication Provider 세팅
```java
@Configuration
@EnableWebSecurity
public class BasicConfiguration extends WebSecurityConfigurerAdapter{

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth
            .inMemoryAuthentication()
            .withUser("user")
                .password(encoder().encode("password"))
                .roles("USER")
                .and()
            .withUser("admin")
                .password(encoder().encode("admin"))
                .roles("USER", "ADMIN");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/user/secure")
            .authenticated()
            .anyRequest().permitAll()
            .and()
            .httpBasic();
    }

    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }
    
}
```

## 참고
- https://docs.spring.io/spring-security/site/docs/current/reference/html/test.html
- https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/test/web/client/TestRestTemplate.html
