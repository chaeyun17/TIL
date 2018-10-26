# metasfresh 설계구조

## 용어

- JMS: java message service. 컴포넌트들 간 메시지 통신
- NETP: [Net Permission](https://docs.oracle.com/javase/7/docs/api/java/net/NetPermission.html). 네트워크 허가 이름을 담고 있다. ex) allowHttpTrace, getCookieHandler, requestPasswordAuthentication
- EDI: 전자 데이터 교환. 표준화된 기업과 기업 또는 기업과 행정 관청 사이의 행정 문서를 통신 표준에 따라
컴퓨터를 통해 교환하는 방식. ex) 정부전자문서
- [JASPER](https://en.wikipedia.org/wiki/JasperReports): JasperReports is an open source Java reporting tool that can write to a variety of targets, such as: screen, a printer, into PDF, HTML, Microsoft Excel, RTF, ODT, Comma-separated values or XML files.
- maven/dependency management: 여러 개의 자식 프로젝트를 가진 부모 프로젝트가 있는 구조에서, 부모 POM 에서 자식 POM의 dependency들을 관리할 수 있다. 부모 POM에서 자식에서 쓰는 dependency들의 정보들을 적는다. 자식 POM 에서는 group, aritifactId, scope와 같은 간단한 정보만 명시하면 된다.
- maven/modules: ...

## Technical Architecture

- WebUI: 프론트엔드. 클라이언트에게 직접적으로 데이터를 보여주는 UI만 담당.
- Search & Analytics: Data Object을 가지고 데이터를 검색 또는 분석 담당. NETP를 통해 AppServer로부터 허가를 얻고, WebUi 모듈을 통해 데이터를 받아서 분석 또는 검색함.
- WebAPI: REST API. Restful 통신을 담당. 
- App Server: 여러 작업들을 처리하는 비지니스 로직을 담당하는 모듈. 비동기통신도 담당. Jasper를 통해 Integration Server에 출력할 문서나 전자문서를 보냄. 통신은 JSM를 사용.
- DB Server: PostgreSQL 사용. WEBAPI 와 App Server와 통신.

## 모듈 분석
- metasfresh parent
  - de.metas.parent.general: 메이븐 프로젝트들이 전반적으로 사용하는 공통 세팅들. jdk, assertj, jasper report, itext, spring boot admin, spriingfox-swagger 버전 정보. 하위 모듈 `assemblies`에 xml 형식으로 설정값들이 저장되어 있음.

### metasfresh-parent
[metasfresh-parent](https://github.com/metasfresh/metasfresh-parent).  
프로젝트들의 전반적으로 사용하는 버전 정보들과 설정값들. assemblies 모듈에 있음.

### metasfresh-dist
[metasfresh-dist](https://github.com/metasfresh/metasfresh-dist). 배포를 위한 프로젝트.  
This repository contains what is needed to generate a districubtable tar.gz file whicxh cotanins.
- the backend service
- the swing client
- the webui API service
- the webui frontend javascript (can be deployed to apache)
- a number of smaller artifacts

### metasfresh-weebui-frontend
- react 프로젝트. UI를 컴포넌트 별로 정리. maven 프로젝트 아님. metasfresh-webui-api와 연동하는 듯.
- axios를 통해 RestAPI 방식으로 서버와 통신

### metasfresh-webui-api
- webui-frontend의 API 서비스를 담당. Maven project임.
- Elasticsearch 를 사용하여 데이터 검색 분석. JSON 형식을 사용. HTTP로 통신. JAVA로 개발.
- RestAPI 서버
- Swagger: open-source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services. 
- spring fox: The Springfox suite of java libraries are all about automating the generation of machine and human readable specifications for JSON APIs written using the spring family of projects.

### metasfresh-procurement-webui
- metasfresh와 통신하는 독립적인 모바일 웹 UI 이다.
- 판매자와 생산자들이 물자들을 보고할 수 있다. 이 물자 보고는 meatasfresh ERP 에 전송된다. 
- 조달 후보 데이터 구조에 전송된다.
- metasfresh 유저들은 보고된 데이터를 확인하고 주문을 만들 수 있다.
- vaadin, spring boot 자바 웹 프레임워크를 사용한다.

### metasfresh
- 핵심.