# SPRING MVC

## HTTP Request Binding

### @RequestParm

쿼리 파라미터, Form 파라미터, URL 일부 파라미터(Path 파라미터) 케이스에 바인딩으로 사용할 수 있습니다.

비교적 간단한 파리미터들을 맵핑할 때 사용합니다. Primitive 데이터타입과 같은 파라미터에 사용됩니다. 주로 RESTful Service 에 사용됩니다.

반면, `@ModelAttribute`는 많은 연관된 파라미터들을 연관된 한 오브젝트로 바인딩할 때 사용합니다. 그리고 사용자가 정의한 클래스에 맵핑할 때 유용합니다. 그래서 FORM 형식 등에 주로 사용됩니다.

https://medium.com/@AlexanderObregon/data-mapping-with-springs-modelattribute-annotation-b41704c2521a

### @RequestBody

`@RequestBody`는 주로 `applicaiton/json` Media-Type HTTP 요청을 처리하는데 특화되어 있습니다. 그래서 Request Body 으로 바로 접근해 `Jackson`의 `ObjectMapper.java`를 통해 DTO 오브젝트를 생성하고 JSON 역직렬화한 값을 바인딩합니다. 

반면, `@ModelAttribute`는 쿼리 파라미터나 `application/form-data` Media-Type Form 형식의 요청을 주로 처리합니다. Spring 의 `DataBinder.java`를 통해 DTO 생성자를 통해 생성하고 값을 바인딩합니다.  

https://medium.com/@AlexanderObregon/data-mapping-with-springs-modelattribute-annotation-b41704c2521a


### @ModelAttribute

`WebRequestDataBinding.class` 가 웹 요청의 파라미터들을 Contorller RequestMappging 설정된 메소드 파라미터 오브젝트를 생성하고 프로퍼티들에 파라미터 값들을 바인딩합니다. Spring framework 의 `BeanUtil.java` 리플렉션 기반 유틸리티 도구로 타겟 모델 클래스 생성자를 호출하여 바인딩합니다. 파라미터가 없는 기본 생성자를 활용할 수도 있으며 public 접근자가 아닌 생성자라도 접근하여 생성합니다. 그래서 모델 클래스엔 생성자가 반드시 한 개는 있어야 합니다. 

쿼리 파라미터가 DTO 에 바인딩될 때는 `생성자`만 사용됩니다. 기본으로 `생성자 + setter` 를 사용하고 없으면 그 외 생성자를 사용합니다. (확인필요) 기본 생성자를 제외한 다른 생성자 2개 이상 존재할 경우 에러가 발생합니다. 자바빈즈 패턴 선호 시, 기본 생성자와 세터를 사용하고 일관성과 불변성이 우선이라면 적절한 생성자를 만들어서 사용하면 됩니다. 기본값 설정 방법은 자바빈즈 패턴(기본생성자와 세터 활용)에선 필드 선언부에서 기본값을 세팅해두는 방법이 있습니다. 일관성과 불변성 방식(커스텀 생성자) 방식으로는 생성자 내 로직으로 Null 이면 기본값을 할당하도록 합니다.

`@Valid` 를 같이 쓰면 binding 후 유효성 검사를 진행합니다. `BindingResult` 를 바로 옆 파라미터로 쓰면 실패 에러를 핸들링할 수 있습니다.

https://medium.com/@AlexanderObregon/data-mapping-with-springs-modelattribute-annotation-b41704c2521a
https://e-room.tistory.com/169
https://www.inflearn.com/questions/249849/modelattribute%EC%97%90%EC%84%9C-default-value

