# GIT 메모
## 참고자료
- [누구나 쉽게 이해할 수 있는 git 입문](https://backlog.com/git-tutorial/kr/)
- [pro git](https://git-scm.com/book/ko/v1)

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
참고: ["Git diff 사용하기"](http://hochulshin.com/git-diff/)

## Branch
- 생성: `git branch 브랜치명`
- 전환: `git checkout 사용할브랜치명`
- 생성&전환: `git checkout -b <branch>`

## push 취소
1. git reset HEAD^
2. git commit -m "Write commit messages"
3. git push origin [branch name] -f

### 참고자료
- https://gmlwjd9405.github.io/2018/05/25/git-add-cancle.html

## Up to date forked project
1. fork한 프로젝트를 로컬로 클론한다.
`git clone [ssh://~]`
1. 프로젝트 디렉토리로 이동한다. 
`cd ./cloned-project`
1. 본 프로젝트 원격 저장소를 설정한다.
`git remote add upstream [ssh://git@~]`
1. 본 프로젝트 원격 저장소로부터 fetch. 본 프로젝트의 branch들이 생성된다.
`git fetch upstream`
1. branch를 생성하고 checkout 한다.
`git branch [target_branch]`
`git checkout [target_branch]`
1. 해당 branch에 upstream/target_branch 를 병합한다.
`git merge upstream/target_branch`

또는

`git checkout [remote_branch] --track [remote]/[remote_branch]`


#### 참고
- https://gist.github.com/CristinaSolana/1885435
- https://help.github.com/en/articles/syncing-a-fork
- https://stackoverflow.com/questions/1709177/git-pull-a-certain-branch-from-github