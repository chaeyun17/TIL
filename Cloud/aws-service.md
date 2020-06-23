# AWS Service
AWS 서비스 제품들 사용법


## CodeBuild

빌드 자동화 서비스. Repository(Github, AWS CodeCommit, etc)에 변경사항이 발생하면 소스코드를 가져와서 빌드 작업을 수행한다. 빌드 결과물을 S3 스토리지에 저장할 수 있다. 

### CodeBuild 만들기

1. 빌드 프로젝트 생성한다.
2. 프로젝트 이름, 설명 기입한다.
3. `소스` 섹션에서는 소스코드를 어디서 가져올 것인지 설정한다. Github일 경우는 OAuth를 통해 연동한다.
4. `환경` 섹션에서는 소스코드를 빌드할 컴퓨팅 환경을 설정한다. 먼저 이미지를 선택해야 하는데 이 이미지는 어떤 환경 이미지인지 선택하는 것이다. 모르겠다면, 기본형인 '관리형 이미지'를 선택한다.
5. 서비스 역할에서 AMI 서비스 Role을 설정한다. 선택가능한 리스트가 안 뜬다면, IAM에서 CodeBuild 서비스용 Role을 생성b한다. 역할이름을 기입한다.
6. `Buildspec` 섹션에서는 소스 프로젝트에 `buildspec.yml` 파일을 생성해서 설정할 것인지, 여기서 설정값을 기입할 것인지 선택하는 것이다. BuildSpec은 어떤 도구(JDK, NodeJS)로, 어떤 명령어로 빌드할 것인지, 각 빌드 단계별로 어떤 작업을 수행할 것인지, 그리고 생성된 빌드 파일을 어떻게 처리할 것인지를 설정한다.
7. `로그` 섹션에서는 빌드 진행 로그를 어떻게 처리할 것인지 설정한다. CloudWatch 서비스를 사용하면 과금이 발생한다. 프리티어일 경우는 일정량 무료이다.
8. 빌드 프로젝트 생성 버튼 클릭.

### 설정 파일
아래는 예시
```yml
version: 0.2

phases:
  install:
    runtime-versions:
      java: corretto11
  install:
    runtime-versions:
      nodejs: 10
  pre_build:
    commands:
      - echo Test started on `date`
      - ./gradlew test
  build:
    commands:
      - echo Build completed on `date`
      - ./gradlew bootJar
artifacts:
  files:
    - build/libs/bank_account_management-0.0.1-SNAPSHOT.jar
    - appspec.yml
    - scripts/*
  name: bank-account-management
  discard-paths: yes
```

## CodeDeploy 

빌드한 파일 또는 소스코드를 자동으로 배포하는 서비스. Github 레포지토리 또는 S3와 같은 스토리지에서 파일을 가져와서 EC2 또는 ECS 등 클라우드 컴퓨팅에 배포할 수 있다.

### CodeDeploy 만들기

1. 어플리케이션 생성하기
2. 이름 입력, 배포할 장소인 컴퓨팅 플랫폼 선택. EC2에 배포하고 싶다면 EC2 선택.
3. 배포 그룹 생성하기
4. 배포 그룹 이름 입력.
5. `서비스 역할` 설정. 선택지가 없다면, IAM 서비스에서 CodeDeploy 서비스용 Role을 생성해서 ARN 입력
6. `배포 유형` 설정. 잘 모르겠다면 '현재 위치' 선택. 블루/그린 방식은 새 업데이트가 반영된 앱은 새로운 인스턴스를 생성해서 배포하게 된다. 그렇게 하면 이전 버전 앱과 새 버전의 앱이 공존하게 되서 중단없는 서비스가 가능하다. 자세한 것은 '블루/그린' 서비스 방식을 검색
7. `환경 구성`에서는 배포 대상인 환경을 선택한다. 배포 대상인 EC2가 존재한다면 선택사항에 표시된다. 없다면 EC2를 생성해서 설정한다.
8. `배포 설정`에는 기본값인 AllAtOnece를 선택한다.
9. `로드 밸런서`에서는 로그 블런싱 활성화를 체크 해제한다.
10. 배포 그룹 생성 클릭.

### 설정 파일
예시
```yml
# appspec.yml
version: 0.0
os: linux
files:
  - source: /
    destination: /home/ubuntu/deploy/bank_account/
hooks:
  BeforeInstall:
    - location: clean.sh
      timeout: 150
      runas: root
  ApplicationStart:
    - location: start_server.sh
      timeout: 150
      runas: root
  ApplicationStop:
    - location: stop_server.sh
      timeout: 150
      runas: root
```


## CodePipeline

CodeBuild 와 CodeDeploy 를 자동으로 연동한 CI/CD 기능 서비스이다. 

### CodePipeline 만들기

1. 파이프라인 입력
2. `서비스 역할` 설정. IAM 서비스에 관한 Role 설정.
3. `고급 설정`에서는 빌드 결과물(아티팩트)를 어디에 저장할 것인지 설정한다. S3 버킷이 이미 있다면, 미리 만들어둔 버킷을 설정한다. 없다면 자동생성인 '기본 위치'를 선택한다.
4. `소스 공급자`에서는 말그대로 소스파일을 가져올 곳을 선택한다. 빌드에 해당하는 스테이지이기 때문에, Github을 선택한다. 레포지토리 연동작업을 한다. 변경 감지 옵션을 선택한다.
5. `빌드 공급자`에서는 빌드 작업을 수행할 서비스를 지정한다. AWS의 CodeBuild를 선택할 수 있고, Jenkins도 사용할 수 있다.
6. `빌드 공급자`로 CodeBuild를 선택하면, 만들어둔 CodeBuild 프로젝트를 선택한다. 없다면 CodeBuild 서비스에서 새로 생성한다.
7. `배포`에서는 배포 설정을 한다. CodeDeploy를 선택한다. 그리고 만들어둔 CodeDeploy 어플리케이션을 선택한다. 없다면 새로 생성한다. Code Deploy Group도 동일하다.
8. 파이프라인을 생성한다.