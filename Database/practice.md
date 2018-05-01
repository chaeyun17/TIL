# 실습

## 테이블
### students
- stu_id
- stu_name
- stu_email
- stu_age
- stu_addr

### subject
- sub_id
- sub_name

### professors
- pro_id
- pro_name
- pro_depart
- pro_phone

### setexams
- set_id
- pro_id
- sub_id
- exam_level
- set_date

### exams
- stu_id
- set_id
- exam_score
- exam_date

## 문제
### Q1. 지역 별 학생 수는?
```SQL
/* 지역별 학생 수는? */
SELECT stu_addr, COUNT(*)
FROM students
GROUP BY stu_addr;
```
### Q2. 학생 별 시험 횟수는?
```SQL
SELECT T1.stu_name, COUNT(T1.stu_id)
FROM students T1, exam T2
WHERE T1.stu_id = T2.stu_id
GROUP BY T1.stu_id, T1.stu_name;
```
### Q3. 학생 별 총점은?
```sql
SELECT T1.stu_name, SUM(T2.score)
FROM students T1, exam T2
WHERE T1.stu_id = T2.stu_id
GROUP BY T2.stu_id, T1.stu_name;
```
### Q4. 지역 별 학생들의 시험 총점과 평균을 구하세요.

```sql
SELECT T1.stu_addr, SUM(T2.score), AVG(T2.score)
FROM students T1, exam T2
WHERE T1.stu_id = T2.stu_id
GROUP BY T1.stu_addr;
```

### Q5. 김대성 교수가 낸 시험문제를 둘리는 몇번이나 쳤는가?
```SQL
-- Q5. 김대성 교수가 낸 시험문제를 둘리는 몇번이나 쳤는가?
SELECT T4.stu_name, T1.pro_name ,COUNT(T4.stu_id)
FROM professors T1, setExams T2, exams T3, students T4
WHERE T1.pro_name = '김대성'
AND T1.pro_id = T2.pro_id(+)
AND T2.set_id = T3.set_id(+)
AND T3.stu_id = T4.stu_id(+)
AND T4.stu_name = '둘리'
GROUP BY T4.stu_id,T4.stu_name, T1.pro_name
;
```

### Q6. 홍길동 학생이 신찬섭 교수가 낸 시험의 합계와 평균은?
```sql
--Q6. 신찬섭 교수가 낸 시험에서 둘리 학생의 합계와 평균은?
SELECT T1.stu_name, SUM(T2.exam_score), AVG(T2.exam_score)
FROM students T1, exams T2, setExams T3, professors T4
WHERE T1.stu_id = T2.stu_id(+)
AND T2.set_id = T3.set_id(+)
AND T3.pro_id = T4.pro_id(+)
AND T4.pro_name = '신찬섭'
AND T1.STU_name = '둘리'
GROUP BY T1.stu_name;
```
### Q7. 시험 안 친 학생 수는?
```sql
--Q7. 시험 안 친 학생 수는?
INSERT INTO students VALUES ('STU006', '박민지', 'minpark@duam.net', 22, '평양');

SELECT COUNT(*)
FROM students T1
WHERE NOT EXISTS (
    SELECT 1
    FROM exams T2
    WHERE T1.stu_id = T2.stu_id
);

SELECT COUNT(*)
FROM students T1, exams T2
WHERE T1.stu_id = T2.stu_id(+)
AND T2.stu_id IS NULL;
```sql
### Q8. 교수를 찾아주세요. 학생들의 평균이 가장 높은
```
-- Q8. 교수를 찾아주세요. 학생들의 평균이 가장 높은.
SELECT ROWNUM, pro_name, aa
FROM
(
    SELECT T1.pro_id, T1.pro_name, AVG(T3.exam_score) as aa
    FROM professors T1, setExams T2, exams T3
    WHERE T1.pro_id = T2.pro_id
    AND T2.set_id = T3.set_id
    GROUP BY T1.pro_id, T1.pro_name
    ORDER BY AVG(T3.exam_score) DESC
)
WHERE ROWNUM=1;

select * from
(
    SELECT ROWNUM as rn, pro_name, aa
    FROM
        (
            SELECT T1.pro_id, T1.pro_name, AVG(T3.exam_score) as aa
            FROM professors T1, setExams T2, exams T3
            WHERE T1.pro_id = T2.pro_id
            AND T2.set_id = T3.set_id
            GROUP BY T1.pro_id, T1.pro_name
            ORDER BY AVG(T3.exam_score) DESC
        )
)
WHERE rn = 2
;
```
### Q9. 시험난이도가 A인데도 불구하고 평균이 80점 이상인 시험을 출제한 교수
```SQL
-- Q9. 시험난이도가 A인데도 불구하고 평균이 80점 이상인 시험을 출제한 교수.
SELECT * FROM(
    SELECT  t1.pro_id,  t1.pro_name, AVG(t3.exam_score) AS 평균
    FROM professors t1, setExams t2, exams t3
    WHERE t1.pro_id = t2.pro_id
    AND T2.exam_level = 'A'
    AND t2.set_id = t3.set_id
    GROUP BY t1.pro_id, t1.pro_name
)
WHERE 평균 >= 60
;
```
### Q10. 평균점수가 가장 낮은 과목들과 출제교수
```SQL
-- Q10. 평균점수가 가장 낮은 과목(들)과 출제교수.
SELECT ROWNUM, sub_name, 평균, PRO_NAME FROM
(
SELECT t1.set_id, t4.sub_name, AVG(t1.EXAM_SCORE) AS 평균, t3.pro_name
FROM exams t1, setExams t2, professors t3, subject t4
WHERE t1.set_id = t2.set_id
AND t2.pro_id = t3.pro_id
AND t2.sub_id = t4.sub_id
GROUP BY t1.set_id, t3.pro_name, t4.sub_name
ORDER BY AVG(t1.EXAM_SCORE) ASC
) WHERE ROWNUM = 1
;
```
### Q11. 난이도가 가장 낮은 시험들의 과목별 총점과 평균
```SQL
-- Q11. 난이도가 가장 낮은 시험들의 과목별 총점과 평균.
SELECT t2.set_id, t1.exam_level, SUM(exam_score), AVG(exam_score)
FROM setExams t1, exams t2
WHERE t1.set_id = t2.set_id
GROUP BY t2.set_id, t1.exam_level
ORDER BY exam_level DESC
;
```
### Q12.평균점수가 가장 높은 학생의 시험명과 점수
```SQL
-- Q12. 평균점수가 가장 높은 학생의 시험명과 점수
SELECT t5.*, t6.set_id, t8.sub_name, t6.exam_score FROM
    (
    SELECT STU_ID, STU_NAME, avgg
    FROM
    (
    SELECT t2.stu_id, t1.stu_name, ROUND(AVG(t2.exam_score)) AS avgg
    FROM students T1, exams t2, setExams t3, subject t4
    WHERE t1.stu_id = t2.stu_id
    AND t2.set_id = t3.set_id
    AND t3.sub_id = t4.sub_id
    GROUP BY t2.stu_id, t1.stu_name
    ORDER BY AVG(t2.exam_score) DESC
    )
    WHERE ROWNUM = 1
    ) t5, exams t6, setExams t7, subject t8
WHERE t5.stu_id = t6.stu_id
AND t6.set_id = t7.set_id
AND t7.sub_id = t8.sub_id
;
-- 뷰로 풀기
CREATE OR REPLACE VIEW worstStu AS
    SELECT STU_ID, STU_NAME, avgg
    FROM
    (
    SELECT t2.stu_id, t1.stu_name, ROUND(AVG(t2.exam_score)) AS avgg
    FROM students T1, exams t2, setExams t3, subject t4
    WHERE t1.stu_id = t2.stu_id
    AND t2.set_id = t3.set_id
    AND t3.sub_id = t4.sub_id
    GROUP BY t2.stu_id, t1.stu_name
    ORDER BY AVG(t2.exam_score) DESC
    )
    WHERE ROWNUM = 1
;
SELECT w1.*, t3.sub_name, t1.exam_score
FROM worststu w1, exams T1, setExams T2, subject T3
WHERE w1.stu_id = t1.stu_id
AND t1.set_id = t2.set_id
AND t2.sub_id = t3.sub_id
;
DROP VIEW worststu;
```
### Q13. 시험문제를 2회 이상 출제한 교수가 시험의 평균과 합계

```sql
-- Q13. 시험문제를 2회 이상 출제한 교수가 시험의 평균과 합계
-- 시험문제를 2회 이상 출제한 교수
-- 그리고 그 교수의 시험 평균과 합계
CREATE OR REPLACE VIEW manyProf AS
SELECT * FROM
(
SELECT t2.pro_id, t1.pro_name, COUNT(t2.set_id)
FROM professors t1, setExams t2
WHERE t1.pro_id = t2.pro_id
GROUP BY t2.pro_id, t1.pro_name
)
;
SELECT * FROM manyProf;

SELECT M1.pro_id, M1.pro_name, SUM(T2.exam_score), AVG(T2.exam_score)
FROM manyProf M1, setExams T1, exams T2
WHERE M1.pro_id = T1.pro_id
AND T1.set_id = T2.set_id
GROUP BY M1.pro_id, M1.pro_name
;

DROP VIEW manyProf;
```


### Q. 가장 많이 거주하고 있는 학생의 지역에 살고 있는 교수명
```SQL
-- 동등 조인
SELECT * FROM
(
    SELECT stu_addr, RANK() OVER(ORDER BY COUNT(stu_addr) DESC) AS RNK
    FROM students
    GROUP BY stu_addr
) T1, PROFESSORS T2
WHERE T1.stu_addr = T2.pro_addr
AND T1.RNK = 1
;

-- IN 조건문 사용
SELECT * FROM PROFESSORS
WHERE pro_addr IN
(
    SELECT STU_ADDR FROM (
        SELECT stu_addr, RANK() OVER(ORDER BY COUNT(stu_addr) DESC) AS RNK
        FROM students
        GROUP BY stu_addr
    ) WHERE RNK = 1
)
;
```

### 4월에 시험 없었던 날짜
```SQL
SELECT *
FROM
(
    SELECT TO_CHAR(TO_DATE('180401') + LEVEL-1, 'YYMMDD') AS dates
    FROM DUAL
    CONNECT BY LEVEL < 31
) T1
,(
    SELECT TO_CHAR(exam_date,'YYMMDD') AS exam_date
    FROM exams
    WHERE TO_CHAR(exam_date, 'YYMM') = '1804'
    GROUP BY exam_date
) T2
WHERE T1.dates = T2.exam_date(+)
AND T2.exam_date IS NULL
ORDER BY T1.dates ASC
;
-- EXISTS 사용
SELECT *
FROM
(
    SELECT TO_CHAR(TO_DATE('180401') + LEVEL-1, 'YYMMDD') AS dates
    FROM DUAL
    CONNECT BY LEVEL < 31
) T1
WHERE NOT EXISTS
(
    SELECT * FROM
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

### Q. 2018년 4월 중 시험이 없었던 날 출석한 학생
```SQL
SELECT T4.notExDate, T5.att_date, T6.stu_id, T6.stu_name FROM
(
    SELECT TO_DATE(t1.dates) AS notExDate
    FROM
    (
        SELECT TO_CHAR(TO_DATE('180401') + LEVEL-1, 'YYMMDD') AS dates
        FROM DUAL
        CONNECT BY LEVEL < 31
    ) T1
    ,(
        SELECT TO_CHAR(exam_date,'YYMMDD') AS exam_date
        FROM exams
        WHERE TO_CHAR(exam_date, 'YYMM') = '1804'
        GROUP BY exam_date
    ) T2
    WHERE T1.dates = T2.exam_date(+)
    AND T2.exam_date IS NULL
    ORDER BY T1.dates ASC
) T4, Attendance T5, students T6
WHERE T4.notExDate = T5.att_date
AND T5.stu_id = T6.stu_id
;
```

### Q. 시험을 치지 않은 학생들과 같은 지역에 사는 교수들의 출제 과목
```SQL
-- 시험을 치지 않은 학생의 지역
-- 그 지역에 있는 교수
-- 그 교수들이 출제한 과목들

SELECT t4.pro_id, t5.sub_id, t6.sub_name
FROM
(
    SELECT t3.pro_id
    FROM professors t3
    WHERE pro_addr IN
    (
        SELECT t1.stu_addr
        FROM students t1, exams t2
        WHERE T1.stu_id = t2.stu_id(+)
        AND t2.score IS NULL
        GROUP BY t1.stu_addr
    )
) t4,  SetExams t5, subjects t6
WHERE t4.pro_id = t5.pro_id
AND t5.sub_id = t6.SUB_CODE
;
```

### Q. 과목에 상관없이 80점 이상 받은 학생들이 출석한 날짜리스트
```SQL
-- 과목 중에 하나라도 80점 이상 받은 학생들
-- 그 학생들이 출석날짜
-- 시험을 쳤지만, 출석을 안 한 학생은? => LEFT JOIN

SELECT t1.stu_id, t2.att_date
FROM
(
    SELECT stu_id FROM exams
    WHERE score >= 80
    GROUP by stu_id
) T1, Attendance T2
WHERE t1.stu_id = t2.stu_id(+)
ORDER BY t1.stu_id asc, t2.att_date asc
;
```
