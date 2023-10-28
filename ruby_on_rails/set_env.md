# Rails 프로젝트 환경 구성

## puma-dev

puma-dev 는 개발환경에서 웹앱 서버를 돌릴 수 있는 도구이다. 

```bash
$ puma-dev link -n {프로젝트명}

# 예시
$ puma-dev link -n {도메인명}
$ puma-dev link -n {도메인명}
```

작동결과는 프로젝트의 경로를 심볼릭 링크로 생성해서 puma-dev가 참조하는 디렉토리에 넣는다.  `~./puma-dev/{프로젝트명}` [puma-dev 자세히보기](https://github.com/puma/puma-dev)


## Overmind

오버마인드는 Procfile 기반 어플리케이션과 tmux를 위한 프로세스 관리자이다. `Procfile` 을  통해 여러 프로세스들을 단 한 개의 터미널로 쉽게 실행시킬 수 있다.


## 배포
[Kamel Gem](https://github.com/basecamp/kamal) 을 통해 배포를 합니다. 

```
kamel deploy -d production
```

배포 관련 설정 파일
```
/config/deploy.yml
/config/deploy-production.yml
```


ssh 인스턴스 접속 설정
```
```

## 과정
1. 도커로 빌드
2. 이미지 AWS 레지스트리 업로드
3. ssh 로 인스턴스 접속해서 배포 스크립트 진행
4. 

