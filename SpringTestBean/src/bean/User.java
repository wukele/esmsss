package bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TEST")
public class User
{
	private String	username;
	private String	password;
	private String	email;
	private Integer	id;
	private String	address;

	public User()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	@Column(name = "address", nullable = true)
	public String getAddress()
	{
		return address;
	}

	@Column(name = "email", nullable = true)
	public String getEmail()
	{
		return email;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getId()
	{
		return id;
	}

	@Column(name = "pass_word")
	public String getPassword()
	{
		return password;
	}

	@Column(name = "user_name", nullable = false)
	public String getUsername()
	{
		return username;
	}

	public void setAddress(String address)
	{
		this.address = address;
	}

	public void setEmail(String email)
	{
		this.email = email;
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
