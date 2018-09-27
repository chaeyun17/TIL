# 팁 보관소

## 테이블의 컬럼명들을 알고 싶을 떄
```sql
SELECT table_name, column_name, data_type, data_length
FROM USER_TAB_COLUMNS
WHERE table_name = 'MYTABLE'
```
[출처](https://stackoverflow.com/questions/452464/how-can-i-get-column-names-from-a-table-in-oracle)

## SQL-DEV-TOOL 대소문자 변환 단축키
`ALT` + `'`(따음표)

## 오라클 접속 세션 수 변경
```sql
show parameter processes;
show parameter sessions;

alter system set processes = 150 scope = spfile;
alter system set sessions = 300 scope = spfile;
alter system set transactions = 330 scope = spfile;

shutdown immediate;

startup;

select name, value  
from v$parameter  
where name in ('processes', 'sessions', 'transactions');
```
- 출처: https://www.fatlemon.co.uk/2009/06/increasing-processes-sessions-and-transactions-in-oracle-xe/

## 시간 변경
SYSDATE는 OS 타이존을 따른다. OS 타임존을 변경하기 힘들다면 Database 타임존을 사용하면 된다. 아래 절차를 통해 데이터베이스 타임존을 바꾸고, CURRENT_DATE 또는 CURRENT_TIMESTAMP 사용을 하면 된다.
1. 시스템 관리자로 접속하여 아래 SQL문을 실행한다.
2. 실행
```sql
SELECT DBTIMEZONE FROM DUAL;
ALTER DATABASE SET TIME_ZONE='Asia/Seoul';
```
3. 데이터베이스 서버를 재부팅한다
4. `SELECT SESSIONTIMEZONE, CURRENT_TIMESTAMP FROM DUAL;` 로 확인.
5. `sysdate` 대신 `CURRENT_DATE` 또는 `CURRENT_TIMESTAMP`  사용.
