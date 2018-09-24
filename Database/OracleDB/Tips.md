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
