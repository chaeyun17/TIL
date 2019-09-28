# Rsync

## 소개

Rsync는 FTP 없이 서버 간 파일들을 이동할 수 있는 간단한 방법 중 하나 입니다. 두 서버 간 연결은 SSH 프로토콜을 이용합니다. Rsync Daemon은 자신만의 프로토콜과 특정한 Port 번호를 사용합니다. 

## Rsync Command

- `-d` : move only directory
- `-r` : recursively copy over all files and subfolders
- `-t` : copy date and time that the file was last changed.
- `-u` : only sync different/changed/added files from source to the destination.
- `--log-file=FILE` : 로그 파일 생성. FILE에 파일 경로 이름.

        chaeyun@SNMPTester:~$ rsync -rdt rsync://192.168.55.149:12000/files/ ./dest/ --log-file=mylog.log
        chaeyun@SNMPTester:~$ cat mylog.log
        2019/08/26 15:22:30 [10121] receiving file list
        2019/08/26 15:22:30 [10121] sent 29 bytes  received 104 bytes  total size 0

- `-e` : 사용하길 원하는 프로토콜.  ssh

    예시: `rsync -avzhe ssh [root@192.168.0.100](mailto:root@192.168.0.100):/root/install.log /tmp/`

- `–bwlimit` : 대역폭 제한. 단위 KBPS
    - 예시: `rsync --bwlimit=100 -avzhe ssh /var/lib/rpm/ [root@192.168.0.100](mailto:root@192.168.0.100):/root/tmprpm/`
- `rsync -rt /home/transfer_me root@x.x.x.x:/home`

## Rsync Daemon

### 세팅

1. `/etc/rsyncd.conf`  생성

        pid file = /var/run/rsyncd.pid
        lock file = /var/run/rsync.lock
        log file = /var/log/rsync.log
        port = 12000
        
        [files]
        path = /home/public_rsync
        comment = RSYNC FILES
        read only = true
        timeout = 300

    `pid file`: The process id file the daemon uses.

    `lock file`: The daemon lock file.

    `log file`: The location of the log file.

    `port`: If you do not want the rsync daemon to run on its default port (873) then you may specify a new port here. Make sure this port is open in your firewall. Rsync uses the TCP protocol for its transfers.

    `[files]`: 모듈 이름. Rsync Pull 명령어의 소스 경로(/files/../..). 여러 경로도 설정 가능.

    `path`: The file path for files associated with this module.

    `comment`: Descriptive comment for this module.

    `read only`: This tells the daemon the directory for this module is read-only. You cannot upload to it. For upload only, use upload only = true.

    `timeout`: Time, in seconds, the rsync daemon will wait before terminating a dead conenction.

    This is just a basic configuration. For a more detailed list of options, see the [manual page](http://linux.die.net/man/5/rsyncd.conf).

2. 실행 `rsync --daemon`

    실행 확인: `ps x | grep rsync`

    중지: `cat /var/run/rsyncd.pid`

3. Rsync 디렉토리 테스트

    `rsync -rdt rsync://IPADDR:RsyncPort/`

    `rsync -rdt rsync://IPADDR:RsyncPort/DirectoryName`

    `rsync -rdt rsync://IPADDR:RsyncPort/DirectoryName/File /DestinationDirectory/`

4. Rsync Daemon에 유저이름과 비밀번호 설정
    1. `/etc/rsyncd.conf` 열어서 수정

        [files]
        path = /home/public_rsync
        comment = RSYNC FILES
        read only = true
        timeout = 300
        auth users = rsync1,rsync2
        secrets file = /etc/rsyncd.secrets

    `auth users`: 유저 목록. 콤마 `,` 로 분리. They do not necessarily need to exist on the system, but they do need to exist in the secrets file.

    `secrets file`: usernames and passwords 의 목록을 담은 secrets file 경로. 

    2. 시크릿 파일 생성

    `/etc/rsyncd.secrets` 생성 또는 열기

    `username:password` 형식  

        rsync1:9$AZv2%5D29S740kz
        rsync2:Xyb#vbfUQR0og0$6
        rsync3:VU&A1We5DEa8M6^8  

    3. root 유저만 시크릿 파일을 열 수 있도록 권한 설정

    `chmod 600 /etc/rsyncd.secrets`

### Pull

- rsync [-options] rsync://user@x.x.x.x[:PORT]SOURCE DESTINATION
- rsync [-options] user@x.x.x.x::SOURCE DESTINATION

### push

- rsync [-options] SOURCE rsync://user@x.x.x.x[:PORT]DESTINATION
- rsync [-options] SOURCE user@x.x.x.x::DESTINATION

### example

- rsync -rt rsync://root@x.x.x.x:873/files/ /home/pulledfromdaemon

## 참고

[How to Use Rsync to Copy/Sync Files Between Servers: A Guide](https://www.atlantic.net/hipaa-compliant-cloud-storage/how-to-use-rsync-copy-sync-files-servers/)

[How to Set Up an Rsync Daemon on Your Linux Server](https://www.atlantic.net/hipaa-compliant-cloud-storage/how-to-setup-rsync-daemon-linux-server/)

[rsync(1) - Linux man page](https://linux.die.net/man/1/rsync)

[Rsync (Remote Sync): 10 Practical Examples of Rsync Command in Linux](https://www.tecmint.com/rsync-local-remote-file-synchronization-commands/)