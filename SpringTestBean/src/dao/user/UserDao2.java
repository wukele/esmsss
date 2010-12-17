package dao.user;

import java.util.List;
import java.util.Map;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import bean.User2;

public class UserDao2 implements UserIf2
{

	private SessionFactory sessionFactory;
	
	@Override
	public void save(User2 user)
	{
		Session session = sessionFactory.getCurrentSession();
		session.save(user);
	}

	@Override
	public void update(User2 user)
	{
		Session session = sessionFactory.getCurrentSession();
		session.merge(user);
		
	}

	@Override
	public void delete(Integer userId)
	{
		Session session = sessionFactory.getCurrentSession();
		session.delete(userId);
	}

	@Override
	public User2 get(Integer userId)
	{

		Session session = sessionFactory.getCurrentSession();
		User2 user = (User2)session.get(User2.class, userId);
		return user;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<User2> list(Map<String,Object> cond)
	{
		List<User2> userList=null;
		Session session = sessionFactory.getCurrentSession();
		userList = (List<User2>)session.createCriteria(User2.class).list();
		return userList;
	}

	@Override
	public Integer count(Map<String,Object> cond)
	{
		Integer count = 0;
		Session session = sessionFactory.getCurrentSession();
//		session.createQuery("count from User2 u ").;
		return null;
	}

	public SessionFactory getSessionFactory()
	{
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory)
	{
		this.sessionFactory = sessionFactory;
	}

	public UserDao2()
	{
		super();
		// TODO Auto-generated constructor stub
	}

}
