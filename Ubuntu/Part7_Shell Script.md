# 쉘 스크립트
- 쉘은 사용자가 입력한 명령을 해석해 커널에게 전달하거나, 커널의 처리 결과를 사용자에게 전달하는 역할을 한다.
- 우분투에서 기본적으로 사용하는 쉘은 bash

## 문법
### 변수 입출력
- 변수에 값을 대입할 때, 대입연산자`=` 양 옆에 공백이 없어야 한다. ex) `num1=100`
- 문자열을 나타내는 기호: 단따음표, 역슬래시(`\`);
- 변수를 나타내는 기호: 쌍따음표
- 값 입력: `read 변수명`

### 수식
- 역따음표로 수식을 묶어야한다. ex) echo = `expr $num1 + 200\`
- 수식을 사용할 때는 `expr` 키워드를 사용해야 한다.
- 괄호 앞에 역슬래시를 붙여아하며, `*`도 마찬가지다.
- '+,-' 같은 연산자 양 옆에 공백을 넣어야 한다.

### 파라미터 변수
- C언어에서 매개변수라고도 볼 수 있다.
- $0 : 첫번째 파라미터(주로 명령어)
- $1 : 두번째 파라미터(주로 명령어 옵션)
- $* : 모든 파라미터 표시

### if 문
- if 뒤에 공백이 있어야 한다.
```shell
#!/bin/bash
if [ "lee" = "yun" ]
then
  echo "it's true."
fi
exit 0
```

### if-else 문
```shell
#!/bin/bash
if ["yun" != "lee"]
then
  echo "it's true"
else
  echo "it's false"
fi
exit 0
```

### 비교연산자
[Shell Basic Operators, shell tutorials](https://www.tutorialspoint.com/unix/unix-basic-operators.htm)
#### 문자열 비교
- "문자열1"="문자열2"
- "문자열1"!="문자열2"
- -n "문자열" : 문자열이 Null이 아니면 참
- -z "문자열" : 문자열이 Null이면 참
#### 산술 문자열 비교
- 수식1 -eq 수식2 : 두 수식이 같으면 참(equal)
- 수식1 -ne 수식2 : 두 수식이 같지 않으면 참(not equal)
- 수식1 -gt 수식2 : 수식1이 크다면 참(greater than)
- 수식1 -ge 수식2 : 수식1이 크거나 같으면 참(greater than or equal)
- 수식1 -lt 수식2 : 수식1이 작으면 참(less than)
- 수식1 -le 수식2 : 수식1이 작거나 같으면 참(less than or equal)
- !수식           : 수식이 거짓이라면 참
#### 비교 연산자
- ! : invert `[ !false ]`
- -o : logical OR `[ $a -lt 20 -0 $b -gt 100] is true`
- -a : logical AND `[ $a -lt 20 -a $b -gt 100] is true`
#### 파일 관련 조건
- -f 파일이름 : 파일이 일반 파일이면 참
```Shell
#!/bin/bash
fname=/lib/systemd/system/cron.service
if [ -f $fname ]
then
  head -5 $fname
else
  echo "cron was not installed"
fi
exit 0
```

### case 문
```Shell
#!/bin/bash
case "$1" in
  start)
    echo "start!";;
  stop)
    echo "stop!";;
  restart)
    echo "restart";;
  *)
    echo "nothing";;
esac
exit 0
```

### AND / OR
- and : && 또는 -a
  - -a는 [] 문 안에서만 사용가능
- or : || 또는 -o
  - -o는 [] 문 안에서만 사용가능

### for~in 문
```Shell
#!/bin/bash
result=0
for i in 1 2 3 4 5 6 7 8 9 10
do
  result=`expr $i+$result`
done
echo "1부터 10까지의 합: "$result
exit 0
```

### while 문
```Shell
#!/bin/bash
while [ 1 ]
do
  echo "우분투 16.04 LTS"
done
exit 0
```

### until 문
- while 과 비슷하지만, 조건식이 역이다. 조건식이 참이 될까지 반복한다. 즉, 조건식이 거짓일 경우 반복문을 실행한다.
```Shell
#!/bin/bash
i=1
until [ $i -gt 10 ]
do
  echo $i
  i=`expr $i + 1`
done
```

### break, coninue, exit
- break: `break;;` 을 사용. 반복문을 부수고 빠져나온다.
- coninue: `continue;;`. 조건문으로 돌아간다. 즉, 반복문의 시작지점으로 돌아간다.
- exit: `exit 0;;`. 프로그램(함수)를 종료한다. 0을 반환할 경우, 성공적으로 수행완료를 뜻한다. 0이외의 값은 실행 오류를 뜻한다.

### 사용자 정의 함수
- c 언어 함수 문법이 비슷하다.
```Shell
#!/bin/bash
printGreeting(){
  echo "Hello, yun!"
  return
}
printGreeting
exit 0
```

### 함수의 파라미터 사용
- $1, $2, ... 로 매개변수를 전달한다.
- `$?`: 가장 최근의 반환값
```Shell
#!/bin/bash
addtwo(){
  return 'expr $1 + $2'
}
addtwo 10 20
echo "result="$?
```

### eval
문자열을 명령문으로 실행한다
```Shell
#!/bin/bash
str="ls -l eval.sh"
echo $str # 문자열 값 그대로 출력
eval $str # 명령어 실행
```

### export
외부 변수. 선언한 변수를 다른 프로그램에서도 사용 가능하다.

- export1.sh
```Shell
#!/bin/bash
var1="local value"
export var2="export value"
sh export2.#!/bin/sh
exit 0
```

- export2.sh
```Shell
#!/bin/bash
echo $var1 # 출력 없음
echo $var2 # export value 출력
exit 0
```

### printf
- C 언어와 비슷하게 형식을 지정해서 출력 가능하다.
- $var2: 문자열 사이에 공백이 있으면 쌍따음표로 묶어야 한다.
```Shell
#!/bin/bash
var1=100.5
var2="hello yun!"
printf "5.2f \n\n \t %s \n" $var1 "$var2"
exit
```

### set 과 $(명령)
- $(명령): 리눅스의 명령
- set : 결과를 파라미터로 사용.
```Shell
#!/bin/bash
printf "$(date) \n"
set $(date)
printf "Today is %s \n" $4
exit
```

### shift
- 파라미터 면수를 왼쪽으로 한 단계씩 이동시킨다.
- $1 -> 제거 , $2 -> $1 , $3 -> $2 , ...
```Shell
#!/bin/bash
printABC(){
  str=""
  unitl [ "$1" = "" ]
  do
    str="$str $1"
  done
  echo $str
}
printABC AAA BBB CCC
exit 0
```
