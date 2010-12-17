package test;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.context.support.AbstractApplicationContext;

import service.CustomerService;
import service.User2Service;
import service.UserService;
import util.SpringUtil;
import bean.Customer;
import bean.User;
import bean.User2;

public class JTest
{

	@Test
	public void testSave()
	{
		AbstractApplicationContext appConfig = SpringUtil
				.getApplicationContext();

		UserService userService = (UserService) appConfig
				.getBean("userService");
		User user = new User();
		user.setUsername("firefoxmmx");
		user.setPassword("password");
		userService.save(user);

		// fail("Not yet implemented");

	}

	@Test
	public void testDelete()
	{
		// fail("Not yet implemented");
		AbstractApplicationContext appConfig = SpringUtil
				.getApplicationContext();

		UserService userService = (UserService) appConfig
				.getBean("userService");
		userService.delete(1);
	}

	@Test
	public void testGetAll()
	{
		// fail("Not yet implemented");
		AbstractApplicationContext appConfig = SpringUtil
				.getApplicationContext();

		UserService userService = (UserService) appConfig
				.getBean("userService");
		List<User> userList = userService.getAll();
		if (userList != null)
			for (User u : userList)
			{
				System.out.println("user id is " + u.getId());
			}
	}

	@Test
	public void testGet()
	{
		// fail("Not yet implemented");
		AbstractApplicationContext appConfig = SpringUtil
				.getApplicationContext();

		UserService userService = (UserService) appConfig
				.getBean("userService");
		List<User> userList = userService.get(2, null, null);
		if (userList != null)
			for (User u : userList)
			{
				System.out.println("user is " + u.getId() + ","
						+ u.getUsername() + "," + u.getPassword() + ","
						+ u.getEmail());
			}
	}

	@Test
	public void testGetLoad()
	{
		AbstractApplicationContext appConfig = SpringUtil
				.getApplicationContext();

		UserService userService = (UserService) appConfig
				.getBean("userService");
		try
		{
			System.out.println(userService.getUser(1));
			System.out.println(userService.loadUser(1));
		}
		catch (Exception e)
		{
			e.printStackTrace();
			Assert.assertTrue(true);
		}

	}

	@Test
	public void testUser2Add()
	{
		AbstractApplicationContext appConfig = SpringUtil
				.getApplicationContext();

		User2Service service = (User2Service) appConfig.getBean("userService2");

		User2 user = new User2();
		user.setUsername("ffmmx");
		user.setPassword("password");

		service.add(user);

	}

	@Test
	public void testCustomerAdd()
	{
		AbstractApplicationContext appConfig = SpringUtil
				.getApplicationContext();

		CustomerService service = (CustomerService) appConfig
				.getBean("customerService");
		Customer c = new Customer();
		c.setName("狐狸");
		c.setComment("狐狸猫");

		service.add(c);
	}

	@Test
	public void testCustomerGet()
	{
		AbstractApplicationContext appConfig = SpringUtil
				.getApplicationContext();

		CustomerService service = (CustomerService) appConfig
				.getBean("customerService");
		User2Service service2 = (User2Service) appConfig
				.getBean("userService2");

		User2 user = new User2();
		user.setUsername("ffmmx");
		user.setPassword("password");
		service2.add(user);
		Customer c = new Customer();
		c.setName("chrome");
		c.setComment("chromuim");
		service.add(c);
		c = new Customer();
		c.setName("ff");
		c.setComment("firefox");
		service.add(c);
		Customer customer = service.get(1);
		System.out.println(customer.getId());
	}

	@Test
	public void testUserOneToMany()
	{
		AbstractApplicationContext appConfig = SpringUtil
				.getApplicationContext();

		User2Service service2 = (User2Service) appConfig
				.getBean("userService2");

		User2 user = new User2();
		user.setUsername("ffmmx");
		user.setPassword("password");
		List<Customer> clist = new ArrayList<Customer>();
		user.setCustomers(clist);
		Customer c = new Customer();
		c.setName("chrome");
		c.setComment("chromuim");
		c.setUser(user);
		clist.add(c);
		c = new Customer();
		c.setName("ff");
		c.setComment("firefox");
		c.setUser(user);
		clist.add(c);
		service2.add(user);

		user = service2.getUserNoCustomer(1);
		// System.out.println(user.getCustomers());
	}

	@Test
	public void testStringRegexp()
	{
		String str = "sDD_FF_ss_fffsdfsdf__df";

		Pattern regexp = Pattern.compile("_(\\w)");
		Matcher matcher = regexp.matcher(str.toLowerCase());
		String newStr = null;

		while (matcher.find())
		{
			newStr = matcher.replaceFirst(matcher.group(1).toUpperCase());
			matcher.reset(newStr);
		}

		System.out.println(newStr);
	}

	@Test
	public void testUpdateUser2()
	{
		AbstractApplicationContext appConfig = SpringUtil
				.getApplicationContext();

		User2Service service2 = (User2Service) appConfig
				.getBean("userService2");
		User2 user = service2.getUser(1);
		user.getCustomers().get(0).setName("firefox");
		user.setPassword("1");
		service2.modify(user);
		user = service2.getUser(1);
		System.out.println(user.getCustomers().get(0).getName());
	}

	@Test
	public void testUpdateCustomer()
	{
		AbstractApplicationContext appConfig = SpringUtil
				.getApplicationContext();

		User2Service service2 = (User2Service) appConfig
				.getBean("userService2");
		User2 user = service2.getUser(1);
		CustomerService cservice = (CustomerService) appConfig
				.getBean("customerService");
		Customer cust = user.getCustomers().get(0);
		cust.setName("google");
		cservice.modify(cust);
		Customer cust2 = cservice.get(cust.getId());
		System.out.println(cust.getName());
		System.out.println(cust2.getName());
	}

}
