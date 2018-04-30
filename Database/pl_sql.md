# PL/SQL

## IF
```SQL
IF 조건 THEN
   처리문;
ELSE
  처리문2;
END IF;
```

## 함수
```SQL
CREATE [OR REPLACE] FUNCTION function_name
   [ (parameter [,parameter]) ]

   RETURN return_datatype

IS | AS

   [declaration_section]

BEGIN
   executable_section

   RETURN 리턴변수

[EXCEPTION
   exception_section]

END [function_name];
```

## 프로시저 생성
```SQL

CREATE OR REPLACE PROCEDURE 프로시저 이름
  (
    매개변수1 [IN | OUT | IN OUT] 데이터 타입[:= 디폴트 값]
  )
IS[AS]
 변수, 상수 등 선언
BEGIN
 실행부
[EXCEPTION 예외처리부]
END [프로시저 이름];

```

## 패키지
패키지란 논리적으로 연관성이 있는 PL/SQL 타입, 변수, 상수, 서브 프로그램, 커서, 예외 등의 항목을 묶어 놓은 객체다. 패키지는 컴파일 과정을 거쳐 DB에 저장되며, 다른 프로그램(다른 패키지나 프로시저, 외부 프로그램)에서 패키지의 항목을 참조, 공유, 실행할 수 있다.

### 패키지 선언부
선언부(Specification)는 스펙 혹은 명세라고도 한다. 골격을 선언해 놓은 부분.
```SQL
CREATE OR REPLACE PACKAGE 패키지명 IS
  TYPE 구문;
  상수명 CONSTANT 상수_타입;
  예외명 EXCEPTION;
  변수명 변수_타입;
  커서 구문;

  FUNCTION 함수명(매개변수1 IN 매개변수1_타입,
                  매개변수2 IN 매개변수2_타입,
                  ...)
    RETURN 반환 타입;

  PROCEDURE 프로시저명(
    매개변수1 [IN, OUT, INOUT] 매개변수1_타입,
    매개변수2 [IN, OUT, INOUT] 매개변수2_타입,
    ...
  );
  ...

END 패키지명;
```

### 패키지 본문
선언했다면 이들에 대한 구현 내용이 필요한데, 이를 패키지 본문(body)에서 작성한다.
```SQL
CREATE OR REPLACE PACKAGE BODY 패미지명 IS
  상수명 CONSTANT 상수_타입;
  변수명 변수_타입;
  커서 정의 구문;

    FUNCTION 함수명(매개변수1 [IN, OUT, INOUT], ...) RETURN 반환타입 IS
    IS
    ...
    BEGIN
    ...
    END 함수명;

    PROCEDURE 프로시저명(매개변수1 [IN,OUT,INOUT] 매개변수1_타입, ...)
    IS
    ...
    BEGIN
    ...
    END 프로시저명;
    ...
END 패키지명;
```
