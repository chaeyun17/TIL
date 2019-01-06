# 스프링 부트

## 예외처리
- spring 3.2 전에는 예외처리 방법으로 2가지가 있다. 첫째는 컨트롤러 내에서 `@ExceptionHandler` 메소드에서 처리하는 방법이 있다. 단점으로는 해당 예외처리 범위가 해당 컨트롤러 밖에 안된다.
- sprng 3.2 부터는 `@ControllerAdvice`로 바뀌었다.
- 새로 바뀐 방식은 예외처리 범위가 앱 전체이고, 예외처리 핸들러는 `@ControllerAdvice` 클래스 안의 `@ExceptionHandler`메소드에서 처리한다.
- HandlerExceptionResolver 방법도 있다.
- 출처: https://www.baeldung.com/exception-handling-for-rest-with-spring

### 방법
- `Controller 내에서 예외처리`와 `앱 내 전체 범위로 예외처리 @ControllerAdvice 사용` 방법이 있다.
- 추가로 HandlerExceptionResolver을 사용하는 방법이 있다.
- 예제는 공통으로 ProudctNotFoundException 클래스와 Proudct 데이터 오브젝트를 만든다.
```JAVA
public class ProductNotfoundException extends RuntimeException{
	private static final long serialVersionUID = 1L;
}
```
```JAVA
public class Product {
	private String id;
	private String name;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + "]";
	}
}
```

#### Controller 내에서 예외처리
```JAVA
/* productController */
@Controller
public class helloController {
  // product 데이터 생성
  private static Map<String, Product> productRepo = new HashMap<>();
  static {
    Product honey = new Product();
    honey.setId("1");
    honey.setName("Honey");
    productRepo.put(honey.getId(), honey);

    Product almond = new Product();
    almond.setId("2");
    almond.setName("Almond");
    productRepo.put(almond.getId(), almond);
  }

  // prodouct 정보 확인 요청
  @RequestMapping(value="/product/{id}")
  public ResponseEntity<Object> checkProduct(@PathVariable("id") String id){
    if(!productRepo.containsKey(id)) throw new ProductNotfoundException();
    return new ResponseEntity<>("Product is existed", HttpStatus.OK);
  }

  // 확인 요청한 product이 없을 시, 예외처리 메소드
  @ExceptionHandler(ProductNotfoundException.class)
  public ResponseEntity<Object> productNotfoundHandler() {
    return new ResponseEntity<>("[controller exception] : Product not found", HttpStatus.NOT_FOUND);
  }
}
```

#### 앱 내 전체 범위로 예외처리 `@ControllerAdvice` 사용
스프링3.2 에서 업데이트된 기능. 예외처리를 분리할 수 있고 가장 편하게 할 수 있는 방법
```JAVA
@Controller
public class ProductController {
  // product 데이터 생성
  private static Map<String, Product> productRepo = new HashMap<>();
  static {
    Product honey = new Product();
    honey.setId("1");
    honey.setName("Honey");
    productRepo.put(honey.getId(), honey);

    Product almond = new Product();
    almond.setId("2");
    almond.setName("Almond");
    productRepo.put(almond.getId(), almond);
  }

  // prodouct 정보 확인 요청 맵핑
  @RequestMapping(value="/product/{id}")
  public ResponseEntity<Object> checkProduct(@PathVariable("id") String id){
    if(!productRepo.containsKey(id)) throw new ProductNotfoundException();
    return new ResponseEntity<>("Product is existed", HttpStatus.OK);
  }
}
```
```JAVA
@ControllerAdvice
public class ProductExceptionController {
  // product not found 예외 핸들링
	@ExceptionHandler(value = ProductNotfoundException.class)
	public ResponseEntity<Object> exception(ProductNotfoundException exception){
		return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
	}
}
```

#### HandlerExceptionResolver
1. ExceptionHandlerExceptionResolver: `@ExceptionHanlder` 방법
2. DefaultHandlerxceptionResolver: 기존에 있는 Spring의 status code 사용. 간단한 에러 정보 밖에 전달을 못하는 단점.
3. ResponseStatusExceptionRersolver: Http Status Code를 사용.
    ```java
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException() {
            super();
        }
        public ResourceNotFoundException(String message, Throwable cause) {
            super(message, cause);
        }
        public ResourceNotFoundException(String message) {
            super(message);
        }
        public ResourceNotFoundException(Throwable cause) {
            super(cause);
        }
    }
    ```
4. Custom HandlerExceptionResolver: Spring의 기본 예외처리 기능과 Http Status code 예외처리 방법을 조합한 방법이다.

    ```java
    @Component
    public class RestResponseStatusExceptionResolver extends AbstractHandlerExceptionResolver {

        @Override
        protected ModelAndView doResolveException
          (HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
            try {
                if (ex instanceof IllegalArgumentException) {
                    return handleIllegalArgument((IllegalArgumentException) ex, response, handler);
                }
                ...
            } catch (Exception handlerException) {
                logger.warn("Handling of [" + ex.getClass().getName() + "]
                  resulted in Exception", handlerException);
            }
            return null;
        }

        private ModelAndView handleIllegalArgument
          (IllegalArgumentException ex, HttpServletResponse response) throws IOException {
            response.sendError(HttpServletResponse.SC_CONFLICT);
            String accept = request.getHeader(HttpHeaders.ACCEPT);
            ...
          }
            return new ModelAndView();
    }
    ```
