package service;

import java.util.List;

import bean.User2;
import dao.customer.CustomerDaoIf;
import dao.user.UserIf2;

public class User2Service
{
	private UserIf2			userDao;
	private CustomerDaoIf	customerDao;

	public void add(User2 user)
	{
		userDao.save(user);
	}

	public void modify(User2 user)
	{
		userDao.update(user);
	}

	public User2 getUser(Integer userId)
	{
		User2 user = userDao.get(userId);
		user.getCustomers().size();
		return user;
	}

	public User2 getUserNoCustomer(Integer userId)
	{
		User2 user = userDao.get(userId);
		return user;
	}

	public List<User2> find(Integer userId, String name, String address)
	{
		return userDao.list(null);
	}

	public UserIf2 getUserDao()
	{
		return userDao;
	}

	public void setUserDao(UserIf2 userDao)
	{
		this.userDao = userDao;
	}

	public CustomerDaoIf getCustomerDao()
	{
		return customerDao;
	}

	public void setCustomerDao(CustomerDaoIf customerDao)
	{
		this.customerDao = customerDao;
	}
}
