# 예제

## 1. 학생 추가. 새로운 학생 아이디 생성
```sql
create or replace PROCEDURE PROC_INSERT_STU(
    IN_STU_NAME IN VARCHAR2,
    IN_STU_ADDR IN VARCHAR2,
    IN_STU_TEL IN VARCHAR2,
    IN_STU_EMAIL IN VARCHAR2
)
IS
    NEW_STU_ID VARCHAR2(6);
    ROW_COUNT NUMBER;
BEGIN
    -- 총 로우수
    SELECT COUNT(*) INTO ROW_COUNT FROM STUDENTS;
    -- 새로운 STU_ID : 총 로우수 +1
    NEW_STU_ID := 'STU' || TRIM( TO_CHAR( ROW_COUNT+1, '000' ));

    INSERT INTO STUDENTS (
        STU_ID,
        STU_NAME,
        STU_ADDR,
        STU_TEL,
        STU_EMAIL
    )
    VALUES
    (
        NEW_STU_ID,
        IN_STU_NAME,
        IN_STU_ADDR,
        IN_STU_TEL,
        IN_STU_EMAIL
    );
END;
```

## 2. OUT 매개변수
```SQL
create or replace PROCEDURE PROC_MSG
(
    IN_MSG IN VARCHAR2,
    OUT_MSG OUT VARCHAR2
)
IS

BEGIN
    OUT_MSG := IN_MSG;
END;
```

##
