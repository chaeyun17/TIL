# Testing

## 참고문서
- [Testing, Spring Boot Docs](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-testing.html#boot-features-testing-spring-boot-applications-testing-autoconfigured-jpa-test)

## Testing the Web Layer
- [Testing in Spring Boot, baeldung](https://www.baeldung.com/spring-boot-testing)

```java
@RestController
@RequestMapping("/api")
public class EmployeeRestController {
 
    @Autowired
    private EmployeeService employeeService;
 
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
}
```
```java
@RunWith(SpringRunner.class)
@WebMvcTest(EmployeeRestController.class)
public class EmployeeRestControllerIntegrationTest {
 
    @Autowired
    private MockMvc mvc;
 
    @MockBean
    private EmployeeService service;
 
    @Test
    public void givenEmployees_whenGetEmployees_thenReturnJsonArray()
    throws Exception {
        
        Employee alex = new Employee("alex");
    
        List<Employee> allEmployees = Arrays.asList(alex);
    
        given(service.getAllEmployees()).willReturn(allEmployees);
    
        mvc.perform(get("/api/employees")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(1)))
        .andExpect(jsonPath("$[0].name", is(alex.getName())));
    }
}
```

## Testing Spring Data JPA
`@RunWith(SpringRunner.class)`는 스프링부트 테스트 요소들과 JUNIT 간 다리 역할을 합니다. JUnit 테스트에서 스프링 부트 테스트 기능을 사용할 때마다 해당 어노테이션이 필요합니다.

`@DataJpaTest`는 persistence layer를 테스트하기 위해 필요한 몇 가지 기본 설정을 제공합니다.
- H2 설정 (메모리 기반 데이터베이스): 메모리 기반 DB 사용이 default 세팅값입니다.
- Hibernate, Spring Data, DataSource 설정
- `@EntityScan` 실행
- SQL 기록 기능 켜기

DB 작업을 하가 위해, 몇 개의 레코드가 데이터베이스에 미리 들어가있어야 합니다. 이러한 설정을 위해 `TestEntityManager`가 있습니다. `TestEntityManager`는 테스트 시에 JPA의 EntityManager를 대신합니다. EntityManager는 일반적으로 사용하는 메소드들을 제공합니다.

```java

import static org.assertj.core.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class EmployeeRepositoryIntegrationTest{

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    public void whenFindByName_thenReturnEmpolyee(){
        // Given
        Empolyee alex = new Employee("alex");
        entityManager.persist(alex);
        entityManager.flush();

        // When
        Empolyee found = employeeRepository.findByName(alex.getName());

        // Then
        assertThat(found.getName())
            .isEqualTo(alex.getName());
    }
}
```

- https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-testing.html#boot-features-testing-spring-boot-applications-testing-autoconfigured-jpa-test
- https://www.baeldung.com/spring-boot-testing

## Testing Rest Client
`@RestClinetTest` 어노테이션은 Jackson, GSON, and Jsonb support 를 자동설정합니다. 그리고 `RestTemplateBuilder`도 설정합니다. 그리고 `MockRestServiceServer`도 지원합니다.

```java
@RunWith(SpringRunner.class)
@RestClientTest(RemoteVehicleDetailsService.class)
public class ExampleRestClientTest {

	@Autowired
	private RemoteVehicleDetailsService service;

	@Autowired
	private MockRestServiceServer server;

	@Test
	public void getVehicleDetailsWhenResultIsSuccessShouldReturnDetails()
			throws Exception {
		this.server.expect(requestTo("/greet/details"))
				.andRespond(withSuccess("hello", MediaType.TEXT_PLAIN));
		String greeting = this.service.callRestService();
		assertThat(greeting).isEqualTo("hello");
	}
}
```