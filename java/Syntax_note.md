# Java 문법 학습 노트
윤성우 작가의 '열혈 JAVA 프로그래밍'을 참고했습니다.

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



## 클래스 패스 Class Path
자바 가상머신이 클래스 파일을 찾는 경로이다. 자바 가상머신은 프로그램 실행 과정에서 클래스 파이를 찾을 때, '클래스 패스'를 통해 찾는다.  
다른 폴더에 저장된 클래스를 찾기 위해 Class Path 설정을 한다.  


```
set classpath=.;경로;
set classpath=.;D:\java\workspace\aaa;
```


## 패키지 Package
패키지는 클래스를 묶는 수단이다. 다른 클래스 또는 다른 클래스들과 구분할 수 있다.  
패키지 작명은 보통 URL 형식을 사용한다. 기업 또는 집단에서 만든 패키지를 사용하기 때문에, 충돌을 방지하기 위해 기업 또는 단체의 고유한 이름을 사용한다.

### 패키지 생성
최상단에 `package 패키지명`을 작성한다.
```java
package com.calculate;

public class Sum_num {
	public int sum_two(int A, int B) {
		return A+B;
	}
}
```

### 패키지 사용
최상단에 `import 패키지명.클래스명`을 작성한다.
```java
import com.calculate.Sum_num;

public class test01{
	static void main(){
		Sum_num s1 = new Sum_num();
		System.out.println(s1.sum_two(1,2)); // 결과: 3
	}
}
```

## 정보 은닉
인스턴스 변수를 private 으로 두고, 메소드를 통해 변수를 초기화하기를 권장함.
```java
public class Sum_num {
	int num1;
	int num2;

	void setNums(int num1, int num2) {
		if( num1 > 0 && num2 > 0) {
			this.num1 = num1;
			this.num2 = num2;
		}
	}
}
```

## 접근 수준 지시자 Access-level Modifiers
- 클래스의 정의: public , default
- 인스턴스 변수와 메소드 대상: public, protected, private, default

### 클래스 정의
- public: 어디서든 누구나. 위치에 상관없이 어디서든 해당 클래스의 인스턴스를 생성할 수 있다.
- default: 같은 패키지에서만. 동일 패키지로 묶인 클래스 내에서만 인스턴스 생성이 가능하다.

#### 제약사항
public 클래스 중심으로 소스파일을 형성.
- 하나의 소파일에 하나의 클래스만 public으로 선언 가능하다.
- 소스파일 이름과 public으로 선언된 클래스의 이름을 일치시킨다.

#### 예시
```java
/* Dog.class */
package pet;

public class Dog {

	public void bark() {
		System.out.println("왈왈왈");
	}
}
```

```java
/* Cat.class */
package pet;

class Cat {
	void bark() {
		System.out.println("야옹야옹");
	}
}
```

```java
package master;
import pet.*;

public class order {
	public static void main(String[] args) {
		Dog dog1 = new Dog();
		dog1.bark();
		// 왈왈왈

		Cat cat1 = new Cat();
		// error : The type Cat is not visible

	}
}
```

### 인스턴스 대상
변수일 경우 접근, 메소드일 경우 호출.
- private: 클래스 내부에서만 접근 가능.
- default: 동일 패키지 허용. 동일 패키지로 묶인 클래스 내에서만 접근 가능.
- protected: 동일 패키지 허용. 추가로 상속관계 클래스에서 허용.
- public: 어디서든 접근 가능.

#### 예시
TestPet 클래스와 Dog 클래스는 같은 패키지에 존재.  
order 클래스는 Dog와 다른 패키지. Dog public 메서드만 접근가능
```java
package pet;
public class Dog {

	private String color = "white";
	// 같은 클래스에서만 접근 가능

	public void bark() {
		System.out.println("왈왈왈");
	}

	void changeColor(String color) {
		this.color = color;
		System.out.println(this.color);
	}
}
```

```java
package pet;
public class TestPet {
	public static void main(String[] args) {
		Dog dogg = new Dog();
		dogg.changeColor("gray");
	}
}
```

```java
package master;
import pet.*;

public class order {
	public static void main(String[] args) {
		Dog dog1 = new Dog();
		dog1.bark();	// 왈왈왈
		dog1.changeColor("black");
		// error: The method changeColor(String) from the type Dog is not visible
	}
}
```



## 캡슐화
- 하나의 목적을 이루기 위해 관련 있는 모든 것을 하나의 클래스에 담아 두는 것.  
- 캡슐화는 문법적인 내용이 아니다. 클래스 안에 '무엇을 넣을까'에 대한 이론.
- 클래스들을 적절히 캡슐화시키면 프로그램이 간결해진다.
- 캡슐화를 잘하려면 다양한 상황에서의 연습과 경험이 필요하다.


## 클래스 변수
모든 인스턴스가 공유하는 변수. 메모리에 한 개만 존재. 어떤 인스턴스에도 속하지 않는다.
static으로 선언된 변수는 변수가 선언된 클래스의 모든 인스턴스가 공유하는 변수이다.



## 클래스 상속
- 클래스들의 '공통 기능'을 부모 클래스로 만든다. 코드 재활용이 목적으로 한다면, 무의미하게 복잡해기 때문이다.
- UML 클래스 다이어그램에서 상속은 실선으로 부모를 향한 화살표로 그린다.
- 부모클래스를 `super`라고 부른다.
- 상속은 `extends` 키워드를 사용한다. `class 자식클래스명 extends 부모클래스명`
- 자바는 단일 상속만 가능하다.
- 예시) 포유류는 개와 고양이. 둘다 젖먹이다. 포유류는 부모클래스로, 개와 고양이는 자식 클래스로 만들 수 있다.
- Tip) 상속된 관계가 있으면, 부모클래스가 바뀌면 자식 클래스가 제대로 동작하지 않을 수 있다. 그래서 인터페이스를 사용한다.

### 생성자 처리
부모 클래스의 생성자가 먼저 호출되고, 자식 클래스의 생성자가 호출된다.
```java
/* 생성자 처리 */
package com.chaeyun.Inheritance;
public class TestPet2 {
	public static void main(String[] args) {
		Mammal m = new Mammal();
		Dog d = new Dog();
		// 결과:
		// 포유류 생성자입니다.
		// 강아지 생성자입니다.
	}
}
```
부모클래스 생성자들 중 원하는 생성자를 호출하고 싶을 때는 `super(인자)`예약어를 사용하면 된다.
```java
public class Cat extends Mammal {
	// Constructor
	public Cat() {
		System.out.println("Cat 기본생성자");
	}
	public Cat(int i) {
		super(i);
		System.out.println("Cat(int i) 생성자" + i);
	}
}
```

## String 문자열
- 문자열 리티럴은 `문자열 상수 풀 String Constant Pool` 이라는 특별한 메모리 영역에 저장되며 Heap 메모리에 저장됨. 같은 문자열이면 재사용함.
- String.toString(): 실제 데이터 값. 해쉬코드 값. String 변수에는 주소값이 들어있기 때문에 이 메소드를 사용한다.
- '질문': 힙 영역과 스택영역. 어디에 데이터가 저장되나
- 문자열 연산
	```java
	// String 불변객체를 사용해서 문자 연산
	String concatedImmutable = "A" + "B" + "C" + "D" + "E";
	// StringBuilder 가변객체를 사용한 문자 연산
	StringBuilder sb = new StringBuilder();
	sb.append("A");
	sb.append("B");
	sb.append("C");
	sb.append("D");
	sb.append("E");
	String concatedMutable = sb.toString();
	```
	- `"A"+"B"` 문자열 리터럴 연산을 할 때마다 새로운 메모리 공간을 할당함. 메모리 할당 시간 소요.
	- `StringBuilder` 는 내부적으로 고정된 `char[1ㄴ6]` 메모리 버퍼를 가지고 있으며, 부족할 경우 그 때 메모리를 할당함. 연산이 자주 있을 경우, StringBuilder 가변객체가 더 빠름.

## 클래스 변수와 메소드 상속
- 클래스 변수는 final과 private을 제외하고 상속 가능
- Is-A 관계이다. 관계가 있는 것만 부모클래스가 될 수 있다.

### Is-A / Has-A 관계
- Is-A : 개는 포유류이다.
- Has-A: 차는 차고에 있다.


## 오버라이딩
- 상속관계는 부모 인스턴스이면서도, 자식 인스턴스이다.
	```java
	Child p = new Child();
	if(p instanceof Parent) System.out.println("부모");
	if(p instanceof Child) System.out.println("자식");

	// 부모
	// 자식
	```
- 메소드와 변수 호출 시, 참조변수의 형을 참조한다.
	```java
	Parent p = new Child();
	p.print();	// 부모입니다
	```
- 참조변수의 형 정보를 기준으로 대입의 가능성을 판단한다.
	```java
	Parent p = new Child();
	Child c = (Child) p;
	```
- 메소드 오버라이딩은 이름, 반환형, 매개변수가 같아야 한다.
- 메소드 오버라이딩이 되면, 참조변수의 형에 상관없이 오버라이딩 된 메소드가 호출된다.
	```java
	Parent p = new Child();
	p.print();	// 자식입니다
	```
- 클래스 내부에서 부모의 메소드를 호출하려면, `super.메소드명()`을 사용하면 된다.
	```java
	class Child extends Parent{
		int num = 2;
		void print() {
			super.print();
			System.out.println("자식입니다");
		}
	}
	```


## Instance Of
`instanceof` 연산자이다. **참조변수가 참조하는 인스턴스의 클래스** 나 **참조하는 인스턴스가 상속하는 클래스** 를 묻는 연산자이다.
```
if(ca instanceof cake)
```


## Object 클래스
모든 클래스는 object 클래스를 상속한다. 그렇기 때문에 모든 클래스의 주소값을 object 참조변수에 저장할 수 있다.



## final
final 클래스는 상속이 불가능하다. 최종 클래스.  
final 메소드는 오버라이딩 불가능.  
final 변수는 상수.  



## @Override
어노테이션(Annotations). 자바 컴파일러에게 메시지를 전달하는 목적의 메모이다.
매개변수 형과 반환형이 다르면 오버라이드가 되지 않고, 새로운 메소드가 생성된다. `@Override`를 사용하면 컴파일러가 이런 실수를 확인해줄 수 있다.


## 인터페이스
추상메소드를 담고 있다. 구체적 메소드 구현은 implements 를 통해 상속처럼 구현한다.  
인터페이스는 정해진 형태를 유지하면서 다양한 소스를 구현하기 위해 사용할 수도 있다.
- 다중 implements 가능.
- 인터페이스 간 상속도 가능
- 인터페이스이 형을 대상으로 참조변수 선언 가능
- `@Override` 선언으로 오버라이딩 가능
- 인터페이스 변수는 상수이다. public, static, final이 선언된 것과 같다. 대문자로 작성하면 좋다.
- 디폴트 메소드를 통해 추상 메소드를 추가할 수 있다. 디폴트 메소드는 구현하여도 되고, 하지 않아도 되는 특성을 가지고 있다. 그래서 이미 구현된 클래스를 수정하지 않아도 되는 장점이 있다.

```java
interface Printable{
	void print(String doc);
	default void printCMYK{}
}
class Printer implements Printable{
	@Override
	void print(String doc){
		System.out.println(doc);
	}
}
```
### 추상클래스
- 추상 클래스`abstract`는 추상 메소드`abstract`를 하나 이상 가진 실제 클래스이다.
- 클래스이기 때문에 `extends` 키워드를 통해 다른 클래스에서 추상 메소드를 구현한다.

```java
abstract class House{	// 추상 클래스
	public void methodOne(){
		System.out.println("method one");
	}
	@Override
	public abstract void methodTwo(); // 추상메소드
}

class MyHouse extneds House{
	public void methodTwo(){
		System.out.println("추상메소드 구현하기");
	}
}
```

### 인터페이스 변수는 오버라이딩이 되는걸까?
아니다. 인터페이스 변수가 숨겨지고, 지역변수가 나왔을 뿐이다.
출처: https://stackoverflow.com/questions/8814153/overriding-interfaces-variable


## hashcode
인스턴스만의 고유한 숫자값. 인스턴스끼리의 비교를 하기 위해, 사용 목적에 따라 Overriding을 하여 사용.
- Object.hashCode(): 인스턴스의 해쉬 값 반환
- Objects.hashCode() : 여러 인자들을 조합하여 해쉬 값를 생성

## API
### java.lang.Object.getClass()
- 인자: NA
- 반환: object of type Class that represents the runtime class of the object.
- 반환예시: class java.util.GregorianCalendar
```java
if(obj1.getClass() == obj2.getClass())
```
- 출처: https://www.tutorialspoint.com/java/lang/object_getclass.htm

## oracle database 라이브러리 사용하기
1. oracle 설치 폴더에서 `ojdbc6.jar` 파일 복사하기  
	D:\app\유저명\product\11.2.0\dbhome_1\jdbc\lib\
2. jre 폴더에 `ojdbc6.jar` 라이브러리 파일 붙여넣기  
	C:\Program Files\Java\jre1.8.0_172\lib\ext
3. 프로젝트 오른쪽 클릭 -> Properties -> Build Path -> Libaries 탭 -> Add External JARs
-> `ojdbc6.jar` 불러오기  

출처: [자바와 오라클 연동하기 <1> - JDBC 드라이버, 세상의모든기록](http://all-record.tistory.com/69)



## 예외처리
프로그램을 운영하다보면, 생각치 못했던 결과나 오류가 발생할 수 있다. 이러한 예외사항들에 대해 특정한 처리를 미리 정해둘 수 있다.
예외에 대해 특정한 처리를 해두면, 프로그램이 중단되지 않고 자연스럽게 운영될 수 있을 것이다.
- try-catch 문은 try에 관찰대상인 처리명령어들이 들어가고, catch 블록에는 해당 예외가 발생했을 떄 해당 명령어들이 실행된다.
- 여러 예외처리를 하고 싶을 때는, catch문을 여러 번 사용하거나 `|` 연산자를 사용한다.
- try-catch-finally에서 finally 블록에는 예외가 발생하든 안하든 무조건 실행한다.
```java
/*try-catch 문*/
public class Test_exception01 {
	public static void main(String[] args) {
		int num1 = 3;
		int num2 = 0;
		int result = 0;
		try {
			result = num1/num2;
			System.out.printf("3/0 = %n\n",result);
		}
		catch(ArithmeticException e) {
			System.out.println(e.getMessage());
			// / by zero
		}
	}
}
```

```java
/* try-catch-finally */
public class Test_exception01 {
	public static void main(String[] args) {
		int num1 = 3;
		int num2 = 0;
		int result = 0;
		try {
			result = num1/num2;
			System.out.printf("%d/%d = %d\n",num1,num2,result);
		}
		catch(ArithmeticException e) {
			System.out.println(e.getMessage());
		}
		finally {
			System.out.println("프로그램을 종료 합니다");
		}
	}
}
```

## Object
```java
Duck duck = new Duck();

System.out.println(duck.getClass()); // class com.gmail.hopefulyun.object.Duck
System.out.println(duck.toString()); // com.gmail.hopefulyun.object.Duck@33909752
System.out.println(duck.hashCode()); // 16진수를 10진수로 변경
```

## Wrapper 클래스
메소드의 인자로 인스턴스를 요구하는 경우가 있다. 기본 자료형 데이터를 클래스로 바꿀 수 있고, 그 클래스를 다시 기본자료형 데이터로 바꿀 수 있다.
Boxing은 값을 인스턴스에 감싸는 행위이고, Unboxing은 저장된 값을 꺼내는 행위를 말한다. 래퍼 인스턴스들은 담고 있는 값을 수정하지 못한다.
```java
Integer INum = new Integer("11");
Integer INum2 = new Integer(11);
Integer INum3 = 11;					// auto boxing
int INum4 = INum;					// auto unboxing
System.out.println(INum.intValue());	// 11
System.out.println(INum2.doubleValue());// 11.0
System.out.println(INum3);				// 11
System.out.println(INum4); 				// 11
```

## BigInteger 클래스
long보다 큰 정수를 표현하고 싶을 때 또는 정확한 실수를 표현하고 싶을 때 사용한다.

## 리스트 ArrayList
기본적으로 Object Type으로 처리. `ArrayList<T>` 을 사용. `<T>`는 Generic 저장되는 type을 제한한다. `T`는 클래스타입.
- 옛 방식: `ArrayList al = new ArrayList();`
- 새 방식: `ArrayList<Integer> al = new ArrayList<>();`
옛방식으로 하면 `ArrayList.get(index)`의 반환 값이 object이다. 강제형변환을 통해 사용해야 하며, 성능을 느리게 만든다. 그래서 리스트 선언 때부터 데이터형을 제너릭을 통해 정한다.

## String 메소드
- char chatAt(int index): index로 한 글자를 가져온다.
- bytes[] getBytes(String str): String 오브젝트를 byte 데이터형 배열로 변환
- int lastIndexOf(String str) : 뒤에서부터 str을 찾는다.
- trim
- subString
- split
- new StringTokenizer
- String replace(String original, String replace)
### 인코딩 변환
```
String str = new String(str.getBytes(), "EUC-KR");
```
- UTF-8 한글 2 byte
- EUC-KR 한글 3 byte
- 영어는 둘 다 1 byte

### 문자열 index
```java
// 한글 한 글자와 영어 한 글자는 같은 한 index로 취급한다.
String title = "자바 프로그래밍";
int loc = title.indexOf("프로그래밍");
System.out.println(loc);

System.out.println(title.length());

if(title.indexOf("자바") != -1)
	System.out.println("자바 관련 입니다");
else
	System.out.println("자바 관련이 아닙니다");
```

### StringBuffer , StringBuilder

## Generic 제네릭
제너릭은 클래스, 메소드, 인터페이스에 사용될 수 있다.
### 제너릭 클래스
Object로 메소드와 인자를 설정하면, 예상치 못한 object가 담기고 사용될 수 있다. 그래서 인스턴스를 생성할 때, 자료형을 고정시키는 제너릭을 사용한다.
제너릭은 `T`이다.
- Type Parameter 타입 매개변수 : `Box<T>`에서 `T`
- Type Argument 타입 인자: `Box<Apple>` 에서 `Apple`
- Parameterized Type 메개변수화 타입: `Box<Apple>`
- 매개변수화 타입은 제너릭 타입 Generic Type이라고도 한다.
```java
class Box<T>{
	private T fruit;
	public void set(T obj) {
		fruit = obj;
	}
	public T get() {
		return fruit;
	}
}
```
```java
Box<Apple> aBox = new Box<Apple>();
Box<Orange> oBox = new Box<Orange>();

aBox.set(new Apple());
oBox.set(new Orange());

System.out.println(aBox.get());
System.out.println(oBox.get());
```

- 타입매개변수의 이름은 한 문자로 대문자로 짓는다. `Element:E , Key:K, Number:N, Type:T, V:Value` 를 주로 사용한다.
- 타입매개변수로 기본 자료형은 올 수 없지만, 래퍼 클래스는 올 수 있다. `Box<Integer> box = new Box<Integer>();`
- 타입 인자를 생략할 수 있다. `<>`를 다이아몬드 기호라고 부른다. `Box<Apple> box1 = new Box<>()`
- 타입인자로 제너릭타입이 올 수 있다. `Box<Box<String>> box2 = new Box<>()`
- 타입인자를 제한할 수 있다. `class Box<T extends Number>` 그리고 제한된 클래스(`Number`)의 메소드(`ob.intValue()`)를 호출할 수 있다.
- 타입인자를 하나이상의 인터페이스에 대해 제한할 수 있다. `class Box<T exteneds NUmber & Eatable>`

### 제너릭 메소드
```java
class BoxFactory{
	public static <T> Box<T> makeBox(T fruit) {
		Box<T> box = new Box<T>();
		box.set(fruit);
		return box;
	}
}

Box<kiwi> box1 = BoxFactory.<kiwi>makeBox(new kiwi("green"));
```


## 컬렉션 프레임워크

### List<E> 리스트
인스턴스의 저장 순서를 유지한다. 그리고 동일한 인스턴스의 중복 저장을 허용한다.

#### ArrayList<E>
배열 기반 자료구조. 배열을 이용하여 인스턴스 저장. 요소가 추가되거나 저장될 때마다 새로운 배열이 생성.
- public ArrayList(): 10개의 배열 요소를 가진 배열 인스턴스 생성
- public ArrayList(int initial): 원하는 수만큼의 배열 요소를 가진 배열 인스턴스 생성
- 성능을 위해서는 배열 요소를 미리 정해두면 좋다.
- 인덱스 값을 통해 저장된 인스턴스의 참조가 빠르다.
- 요소 추가/제거 연산이 복잡하다.

#### LinkendList<E>
리스트 기반 자료구조. 리스트를 구성하여 인스턴스 저장.
- 저장된 인스턴스의 참조가 느리다. 첫 요소부터 찾아가기 때문에.
- 요소 추가/제거가 간단하다.

#### for-each(enhanced for)
`public interface Iterable<T>`을 상속하는 클래스만 사용가능. Collenction<E>에서 이 인터스페이스를 구현하고 있다.

```java
List<String> list = Arrays.asList("가","나", "box");
for(String s : list) System.out.println(s);
```

#### Iterator<T> iterator() 반복자
- E next(): 다음 인스턴스의 참조 값을 반환
- boolean hasNext(): next 메소드 호출 시 참조 값 반환 가능 여부 확인
- void remove(): next 메소드 호출을 통해 반환했던 인스턴스 삭제

```java
List<String> list = Arrays.asList("가","나", "box");
itr = list.iterator();
while(itr.hasNext()){
	System.out.println(itr.next());
	if(str.equals("Box")) itr.remove();
}
```

#### ListIterator<E> 양방향 반복자
iterator 인터페이스를 상속했다.
public ListIterator<E> listIterator()
[java8 doc](https://docs.oracle.com/javase/8/docs/api/java/util/ListIterator.html)


### SET<E> 셋
집합 개념과 유사하다. 중복을 제거하고 싶다면, 이 자료구조를 이용할 수도 있다.
- 데이터 순서가 없다.
- 데이터 중복이 없다.

#### HashSet
동일 인스턴스를 판단하는 기준은 `equals` 와 `hashcode` 메소드 리턴값이다.

#### TreeSet
정렬되어 있고 중복이 없다. 인스턴스 요소일 경우, 정렬기준이 있어야한다. 두 가지 방법이 있다.
- Compareable 인터페이스 상속하여 compareTo를 구현하여야 한다.
- TreeSet 생성자 인자로 Comparator 인터페이스를 구현한 클래스를 전달한다.

### QUEUE<E> 큐
First In , First Out 구조이다. 큐는 앞뒤가 다 뚫려있는 통이라고 볼 수 있다.
- 대표적 구현 클래스는 `LinkedList`가 있다. Queue 참조변수에 대입하면 큐처럼 사용할 수 있다.
- `boolean offer(E e)`: 넣기. 넣을 공간이 없으면 false 반환
- `E poll()`: 꺼내기. 꺼낼 것이 없으면 null 반환
- `E peek()`: 확인하기. 확인할 대상이 없으면 null 반환
add 와 remove를 사용하지 않는 이유는 비어 있는 상황을 포함하고 있기 때문이다.
[java 8 doc](https://docs.oracle.com/javase/8/docs/api/java/util/Queue.html)

```java
Queue<Mavel> que = new LinkedList<Mavel>();
que.offer(new Mavel("슈퍼맨",1991));
que.offer(new Mavel("배트맨",1951));
que.offer(new Mavel("윙맨",2000));

Iterator itr = que.iterator();
for(;itr.hasNext();) {
	System.out.println(que.poll());
}
System.out.println(que.peek());
System.out.println(que.size());
```

### Deque 덱
Deque는 양뱡향으로 넣고 꺼낼 수 있다. 그래서 특정 한 방향으로 넣고 꺼낸다면, 스택(First in, Last Out)처럼 사용이 가능하다. 당연히 큐로도 사용가능.
Stack 클래스가 있지만 거의 성능 문제로 거의 사용하지 않고 있다.  
- LinkedList는 Deque<E>, List<E>, Queue<E> 인터페이스를 구현한다.
```java
Deque<Mavel> deque = new ArrayDeque<Mavel>();
deque.offerLast(new Mavel("슈퍼맨",1991));
deque.offerLast(new Mavel("배트맨",1951));
deque.offerLast(new Mavel("윙맨",2000));

while( deque.peekLast() != null ) {
	System.out.println(deque.pollLast());
}
```
```
/* 스택처럼 사용하도록 클래스 생성 */
interface InF_stack<E>{
	public boolean push(E item);
	public E pop();
	public E peek();
}
class Im_stack<E> implements InF_stack<E>{
	private Deque<E> deque = new ArrayDeque<E>();
	@Override
	public boolean push(E item) {return deque.offerLast(item);}
	@Override
	public E pop() { return deque.pollLast(); }
	@Override
	public E peek() { return deque.peekLast();}
}
```

### Map<K, V>
key-value 자료구조. 고유 key를 통해 value를 찾는다. HashMap과 TreeMap이 있다. 둘 다 중복이 안된다는 점을 가지고 있다.
TreeMap은 key를 대상으로 정렬 상태를 유지한다는 차이점이 있다. `put`과 `set`을 통해 접근한다.
```java
HashMap<Integer, String> map = new HashMap<>();
map.put(1, "lee");
map.put(2, "park");
map.put(1, "kim");

System.out.println(map.get(1));	// kim
System.out.println(map.get(2));	// lee
```
순차접근은 `public SET<K> keySet()`을 사용하여, key를 SET 컬렉션으로 생성하여 사용한다.
```java
/* keyset을 통한 순차접근 */
HashMap<Integer, String> map = new HashMap<>();
map.put(1, "이");
map.put(3, "김");
map.put(5, "박");

Set<Integer> keyset = map.keySet();
for( Integer key : keyset) {
	System.out.println(key);
}
for( Integer key : keyset) {
	System.out.println(map.get(key));
}
```
TreeMap 인스턴스 생성자 인자로 Comparator 구현 클래스를 전달하면 정렬할 수 있다.
```java
/* 내림차순 key 정렬 */
TreeMap<Integer, Marvel> tmap2 = new TreeMap<>(new keyByDesc());
tmap2.put(1, new Marvel("아이언맨",2000));
tmap2.put(3, new Marvel("펭귄맨",2000));
tmap2.put(2, new Marvel("조커",2000));
Set<Integer> keyset2 = tmap2.keySet();
System.out.println(keyset2);
```

### 컬렉션 메소드
- sort()
- binarySearch()
- copy()

## 네스티드 클래스(Nested Class)
네스티드 클래스는 static 네스티드 클래스와 non-static 네스티드 클래스로 구분한다.
non-statice 네스티드 클래스는 이너 클래스(Inner Class)라고도 부른다.

이너 클래스는 맴버 클래스, 로컬 클래스, 익명 클래스로 구분한다.
맴버 클래스는 인스턴스 변수 자리에, 로컬 클래스는 메소드 안에 위치한다. 익명 클래스는 인스턴스 생성과 동시에 선언한다.

### static Nested Class
static 네스티드 클래스의 인스턴스 생성은 외부 클래스의 인스턴스 생성과 무관한다.  
-> static 네스티드 클래스 내에서 외부 클래스의 인스턴스 변수와 메소드에 접근 불가능하다.
```java
/* static Nested Class example */
class Outer{
	private static int static_num = 0;
	private int intance_num2 = 3;
	// Nested Class
	static class Nested1{
		void add(int n) { static_num += n;}
		int get() { return static_num; }
	}
	static class Nested2{
		void add(int n) { intance_num2 += intance_num2;} // error
	}
}
public class staticNested {
	public static void main(String[] args) {
		// Nested Class instance
		Outer.Nested1 ne1 = new Outer.Nested1();
		ne1.add(333);
		System.out.println(ne1.get());	// 333
	}
}
```
### Inner Class. 이너 클래스
non-static Nested classs. 맴버, 로컬, 익명 클래스가 있다.

#### 맴버 클래스
인스턴스 변수 위치에 클래스를 정의한다.
`p1.getPrinter()` 메소드가 어떠한 인스턴스의 참조 값을 반환하는지 모른다. Printable을 구현하고 있어서 Printable 변수로만 참조하고 있다.  
이렇게 클래스 정의를 감추면, `getPrinter()` 메소드 반환값이 다른 클래스 인스턴스로 바뀌어도 외부 코드를 바꿀 필요가 없다. 코드 유연성이 생겼다.
```java
interface Printable{
	void print();
}
class Papers{
	private String con;
	// 생성자
	public Papers(String s) { con = s;}
	// 메소드
	public Printable getPrinter() {
		return new Printer();
	}
	// 이너 맴버 클래스: private 이기 때문에 클래스 내에서만 생성가능
	private class Printer implements Printable{
		@Override
		public void print() {
			System.out.println(con);
		}
	}
}

public class UseMemberInner {
	public static void main(String[] args) {
		Papers p1 = new Papers("이 편지는 1980년부터 시작하여...");
		Printable printer1 = p1.getPrinter(); // Printable로만 참조할 수 있다.
		printer1.print(); // 이 편지는 1980년부터 시작하여...
	}
}
```

#### 로컬 클래스
if 또는 while문 또는 메소드 몸체에와 같은 블록 안에 정의할 수 있다.  
블록 밖에서 클래스를 생성할 수 없다. 그래서 private 사용은 의미가 없다.
```java
interface Printable{
	void print();
}
class Papers{
	private String con;
	// 생성자
	public Papers(String s) { con = s;}
	// 메소드
	public Printable getPrinter() {
		// 로컬 클래스
		class Printer implements Printable{
			@Override
			public void print() {
				System.out.println(con);
			}
		}
		return new Printer();
	}
}

public class UseMemberInner {
	public static void main(String[] args) {
		Papers p = new Papers("편지: 이 편지를 100명에게 보내지 않는다면...");
		Printable printer1 = p.getPrinter();
		printer1.print();
	}
}
```

#### 익명 클래스
클래스의 정의와 인스턴스의 생성을 하나로 묶을 수 있다.
```java
/* 익명클래스 예제 */
interface Printable{
	void print();
}
class Papers{
	private String con;
	// 생성자
	public Papers(String s) { con = s;}
	// 메소드
	public Printable getPrinter() {
		// 익명 클래스: 정의와 선언이 한 번에
		return new Printable() {
			@Override
			public void print() {System.out.println(con);
			}
		};
	}
}

public class UseMemberInner {
	public static void main(String[] args) {
		Papers p = new Papers("편지: 이 편지를 100명에게 보내지 않는다면...");
		Printable printer1 = p.getPrinter();
		printer1.print();
	}
}
```
```java
/* 익명클래스 예제2 */
public class AnonymousComparator {
	public static void main(String[] args) {
		List<String> list = new ArrayList<>();
		list.add("Robot");
		list.add("Apple");
		list.add("Box");
		// 익명 클래스
		Comparator<String> cmp = new Comparator<String>() {
			@Override
			public int compare(String s1, String s2) {
				return s1.length() - s2.length();
			}
		};
		Collections.sort(list, cmp);
		System.out.println(list); // [Box, Robot, Apple]
	}
}
```

## 람다
```java
/* 람다 예제1 */
interface Printable{
	void print(String s);
}
public class Lambda01 {

	public static void main(String[] args) {
		// 익명클래스
		Printable prn = new Printable() {
			@Override
			public void print(String str) { System.out.println(str);}
		};
		prn.print("haha");
		// 람다식
		Printable prn2 = (s)->{ System.out.println(s); };
		prn2.print("hihi");
	}
}
```
```java
/* 람다 예제2 */
interface Printable03{
	void print(String s);
}
public class Lambda03 {
	public static void main(String[] args) {
		Printable03 p1 ;
		p1 = s -> System.out.println(s);
		p1.print("맛있다");
	}
}
```
```java
/* 람다 예제3 */
interface Calculate{
	int cal(int a, int b);
}
public class TwoParamNoReturn {
	public static void main(String[] args) {
		Calculate c1 ;
		c1 = (a,b) -> a+b;
		System.out.println(c1.cal(1, 2));
	}
}
```

## 스트림

### 스트림 생성
- 배열 스트림 생성: `static <T> Stream<T> stream(T[] array)`
