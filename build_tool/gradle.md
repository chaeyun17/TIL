# Gradle
Gradle은 오픈소스 빌드 자동 도구입니다. 유연성과 성능에 초점을 맞췄습니다. Gradle 빌드 스크립트는 Groovy 또는 Kotlin DSL을 사용하여 작성합니다. [출처](https://docs.gradle.org/current/userguide/userguide.html)

단일 Java 파일을 컴파일하려면 `javac app.java` 를 통해 `app.class`로 컴파일을 하고, `java app` 으로 앱을 실행하면 됩니다. 하지만 어플리케이션을 만들려면, 다양한 라이브러리를 사용할 수 밖에 없습니다. 다양한 라이브러리를 쉽게 사용할 수 있게 관리하고, 빌드를 유연하게 간단히 할 수 있게 해주는 편리한 도구입니다.

Groovy 와 Kotlin DSL을 작성이 되어 있어서, 처음엔 스크립트를 바로 접근하기가 쉽지 않지만 그만큼 스크립트로 빌드 과정을 정의할 수 있어서 유연성이 크다는 이점이 있습니다. maven은 xml 기반이라 직관적이지만, 스크립트를 짤 수 없기 때문에 유연성에 Gradle 보다 한계가 있습니다.


## Depdendency 유형

상황에 따라 필요한 라이브러리들을 가져다써야할 때도 있고 빼야할 때도 있습니다. 테스트 시에만 사용하는 테스트 라이브러리를 빌드한 패키지에 들어갈 필요는 없습니다. 용량을 차지할 뿐더러 테스트 도구의 오류가 어플리케이션 운영에 영향을 미칠 수 있기 때문입니다.

Gradle 에서는 선언된 dependecy를 관리를 DependencyHanlder 가 합니다. [DependencyHandler, docs.gradle.org](https://docs.gradle.org/current/dsl/org.gradle.api.artifacts.dsl.DependencyHandler.html) 

문법은 다음과 같습니다. 우리가 사용하는 `implementation` 과 `compileOnly` 와 같은 것들은 `DependecyHandler`의 `Configuration` 이라고 부릅니다. 

```
dependencies {
    configurationName dependencyNotation
}
```


이 Configuration 덕분에 dependency들을 그룹핑해서 관리할 수 있습니다. 테스트 시에 사용하는 라이브러리들은 `testImplementation` 으로 그룹핑하여 관리할 수 있습니다. 

```gradle
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'
	compileOnly 'org.projectlombok:lombok:1.18.6'
	testCompileOnly 'org.projectlombok:lombok:1.18.6'
	annotationProcessor 'org.projectlombok:lombok:1.18.6' 
	testAnnotationProcessor 'org.projectlombok:lombok:1.18.6' 
  testImplementation ('org.springframework.boot:spring-boot-starter-test'){
    exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
  }
}
```

우리가 주로 사용하는 `implementation`, `compileOnly` 과 같은 `dependcy configuration`은 gradle 플러그인들 중에 java plugin에서 제공하는 유형들입니다.  그래서 해당 방법으로 dependecy 관리하려면 다음과 같이 플러그인을 사용하도록 설정해야 합니다. [java-plugin, docs.gradle.org](https://docs.gradle.org/current/userguide/java_plugin.html#java_plugin)

```
plugins {
    id 'java'
}
```



메인 소스셋을 위한 `dependency configuration`들은 다음과 같이 구성되어 있습니다.



![java main configurations](https://docs.gradle.org/current/userguide/img/java-main-configurations.png)





각각 언제 사용하는지 정리해보겠습니다.

- `implementation`은 말그대로 구현할 때 사용하는 라이브러리를 지칭합니다. `spring` 과 같은 프레임워크가 주로 해당됩니다.
- `compileOnly`는 프로그램이 실행 중인(런타임) 말고 컴파일할 때만 사용되는 dependency를 지칭합니다. java 파일을 class로 변환하고 jar 패키징 결과에서는 해당 라이브러리들은 패키징에 제외됩니다. maven의 `provided`와 유사합니다. [자세한 설명](https://blog.gradle.org/introducing-compile-only-dependencies). 예시로는 lombok 과 같은 라이브러리들이 해당됩니다. apache storm 을 사용하려면 로직이 담긴 topology를 jar로 제출해야 합니다. 그 때 storm core 는 jar 패키징에서 제외해서 빌드해야 해서 compileOnly를 사용합니다.
- `compileClassPath` 는 comileOnly와 implmentation 두 요소를 포함합니다. 소스코드를 컴파일하는 `compileJava` Task에서 사용합니다. 
- `annotationProcessor` 는 컴파일 시에 사용하는 어노테이션 프로세서들을 라이브러리들을 지칭합니다.
- `runtimeOnly` 는 런타임 시에만 사용되는 dependency 입니다.
- `runtimeClassPath`는 implementation과 runtime 요소들이 둘다 포함합니다.



 다음은 test 소스셋을 위한 것들입니다.

![java test configurations](https://docs.gradle.org/current/userguide/img/java-test-configurations.png)



앞에 설명한 '메인 소스셋을 위한 `dependency configuration` ' 과 유사합니다. 다만 test 시에만 적용됩니다. `testImplementation`은 테스트 시에만 사용되는 implementation을 지칭합니다. 다른 항목들에 대한 설명은 [문서](https://docs.gradle.org/current/userguide/java_plugin.html#tab:configurations)를 통해 확인할 수 있습니다.

생소한 configuration이 문서에 있었습니다.

- `archives` 해당 프로젝트에 의해 생성되는 Artifacts(e.g. jars)를 지칭합니다. 주로 Gradle에서 빌드 시 default task를 결정하기 위해 사용합니다.

  







