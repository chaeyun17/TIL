# 어떻게 설치할 것인가?

개발용 코드를 다운을 받아서 실행하는 방법입니다. 원할한 이용을 위한 목적이면, 우분투 또는 DOCKER를 사용하여 간편하게 설치하고 이용할 수 있습니다. 방법은 metafresh 공식 홈페이지에 안내가 있습니다.

## 설명서

영어라서 이 문서를 만들게 됐습니다. 영어를 잘하시면 따라보고 하시길 추천드립니다.

- 가이드북: [metasfresh documentation](http://docs.metasfresh.org/index.html)
- 개발자 가이드: [Developer's Tag Index](http://docs.metasfresh.org/pages/developers/index_en)


## 첫째, 코드 다운로드

- https://github.com/metasfresh/metasfresh-parent
- https://github.com/metasfresh/metasfresh
- https://github.com/metasfresh/metasfresh-webui
- https://github.com/metasfresh/metasfresh-procurement-webui
- https://github.com/metasfresh/metasfresh-webui-frontend
- https://github.com/metasfresh/metasfresh-dist

한 폴더에 해당 프로젝트를 모아두기를 추천드립니다. 공식문서에서는 `C:\developement\repos` 폴더를 생성해서 한 곳에서 관리하고 있습니다.
예시: `C:\developement\repos\metasfresh` , `C:\developement\repos\metasfresh-parent`


## 둘째, Maven 세팅하기

`C:\Users\사용자명\.m2` 폴더 안에 `settings.xml` 파일을 생성하세요. 기존 settings.xml이 있다면, `<profile>`과 `<activeProfiles>`만 추가하시면 됩니다.

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!-- Licensed under http://www.apache.org/licenses/LICENSE-2.0 -->
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
  <!-- localRepository
   The path to the local repository maven will use to store artifacts.
	 Default: ~/.m2/repository
	 If you have more than one local (eclipse-)workspace, it might make sense to have one local repo per-workspace, to avoid inconsistencies.
	<localRepository>${user.home}\.m2\mvn-eclipse-ws-1</localRepository>
  -->
	<profiles>
		<profile>
			<id>env-dev</id>
			<properties>
				<!--
				Go with 10.0.0.0 if you have all metasfresh projects in your workspace anyways
				The maven repo does not contain any metasfresh artifact with this version, so m2e will just download various maven-metadata.xml files,
				but not the binary artifacts
				-->
				<metasfresh.version>10.0.0</metasfresh.version>
				<!--
				Use this version range if you have only a few metasfresh projects in your workspace
				*or* if from time to time you need to build individual modules from command line
				m2e will download the ones that are missing from the repository, but prefer the ones that are in your workspace
        Warning: those ranges can give the m2e plugin even more problems than the fixed version
				<metasfresh.version>[1,10.0.0]</metasfresh.version>
				-->
			</properties>

			<repositories>
				<repository>
					<id>metasfresh-repo</id>
					<releases>
						<enabled>true</enabled>
						<updatePolicy>always</updatePolicy>
						<checksumPolicy>warn</checksumPolicy>
					</releases>
					<url>https://repo.metasfresh.com/content/groups/mvn-master/</url>
				</repository>
			</repositories>
		</profile>

	</profiles>

	<activeProfiles>
		<activeProfile>env-dev</activeProfile>
	</activeProfiles>
</settings>
```


## 셋째, IDE에 코드를 추가하기

- [이클립스](http://www.eclipse.org/) 홈페이지를 통해 Eclipse IDE for jAVA Deveolpers 를 다운 받기를 추천드립니다. JAVA EE 버전은 불필요한 요소들이 많아서 느릴 수도 있기 때문입니다.
- [lombok](https://projectlombok.org/)을 설치하세요. 코드를 간결화를 위해 lombok를 사용하고 있습니다. 
- `eclipse.ini`를 수정하세요. 기본 이클립스는 JRE로 실행될 수도 있습니다. 선택한 버전의 JDK로 실행하기 위해 필요한 설정입니다. 
	```ini
	[...]
	--launcher.appendVmargs
	-vm
	C:\Program Files\Java\jdk1.8.0_131\bin\javaw.exe
	-vmargs
	-Dosgi.requiredJavaVersion=1.8
	-Dosgi.instance.area.default=@user.home/eclipse-workspace
	[...]
	```
- 'help -> install new software' 에서 플러그인 설치  
m2e connector for the build-helper-maven-plugin https://repository.sonatype.org/content/repositories/forge-sites/m2e-extras/0.15.0/N/0.15.0.201206251206/ 
- 프로젝트 폴더 import 하세요


