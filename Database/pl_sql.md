# PL/SQL

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
