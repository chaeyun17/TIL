# Spring Scheduling
Spring Framework는 각각 TaskExecutor 및 TaskScheduler 인터페이스를 사용하여 비동기 실행 및 작업 스케줄링에 대한 추상화를 제공합니다. 또한 Spring은 응용 프로그램 서버 환경 내에서 스레드 풀 또는 CommonJ에 대한 위임을 지원하는 인터페이스의 구현을 특징으로합니다. 궁극적으로 공통 인터페이스 뒤에 이러한 구현을 사용하면 Java SE 5, Java SE 6 및 Java EE 환경 간의 차이점이 추상화됩니다.

스프링 프로젝트에서 예약된 작업을 수행할 수 있는 기능이다. 스프링에서 JAVA의 thread pool 과 CommonJ 를 추상화하여, `Task Executer`와 `Task Executoer`를 제공한다. 
Task Executor는 Bean 안에서 사용이 가능하다. Thread Pool을 완벽하게 기반한다고 말할 수 없다. 싱글 쓰레드 방식 또는 동기처리를 기반으로 작동할 수도 있기 때문이다. `execute(Runnable task)` 메서드를 제공한다. 그리고 다음과 같은 구현체들이 있다.

## TaskExecutor Types
1. SyncAsynTaskExecutor: 동기 처리. 주로 테스트 용으로 사용된다. 각 호출은 호출스레드를 사용한다.
1. SimpleAsynTaskExecutor: 한 호출마다 한 쓰레드를 생성. 쓰레드 풀을 사용하지 않는다. 쓰레드 최대 갯수를 제한 설정 가능.
1. ConcurrentTaskExecutor: `java.util.concurrent.Executor` 인스턴스의 어탭터이다. ThreadPoolTaskExecutor 사용하다가 더 유둉적인 동작을 원할 때 대안책으로 사용한다.
1. **ThreadPoolTaskExecutor**: 가장 많이 사용하는 구현체이다. `java.util.concurrent.ThreadPoolExecutor` 설정을 위해 bean properties를 노출한다. 즉, bean 프로퍼티 값으로 원하는 설정을 할 수 있다.
1. WorkManagerTaskExecutor:  CommonJ `WorkManager`를 사용하는 구현체이다. WebLogic 또는 WebSphere 와 spring context와 통합하기 위해 사용한다.
1. DefaultManagedTaskExecutor: 이 구현은 JSR-236 호환 런타임 환경 (예 : Java EE 7 이상 응용 프로그램 서버)에서 JNDI에서 획득 한 ManagedExecutorService를 사용하여 해당 용도의 CommonJ WorkManager를 대체합니다.

## TaskScheduler
Spring 3.0 에서 추가로 나온 인터페이스이다. 미래 어떤 시점에 task를 실행하기 위해 메서드들을 다양하게 제공한다.

```java
public interface TaskScheduler {

    ScheduledFuture schedule(Runnable task, Trigger trigger);

    ScheduledFuture schedule(Runnable task, Instant startTime);

    ScheduledFuture schedule(Runnable task, Date startTime);

    ScheduledFuture scheduleAtFixedRate(Runnable task, Instant startTime, Duration period);

    ScheduledFuture scheduleAtFixedRate(Runnable task, Date startTime, long period);

    ScheduledFuture scheduleAtFixedRate(Runnable task, Duration period);

    ScheduledFuture scheduleAtFixedRate(Runnable task, long period);

    ScheduledFuture scheduleWithFixedDelay(Runnable task, Instant startTime, Duration delay);

    ScheduledFuture scheduleWithFixedDelay(Runnable task, Date startTime, long delay);

    ScheduledFuture scheduleWithFixedDelay(Runnable task, Duration delay);

    ScheduledFuture scheduleWithFixedDelay(Runnable task, long delay);
}
```

## 예제1 코드
```java
package com.example.executortest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

/**
 * AppCofnig: ThreadPoolTaskScheduler Bean Configuration 
 */
@Configuration
public class AppCofnig {

    @Bean
    public ThreadPoolTaskScheduler threadPoolTaskScheduler(){
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        // ThreadPoolTaskScheduler settings here
        // threadPoolTaskScheduler.set...();
        return threadPoolTaskScheduler;
    }
}
```

```java
package com.example.executortest;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Component;

/**
 * AppRunner: 실행
 */
@Component
public class AppRunner implements ApplicationRunner {
    
    @Autowired
    ThreadPoolTaskScheduler taskScheduler;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        final long delayMinutes = 1L;
        long startTimeSec = System.currentTimeMillis() + (delayMinutes*60*1000);
        Date startTime = new Date(startTimeSec);

        PrintMsgTaskRunner task = new PrintMsgTaskRunner("Hello, Spring Boot!");

        taskScheduler.schedule(task, startTime);
    }
}
```


## 참고 문서
- [7. Task Execution and Scheduling, Spring 5.1.6](https://docs.spring.io/spring/docs/5.1.6.RELEASE/spring-framework-reference/integration.html#scheduling)
- [TaskExecutor (Spring Framework 5.1.6.RELEASE API)](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/core/task/TaskExecutor.html)
- [ThreadPoolTaskScheduler (Spring Framework 5.1.6.RELEASE API)](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/concurrent/ThreadPoolTaskScheduler.html)