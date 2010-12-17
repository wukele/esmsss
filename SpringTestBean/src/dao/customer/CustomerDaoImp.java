package dao.customer;

import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import bean.Customer;

public class CustomerDaoImp implements CustomerDaoIf
{
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory()
	{
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory)
	{
		this.sessionFactory = sessionFactory;
	}

	public CustomerDaoImp()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public void save(Customer customer)
	{
		Session session = sessionFactory.getCurrentSession();
		session.save(customer);
		
	}

	@Override
	public void update(Customer customer)
	{
		Session session = sessionFactory.getCurrentSession();
		session.merge(customer);
	}

	@Override
	public void delete(Customer customer)
	{
		Session session = sessionFactory.getCurrentSession();
		session.delete(customer);
	}

	@Override
	public Customer get(Integer customerId)
	{
		Session session = sessionFactory.getCurrentSession();

		Customer customer =(Customer) session.get(Customer.class, customerId);
		
		return customer;
	}

	@Override
	public List<Customer> list(Map<String,Object> cond)
	{
		
		return null;
	}

	@Override
	public Integer count(Map<String,Object> cond)
	{
		
		return null;
	}
	
	
}
