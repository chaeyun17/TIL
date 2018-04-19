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
```
