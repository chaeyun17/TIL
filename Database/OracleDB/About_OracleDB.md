# 데이터베이스 이론

## SQL
SQL은 구조화된 질의 언어(Structed Query Language)의 약자로 DBMS 상에서 데이터를 읽고 쓰고 삭제하는 등 데이터를 관리하기 위한 일종의 프로그램 언어다. SQL은 집합적 언어다. 집합적 언어는 데이터를 특정 집합 단위로 분류해 이 단위별로 한 번에 처리하는 언어라고 할 수 있다.
### 역사
E.F.Codd에 의해 관계형 데이터베이스 이론이 발표된 후, IBM 연구소에서 최초로 SEQUEL(Structed English Query Language)란 언어를 개발했는데 이것이 SQL의 효시다. SEQUEL은 SQL이라는 명칭으로 변경되었고 관계형 데이터베이스에서 SQL이 표준 언어로 채택되어 사용되고 있다.

### 분류
#### DDL
DDL은 데이터 정의어 Data Definition Language로 데이터베이스 객체를 관리하는 언어이다.
#### DML
DML은 데이터 조작어 Data Manipulation Language로 데이터 삽입, 조회, 삭제, 갱신 등 실제로 데이터를 조작하는 언어다.


## PL/SQL
SQL이 집합적 언어인데 반해 PL/SQL은 다른 프로그래밍 언어처럼 절차적 언어다. 하지만 그 뿌리는 모두 SQL이다. SQL을 절차적으로 사용한다고 할 수 있다.
변수에 값을 할당하고 예외처리도 할 수 있으며, 특정 기능을 처리하는 함수나 프로시저를 생성할 수 있다. 또한 PL/SQL은 DB 서버에 코드가 올라가 컴파일되어 수행되는 것이 특징이다.

## 데이터베이스 객체의 종류
- 테이블: 데이터를 담고 있는 객체
- 뷰: 하나 이상의 테이블을 연결해 마치 테이블인 것처럼 사용하는 객체
- 인덱스: 테이블에 있는 데이터를 빠르게 찾기 위한 객체
- 시노님: 데이터베이스 객체에 대한 별칭을 부여한 객체
- 시퀀스: 일련번호 채번을 할 때 사용하는 객체
- 함수: 특정 연산을 하고 값을 반환하는 객체
- 프로시저: 함수와 비슷하지만 값을 반환하지 않는 객체
- 패키지: 용도에 맞게 함수나 프로시저를 하나로 묶어 놓은 객체

## 외래키
Foreign key는 테이블 간의 참조 데이터 무결성을 위한 제약조건이다.
- 반드시 참조하는 테이블이 먼저 생성되어야 하며, 참조키가 참조 테이블의 기본키로 만들어져 있어야 한다.
- 외래키에 사용할 수 있는 컬럼 개수는 32개다.
- 여러 컬럼을 왜래키로 만들려면, 참조하는 컬럼과 외래키 컬럼의 순서와 개수는 같아야 한다.
```
CONSTRAINT 외래키명 FOREGIN KEY (컬러명,...)
REFERENCES 참조테이블(참조 테이블 컬럼명,...)
```

## 패키지
패키지란 논리적으로 연관성이 있는 PL/SQL 타입, 변수, 상수, 서브 프로그램, 커서, 예외 등의 항목을 묶어 놓은 객체다. 패키지는 컴파일 과정을 거쳐 DB에 저장되며, 다른 프로그램(다른 패키지나 프로시저, 외부 프로그램)에서 패키지의 항목을 참조, 공유, 실행할 수 있다.
