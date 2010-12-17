package service;

import java.util.List;

import bean.Customer;
import dao.customer.CustomerDaoIf;

public class CustomerService
{
	private CustomerDaoIf	customerDao;

	public CustomerDaoIf getCustomerDao()
	{
		return customerDao;
	}

	public void setCustomerDao(CustomerDaoIf customerDao)
	{
		this.customerDao = customerDao;
	}

	public void add(Customer customer)
	{
		customerDao.save(customer);
	}

	public void modify(Customer customer)
	{
		customerDao.update(customer);
	}

	public void remove(Customer customer)
	{
		customerDao.delete(customer);
	}

	public Customer get(Integer customerId)
	{
		return customerDao.get(customerId);
	}

	public List<Customer> find(Integer customerId, String name, String address)
	{
		return customerDao.list(null);
	}
}
