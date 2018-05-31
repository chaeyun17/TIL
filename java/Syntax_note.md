# Java 문법 학습 노트
윤성우 작가의 '열혈 JAVA 프로그래밍'을 참고

## 자료형(Data Type)

### 문자형
1. char: 2byte. 유니코드 문자.

### 정수형
1. byte: 1 byte (-2<sup>7</sup> ~ -2<sup>7</sup>-1 )
2. short: 2 byte
3. int: 4 byte
4. long: 8 byte

### 실수형
1. float: 4 byte
2. double: 4 byte

### Boolean
1. Boolean: 1 byte



## 음의 정수 표현법
- MSB(Most Significant Bit): 부호를 결정짓는 가장 왼쪽에 위치한 비트를 가리켜 MSB라고 한다.
MSB가 0 또는 1 일 때, 나머지 비트를 해석하는 방법이 각기 다르다.

### 설명
1. 정수를 이진수로 변환한다.
2. 2의 보수를 구한다. 1의 보수를 먼저 구하고, 거기에 +1을 하면 2의 보수를 쉽게 구할 수 있다.

### 예제
-5 를 이진수로 표현하기
1. 5를 2진수로 나타낸다.
	- `0000 0101`
2. 1의 보수를 구한다. 
	- 이진수를 반전시키면 된다.
	- `1111 1010`
3. +1을 하면 완성
	- `1111 1011`

	
## 실수의 표현법
1과 5사이의 정수는 유한하지만, 1과 5사이의 실수는 무한하다. 실수를 정확히 표현하는데 한계가 있다.
  
**IEEE 754** 표준을 사용한다.


## Switch 문
case 와 default는 label(레이블)이라고 부른다.
```java
switch(op){
case '1':
	//execute
	break;
case '2':
	//execute
	break;
default: 
	//execute
	break;
}
```

## Scanner 클래스
공백(white space)을 구분자로 여긴다.
- Scanner.next():  공백 구분자까지 잘라서, 입력한 값을 String으로 반환.
- Scanner.nextInt(): 공백 구분자까지 잘라서, 입력한 String을 int로 변환해서 반환.
- Scanner.nextLine(): 구분자 상관없이 모두 String으로 반환.


### nextInt() 사용 후, nextLine() 입력 불가 문제
숫자를 입력 후, 문자열 입력이 안되는 문제가 발생했다.   
Scanner.nextInt() 후, 개행문자가 버퍼에서 미처 비워지지 않았기 때문이다.  
Scanner.nextLine()을 통해서 개행문자를 비워주었다.  
또는  
Scanner.next() 를 사용하여 입력받는다. 이렇게하면 개행문자를 인식하고 정상적으로 새로 입력받을 수 있다.
```java
System.out.println("숫자1 입력: ");
int num1 = sc.nextInt();
System.out.println("숫자2 입력: ");
int num2 = sc.nextInt();
  
sc.nextLine() // 개행문자 비워주기
  
System.out.println("연산자 입력: ");
String op = sc.nextLine();
```


## 배열
배열이란 연관된 데이터를 하나의 변수에 그룹핑해서 관리하기 위한 방법입니다. 배열을 이용하면 하나의 변수에 여러 정보를 담을 수 있고, 반복문과 결합하면 많은 정보도 효율적으로 처리할 수 있습니다.

```java
int[] ary = new int[3];
```
### 자주 쓰는 것
- array.lenght : 포로퍼티. 배열길이
- array.clone() : 배열 복사. java.lang.object
### 참고
- [JAVA 자료구조, 생활코딩](https://opentutorials.org/module/1335/8677)
- [배열과 리스트 차이, 초보몽키의 개발공부로그](https://wayhome25.github.io/cs/2017/04/17/cs-18-1/)



## 리스트
```java
import java.util.Arraylist
ArrayList<Integer> arylist = new ArrayList<>();
```



## 클래스 Class
- **인스턴스 변수**: 프로그램상에서 유지하고 관리해야 할 데이터. Fields.멤버 변수라고도 부른다. 
- **인스턴스 메소드**: 데이터를 처리하고 조작하능 기능.  

### 인스턴스 Instance
객체라고도 부른다. 키워드 `new`를 사용하여 클래스 Car를 인스턴스화(Instantiation)한다.   
```java
Car mycar = new Car();
``` 
Car 클래스를 인스턴스화하여, 그 주소값을 참조변수 mycar에 저장하였다. 
 
### 생성자 Constructor
- 생성하는 인스턴스를 초기화를 한다.   
- `new` 키워드를 통해 생성할 때, 매개변수로 전달하면 인스턴스 변수를 초기화할 수 있다.  
- 매개변수를 전달하지 않는 Default 생성자도 만들 수 있다.  
- 메소드와 다른 점. 첫째는 클래스 이름과 동일해야 한다. 둘째는, 값을 봔환하지 않고 반환형도 표시하지 않는다.

### 이름 규칙
- 클래스 이름의 첫 문자는 대문자로 시작한다.
- Carmel Case. 둘 이상의 단어가 묶여서 하나의 이름을 이룰 때, 새로 시작하는 단어는 대문자로 한다. `class MyCar`
- 메소드와 변수 이름은 소문자로 시작하는 Carmel case로 한다. `void getModel()`
- 상수는 대문자로 한다. `final double PI = 3.14;`

### TIP
- 외부에서 인스턴스 변수를 직접 수정하면 좋지 않다. 인스턴스 변수는 private으로 하면 좋음.

```java
// Car 클래스
class Car{
	String color;
	int speed;
	
	public Car(String color, int speed){
		this.color = color;
		this.speed = speed;
	}
	public Car(){
	
	}
}
```
```java
// main 메소드
public static void main(){
	Car mycar = new Car("red", 200);
	Car whocar = new Car();
}
```



## 객체 지향 프로그래밍

### 특징
1. 캡슐화
2. 상속
3. 다형성

### 용어
- 익스텐더
- 임플리먼트
- 접근 제한자
- 시퀀스 다이어그램
- UML
- 클래스
- 객체
- 인스턴스
- 생성자

