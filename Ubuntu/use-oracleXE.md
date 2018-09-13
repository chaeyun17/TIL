# UBUNTU SERVER에 ORACLE 11G XE 사용하기

## 준비물
- putty로 ubuntu server 원격 접속 제어

## 방법

1. oracle 11g xe linux 버전을 오라클 홈페이지에서 다운 받는다.
	- http://www.oracle.com/technetwork/database/database-technologies/express-edition/downloads/index.html

2. pscp 로 다운로드한 파일을 서버로 전송
	- `pscp ./oracle-xe-11.2.0-1.0.x86_64.rpm.zip yun@192.168.9.133:/home/yun/Downloads`
	
3. rpm 파일을 deb 파일로 변경하기 위한 유틸리티 프로그램 다운로드
	- `sudo apt-get install -y alien libaio1 unixodbc`
	- ubuntu 18.04 server 에서는 패키지 설치를 못할 수도 있다. `E: Unable to locate package` 
	이럴 때는 universe를 추가한다. `sudo add-apt-repository universe`
	- `.rpm.zip`인 경우. `sudo apt-get install zip unzip`을 설치하여 zip 압축을 먼저 푼다.

4. rpm 파일을 dev 파일로 변경
	- `sudo alien --scripts -d oracle-xe-11.2.0-1.0.x86_64.rpm `

5. /sbin/chkconfig
	- `sudo vi /sbin/chkconfig`
	```
	#!/bin/bash
	# Oracle 11gR2 XE installer chkconfig hack for Ubuntu
	file=/etc/init.d/oracle-xe  
	if [[ ! `tail -n1 $file | grep INIT` ]]; then  
	echo >> $file  
	echo '### BEGIN INIT INFO' >> $file  
	echo '# Provides: OracleXE' >> $file  
	echo '# Required-Start: $remote_fs $syslog' >> $file  
	echo '# Required-Stop: $remote_fs $syslog' >> $file  
	echo '# Default-Start: 2 3 4 5' >> $file  
	echo '# Default-Stop: 0 1 6' >> $file  
	echo '# Short-Description: Oracle 11g Express Edition' >> $file  
	echo '### END INIT INFO' >> $file  
	fi  
	update-rc.d oracle-xe defaults 80 01  
	#EOF
	```
	- `sudo chmod 755 /sbin/chkconfig`

6. kernel 파라미터 설정
`sudo vi /etc/sysctl.d/60-oracle.conf`
```
# Oracle 11g XE kernel parameters
fs.file-max=6815744  
net.ipv4.ip_local_port_range=9000 65000  
kernel.sem=250 32000 100 128  
kernel.shmmax=536870912  
```
`sudo service procps start`

7. Oracle XE가 사용할 파일 추가
`sudo ln -s /usr/bin/awk /bin/awk`
`sudo mkdir /var/lock/subsys`
`sudo touch /var/lock/subsys/listener`

8. Oracle XE 패키지 설치
```
sudo dpkg --install oracle-xe_11.2.0-2_amd64.deb  
```
```
sudo /etc/init.d/oracle-xe configure  
```

## 참고
- http://blog.saltfactory.net/install-oracle-xe-on-ubuntu/
