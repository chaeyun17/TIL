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

#### 패키지 선언부
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

#### 패키지 본문
선언했다면 이들에 대한 구현 내용이 필요한데, 이를 패키지 본문(body)에서 작성한다.
```SQL
CREATE OR REPLACE PACKAGE BODY 패키지명 IS
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

## CURSOR 커서
#### 명시적 커서
1. 커서 선언
매개변수는 생략 가능하다. 명시할 때는 SELECT 문장의 WHERE 절에서 조건을 체크하는 변수로 사용한다.
```
CURSOR 커서명 [(매개변수1,매개변수2,...)]
IS
SELECT 문장;
```
2. 커서 열기
```
OPEN 커서명 [(매개변수1,매개변수2,...)];
```
3. 커서 닫기
```
CLOSE 커서명;
```

```SQL
--- 그룹 공통 코드 이름들 출력
DECLARE
  v_grp_name grpcommons_tbl.grp_name%type;
    CURSOR cur_grp_name
  IS
  SELECT grp_name FROM grpcommons_tbl;
BEGIN
  open cur_grp_name;
  LOOP
    FETCH cur_grp_name INTO v_grp_name;
    EXIT WHEN cur_grp_name%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(v_grp_name);

  END LOOP;
  CLOSE cur_grp_name;
END;
```

#### 커서와 FOR문
```SQL
FOR 레코드 IN 커서명(매개변수1, 매개변수2, ...)
LOOP
  처리문;
END LOOP;
```

```sql
DECLARE
    CURSOR cur_grpcom
    IS
    SELECT grp_name FROM grpcommons_tbl;
BEGIN
    FOR v_grp_name IN cur_grpcom
    LOOP
        DBMS_OUTPUT.PUT_LINE(v_grp_name.grp_name);
    END LOOP;
END;
```

#### 선언 없는 커서와 FOR문
```sql
-- 커서 없는 커서와 FOR문
DECLARE
BEGIN
    FOR rec_grp_name IN (SELECT grp_name FROM grpcommons_tbl)
    LOOP
        DBMS_OUTPUT.PUT_LINE(rec_grp_name.grp_name);
    END LOOP;
END;
```

## 시퀀스 SEQUENCE
차례대로 숫자를 할당하기 위해서 사용. 객체이기 때문에 관리가 필요하다.
#### 문법
```
CREATE SEQUENCE 시퀀스명
INCREMENT BY 증감숫자
START WITH 시작숫자
NOMINVALUE | MINVALUE 최솟값
NOMAXVALUE | MAXVALUE 최댓값
NOCYCLE | CYCLE
NOCACHE | CACHE
;
```
#### 변수
```
SEQ_NAME.NEXTVAL -- 다음숫자를 가져오기
SEQ_NAME.CURRVAL -- 현재숫자를 나타내기
```
#### 삭제
```
DROP SEQUENCE 시퀀스명;
```
#### 예시
```SQL
CREATE SEQUENCE my_seq1
INCREMENT BY 1
START WITH 1
MINVALUE 1
MAXVALUE 1000
NOCYCLE
NOCACHE
;
CREATE TABLE TEST_SEQ
(
    IDX NUMBER(3) NOT NULL,
    CONTENT_VAL VARCHAR2(20)
);

INSERT INTO TEST_SEQ VALUES (
    MY_SEQ1.NEXTVAL,'하이'
);

SELECT * FROM TEST_SEQ;
```

## 트리거 Trigger
트리거는 데이터 베이스에 저장된 프로그램 유닛이다. 특정한 이벤트가 발생하면 트리거가 실행된다. 특정한 이벤트는 테이블, 뷰, 스키마 또는 데이터베이스에 연결할 수 있다. 그리고 다음과 같은 명령에 발생한다.
- DML : DELETE, INSERT or UPDATE
- DDL : CREATE, ALTER or DROP
- DB Operation: SERVERERROR, LOGON, LOGOFF, STARTUP or SHUTDOWN

```sql
CREATE OR REPLACE TRIGGER 트리거명
  [BEFORE/AFTER/...] [DELETE/INSERT/...]
  ON 테이블명
  REFERENCING NEW AS NEW OLD AS OLD
  FOR EACH ROW
DECLARE

BEGIN
  IF INSERTING THEN
  DBMS_OUTPUT_PUT_LINE(:NEW.column);
  DBMS_OUTPUT_PUT_LINE(:OLD.column);
  END IF;
END;
```

## 명명법
- 변수: 변수 `v` + 데이터타입 앞 글자(문자는 `s`, 숫자는 `n`, 날짜는 `d`) + 변수설명
```
vs_emp_name
```
- 상수: constant의 맨 앞 글자인 `c` + 데이터타입 + 변수설명
```
cn_pi
```
- 매개변수: parameter의 맨 앞 글자인 p + 데이터타입 + 변수설명
```
pn_employee_id
```
- 함수: `get` + 함수 설명 약자 + `fn`
```
get_dep_name_fn
```
- 프로시저: 처리유형 + 프로시저 설명 약자 + `proc`
```
upd_emp_sal_proc
ins_new_emp_proc
```

## 예외처리

```SQL
EXCEPTION
WHEN 예외명1 TEHN 예외처리 구문1
WHEN 예외명1 TEHN 예외처리 구문2
...
WHEN OHTERS THEN 예외처리 구문n;
```

예외처리를 하지 않으면, 에러가 발생한 지점에서 프로그램 흐름이 끊킨다.    
예외처리를 하면, 예외처리 동작을 함과 동시에 정상적으로 프로그램이 진행된다.

#### 오류
1. 문법 오류: 컴파일러를 통해 걸러진다.
2. 로직 오류: 예외 처리를 통해 걸러진다.

#### 예외 종류
1. 시스템 예외: 오라클 내부에서 미리 정의된 예외이다. 오라클에서 발생.    
ex) 나눗셈 연산을 0으로 나누는 경우, select 조건에 만족하는 데이터가 없는 경우
2. 사용자 정의 예외: 사용자의 의도로 발생.

#### SQLCODE 와 SQLERRM 내장함수
개발자 입장에서 어떤 오류가 발생했는지 알고 싶을 때 사용한다.
- SQLCODE는 실행부에서 발생한 예외에 해당하는 예외코드를 반환한다.   
예) `-1476`
- SQLERRM은 발생한 예외에 대한 예외코드와 오류메시지를 반환한다.    
예) `ORA-01476: divisor is equal to zero`

#### 관련된 패키지와 함수
- `DBMS_UTILITY.FORMAT_ERROR_BACKTRACE`: 몇 번째 줄에서 예외가 발생했는지 알 수 있다.
- `DBMS_UTILITY.FORMAT_ERROR_STACK`
- `DBMS_UTILITY.FORMAT_CALL_STACK`: 예외에 대해 좀 더 자세한 정보를 알 수 있다.

#### 시스템 예외
IF-ELSEIF-ELSE 처럼 동작한다. 조건에 맞는 최상위 예외처리 하나만 처리한다.
- `NO_DATA_FOUNT` : ORA-01403
- `TOO_MANY_ROWS` : ORA-01422
- `ZERO_DIVIDE`   : ORA-01476
```SQL
EXCEPTION
    WHEN ZERO_DIVIDE THEN
      DBMS_OUTPUT.PUT_LINE(SQLERRM);
    WHEN OTHERS THEN
      DBMS_OUTPUT.PUT_LINE(SQLERRM);
```

#### 사용자 정의 예외
1. 예외 정의: `사용자_정의_예외명 EXCEPTION;` PL/SQL 블록의 선언부에 예외를 정의한다.
2. 예외 발생: `RAISE 사용자_정의_예외명;` 시스템 예외는 해당 예외가 자동으로 검출, 사용자 정의 예외는 직접 예외를 발생시켜야 한다.
3. 예외 처리: `EXCEPTION WHEN 사용자_정의_예외명 THEN ...` 예외를 발생시키면 자동으로 제어된 EXCEPTION 절로 넘어오므로 시스템 예외와 동일한 방식으로 처리하면 된다.

#### 효율적인 예외 처리 방법
**1. 시스템 예외인 경우는 OTHERS를 사용하자**
시스템 예외 몇가지를 제외하고는 기억하기도 힘들고 사용하기가 번거롭다. 대신 OTHERS는 모든 시스템 예외를 잡아내므로 OTHERS와 SQLCODE, SQLERRM을 적극 사용하자.

**2. 예외 처리 루틴을 공통 모듈화하고, 발생된 예외 로그를 남기자.**
SQLCODE와 SQLERRM을 통해 발생된 예외정보를 상세히 알 수 있다. 따라서 발생한 예외에 대한 로그 테이블을 만들어 예외가 생길 때마다 이 로그 테이블에 기록해 둔다면 관리하기 매우 편할 것이다.
*ex) 예외로그 테이블, 시퀀스 키번호, 예외발생시 로그 테이블 INSERT 프로시저*

**3. 사용자 정의 예외도 별도의 테이블로 미리 만들어 관리하자**
개발자마다 작성하는 포로시저에서 사용자 정의 예외를 정의하고 사용하다 보면, 동일한 예외 코드를 사용하여 중복이 발생할 소지가 매우 많다. 따라서 사용자 정의 예외 테이블을 만들어 놓고, 실제 해당 예외가 발생하면 이 테이블에서 에외코드와 번호 등을 읽어오는 식으로 처리하면 관리하기가 쉽다.
