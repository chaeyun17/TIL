# SPRING DATA JDBC

## 컨셉
이미 자바 진형에서는 관계형 DB를 위한 영속성 API로 JPA를 많이 사용하고 있다. JPA는 이미 Spring Data 모듈로 포함되어 있다. 그런데 왜 다른 모듈이 필요할까?
JPA는 Entity 변화 추적 및 Lazy 로딩 기능을 제공한다. 광범위한 객체구성을 데이터베이스 디자인에 동일하게 맵핑할 수 있다. 하지만 JPA가 특정 작업을 수행하는 이유에 대해 이해하기 쉽지 않다. 개념적으로 단순한 것들도 JPA에서는 어려운 것들이 있다.

그래서 Spring Data JDBC는 이런 JPA 모듈보다 개념적으로 사용하기 간단하도록 만들었다. 다음과 같은 설계 원칙을 통해서.
- Entity가 로딩되면, SQL문이 실행된다. Lazy 로딩과 Caching이 전혀 없다.
- Entity를 저장하면, 저장된다. 어떠한 변화 추적이나 세션이 존재하지 않는다.
- Entity를 Table과 어떻게 맵핑할 것이지에 대한 간단한 모델을 제공한다. 아마도 간단한 케이스에만 적용될 것이다. 이것이 마음에 들지 않는다면, 나만의 맵핑 방식을 코딩할 수 있다. Spring Data JDBC는 Annotaion과 함께 제한된 커스터마이징을 제공한다. 

모든 Spring Data 모듈들은  Domain Driven Design의 "Repository", "Aggregate", "Aggregate Root" 컨셉을에서 영감을 받았다. 

현재 초기 1.0 버전까지 나온 상태이고, 업데이트 주기가 길다고 한다. 도입에 이런 것들을 고려해야한다.
