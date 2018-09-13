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
`sudo alien --scripts -d oracle-xe-11.2.0-1.0.x86_64.rpm ` 오래 걸린다. 기다리자.

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

`sudo service procps start` 커널을 로딩한다.

7. 오라클 마운트 포인트 설정
`/etc/rc2.d/S01shm_load`
```
#!/bin/sh
case "$1" in
start)
 mkdir /var/lock/subsys 2>/dev/null
 touch /var/lock/subsys/listener
 rm /dev/shm 2>/dev/null
 mkdir /dev/shm 2>/dev/null
*)
 echo error
 exit 1
 ;;
esac
```
`sudo chmod 755 /etc/rc2.d/S01shm_load`

8. Oracle XE가 사용할 파일 추가
`sudo ln -s /usr/bin/awk /bin/awk`
`sudo mkdir /var/lock/subsys`
`sudo touch /var/lock/subsys/listener`

9. Oracle XE 패키지 설치
```
sudo dpkg --install oracle-xe_11.2.0-2_amd64.deb  
```
```
sudo /etc/init.d/oracle-xe configure  
```

10. 오라클 서버 세팅
`sudo /etc/init.d/oracle-xe configure`

11. 환경변수 세팅
`vi ~/.bashrc`
```
export ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe  
export ORACLE_SID=XE  
export NLS_LANG=`$ORACLE_HOME/bin/nls_lang.sh`  
export ORACLE_BASE=/u01/app/oracle  
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:$LD_LIBRARY_PATH  
export PATH=$ORACLE_HOME/bin:$PATH  
```
`source ~/.bashrc`

12. 상태 확인
`lsnrctl status`
`sqlplus system`

## 에러 해결

### TNS-12545

호스트 주소가 제대로 안되어 있어서 오류가 난 것이다.
클라우드 서버를 사용하고 있다면, 내부 IP를 설정하면 된다.
1.  `sudo vi $ORACLE_HOME/network/admin/listener.ora`
`(ADDRESS = (PROTOCOL = TCP)(HOST = hostname)(PORT = 1521))` 의 hostname 부분에 내부 IP를 적어준다.
2. `sudo vi $ORACLE_HOME/network/admin/tnsnames.ora`
`(ADDRESS = (PROTOCOL = TCP)(HOST = hostname)(PORT = 1521))` 의 hostname 부분에 내부 IP를 적어준다.
3. `lsnrctl start`
4. `lsnrctl status`

### ORA-27101: shared memory realm does not exist
블로그에 따르면, 메모리 용량 부족 때문이다. 설정을 바꿔줘야 한다.
1. 현재 설정되어 있는 shared memory를 삭제한다
`umount /dev/shm`
`rm -rf /dev/shm`

## 참고
- http://blog.saltfactory.net/install-oracle-xe-on-ubuntu/
- http://html5around.com/wordpress/tutorials/ubuntu-oracle-xe-11gr2-install/
- https://sarc.io/index.php/oracledatabase/186-2014-06-10-01-33-05
- https://m.blog.naver.com/PostView.nhn?blogId=sjrmwlq1&logNo=130070031835&proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F
