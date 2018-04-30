# SQL

## DDL
데이터정의어. 데이터베이스 객체를 관리하는 언어이다. 데이터베이스 객체를 생성, 삭제, 변경한다.
### 테이블 생성
```
CREATE TABLE 테이블명
(
    컬럼1 dataType options,
    컬럼2 dataType options
);
```

### 테이블 삭제
```
DROP TABEL 테이블명;
```
### 테이블 수정
```
ALERT
```
### 테이블이나 클러스터의 데이터를 통채로 삭제
## 데이터 타입
### 문자 데이터 타입
- CHAR: 고정길이 문자. 최대 2000byte. 디폴트 값은 1byte
- VARCHAR2: 가변길이 문자. 최대 4000byte. 디폴트 값은 1byte
- NCHAR: 고정길이 유니코드 문자. 최대 2000byte. 디폴트 값은 1
- NVARCHAR2: 가변길이 유니코드 문자. 최대 4000byte. 디폴트 값은 1
- LONG: 최대 2GB 크기의 가변길이 문자형.
### 숫자 데이터 타입
- NUMBER(P.S): 가변숫자.

## 제약조건
- NOT NULL : 값이 무조건 들어가야 한다.
- UNIQUE : 중복 금지
- PRIMARY KEY: 다른 데이터 ROW와 구분하기 위한 고유한 키
---
## SQL 문장
### 조회 SELECT
```
SELECT 칼럼1, 칼럼2 FROM 테이블명;
```
### 추가 INSERT
```
INSERT INTO 테이블명
(
  칼럼1, 칼럼2
)
VALUES
(
  칼럼1데이터, 칼럼2데이터
);
```
### 삭제 DELETE
```
DELETE FROM 테이블명 WHERE 조건식;
```
### 갱신 UPDATE
```
UPDATE 테이블명 SET 칼럼1=데이터 WHERE 조건식;
```
### 롤백 ROLLBACK
트랜잭션 처리. 변경된 데이터를 적용하지 않고 이전으로 되돌림
객체 되돌리는 것은 불가
```
ROLLBACK;
```
### 커밋 COMMIT
트랜잭션 처리. 변경된 데이터를 최종 적용.
```
COMMIT;
```
### Alias
별칭짓기. 테이블은 띄우고 바로 별칭을 적는다. 컬럼은 AS 키워드를 사용하고 그 다음에 별칭을 적는다.
```
employee a          -- 테이블
원컬럼명 AS 컬럼별칭  -- 컬럼
```
### 외래키
```
CONSTRAINT 외래키명 FOREGIN KEY (컬러명,...)
REFERENCES 참조테이블(참조 테이블 컬럼명,...)
```

## MERGE문
MERSE문은 조건을 비교해서 테이블에 해당 조건에 맞는 데이터가 없으면 INSERT, 있으면 UPDATE를 수행하는 문장이다.
```sql
MERGE INTO 테이블명
  USING (update나 insert될 데이터 원천)
    ON (update될 조건)
WHEN MATCHED THEN
  UPDATE SET 컬럼1 = 값1, 값2, ...
  DELETE WHERE update_delete 조건
WHEN NOT MATCHED THEN
  INSERT (컬럼1, 컬럼2, ...) VALUES (값1, 값2, ...)
  WHERE insert 조건;
```
```SQL
MERGE INTO 주 테이블
  USING 서브 테이블
    ON (조건)
  WHEN MATCHED THEN
    UPDATE SET 컬럼1 = 값1 [, 컬럼2 = 값2 ...]
  WHEN NOT MATCHED THEN
    INSERT (컬럼1 [, 컬럼2 ...]) VALUES (값1 [, 값2 ...])
```
---

## 의사컬럼

Pseudo-column이란 테이블의 컬럼처럼 동작하지만 실제로 테이블에 저장되지는 않는 컬럼을 말한다. SELECT 문에서는 의사컬럼을 사용할 수 있지만, 의사컬럼 값을 INSERT, UPDATE, DELTE 할 수 없다.

### ROWNUM
쿼리에서 반환되는 각 로우들에 대한 수서 값을 나타내는 의사컬럼이다.
```
SELECT ROWNUM, stu_id
FROM students;
```
---
## 조건식
### 비교 조건식
1. ANY, SOME: OR와 같은 뜻이다. ANY 인자 중 하나라도 일치하는 ROW를 추출한다.
```
SELECT * FROM exam WHERE score = ANY (55,70);
```
```
SELECT * FROM exam WHERE score = 55
OR score = 70;
```
2. ALL: 모든 조건을 동시에 만족해야 한다. AND 조건으로 변환할 수 있다.

### NULL 조건식
NULL 여부를 체크한다. `IS NULL`과 `IS NOT NULL`이 있다.
점수에 NULL이 들어간 데이터(ROW)를 반환함.
```
SELECT * FROM exam WHERE score IS NULL;
```

### LIKE
- 조건식이다. 문자열의 패턴을 검색할 때 사용.
- 이메일주소가 `@naver.com` 으로 끝나는 학생을 찾기
```SQL
SELECT * FROM students WHERE stu_email LIKE '%@naver.com';
```

### IN
- 조건절에 명시한 값이 포함된 건을 반환. ANY와 비슷.
- SUB QUERY를 쓸 수 있다.
- 나이가 22,27세인 학생을 찾기
```SQL
SELECT * FROM students WHERE stu_age IN (22,27);
```


### BETWEEN
- 범위에 해당하는 값을 찾을 때 사용한다.
- 크거나 같고 작거나 같은 값.
- 50점에서 80점까지의 학생 검색
```SQL
SELECT * FROM exam WHERE scroe BETWEEN 50 AND 80;
```
- SUB001 과목에서 50점에서 80점인 학생을 조회
```SQL
SELECT * FROM exam WHERE (score BETWEEN 50 AND 80) AND (sub_id='SUB001');
```

### ORDER BY
ROW를 특정 컬럼을 기준으로 오름차순, 내림차순으로 정렬한다.
```SQL
SELECT stu_id, stu_name FROM students
ORDER BY stu_name ASC;
```
한 번 정렬하고 내부적으로 한 번 더 정렬이 필요하다면, 두 개의 인자 컬럼을 쓰면 된다.

### EXISTS
- 있니?
- 없니(NOT EXISTS)?  
- Sub query 가 인자로 온다.
- WHERE 절에서만 사용 가능.
- 주로 어떤 상황에서 사용될까?
    - 연관 없는 테이블 컬럼들끼리 비교할 떄

```SQL
-- Q. 시험을 출제하지 않은 교수는?
INSERT INTO professors(pro_id, pro_name, pro_depart, pro_phone)
  VALUES('PRO006','김김김','의예과','010-444-3134');

SELECT *
FROM professors T1
WHERE NOT EXISTS(
  SELECT 1
  FROM setExams T2
  WHERE T1.pro_id = T2.pro_id
)
;
```
```SQL
-- 4월에 시험을 안 친 학생
SELECT * FROM
(
    SELECT TO_CHAR(TO_DATE('180401') + LEVEL-1, 'YYMMDD') AS dates
    FROM DUAL
    CONNECT BY LEVEL < 31
) T1
WHERE NOT EXISTS
(
    SELECT 1 FROM
    (
        SELECT TO_CHAR(exam_date,'YYMMDD') AS exam_date
        FROM exams
        WHERE TO_CHAR(exam_date, 'YYMM') = '1804'
        GROUP BY exam_date
    ) T2
    WHERE T1.dates = T2.exam_date
)
ORDER BY T1.dates ASC
;
```

---


## ERD(Entity-Relationship Modeling)
개체-관계 모델링

### 학생 ERD 예시  
![핵생 ERD](https://www.researchgate.net/profile/Nur_Hafieza_Ismail/publication/258124336/figure/fig1/AS:340839306940416@1458273831194/The-ERD-for-students-data.png)
### 기호     
![ERD 기호](http://www.terms.co.kr/ERD.gif)
![ERD 기호2](http://www.conceptdraw.com/How-To-Guide/picture/Entity-Relationship-Diagram-Symbols.png)

## 뷰
뷰는 하나 이상의 테이블이나 다른 뷰의 데이터를 볼 수 있게 하는 데이터베이스 객체다. 실제 데이터는 뷰를 구성하는 테이블에 담겨 있지만 마치 테이블처럼 사용할 수 있다.

### 뷰 생성
첫번째 방법은 뷰를 자주 사용할 때 사용.
두번째 방법은 일시적으로 사용할 때 사용.
```
CREATE OR REPLACE VIEW [스키마.]뷰명 AS
SELECT 문장.
```
exam 테이블을 T1 뷰로 생성. 그리고 T1의 stu_id 만 row 출력.
```
SELECT t1.stu_id FROM exam t1;
```

---
## JOIN
### PL/SQL 방식
```SQL
/* PL/SQL */
-- 1. exam 테이블에 students 테이블을 stu_id를 기준으로 결합.
-- 2. 위 테이블에 더해서 subject 테이블을 sub_id를 기준으로 결합.
-- 3. stu_id 오름차순으로 정렬한 내에서, 점수를 오름차순으로 정렬.
SELECT T1.stu_id, T2.stu_name, T3.sub_name, T1.score
FROM exam T1, students T2, subject T3
WHERE T1.stu_id = T2.stu_id
AND T1.sub_id = T3.sub_id
ORDER BY T1.stu_id ASC, T1.score ASC;
```

### ANSI 방식
```SQL
/* ANSI */
-- 1. students 테이블과 exam 테이블을 join. 기준 테이블은 exam.
SELECT T2.stu_name, T1.score
FROM exam T1
JOIN students T2
ON T1.stu_id = T2.stu_id;
```
### 응용
```SQL
/*  조인한 테이블로 검색하기    */
-- 1. exam, students, subject 세 개를 조인한다.
-- 2. 해당 테이블에서 stu_id가 'STU001'만 출력한다
SELECT *
FROM
(
SELECT T1.stu_id, T2.stu_name, T3.sub_name, T1.score
FROM exam T1, students T2, subject T3
WHERE T1.stu_id = T2.stu_id
AND T1.sub_id = T3.sub_id
ORDER BY T1.stu_id ASC, T1.score ASC
) T4
WHERE T4.stu_id = 'STU001';
```
---
## 집계 함수
### COUNT, SUM, AVG, MIN, MAX
- COUNT(): 횟수
- SUM(): 합계
- AVG(): 평균
- MIN(): 최소값
- MAX(): 최대값

### GROUP BY
특정 그룹으로 묶어 데이터를 집계할 수 있다. GROUP BY 구문은 WHERE 와 ORDER BY절 사이에 위치한다.
```SQL
SELECT students.stu_name, students.stu_id, COUNT(*)
FROM students, exam
WHERE students.stu_id = exam.stu_id
GROUP BY students.stu_id, students.stu_name;
```
### HAVING
GROUP BY 절 다음에 위치해 GROUP BY한 결과를 대상으로 다시 필터를 거는 역할을 수행.

## LEFT JOIN
```sql
SELECT *
FROM students T1, exams T2
WHERE T1.stu_id = T2.stu_id(+);
```

## NVL
- not value
- NVL(칼럼명, 변경값)
- 반환: 변경값
- `NVL( string1, replace_with )`
- 예제  
```sql
-- Q. 한 번도 시험을 치지 않은 학생들 점수는?
SELECT T1.stu_id, T1.stu_name, NVL(T2.exam_score,0) AS 점수
FROM students T1, exams T2
WHERE T1.stu_id = T2.stu_id(+)
AND T2.stu_id IS NULL
;
```
- 참고: https://www.techonthenet.com/oracle/functions/nvl.php

## DECODE
- `DECODE(expr, search1, result1, search2, result2, ..., default)`
- expr과 search1를 비교해 두 값이 값이 같으면 result1을,   
같지 않으면 다시 search2와 비교해서 값이 같으면 result2를,  
최종적으로 같은 값이 없으면 default.


-----

## SQL 함수
### INITCAP(str)
첫 문자는 대문자로, 나머지는 소문자로 반환

### LOWER(str)
매개변수 str을 소문자로 반환

### UPPER(str)
매개변수 str을 대문자로 반환

### CONCAT(char1, char2)
매개변수 char1과 char2를 붙여서 반환. `||`와 같은 기능.

### SUBSTR(char, pos, len)
잘라올 대사 문자열인 char의 pos번째 문자부터 len길이만큼 잘라낸 결과를 반환하는 함수.
```sql
SELECT SUBSTR('ABCDEF', 3, 2) FORM DUAL;
-- 결과: 'CD'
```
### LTRIM(char, set), RTRIM(char, set)
LTRIM 함수는 매개변수로 들어온 char 문자열에서 set으로 지정된 문자열을 왼쪽 끝에서 제거한 후 나머지 문자열을 반환한다.

### RANK() OVER()
```sql
SELECT score ,RANK() OVER(order by score desc) FROM exams;
```
### DENSE_RANK() OVER()
RANK와 비슷하지만 같은 순위가 나오면 다음 순위가 한 번 건너뛰지 않고 매겨진다.

### ROW_NUMBER()
ROWNUM 의사 컬럼과 비슷한 기능을 하는데, 파티션으로 분할된 그룹별로 각 로우에 대한 순번을 반환하는 함수다.
```SQL
ROW_NUMBER() OVER(ORDER BY 컬럼명)
```

### CONNECT BY LEVEL
연속된 숫자를 사용하고 싶을 때
```SQL
SELECT TO_DATE('2018-01-01')+LEVEL-1
FROM DUAL
CONNECT BY LEVEL <= 365;
```

## 변환 함수
### TO_CHAR
숫자나 날짜를 문자로 변환해 주는 함수다. 매개변수로는 숫자나 날짜가 올 수 있고 반환 결과를 특정 형식에 맞게 출력할 수 있다.
```SQL
SELECT TO_CHAR(SYSDATE, 'YYYY-MM-DD') FROM DUAL;
```
### TO_DATE
문자를 날짜형으로 변환하는 함수.

-----

## 인라인 쿼리, 서브 쿼리
```
SELECT * FROM exam_score
WHERE score > (SELECT AVG(SCORE) FROM EXAMS);
```
- 단일 값만 조건문으로 사용가능하다.
- `EXISTS` 함수를 사용하면, 여러 ROW를 가지고 조건문으로 가능하다.
- `WEHRE IN` 도 여러 ROW를 인자를 가지고 비교할 수 있다.
