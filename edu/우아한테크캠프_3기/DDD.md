# DDD
- Domain Driven Design

## 들어가기 전에
- 소프트웨어의 목적은 소프트웨어 사용자의 문제를 해결하는 것
   - 기술적으로 정교하고 성능이 아무리 뛰어나도 원하는 동작을 하지 않는 소프트웨어는 실패한 소프트웨어.
- DDD는 디자인 패턴처럼 규칙을 지키는 것보다, 비지니스 요구 맞게 유연하게 '비지니스' 에 따라 코드를 구성하는 것
   - 해당 비지니스 용어 사용을 통해 유지보수 시 여러 개발자 간과 기획자 간 이해가 쉬움

## 기존의 개발 방식

### 기존 개발 절차
1. 기획 정의
2. 데이터 스키마 설계
3. 데이터 스키마에 따라 클래스 구성
4. 비지니스 로직 구현: Query 또는 코드

### 기존의 개발 방식 문제점
- 비지니스 도메인 전문가의 도메인과 개발자가 설계한 소프트웨어 모델 간의 불일치 발생
   - 복잡해질 수록, 규모가 커질수록 프로젝트 관련 인원이 늘어남. 
   - 역할 별로 서로 다른 모델을 인지하게 되고 커뮤니케이션 비용가 위험이 증가
- 제 생각으로는, 프로젝트가 작은 규모거나 비지니스가 복잡하지 않으면 한 사람의 머리 속으로 다 해결이 되기 떄문에 문제가 없음. 하지만 새로운 인원 참여 및 인수인계에 어려움이 발생함.

## 도메인 주도 설계의 목적
- 소통 불일치를 방지 및 해소하기 위한 방법론이 DDD(Domain Driven Design)
  - Eric Evans 용어
- 도메인 모델의 적용을 기획에서부터 구현까지 확장하는 것
  - 공통의 언어(유비쿼터스 언어) 사용 할 수 있게 됨
- 추상적인 도메인 모델을 구체적인 소프트웨어 모델로 설계해야 함
  - 현실 구현 가능한 도메인 모델인지 판단 또는 검증 필요
  - 도메인에 대한 이해를 올릴려면 직접 구현을 해봐야 함
  - 다양한 원칙과 패턴 존재

## 원칙과 패턴
- 유비쿼터스 용어
- 전략적 설계: Boundend Context. 나무가 아닌 숲
- 전술적 설계: 실제 구현 패턴들. 실제 DDD 할 때, 전술적 설계만 고려하는 경우가 많음. 이게 전부가 아님. 레고의 블럭으로 생각하면 됨.


## 도메인
- 소프트웨어로 해결하고자 하는 해결 영역
  - 쇼핑몰일 경우에는 이커머스가 도메인. 

## 도메인 모델
- 특정 도메인을 개념적으로 표현한 것
- 클래스 다이어그램이 아님.
  - 예시: 자동차 운전자/구매자일 경우 안의 내부의 작은 부품들보다는 디자인, 엔진, 바퀴, 사용자 기능들만 알면 됨.
- 기획자, 디자이너, 개발자들이 모두 사용하는 모델임. 그래서 공통된 용어가 필요함

## 도메인 모델링
- 사용자와 개발자는 동일한 언어로 이야기해야 한다
- ERD 나 다이어그램까지는 구체적인 모델이 없어도 된다. 서로 쉽게 공통된 언어로 표현되면 된다
  - 영업팀도 이해하지 못하는 모델은 잘못된 것이다. UML을 사용하기 보다 글이나 칠판 스케치가 모델링하는데 효과적이다.
  - 요구사항이 계속 변화하기 때문에, 모델이 계속 바뀌게 된다는 특성이 있다

## Bounded Context
- 세부 영역별로 도메인을 나누는 것. 나누는 기준은 개념의 차이에 따라.
- 같은 용어이지만 도메인 영역에 따라 다른 개념으로 사용된다
- 이커머스의 Customer
  - 판매 영역에서 Customer는 물건을 판매하고 관리하는 판매자 개념
  - 고객관리에서의 Customer는 서비스 사용에 대한 질문,불만처리 대상 개념
  - ![Bounded Context Diagram](https://martinfowler.com/bliki/images/boundedContext/sketch.png)
- IPR 제품의 ResourceGroup
  - 분석/데이터 관리에서의 ResourceGroup은 데이터 그룹 개념
  - 사용자 관리에서는 작업 관리 그룹 및 유저 그룹 개념


### 좋은 Bounded Context
- 하나의 Bounded Context는 하나의 팀에만 할당된다.
  - 하나의 팀은 여러 개의 Bounded Context로 다룰 수 있다
- 각각의 Bounded Context는 각각의 개발 환경을 가질 수 있다


## DDD 도입
- 기존 조직에 DDD를 도입하려다보면, 기능들과 도메인들이 제대로 나눠져있지 않고 파편화되어 있다.
- 파편화된 기능과 도에인 지식들은 서로 다른 사람들에게 의존되어 있다보니 빠르게 파악하기 힘들다
- 이벤트 스토밍(Event Storming) 워크숍을 통해 파편화된 도메인을 정리하고 개념을 통일시킬 수 있다.


### 이벤트 스토밍
- 코드를 없애고 모든 사람들을 동일한 수준으로 만드는 시각적 접근 방법
- ![이벤트 스토밍](https://engineering-skcc.github.io/assets/images/msa/MSA5.16.png)
- ![이벤트 스토밍2](https://packages.deravesoftware.com/app/uploads/2021/06/event-storming.png)
- 개인적 잘못된 시도 경험
  - 개발자 입장에서만 다이어그램으로써 그렸다보니, 다른 역할 사람들에게 오히려 더 복잡하게 이해됨
  - 구체적인 비지니스 로직을 정의하는 것이 목적이 아니라, 나무보다 숲에 대한 이해를 통일 시키는 소통의 방식이라고 생각됨.
  - 보관 기록물로써는 맞지 않음. 도메인 모델이 항상 변하는 특성에 따라 일회성에 가까움.
- 오프라인 도구들: 하얀 바탕, 포스트잇, 매직
- 온라인 도구들: MIRO


## 개발에서의 도메인 주도 설계

- 도출한 도메인은 Entity 와 Value 로 나뉨
- 데이터와 함께 도메인 기능을 제공
- ![예시](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/media/net-core-microservice-domain-model/vs-solution-explorer-order-aggregate.png)
- [Implement a microservice domain model with .NET](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/net-core-microservice-domain-model)


### Value Object
- 값 객체. 불변. eqauls 필요.
- 의미가 명확하게 표현되어야 하거나, 여러 데이터가 한 개념인 경우 이용
- 시스템의 성숙도에 따라 데이터 값을 객체로 대체
- 예시: 우편번호를 기본 타입 String 으로만 표현할 수 있을까?



## 참고 자료
- [[10분 테코톡] ☕️라테의 도메인 주도 설계](https://www.youtube.com/watch?v=VIfNipL5KkU)