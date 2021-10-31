# Spring Data Jpa 및 Hibernate 상세내용


## PersistContext 관리

- 플레인 Java로 EntityManagerFactory를 통해 생성한 EntityManager 각각은 다른 PersistContext를 생성하고 관리한다.
- 하지만 Spring 에서는 EntityManagerFactory를 Bean 설정으로 하면, EntityManager 생성 및 삭제를 Container에서 자동으로 관리한다. 자연스레 EntityManager에 연관된 PersistContext도 자동으로 관리된다.
- Spring Container 에서 관리되는 EntityManager는 스프링 AOP 트랜잭션 한 개당 한 PersistContext를 생성한다.

- 아래는 트랙잰션 유무에 따른 PersistContext 테스트이다.

```java
/**
 * Container의 EntityManager를 사용하여, PersistContext 테스트
 */
@SpringBootTest
public class ContainerEntityManagerTest {

	@PersistenceContext
	EntityManager em;

	@Autowired
	MemberRepository memberRepository;

	@Test
	@DisplayName("트랜잭션이 없으면 PersistContext가 같지 않다")
	public void isNotSameContext(){
		Member member1 = new Member("john");

		// INSERT 쿼리 바로 실행
		memberRepository.save(member1);
		// SELECT 쿼리 바로 실행
		Member memberFoundByRepo = memberRepository.findById(member1.getId()).get();

		// SELECT 쿼리2 바로 실행
		Member memberFoundByEm = em.find(Member.class, member1.getId());

		// ID 는 같지만
		assertThat(memberFoundByRepo.getId()).isEqualTo(memberFoundByEm.getId());
		// 서로 다른 PersistContext에 관리되어 1차 캐싱된 Object ID는 다르다
		assertThat(memberFoundByRepo).isNotEqualTo(memberFoundByEm);
	}


	@Test
	@Transactional
	@DisplayName("같은 트랜잭션에서는 PeristsenceContext가 같아야 한다")
	public void isUseSamePersistenceContext(){
		// 함수 시작 시, 트랜잭션 시작

		Member member1 = new Member("john");

		// INSERT 쿼리 실행 안함
		memberRepository.save(member1);
		// Select 쿼리 실행 안함
		Member memberFoundByRepo = memberRepository.findById(member1.getId()).get();

		// Select 쿼리 실행 안함.
		Member memberFoundByEm = em.find(Member.class, member1.getId());

		assertThat(memberFoundByRepo.getId()).isEqualTo(memberFoundByEm.getId());
		// ObjectID 도 같음
		assertThat(memberFoundByRepo).isEqualTo(memberFoundByEm);
	}

}

```
    

- 아래는 Cotainer화하지 않은 EntityManager 테스트이다.

```java
/**
 * Container의 EntityManager를 사용하지 않고, 직접 만든 EntityManager로 PersistContext 테스트
 */
@SpringBootTest
public class EntityManagerTest {

	@Autowired
	private EntityManagerFactory entityManagerFactory;

	@Test
	@DisplayName("EntityManagerFactory로 2개의 EntityManager 생성 시, 2개는 같지 않아야 한다.")
	public void createEmTest(){
		EntityManager em1 = entityManagerFactory.createEntityManager();
		EntityManager em2 = entityManagerFactory.createEntityManager();
		assertThat(em1).isNotEqualTo(em2);
	}


	@Test
	@DisplayName("Member를 영속화만한 후, 다른 EntityManager로 조회 시, Null이 반환되어야 한다.")
	public void diffEmTEst() {
		EntityManager em1 = entityManagerFactory.createEntityManager();
		EntityTransaction txByEm1 = em1.getTransaction();
		EntityManager em2 = entityManagerFactory.createEntityManager();
		Member member1 = new Member("john");

		// EM1의 트랜잭션 시작
		txByEm1.begin();

		// member1를 EM1의 PersistContext에 1차 캐싱한다
		em1.persist(member1);

		// member1를 EM2의 PersistContext에 조회한다. EM2의 1차 캐싱에 없으니, SELECT 쿼리를 실행한다.
		// 하지만 EM1의 PersistContext에 있는 member1이 DB에 INSERT되지 않았기 때문에, SELECT 쿼리로 찾을 수 없다.
		Member memberFoundByEm2 = em2.find(Member.class, member1.getId());
		assertThat(memberFoundByEm2).isNull();

		// member1을 EM1의 PersistContext에 조회한다. EM1의 1차 캐싱에는 존재하니, SELECT 쿼리 없이 가져온다.
		Member memberFoundByEm1 = em1.find(Member.class, member1.getId());
		assertThat(memberFoundByEm1).isNotNull();

		txByEm1.commit();
	}

	@Test
	@DisplayName("Member를 영속화 및 커밋 후, 다른 EntityManager로 조회 시 저장한 Member를 반환한다.")
	public void diffEmCommitTest(){
		EntityManager em1 = entityManagerFactory.createEntityManager();
		EntityTransaction txByEm1 = em1.getTransaction();
		EntityManager em2 = entityManagerFactory.createEntityManager();
		Member member1 = new Member("john");

		// EM1의 트랜잭션 시작
		txByEm1.begin();

		// EM1의 PersistContext에 1차 캐싱
		em1.persist(member1);

		// EM1의 트랜잭션 커밋. Member1를 DB에 INSERT 한다.
		txByEm1.commit();

		// EM1의 PersistContext에는 1차 캐싱으로 member1이 있기 때문에, SELECT 쿼리를 실행하지 않는다.
		Member memberFoundByEm1 = em1.find(Member.class, member1.getId());
		assertThat(memberFoundByEm1).isNotNull();

		// EM2에서 Member1을 ID로 찾는다. EM1의 PersistContext에는 없기 때문에 SELECT 쿼리를 실행한다.
		// DB에 member1이 있기 때문에 member1을 반환한다.
		Member memberFoundByEm2 = em2.find(Member.class, member1.getId());
		assertThat(memberFoundByEm2).isNotNull();
	}

}
```