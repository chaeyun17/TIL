# 자바 자료구조

## 참고자료
- [JAVA 자료구조, 생활코딩](https://opentutorials.org/module/1335/8677)

## 데이터 타입

### 기본 자료형(primitive type)
데이터를 저장한다. stack 영역. 
- 예시: char, int, double, boolean, ...

### 참조 자료형(reference type)
주소값을 저장한다. heap 영역. 
- 예시: string, array, class, ... 

### 예시
자바는 같은 문자열 데이터라면, 종복 데이터를 생성하지 않고 같은 곳을 참조하도록 한다.

```java
import java.util.Scanner;
public class StringEq01{
	public static void main(String[] args){
		String str1 = "ourfuture";
		String str2 = "ourfuture";
		
		//1. 주소값을 비교
		System.out.println(str1 == str2);		// true
		//2. 데이터값을 비교
		System.out.println(str1.equals(str2));	// true
		
		Scanner sc = new Scanner(System.in);
		System.out.println("문자열 입력: ");
		str2 = sc.nextLine();
		
		//1. 주소값 비교
		System.out.println(str1 == str2);		// false
		//2. 데이터값 비교
		System.out.println(str1.equals(str2));	// true
		
	}
}
```

배열은 reference type 이기 때문에, 메서드를 통해 복사한다.
```java

public class copyArray {
	public static void main(String[] args) {
		int[] scores1 = new int[] {33,55,75};
		int[] scores2 = new int[5];
		
		scores2 = scores1.clone();
		
		scores1[0] = 0;
		scores1[1] = 1;
		scores1[2] = 2;
		
		System.out.println("[ scores1 ]");
		for(int i=0; i<scores1.length; i++) { 
			System.out.printf("%d ",scores1[i]);
			// 0 1 2
		}
		System.out.printf("\n\n");
		System.out.println("[ scores2 ]");
		for(int i=0; i<scores2.length; i++) {
			System.out.printf("%d ",scores2[i]);
			// 33 55 75
		}
	}
}
```

## NULL
변수가 참조하는 객체가 없을 경우, 초기값으로 사용 가능.  
참조 타입의 변수에만 저장 가능.  
null로 초기화된 참조 변수는 스택 영역 생성  
- 비교는 `==` 연산자로. 