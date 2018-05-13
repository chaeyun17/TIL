# 우분투 자주 쓰는 명령어

## 프로세스 관리
`htop`

## zip 압축풀기
`unzip 압축파일명`
`unzip 압축파일명 -d 압축풀장소`

## BOOT 용량 초과일 시
리눅스 커널 업데이트 파일들이 많아서 발생한다. 현재 버전과 오랜된 버전(백업용)은 놓아두고 그 외 버전을 삭제한다.
1. `uname -r` : 현재 커널 버전을 확인한다.
2. `dpkg -S vmlinuz` : 설치된 커널 버전들을 체크
3. 현재 버전과 제일 오래된 버전을 제외하고 하나씩 제거를 시작한다.
4. `dpkg -l "*3.13.0.29*"` : 해당 버전에 관련된 패키지들의 리스트
5. `sudo apt-get purge 삭제할패키지명` : 패키지를 삭제한다.

[출처 블로그](http://mizzhinp.tistory.com/entry/UBUNTU-%EC%9A%B0%EB%B6%84%ED%88%AC-BOOT-%EC%9A%A9%EB%9F%89%ED%99%95%EB%B3%B4-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%ED%98%B9%EC%9D%80-%EB%B6%80%ED%8C%85%EC%9D%B4-%EC%95%88%EB%90%A0%EB%95%8C)

## 각 파티션 별로 용량 확인
- `df`
- `df -h` : 사람이 보기에 편하게 출력

[출처 블로그](http://ngee.tistory.com/377)
