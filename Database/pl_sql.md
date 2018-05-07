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
커서란 특정 SQL 문장을 처리한 결과를 담고 있는 영역(PRIVATE SQL이라는 메모리 영역)을 가리키는 일종의 포인터로, 커서를 사용하면 처리된 SQL 문장의 결과 집합에 접근할 수 있다. 여러 개의 로우에 개별로 순차적으로 접근할 수 있다.

묵시적 커서는(Implicit cursor)란 오라클 내부에서 자동으로 생성되어 사용하는 커서다. PL/SQL 블록에서 실행하는 SQL문장이 실행될 때마다 자동으로 만들어져 사용된다. 반면 명시적 커서(Explicit cursor)는 사용자가 직접 정의해서 사용하는 커서를 말한다.

커서는 `OPEN - FETCH - CLOSE` 이렇게 3단계로 진행된다.
#### 명시적 커서
1. 커서 선언: 커서명과 쿼리문 선언
매개변수는 생략 가능. 매개변수는 SELECT 문장의 WHERE 절에서 조건을 체크하는 변수로 사용한다.
```SQL
CURSOR 커서명 [(매개변수1,매개변수2,...)]
IS
SELECT 문장;
```
2. 커서 열기
```SQL
OPEN 커서명 [(매개변수1,매개변수2,...)];
```
3. 패치 단계에서 커서 사용
```SQL
LOOP
  FETCH 커서명 INTO 변수1, 변수2, ...;
  EXIT WHEN 커서명%NOTFOUND;
END LOOP;
```
4. 커서 닫기
```SQL
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

```SQL
--- STU090 인 홍길동90 학생을 출력
DECLARE
    o_stu_id students_tbl.stu_id%type;
    o_stu_name students_tbl.stu_name%type;
    -- 커서 선언
    CURSOR cur_stu (c_stu_id students_tbl.stu_id%type, c_stu_name students_tbl.stu_name%type)
    IS
    SELECT stu_id, stu_name FROM students_tbl
    WHERE stu_id = c_stu_id AND stu_name = c_stu_name
    ;
BEGIN
    -- 커서 열기
    OPEN cur_stu ('STU090','홍길동90');
    -- FECTH 하기
    FETCH cur_stu INTO o_stu_id, o_stu_name;
    DBMS_OUTPUT.PUT_LINE(o_stu_id);
    DBMS_OUTPUT.PUT_LINE(o_stu_name);
    CLOSE cur_stu;
    -- 커서 닫기
    CLOSE cur_stu;
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
    CURSOR cur_stu  
    IS
    SELECT stu_id, stu_name FROM students_tbl;
BEGIN
    FOR rec_stu IN cur_stu
    LOOP
        DBMS_OUTPUT.PUT_LINE(rec_stu.stu_id);
        DBMS_OUTPUT.PUT_LINE(rec_stu.stu_name);
    END LOOP;
END;
```

#### 선언 없는 커서와 FOR문
```sql
-- 커서 없는 커서와 FOR문
DECLARE
BEGIN
    FOR rec_stu IN (SELECT stu_id, stu_name FROM students_tbl)
    LOOP
        DBMS_OUTPUT.PUT_LINE(rec_stu.stu_id);
        DBMS_OUTPUT.PUT_LINE(rec_stu.stu_name);
    END LOOP;
END;
```

#### 커서 변수
변수의 특징을 가진 커서 변수가 있다.
`CURSOR 커서명 IS ...`는 명시적 커서이다. 엄밀히 말하면 변수가 아니라 상수다.

1. 커서 변수 선언
```SQL
-- 강한 타입
TYPE 커서_타입명 IS REF CURSOR [RETURN 반환 타입];
커서_변수명 커서_타입명;
```
```SQL
-- 강한 타입 예시
TYPE type_cur_stu IS REF CURSOR RETURN students_tbl%ROWTYPE;
vcur_stu type_cur_stu;
```
```SQL
-- 약한 타입
TYPE 커서_타입명 IS REF CURSOR;
커서_변수명 커서_타입명;
```
```SQL
-- 약한타입 예시
TYPE type_cur_stu IS REF CURSOR;
vcur_stu type_cur_stu;
```
```SQL
-- 오라클 내장형 커서 타입 사용
커서_변수명 SYS_REFCURSOR;
```

2. 커서 정의 및 오픈
```SQL
OPEN 커서 변수명 FOR select문;
```

3. FETCH
```SQL
FETCH 커서_변수명 INTO 변수1, 변수2, 변수3;
FETCH 커서_변수명 INTO 레코드명;
```

예시
```sql
DECLARE
    vc_stu_name students_tbl.stu_name%type;
    -- 커서 변수 선언
    curvar_stu SYS_REFCURSOR;
BEGIN
    -- 커서 변수 정의 및 오픈
    OPEN curvar_stu FOR
    SELECT stu_name FROM students_Tbl;
    -- 커서 FETCH
    LOOP
        FETCH curvar_stu INTO vc_stu_name;
        EXIT WHEN curvar_stu%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(vc_stu_name);
    END LOOP;
END;
```

```sql
DECLARE
    -- 레코드 생성
    rec_stu students_tbl%ROWTYPE;
    -- 커서 변수
    cur_stu SYS_REFCURSOR;
BEGIN
    -- 커서변수 정의 및 오픈
    OPEN cur_stu FOR
    SELECT * FROM students_tbl;

    -- 커서 변수를 fecth
    -- 레코드로 row를 받아서 원하는 컬럼 출력
    LOOP
        FETCH cur_stu INTO rec_stu;
        EXIT WHEN cur_stu%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(rec_stu.stu_id);
        DBMS_OUTPUT.PUT_LINE(rec_stu.stu_name);
    END LOOP;
END;
```

프로시저 매개변수로 사용 예시
```sql
-- 학생 아이디와 이름 결과를 출력
-- 프로시저 매개변수로 커서 사용하기
-- 프로시저 : 커서변수를 인자로 받아서, 학생 테이블을 반환한다.
DECLARE
    -- 출력에 사용할 레코드 선언
    rec_arg students_tbl%ROWTYPE;
    -- 매개변수로 쓸 커서변수 선언
    cur_arg SYS_REFCURSOR;

    -- 프로시저 생성
    PROCEDURE get_students( pcur_val IN OUT SYS_REFCURSOR )
    IS
        pcur_temp SYS_REFCURSOR;
    BEGIN
        OPEN pcur_temp FOR
        SELECT * FROM students_tbl;
        pcur_val := pcur_temp;
    END;
BEGIN
    -- 프로시저 호출, 커서를 인자로 전달
    get_students(cur_arg);
    -- 커서 FETCH
    LOOP
        FETCH cur_arg INTO rec_arg;
        EXIT WHEN cur_arg%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(rec_arg.stu_id);
        DBMS_OUTPUT.PUT_LINE(rec_arg.stu_name);
    END LOOP;
END;

```

## 레코드
레코드는 여러 개의 값을 가질 수 있다. 한 개의 ROW만 가질 수 있다.

#### 사용자 정의형 레코드
```sql
DECLARE
    -- 사용자 정의 레코드 타입 선언
    TYPE type_rec_stu IS RECORD (
        stu_id      students_tbl.stu_id%type,
        stu_name    students_tbl.stu_name%type
    );
    -- 같은 타입 레코드 변수들 선언
    rec_stu type_rec_stu;
    rec_stu2 type_rec_stu;
BEGIN
    -- 레코드에 값 할당
    rec_stu.stu_id := 'STU111';
    rec_stu.stu_name := '제인도우';

    -- 같은 타입에 할당
    rec_stu2 := rec_stu;
    -- 할당 후 변경
    rec_stu.stu_name := '맨';

    DBMS_OUTPUT.PUT_LINE(rec_stu.stu_name); -- 맨
    DBMS_OUTPUT.PUT_LINE(rec_stu2.stu_name); -- 제인도우
END;
```

#### 테이블형 레코드
기존에 존재하는 테이블의 값을 기초로 레코드 타입을 사용. 그리고 레코드를 만들어 사용.
```SQL
DECLARE
    -- students 테이블형 레코드 선언
    rec_stu students_tbl%ROWTYPE;
BEGIN
    rec_stu.stu_name := 'jane';
    DBMS_OUTPUT.PUT_LINE(rec_stu.stu_name);
END;
```
#### 커서형 레코드
커서를 레코드 변수로 받는 것을 커서형 레코드라고 한다.
```SQL
DECLARE
    -- 커서 선언
    CURSOR cur_stu IS
    SELECT * FROM students_tbl;
    -- 커서형 레코드
    rec_stu cur_stu%ROWTYPE;
BEGIN
    -- 커서 오픈
    OPEN cur_stu;
    -- 커서 fetch
    LOOP
        FETCH cur_stu INTO rec_stu;
        EXIT WHEN cur_stu%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(rec_stu.stu_name);
    END LOOP;
    -- 커서 닫기
    CLOSE cur_stu;
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
당연하지만, 에러가 발생한 프로시저에서는 해당 프로시저 진행은 멈춘다.

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

## 동적 SQL
실행할 때마다 SQL 문장이 달라질 필요가 있을 때 사용한다. 예시로 where 조건에서 많이 쓰인다. 조건 갯수가 달라질 경우 사용.
1. 컴파일 시에 SQL 문장이 확정되지 않는 경우
2. PL/SQL 블록 상에서 DDL문을 실행해야 할 경우
PL/SQL문에서 DDL문을 실행해야 하는 상황 자체가 거의 없긴 하지만, TRUNCATE문은 종종 사용하기도 한다.
3. PL/SQL 블록 상에서 ALTER SYSTEM/SESSION 명령어를 실행해야 할 경우

#### NDS(Native Dynamic SQL)
원시동적 SQL.
```SQL
EXECUTE IMMEDIATE SQL문_문자열
[ INTO OUT변수1, OUT변수2 ]
[ USING [IN | OUT | IN OUT] 매개변수1,
  [IN | OUT | IN OUT] 매개변수2, ...
]
;
```
출력 값은 INTO에, WHERE 조건 등에 들어가는 각종 비교 값은 USING에 기술.
