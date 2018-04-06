# GIT 메모

## Git repository 만들기
1. `git init <project name>`

## git 사용자 정보 변경
- `git config --global user.name "이름"`
- `git config --glboal user.email "이메일"`

## Pull Request
1. 깃헙에서 대상 repository를 fork 한다.
2. 내 계정으로 포크된 리포지토리를 clone 한다.  
`git clone <리포지토리 주소>`
3. 버전 업데이트 확인   
`git pull origin master`
4. 토픽 브랜치 생성  
`git checkout -b topic-name`
5. 브랜치 설정 확인    
`git branch`
6. 소스 코드 수정
7. 변경 사항 확인   
`git diff --words-diff`
8. 스테이징 and 커밋  
`git commit -a -m "커밋메시지"`
9. 깃헙에 푸쉬
`git push origin topic-name`
10. 깃헙 페이지에서 Pull request 활성화 버튼 클릭
11. 게시물 작성

## Unstaged(staged 취소)
`git reset [파일명]`;

## commit 되돌리기
1. `git log`를 통해 commmit 번호 알아내기
2. `git reset [commit 번호]`

## staged 와 commit 비교
`git diff --cached` 또는 `git diff --staged`