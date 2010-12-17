package bean;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;

@Entity
@Table(name = "user",schema="test")
public class User2
{
	private List<Customer>	customers	= new ArrayList<Customer>();
	private Integer			id;
	// dd
	private String			password;
	// sss
	private String			username;

	public User2()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
	public List<Customer> getCustomers()
	{
		return customers;
	}

	@Id
	@GeneratedValue
	public Integer getId()
	{
		return id;
	}

	@Column(nullable = false)
	public String getPassword()
	{
		return password;
	}

	public String getUsername()
	{
		return username;
	}

	public void setCustomers(List<Customer> customers)
	{
		this.customers = customers;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

}
