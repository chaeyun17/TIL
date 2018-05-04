# PL/SQL
<<<<<<< HEAD
## 익명 블록
```SQL
DECLARE
  선언부
BEGIN
  실행부
END;
=======

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
>>>>>>> 54e8424c2b0f66f8ed0070f034c7e75300ececd3
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
<<<<<<< HEAD
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
=======

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

## CURSOR 커서
### 명시적 커서
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

## 커서와 FOR문
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

## 선언 없는 커서와 FOR문
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
### 문법
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
### 변수
```
SEQ_NAME.NEXTVAL -- 다음숫자를 가져오기
SEQ_NAME.CURRVAL -- 현재숫자를 나타내기
```
### 삭제
```
DROP SEQUENCE 시퀀스명;
```
### 예시
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
>>>>>>> 54e8424c2b0f66f8ed0070f034c7e75300ececd3
```
