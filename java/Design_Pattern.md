# Java 디자인패턴

## Avoid Getter / Setter
게터와 세터는 왜 사용할까요? 바로 캡슐화를 위해서 사용하고들 합니다. 하지만 정말로 캡슐화 역할을 하고 있을까요? 캡슐화란 객체를 껍질로 감싼 것입니다. 외부에서 내용물을 조작하는 것을 막기 위해 껍질을 만든 것이죠. 

예를 들어봅시다. A라는 한 클래스가 있습니다. A클래스 맴버로 a라는 객체가 있습니다. 게터와 세터 메서드를 평소처럼 만들었습니다. 외부에서 Getter를 통해 A 클래스의 a객체를 리턴 받습니다. 외부에서 a 객체의 데이터를 변경하였습니다. 여기까지는 괜찮습니다. 다른 곳에서 A 클래스의 a객체를 사용하고 있었는데 데이터가 변경되어 버렸습니다. 

이런 상황이 왜 발생할까요? 게터는 Call by Reference를 하였기 때문입니다. A 클래스 외부 여러곳에서 동시에 한 a 맴버를 조작해버리니 문제가 발생한 것입니다. 이런 상황을 방지하려면 어떻게 해야 할까요? 2가지 방법이 있습니다. 첫째, 게터에서 복사본을 반환합니다. Call by Value를 사용합니다. 둘째, a 맴버를 바꾸지 못하도록 final 접근제한자를 사용합니다.

 흠... 최선의 방법은 없을까요? 있습니다. 바로 절대로 맴버를 외부에 노출시키지 않는 것입니다. 맴버를 조작하려면 클래스 내부에서만 내부 메서드를 통해 조작하게 합니다. 이렇게 한다면, 맴버를 변경하는 곳은 이 클래스 한 곳 밖에 없습니다.

 하지만! 게터와 세터를 절대로 절대로 사용하지 말아야할까요? 여러 다양한 상황이 있기 때문에 절대적으로 사용하지 말자는 것은 아닙니다. 다만, 최대한 피하는 것이 좋습니다. 각 단계 별로 캡슐화를 합니다.

1. 기본은 멤버를 private final로 접근제한 설정을 합니다. 생성자를 통해서만 맴버에 접근할 수 있게 합니다. 노 게터! 노 세터!
2. 다른 클래스에서 꼭 이 맴버를 보려고 한다면, 다른 방법으로 노출 시키는 메서드를 만듭니다.
3. 정말로 정말로 어떤 이유가 있다면, 같은 패키지의 클래스들만 접근할 수 있도록 package-private 접근제한자를 설정합니다. 
4. 데이터들을 이동시켜야하는 DB, 웹서비스 등에서는 어떨까요? 새로운 클래스를 만듭니다. 모든 맴버들은 같은 패키지에서만 접근가능한 package-private 접근제한자를 설정합니다. 그리고 단순히 properties 담는 가방이라고만 여기고 사용할 것입니다.
5. public api에서 데이터로 사용될 경우, 게터와 세터를 만들 것을 고려해볼 것입니다. 그러나 위 항목들을 다 고려해본 뒤, 정 안되면 만들 것입니다.  

위와 같은 내용은 책 '클린코드'에 설명되어 있습니다. 그리고 '이펙티브 자바'에서도 설명되어 있습니다. 참고하시길 바랍니다. 위 내용은 [Avoid getters and setters whenever possible](https://dev.to/scottshipp/avoid-getters-and-setters-whenever-possible-c8m)에서 인용하여 작성하였습니다.


## Java Bean

`JavaBean`이란 하나의 JAVA 클래스 표준입니다. 세 가지 컨벤션을 지키면 됩니다.

첫째, 모든 프로퍼티들은 Private 접근자로 설정하고 getter와 setter 와 같은 메서드를 통해서만 프로퍼티에 영향을 끼칠 수 있습니다.

둘째, Public 접근자 기본 생성자(No-Arguments Constructor)가 있어야 합니다.

셋째, `Serializable`을 구현해야 합니다. 생성한 오브젝트를 스트림을 통해 파일로도, DB 로도 등등 다양한 외부로 변환하고 역방향으로도 가능하도록 하여 범용적으로 오브젝트를 다를 수 있습니다.

참고자료: https://stackoverflow.com/questions/3295496/what-is-a-javabean-exactly

