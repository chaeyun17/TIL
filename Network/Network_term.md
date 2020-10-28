# router 공유기

- https://opentutorials.org/course/3265/20033
- 인터넷에 접속된 컴퓨터들은 양쪽 다 데이터를 받아야 하기 때문에, IP Address 가 필요하다.
- 집에서 인터넷을 사용하는 기기가 여러 대가 될 경우, IP Address를 각 기기당 필요하다. 인터넷 회사에서 회선을 늘려야 한다. 그렇게 하면 돈이 많이 든다. 그래서 공유기가 필요하다.
- 인터넷 회사의 회선은 가장 큰 네트워크 규모인 WAN에 속해있다. 가정은 LAN 네크워크로 이루어져 있다.
- 공유기는 WLAN과 LAN의 중계자의 역할을 하는 교환원의 역할을 한다.
- 공유기도 네트워크 기기이기 때문에 공유기에도 IP Address가 부여된다. Gateway Address 또는 Router Address 라고 부른다. 예) 192.168.0.1
- WAN 에서 공유기에서 접속할 수 있는 IP는 public IP Address (공용 아이피) 라고 부른다.
- LAN 에서 사용하는 IP는 private IP Address (사설 아이피)라고 부른다.
- 192.168.0.0 ~ 192.168.255.255 범위의 65536개의 아이피 주소는 사설 아이피로 하기로 전셰게에서 합의를 하였다.

# NAT

- https://opentutorials.org/course/3265/20035
- NAT(Network Address Translation)
- private IP Address 를 public IP Address 로 변환하는 기능으로, 공유기에 있는 기능이다.
- LAN에 속한 private IP Address 를 가진 클라이언트가 WAN 외부로 데이터를 전송하고자 할 때, 공유기에서 private IP를 public IP로 변환을 한다.

# 자신의 IP 주소 알아내기

- https://opentutorials.org/course/3265/20036

**리눅스**  
- ifconfig: 자신의 IP를 알아낼 수 있다. 주로 eth0 또는 eth1이 된다.
- route : gateway를 알아낼 수 있다.

# PORT

- https://opentutorials.org/course/3265/20037
- 0 ~ 1023 : well known port. 표준으로 정해진 포트
- 1024 ~ 65535

# Port Forwading

- https://opentutorials.org/course/3265/20038
- 주로 WAN 에서 LAN으로 접속하기 위해 사용됨.
- 공인 IP에 포트 번호를 붙일 수 있다. 해당 포트 번호와 사설 IP를 연결시키는 기능이 포트포워딩이다. 공유기에서 설정할 수 있다.
예시) 10.10.0.1:8080 => 192.168.10.101:80


# DHCP
- https://opentutorials.org/course/3265/20039
- Dynamic Host Configuration Protocol
- Dynamic(유동) IP 를 할당해주는 기술.
- IP 주소가 없는 기기가 DHCP 서버(공유기에 내장)에 자신의 MAC(물리주소)를 가지고 IP 주소를 요청한다. DHCP 서버는 IP 주소를 해당 기기에게 일정시간 동안 할당해준다. IP주소가 없는 DHCP 클라이언트 기기는 할당받은 IP를 정해신 시간만큼 사용한다.
