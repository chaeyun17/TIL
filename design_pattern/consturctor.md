
# 객체 생성 패턴

### 1. 점층적 생성자 패턴(Telescoping Consturctor Pattern)

필수 프로퍼티로 생성할 수 있는 생성자를 두고, 선택 프로퍼티 추가로 설정할 수 있는 여러 생성자들을 제공하는 방식입니다.
단점으로는 많은 생성자들로 선언해야하는 번거로움과 클래스 내 변경이 있을 시 몯느 생성자를 수정해야하는 번거로움이 있습니다. 장점으로는 세터를 사용하지 않기에 불변성을 보장할 수 있고 이 클래스를 생성해서 사용하는 사용자에게 특정한 생성자들 사용을 강제하여 안정적인 상태(프로퍼티) 설정이 가능합니다. 

```java
public class Product{
    private String name;    // 필수
    private Long price;     // 필수
    private String tag;     // 선택
    private Long weight;    // 선택

    public Product(String name, Long price){
        this(name, price, "기본태그", 0L);
    }


    public Product(String name, Long price, Long weight){
        this(name, price, "기본태그", weight);
    }

        public Product(String name, Long price, String tag){
        this(name, price, tag, weight);
    }

    public Product(String name, Long price, String tag, Long weight){
        this.name = name;
        this.price = price;
        this.tag = tag;
        this.weight = weight;
    }
}
```

### 2. 자바빈즈 패턴(JavaBeans Pattern)

기본 생성자와 세터로 오브젝트를 생성하는 패턴입니다. 기본생성자를 호출하고 세터를 호출하여 객체를 생성하는 원리입니다. 단점은 세터를 사용하기 때문에 불변성을 보장할 수 없습니다. 장점은 여러 생성자를 만들지 않고 유지하지 않아도 되어 자유롭게 객체 상태를 변경할 수 있습니다.

```java
public class Product{
    private String name = "_";          // 필수
    private Long price = -1L;           // 필수
    private String tag = "기본태그";     // 선택
    private Long weight = 0L;           // 선택

    public Product(){}

    public void setName(String name){
        this.name = name;
    }

    public void setPrice(Long price){
        this.price = price;
    }

    public void setTag(String tag){
        this.tag = tag;
    }

    public void setWeight(Long weight){
        this.weight = weight;
    }
}
```

### 3. 빌더 패턴(Builder Pattern)

빌더 패턴은 빌더 클래스를 내부에 선언하고 빌더 오브젝트를 이용해 값을 받아서 build() 메서드 호출 시 타겟 오브젝트를 생성하는 방식입니다. 장점은 세터를 사용하지 않기에 불변성을 보장할 수 있습니다. 단점은 빌더 오브젝트를 같이 생성해야하기 때문에 생성하는 로직 실행에 대한 시간 자원과 메모리 사용에 대한 공간적 자원이 추가로 발생합니다. 생성자에 파라미터가 많으면 빌더패턴을 사용하곤 합니다.

```java
public class Product{
    private String name;          
    private Long price;           
    private String tag;             
    private Long weight;           

    public static class Builder{
        // 필수
        private String name;          
        private Long price;
        // 선택
        private String tag;             
        private Long weight;

        private Builder(int name, Long price){
            this.name = name;
            this.price = price;
        }

        public Builder name(Stirng tag){
            this.tag = tag;
            return this;
        }

        public Builder weight(Long weight){
            this.weight = weight;
            return this;
        }

        public Product build(){
            Product product = new Product();
            product.name = this.name;
            product.price = this.price;
            product.tag = this.tag;
            product.weight = this.weight;
            return product;
        }
    }
}
```
https://effortguy.tistory.com/15