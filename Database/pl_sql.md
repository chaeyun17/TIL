# PL/SQL
## 익명 블록
```SQL
DECLARE
  선언부
BEGIN
  실행부
END;
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
