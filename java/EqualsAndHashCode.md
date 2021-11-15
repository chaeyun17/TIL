# Java의 Equals And Hashcode

두 인스턴스의 동일성을 확인하기 위해 Object 클래스의 Equals 와 HashCode를 Override 한다.


```java
public class Member {

	private Long id;

	private String name;

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		Member member = (Member)o;

		return Objects.equals(id, member.id);
	}

	@Override
	public int hashCode() {
		return id != null ? id.hashCode() : 0;
	}

	public Member(long id, String name){
		this.id = id;
		this.name = name;
	}
}

```

다음과 같이 equals를 재구현하였다. ID 값을 기준으로 도일성을 판단한다. 로직상에서 두 인스턴스의 동일성을 확인하기 위해 equals() 함수를 호출해서 사용하면 된다.
```java
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		Member member = (Member)o;

		return Objects.equals(id, member.id);
	}
```

그러면 Hashcode는 왜 필요할까? HashCode는 해당 인스턴스의 고유값을 숫자로 표현한 것이다. 예시 중에는 HashMap이 있다.

```java
	@Test
	public void hashCodeTest(){
		Member m1 = new Member(1L, "john");
		Member m2 = new Member(1L, "jane");

		Map<Member, String> membersMap = new HashMap<>();
		membersMap.put(m1, "m1입니다");
		membersMap.put(m2, "m2입니다");

		assertEquals(membersMap.get(m1), "m2입니다");
	}
```

