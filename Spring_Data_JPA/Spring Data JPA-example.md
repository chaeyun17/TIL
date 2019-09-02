# JPA
참고 블로그: http://www.libqa.com/wiki/769

## Spring Data JPA
**Jpa Config**
```java
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages="com.chaeyun.Board02.biz.service")
public class JpaConfig {

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
		HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
		adapter.setDatabase(Database.ORACLE);
		adapter.setShowSql(true);

		Properties props = new Properties();
		props.setProperty("hibernate.ejb.naming_strategy", "org.hibernate.cfg.ImprovedNamingStrategy");

		LocalContainerEntityManagerFactoryBean emfb = new LocalContainerEntityManagerFactoryBean();
		emfb.setDataSource(dataSource);
		emfb.setPackagesToScan("com.chaeyun.Board02.entity");
		emfb.setJpaVendorAdapter(adapter);

		emfb.setJpaProperties(props);
		return emfb;
	}

	@Bean
	public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
		return new JpaTransactionManager(emf);
	}
}
```
**엔티티**
```java
package com.chaeyun.Board02.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Post {
	@Id
	private Integer post_id;
	private String post_title;
	private String post_article;
	@ManyToOne
	@JoinColumn(name="post_author")
	private Member01 member01;
	private Date post_date;

	public Integer getPost_id() {
		return post_id;
	}
	public void setPost_id(Integer post_id) {
		this.post_id = post_id;
	}
	public String getPost_title() {
		return post_title;
	}
	public void setPost_title(String post_title) {
		this.post_title = post_title;
	}
	public String getPost_article() {
		return post_article;
	}
	public void setPost_article(String post_article) {
		this.post_article = post_article;
	}
	public Member01 getMember01() {
		return member01;
	}
	public void setMember01(Member01 member01) {
		this.member01 = member01;
	}
	public Date getPost_date() {
		return post_date;
	}
	public void setPost_date(Date post_date) {
		this.post_date = post_date;
	}


}

```

**DAO**
```java
@Repository("postdao2")
public interface PostDao2 extends JpaRepository<Post, Integer> {
}
```

**Servie**
```java

@Service
public class PostServiceImpl implements PostService{
//	@Autowired
//	private PostDao dao;
	@Autowired
	@Qualifier("postdao2")
	private PostDao2 dao2;

//	@Override
//	public ArrayList<Post> getPostList() {
//		return dao.getPostList();
//	}

	@Override
	public Optional<Post> findById(Integer id) {

		return dao2.findById(id);

	}

}
```

**필요 디펜던시**
```xml
<!-- spring 5 버전이 필요하다 -->
<!-- https://mvnrepository.com/artifact/javax.persistence/persistence-api -->
<dependency>
  <groupId>javax.persistence</groupId>
  <artifactId>persistence-api</artifactId>
  <version>1.0</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.hibernate/hibernate-core -->
<dependency>
  <groupId>org.hibernate</groupId>
  <artifactId>hibernate-core</artifactId>
  <version>5.2.17.Final</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.hibernate/hibernate-entitymanager -->
<dependency>
  <groupId>org.hibernate</groupId>
  <artifactId>hibernate-entitymanager</artifactId>
  <version>5.2.17.Final</version>
</dependency>
<!-- Spring Data JPA -->
<dependency>
  <groupId>org.springframework.data</groupId>
  <artifactId>spring-data-jpa</artifactId>
  <version>2.0.9.RELEASE</version>
</dependency>
```
