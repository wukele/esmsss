package dao.customer;

import java.util.List;
import java.util.Map;

import bean.Customer;

public interface CustomerDaoIf
{
	void save(Customer customer);
	void update(Customer customer);
	void delete(Customer customer);
	Customer get(Integer customerId);
	List<Customer> list(Map<String,Object> cond);
	Integer count(Map<String,Object> cond);
}
