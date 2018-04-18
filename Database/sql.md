# SQL

## 기본 명령어
### 테이블 생성
```
CREATE TABLE 테이블명
(
    컬럼1 dataType options,
    컬럼2 dataType options
);
```

### 추가
데이터 ROW 추가
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

### 조회
```
SELECT 칼럼1, 칼럼2 FROM 테이블명;
```

### 삭제
```
DELETE FROM 테이블명 WHERE 조건식;
```

### 갱신
```
UPDATE 테이블명 SET 칼럼1=데이터 WHERE 조건식;
```

### 롤백
커밋 전 데이터 되돌리기.  
객체 관련된 거는 되돌려지지 않음.
```
ROLLBACK;
```

## 커밋
데이터 확정.
```
COMMIT;
```

## 테이블 삭제
```
DROP TABEL 테이블명;
```

## 옵션
- NOT NULL : 값이 무조건 들어가야 한다.
- UNIQUE : 중복 금지
- PRIMARY KEY: 다른 데이터 ROW와 구분하기 위한 고유한 키

## LIKE
- 조건식이다. 문자열의 패턴을 검색할 때 사용.
- 이메일주소가 `@naver.com` 으로 끝나는 학생을 찾기
```
SELECT * FROM students WHERE stu_email LIKE '%@naver.com';
```

## IN
- 조건절에 명시한 값이 포함된 건을 반환. ANY와 비슷.
- 나이가 22,27세인 학생을 찾기
```
SELECT * FROM students WHERE stu_age IN (22,27);
```

## BETWEEN
- 범위에 해당하는 값을 찾을 때 사용한다.
- 크거나 같고 작거나 같은 값.
- 50점에서 80점까지의 학생 검색
```
SELECT * FROM exam WHERE scroe BETWEEN 50 AND 80;
```
- SUB001 과목에서 50점에서 80점인 학생을 조회
```
SELECT * FROM exam WHERE (score BETWEEN 50 AND 80) AND (sub_id='SUB001');
```

## IS (NOT) NULL
점수에 NULL이 들어간 데이터(ROW)를 반환함.
```
SELECT * FROM exam WHERE score IS NULL;
```

## 비교 조건식
1. ANY: OR와 같은 뜻이다.
```
SELECT * FROM exam WHERE score = ANY (55,70);
```
2. SOME

3. ALL


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

## Alias
별칭짓기. 테이블은 띄우고 바로 별칭을 적는다. 컬럼은 AS 키워드를 사용하고 그 다음에 별칭을 적는다.

## 집계 함수
### COUNT, SUM, AVG, MIN, MAX
- COUNT(): 횟수
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
