# Container 란 무엇인가?
- docker에서 container란 docker 에서만 사용되는 용어가 아니라 컴퓨터 기술적 용어이다. 그래서 배워보기로 했다.
- 아래 요약본은 참고 자료를 전적을 기반으로 작성하였다.

## 컨테이너
- container의 주요 개념은 여러 프로세스로부터 프로세스를 고립(isolation)시키는 것이다. 프로세스는 샌드박스 안에서 실행된다. 
- OS는 한 컨테이너에 리소스를 제한적으로 제공한다.
- 컨테이너의 라이프 사이클은 컨테이너 안의 프로세스의 라이프 사이클과 같다. tightly coupled 컨테이너는 컨테이너의 프로세스가 끝나면 컨테이너도 끝난다. 컨테이너가 실행한다는 것은 컨테이너 프로세스도 실행된다는 말이다.
- 컨테이너는 프로세스 실행에 필요한 모든 것을 담았기 때문에 OS에 install 하는 과정이 없다.

## 이미지
- `IMAGE` 이미지는 컨테이너의 바이너리 상태이다. vmware의 `.vmk` 이미지 파일과 비슷하다. 
- 이미지는 parent-child 관계를 가지는 image layer가 있다. vmware 의 스냅샷과 비슷한 개념이다. 이렇게 하면 좋은 점은 나무가 가지를 만들 듯, 원하는 이미지를 기반으로 계속 새로운 이미지를 생성할 수 있다. 부모의 이미지를 수정하면 자식들은 모두 영향을 받게 된다.


## 이미지 만들기

### 도커 파일
- 도커파일은 텍스트 파일이다.
- FROM은 부모 이미지를 가르킨다. 
- 도커파일에는 이미지를 만들 설정들을 작성한다.

### 컨테이너<->이미지
- 이미지를 통해 컨테이너를 실행시키고 나서, 컨테이너에서 여라가지 수정 작업을 하고 COMMIT을 하고, 수정사항을 반영한 이미지로 변환할 수 있다.


## 컨테이너, 이미지, 도커파일 통합

### Docker Host
- 레지스트리와 소통하는 이미지 캐시를 가지고 있다. 
- Dcoker Client와 소통하는 deamon이 있다. 
- 볼륨을 가지고 있다. 
- 가상 네트워크도 구축되어 있다.

### Registry
- 이미지들을 저장하고 관리. docker host가 이미지를 pull, push 한다.

### Docker Client
- docker host의 deamon과 API로 소통한다. PULL, RUN , CREATE, COMMIT 등. 
- 컨테이너의 network와 storage 설정할 수 있다. 
- storage 설정은 docker host의 볼륨을 만든다. 
- 컨테이너 라이프사이클도 지시할 수 있다.

## 참고
- [What is a Container?, youtube, VMware Cloud Native Apps](https://www.youtube.com/watch?v=EnJ7qX9fkcU)
- [Docker란 무엇일까요?, Red Hat](https://www.redhat.com/ko/topics/containers/what-is-docker)