# Oh-My-Zsh 설치하기
- ZSH: 오픈소스 커뮤니티에서 관리되는 bash 대체 Shell. 기존 bash 쉘보다 다양한 플러그인과 설정을 할 수 있어서 유용하다.
- Oh-My-Zsh: ZSH 설정을 편리하게 관리하기 위해 만든 zsh 기반 프레임워크이다. 다양한 플러그인들과 테마를 사용할 수 있다.

## 설치법

### 1. ZSH 쉘 설치

```bash
sudo apt isntall zsh
```

### 2. Oh-My-Zsh 설치

1. [Oh-My-Zsh 공식 페이지](https://github.com/ohmyzsh/ohmyzsh)에 나와있듯이 curl 또는 wget 명령어를 통해 커맨드 한 줄로 설치를 할 수 있다.

    Curl 사용 시, 설치 명령어  
    ```bash
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    ```

    Wget 사용 시, 설치 명령어  
    ```bash
    sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    ```

1. 기본 쉘로 설정할 것인지 물어볼텐데, `Y`로 응답하면 기본 쉘로 자동설정이 된다. 
1. 그 다음으로 기본 쉘 설정을 변경하기 위해 비밀번호를 물어볼텐데, root 비밀번호를 입력하면 된다. 1. 로그아웃하고 다시 로그인을 해야 기본쉘로 적용된다. 혹시 자동으로 변경이 안됐을 시, 수동으로 다음 명령어를 통해 Shell 변경이 가능하다.
```bash
$sudo chsh -s $(which zsh) $(whoami)
```

## 테마 설정

### 1. 테마에 쓰일 아이콘 설치
oh-my-zsh 테마의 커맨드라인에 아이콘이 사용됨으로 설치가 필요하다.
```bash
sudo apt install fonts-powerline
```

### 2. Oh-My-Zsh 테마 설정
1. 설정 파일을 연다
    ```bash
    sudo vim ~/.zshrc
    ```
1. 테마를 변경하고 설정파일을 저장한다.

    ```bash
    ZSH_THEME="agnoster".
    ```

1. 커맨드라인 앞에 계정명과 호스트명이 나오는 것을 생략하고 싶을 땐, `prompt context`를 주석처리하면 된다.
    ```bash
    sudo vim ~/.oh-my-zsh/themes/agnoster.zsh-theme
    ```
    ```bash
    ### Main Prompt
    #prompt context
    ```


