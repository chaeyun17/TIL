# 루비 설치하기
루비를 설치하는 방법은 2가지가 있다. 패키지 매니저로 간단히 설치하는 법과 rbenv 도구를 사용하여 ruby 버전을 관리하는 법이 있다.

## 패키지 매니저로 설치하는 방법
```
sudo apt update
sudo apt install ruby-full
ruby --version
```

## Rbenv 사용하여 설치하기
rbenv을 설치하고 ruby-build 플러그인도 설치해야 ruby를 간단히 설치할 수 있다.

```bash
sudo apt update
sudo apt install git curl autoconf bison build-essential \
    libssl-dev libyaml-dev libreadline6-dev zlib1g-dev \
    libncurses5-dev libffi-dev libgdbm6 libgdbm-dev libdb-dev
```
```bash
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer | bash
```
rbenv와 ruby-build 두 가지를 동시에 설치하는 명령어이다. 설치 장소는 `~/.rbenv` 이다.

bash 사용시에는
```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
```

zsh 사용시에는
```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
source ~/.zshrc
```

잘 설치가 되었는지 버전을 확인한다.
```
rbenv -v
```


어떤 버전의 루비를 설치할 것인지 목록을 우선 살펴본다.
```
rbenv install -l
```

그 중에 한 버전을 선택하여 설치하고, 기본 버전을 설정한다.
```
rbenv install 2.7.1
rbenv global 2.7.1
```

## 출처
- https://linuxize.com/post/how-to-install-ruby-on-ubuntu-20-04/