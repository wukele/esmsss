package dao.user;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

import bean.User;

public class UserDaoHibernateImp implements UserDaoInterface
{

	private SessionFactory	sessionFactory;

	@Override
	public void save(User user)
	{
		Session session = sessionFactory.getCurrentSession();
		session.save(user);
		System.out.println("user " + user.getUsername() + " is saved;");
	}

	@Override
	public void delete(Integer userId)
	{
		Session session = sessionFactory.getCurrentSession();
		session.delete(userId);
		System.out.println("user that id is " + userId + " is deleted;");
	}

	public void setSessionFactory(SessionFactory sessionFactory)
	{
		this.sessionFactory = sessionFactory;
	}

	public SessionFactory getSessionFactory()
	{
		return sessionFactory;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<User> get(Map<String,Object> map)
	{
		List<User> userList = null;

		Session session = sessionFactory.getCurrentSession();

		Criteria query = session.createCriteria(User.class);
		
		if (map != null)
		{
			
			if(map.get("id") != null)
				query.add(Restrictions.eq("id", map.get("id")));
			if(map.get("username") != null)
				query.add(Restrictions.eq("username", map.get("username")));
			if(map.get("email") != null)
				query.add(Restrictions.eq("email", map.get("email")));
			
		}
		userList = (List<User>) query.list();

		return userList;
	}

	@Override
	public Integer count(Map<String,Object> map)
	{

		return null;
	}

}
