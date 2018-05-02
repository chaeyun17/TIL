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
