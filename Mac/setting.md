# 맥북 세팅

## 사양
- Apple M3 Pro
- 메모리 36GB
- Sonoma 14.4

## 참고자료
- https://www.robinwieruch.de/mac-setup-web-development/

## 시스템 설정
- 화면 모드 Appearance
	- 다크 모드
	- 스크롤 막대 보기: 항상

- 데스크톱 및 Dock
	- 시스템설정이 아닌 현재 Dock 바에 기본적으로 dock 유지 되어 있는 어플리케이션 제거
		- Dock 바에 아이콘 위 커서 두고 오른쪽 클릭 > 옵션 > Dock 유지 끄기
	- Dock 크기: level 2 로 축소
	- 확대: 끔
	- 자동으로 Dock 가리기와 보기 on
	- Dock 에서 제안된 앱 및 최근 앱 보기 off
	- 기본 웹 브라우저: Chorme
	- 핫코너
		- 다 끄기 (-)
- 제어 센터
	- 배터리: 퍼센트로 보기
- Tocuh ID 및 암호
	- 지문 등록
- 알림
	- 캘린더 말고 모두 off
- Siri
	- off
- 트랙패드
	- 포인트 및 클릭 메뉴 탭(기본탭)
		- 탭하여 클릭하기 on
		- 찾아보기 및 데이터 탐색기 off
	- 추가 제스쳐 탭
		- 알림센터 off
- 키보드
	- 텍스트 입력 섹션 > 입력 소스 > 편집
		- Caps Lock 키로 ABC 입력소스 전환 off
			- 오른쪽 Command 로 한영 전환(입력소스 전환) 설정한 경우 off 하기 kabainer
		- 맞춤법 자동 수정 off
		- 자동으로 단어를 대문자로 시작 off
		- 스페이스를 두 번 눌러 마침표 추가 off
		- 큰 따음표 변경:  "" 로 변경
		- 작은 따음표: '' 로 변경
	- 키보드 단축키
		- Launchpad 및 dock
			- Lanchpad 보기 off
		- 입력소스
			- 이전 입력 소스 선택: F18
				- 오른쪽 Command 를 한영전환으로 설정한 경우 kabainer
			- 입력 메뉴에서 다음 소스 선택: off
		- 기능키
			- F1, F2 등의 키를 표준 기능키로 사용: on
				- as-is: fn + f1 해야 f1 펑션키로 작동됨
				- to-be: f1
- 핫 코너
	- '핫 코너'라고 검색해서 설정 열기
	- 모두 off
- Finder
	- finder 앱 열어서 상단바에서 Finder 오른쪽 클릭 -> 설정 열기
	- 일반 탭
		- 데스크탑 항목 보기: 모두 off
		- 새로운 Finder 윈도우에서 보기: 다운로드
	- 태그 탭
		- 모두 off
	- 사이드바
		- 즐겨찾기
			- 응용프로그램, 데스크탑, 문서, 다운로드, 그림, (사용자디렉토리)
			- finder 열어서 라이브러리 디렉토리를 Favorites 로 등록
	- 고급
		- 모든 파일 확장자 보기 on
		- 휴지통에서 30일이 지난 항목 제거 on
	- finder 열어서 상단바에 보기 > 미리보기  on
- 일반 > 공유
	- 모든 항목 off
	- 맨 하단에 '로컬 호스트 이름' 설정
		- 대안으로 터미널로 설정하는 방법
			- sudo scutil --set ComputerName "newname"
			- sudo scutil --set LocalHostName "newname"
			- sudo scutil --set HostName "newname"
- 트랙패드
	- 이동속도 9/10
- 손쉬운 사용 > 포인터 제어기
	- 트랙패드 옵션: 스크롤 속도 6/8

## 터미널로 시스템 설정
```
# take screenshots as jpg (usually smaller size) and not png
# 스크린샷 파일 저장 시 JPF 로 저장. 나중에 공유하거나 업로드 시 더 작은 사이즈로 변환하기 번거롭기 때문에.
defaults write com.apple.screencapture type jpg

# do not open previous previewed files (e.g. PDFs) when opening a new one
defaults write com.apple.Preview ApplePersistenceIgnoreState YES

# show Library folder
# 라이브리러리 디렉토리 보이기
chflags nohidden ~/Library

# show hidden files
# 숨긴파일 보기
defaults write com.apple.finder AppleShowAllFiles YES

# show path bar
# 경로 바 보이기
defaults write com.apple.finder ShowPathbar -bool true

# show status bar
defaults write com.apple.finder ShowStatusBar -bool true

killall Finder;
```

## 앱 설치

### homebrew
```
# paste in terminal and follow the instructions

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew update
```

```
brew install --cask \
  raycast \
  bitwarden \
  google-chrome  \
  firefox \
  iterm2 \
  visual-studio-code \
  docker \
  rectangle \
  slack \
  vlc \
  calibre \
  imageoptim \
  maccy \
```
- RayCast 
	- spotlight 대체제 
	- 설정 
		- on 하기
			- 파일 검색
			- 스냅펫
			- 시스템
		- 단축키
			- CMD + Space 로 spotlight 대체하기
- Bitwarden
	- 비밀번호 저장 및 자동완성 앱
	- 설정
		- 다크모드 on
		- 터치 ID on
- Iterm2
	- 터미널
- rectangle
	- 창 배치 유틸
	- 
- Visual Studio Code
- VLC: 비디오 플레이어
- Maccy
	- 클랩보드 매니저
	- 설정
		- 로그인 시 열기 on

## 터미널 전용 앱 설치
```
brew install \
  wget \
  exa \
  git \
  cmatrix
```
- wget
	- curl 대체제
- exa
	- ls 대체제
- git
	- vcs
- cmatrix
	- 터미널 화면보호기

## Iterm2 세팅
- Make iterm2 Default Term
- Preferences ->
    - General -> Window
        - unselect "Native full screen windows"
        - select "close windows when closing an app"
    - Appearance ->
        - Windows
            - select "Hide scrollbars"
        - Tabs
            - unselect "Show tab bar in fullscreen"
        - Dimming
            - Unselect all dimming
    - Profiles -> Window
        - Transparency: 30
        - Style: Full Screen
        - Screen: Main Screen
    - Profiles -> Advanced
        - Semantic History -> Open with editor ... -> VS Code
    - [Open new split pane with current directory](https://apple.stackexchange.com/a/337386)
    - [Natural Text Editing](https://apple.stackexchange.com/a/293988)
- Bring it to fullscreen Command + Enters

## Oh My Zsh 설정
```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

omz update

source ~/.zshrc

brew install starship

echo 'eval "$(starship init zsh)"' >> ~/.zshrc

brew tap homebrew/cask-fonts
brew install --cask font-hack-nerd-font
```
### 플러그인 설치
- [zsh-completions](https://github.com/zsh-users/zsh-completions)
- [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

### .zshrc 파일

```
# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
  git
  zsh-completions
  zsh-autosuggestions
  zsh-syntax-highlighting
)

# get machine's ip address
alias ip="ipconfig getifaddr en0"

# edit global zsh configuration
alias zshconfig="vim ~/.zshrc"
# reload zsh configuration
alias zshsource="source ~/.zshrc"
# reload zsh configuration
alias ohmyzsh="cd ~/.oh-my-zsh"

# navigate to global ssh directory
alias sshhome="cd ~/.ssh"
# edit global ssh configuration
alias sshconfig="vim ~/.ssh/config"

# edit global git configuration
alias gitconfig="vim ~/.gitconfig"

# git aliases
alias gits="git status"
alias gitd="git diff"
alias gitl="git lg"
alias gita="git add ."
alias gitc="cz commit"

alias loc="npx sloc --format cli-table --format-option head --exclude 'build|\.svg$\.xml' ./"

# load zsh-completions
autoload -U compinit && compinit

# use nvm
source /opt/homebrew/opt/nvm/nvm.sh

# use starship theme (needs to be at the end)
eval "$(starship init zsh)"
```


## Git
```
git config --global user.name "Your Name"
git config --global user.email "you@your-domain.com"
```
```
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

```
git config --global init.defaultBranch main
```

## SSH

```
# in case the folder is not there yet
mkdir ~/.ssh

cd ~/.ssh
# or alias
# sshhome

ssh-keygen -t ed25519 -C "ssh 키 파일 이름"


# copy public key and add it to https://github.com/
cat ~/.ssh/{ssh 키 파일 이름}.pub | pbcopy
```

