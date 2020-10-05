# VueJs로 Ajax로 받은 데이터 출력하기
1. Vue 객체 생성
2. data에 저장할 데이터 변수 초기화 `data: { itemList : [] }`
3. created function에서 api 호출하여 데이터 가져옮. 그리고 api 결과 데이터값들을 vue 객체 data에 저장한다.
4. html 태그를 통해 특정 컴포넌트의 속성에 Vue 데이터를 복사한다. 컴포넌트는 미리 Vue를 생성할 때, 등록해놔야한다.
`<indicator v-bind:indicatordata="indicatorList" v-on:indicatorclick="indicatorclick"></indicator>`
5. `v-bind`를 통해 데이터를 받은 데이터를 props에 저장되고, data에서 이 것을 할당한다.
6. template에서 결과 HTML을 작성할 수도 있다.

# 컴포넌트
- 컴포넌트는 한 페이지에서 특정 부분을 독립시켜서 부품화한 것이다. 에를 들면, a header, sidebar, and content area,
- 컴포넌트는 재사용 목적이다.
- data, computed, watch, methods, and lifecycle hooks 은 사용가능하지만, el 같은 root 옵션은 사용할 수 없다.
- Root Vue에 컴포넌트를 등록해서 사용. HTML에 <컴포넌트명>을 적으면 된다.
- data 옵션은 함수이여야 한다. 그렇게 하지 않으면, 해당 데이터 변화가 모든 컴포넌트에 적용된다.
- 컴포넌트 등록 방식에는 '전역'과 '지역'으로 나뉜다.
- 컴포넌트는 `props` 옵션을 통해 root vue로부터 데이터를 전달받을 수 있다. 전달방법은 아래와 같다.
```JS
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```
```HTML
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```
```JS
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
```
```HTML
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```
- template 옵션을 사용할 때는 여러 HTML줄일 경우에, template literal을 사용하면 된다. 하지만 IE에서는 지원하지 않는다. IE를 지원하고 싶으면, new line escape를 사용하면 된다.
```JS
// template literal
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
```
```JS
// new line escape
var htmlSTring = "<div>\
  This is a string.\
</div>";
```

- 클릭 이벤트 같은 것으로 다른 컴포넌트로 변환하고 싶으면, `is`라는 특별한 속성을 사용하면 된다. `currentTabComponent`는 둘 중 하나를 뜻한다. 등록된 컴포넌트의 이름 또는 등록된 컴포넌트의 옵션 객체.
```HTML
<!-- Component changes when currentTabComponent changes -->
<component v-bind:is="currentTabComponent"></component>
```

# Vue 인스턴스 라이프 사이클
- beforeCreate: Vue 인스턴스가 생성되고 데이터에 대한 관찰 기능 및 이벤트 감시자 설정 전에 호출됩니다.
- created: Vue 인스턴스가 생성된 후에 데이터에 대한 관찰 기능. 계산형 속성, 메서드, 감시자 설정이 완료된 후에 호출됩니다.
- beforeMount: 마운트가 시작되기 전에 호출됩니다.
- mounted: el에 vue 인스턴스의 데이터가 마운트된 후에 호출됩니다.
- beforeUpdate: 가상 DOM이 렌더링, 패치되기 전에 데이터가 변경될 때 호출됩니다. 이 훅에서 추가적인 상태 변경을 수행할 수 있습니다. 하지만 추가로 다시 렌더링하지는 않습니다.
- updated: 데이터의 변경으로 가상 DOM이 다시 렌더링되고 패치된 후에 호출됩니다. 이 훅이 호출되었을 때는 이미 컴포넌트의 DOM이 업데이트된 상태입니다. 그래서 DOM에 종속성이 있는 연산을
이 단계에서 수행할 수 있습니다.
- beforeDestory: Vue 인스턴스가 제거되기 전에 호출됩니다.
- destoryed: Vue 인스턴스가 제거된 후에 호출됩니다. 이 훅이 호출될 때는 Vue 인스턴스의 모든 디렉티브 바인딩이 해제되고, 이벤트 연결도 모두 제거됩니다.
