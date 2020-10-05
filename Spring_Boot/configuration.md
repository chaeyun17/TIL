# Configuration

## Externalized Configuration
Spring Boot lets you externalize your configuration so that you can work with the same application code in different environmnets.

## Profile-specific Properties
- `application-{profile}.properties`
- 참고: 
https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html#boot-features-external-config-profile-specific-properties

## 참고자료
- [24. Externalized Configuration, Part IV. Spring Boot features](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html)

## Setting Properties and Get properties value
```java
// Configureation Properties Bean
@Configuration
@PropertySource("classpath:cm-${spring.profiles.active}.properties")
@ConfigurationProperties(prefix = "cm")
public class ExProperties {
  
  private String testKey;

  public String getTestKey(){
      return this.testKey;
  }
}
```
```java
// Get propreties value
@Service
public class ExService{
    
    private final String testKey; 

    public ExService(ExProperties exProp){
        this.testKey = exProp.getTestkey();
    } 
}
```
