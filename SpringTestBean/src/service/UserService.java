package service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import bean.User;
import dao.user.UserDaoInterface;

public class UserService
{
	private UserDaoInterface	userDao;
	private SessionFactory		sessionFactory;

	public void save(User user)
	{
		Session session = sessionFactory.getCurrentSession();
		session.beginTransaction();
		userDao.save(user);
		session.getTransaction().commit();

	}

	public void delete(Integer userId)
	{
		Session session = sessionFactory.getCurrentSession();
		session.beginTransaction();
		userDao.delete(userId);
		session.getTransaction().commit();
	}

	public List<User> getAll()
	{
		return userDao.get(null);
	}

	public List<User> get(Integer id, String username, String email)
	{
		Map<String,Object> condition = new HashMap<String,Object>();

		condition.put("id", id);
		condition.put("username", username);
		condition.put("email", email);

		return userDao.get(condition);
	}

	public Integer getCount()
	{
		return null;
	}

	public User getUser(Integer userId)
	{
		Session session = sessionFactory.getCurrentSession();
		session.beginTransaction();
		User user = (User) session.get(User.class, userId);
		session.getTransaction().commit();
		return user;
	}

	public User loadUser(Integer userId)
	{

		Session session = sessionFactory.getCurrentSession();
		session.beginTransaction();
		User user = (User) session.load(User.class, userId);
		session.getTransaction().commit();
		return user;
	}

	public UserDaoInterface getUserDao()
	{
		return userDao;
	}

	public void setUserDao(UserDaoInterface userDao)
	{
		this.userDao = userDao;
	}

	public UserService()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	public SessionFactory getSessionFactory()
	{
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory)
	{
		this.sessionFactory = sessionFactory;
	}

}
