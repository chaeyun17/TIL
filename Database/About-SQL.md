# SQL

## 정의
SQL은 Structed Query Language 입니다. 프로그래밍과 관계형 데이터베이스 관리 시스템(RDBMS)에서 데이터를 다루기 위해 설계된 도메인 언어입니다. 또는 관계형 데이터 스트림 관리 시스템(RDSMS)에서 스트림 프로세싱을 위한 언어이기도 합니다.
구조화된 데이터를 다루는데 유용합니다. 예를 들자면, 엔티티들과 변수들 사이의 관계를 통합하는 데이터들이 있습니다.

SQL은 옛날의 read-write API들인 ISAM 또는 VSAM와 비교해서 두가지 장점이 있습니다. 첫번째로, 한 명령어로 많은 레코드들을 한번에 접근할 수 있는 개념을 도입했습니다. 두번쨰로, 레코드에 접근하는 방법을 지정할 필요가 없습니다. 예를 들어, 인데스를 사용해서 또는 인덱스 없이.

원래는 관계형 대수와 튜플 관계형 미적분에 기초하였습니다. SQL은 다양한 유형의 명령문으로 구성되어 있습니다. 비공식적으로 하위 언어로 분류 될 수 있습니다. a data query language(DQL), a data definition language(DDL), a data control language(DQL), a data definition language(DDL), a data control language(DCL) 그리고 a data manipulation language(DML). SQL 범위는 데이터 쿼리, 데이터 조작(insert, update, delete), 데이터 정의(스키마 생성과 수정), 데이터 접근 제어를 포함한다. 비록 SQL은 본질적으로 선언적인 언어(4GL)이지만, 절차적 요소들 또한 가지고 있습니다.

SQL은 Edgar F.Codd's 관계형 모델을 활용한 첫 사용 언어 중 하나였습니다. 이 모델은 그의 1970년 영향력 있는 논문인 "A Relational Model of Data for Large Shared Data Banks" 에서 나왔습니다. Codd가 묘사한 관계형 모델과는 완전히 같지는 않지만, 가장 널리 사용되는 데이터베이스 언어가 되었습니다.

SQL은 American National Standards Institude (ANSI) 에서 1986년에 표준화되었습니다. 그리고 International Organization for Standardization(ISO)에서는 1987년 표준화되었습니다. 그 이후로 표준은 더 많은 기능을 포함하도록 개정되었습니다. 표준이 이미 존재함에도 불구하고, 대부분의 SQL 코드는 다른 데이터베이스 시스템들에 이식되기 전에 최소한 몇 가지 변경이 필요합니다.

## 역사
SQL은 1970년대에 IBM의 Donald D. Chamberlin 와 Raymond F. Boyce 가 최초로 개발되었습니다. Edgar F.Codd의 관계형 모델에 대해 배운 뒤였습니다. 초기 버전은 SEQUEL(Structed English Query Languange)라고 불렀습니다. 이 언어는 데이터를 가공할 수 있고 획득 가능할 수있도록 설계되었습니다. IBM의 오리지널 관계형 데이터베이스 시스템인 System R에 저장된 데이터가 대상이었습니다. 이 시스템은 1970년대에 IBM San Jose Research Laboratory 의 한 그룹에서 개발한 것입니다.

Chamberlin 과 Boyce는 관계형 데이터베이스 언어에 대한 첫번째 시도는 Square이었습니다. 그러나 이것은 아래첨자 기호 때문에 사용하기 어려웠습니다. 1973년에 San Jose Research Laboratory로 옮긴 뒤에서야 그들은 SEQUEL에 대한 작업을 시작했습니다. 그 두문자 SEQUEL은 후에 SQL로 변경되었습니다. 왜냐하면 "SEQUEL"은 영국의 Hawker Siddeley Dynaimics Engineering Limited Company의 트레이드마크였기 때문입니다.

고객 테스트 사이트에서 SQL을 테스트하여 시스템의 유용성과 실용성을 확인한 후, IBM은 사용화 버전을 개발하기 시작했습니다. 이 버전은 System/38, SQL/DS, DB2를 포함한 IBM의 시스템 R 프로토타입을 기반했습니다.

1970년대에 Relation Software 회사(지금은 Oracle 회사)는 Codd, Chamberlin, Boyce에 의해 묘사된 개념들의 잠재력을 알아봤습니다.  그리고 그들만의 SQL 기반 RDBMS(관계형 데이터 베이스 관리 시스템)을 개발했습니다. 미 해군, 중앙 정보국 및 기타 미국 정부 기관에 판매하려는 열망이 있었습니다. 1979년 6월에, Relation Software 회사는 최초 상용 SQL 구현을 도입했습니다. 바로 VAX 컴퓨터들을 위한 Oracle V2(version 2)였습니다.

1986년에 ANSI와 ISO 표준화 그룹에서 공식적으로 "Database Language SQL" 언어 정의 표준을 채택하였습니다. 새로운 표준 보전들은 1989, 1992, 1996, 1999, 2003, 2006, 2008, 2011 그리고 최근인 2016년에 발표되었습니다.

## 참조
- https://en.wikipedia.org/wiki/SQL