package bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User4
{
	private Integer	id;
	private String	password;
	private String	username;

	public User4()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue
	public Integer getId()
	{
		return id;
	}

	@Column
	public String getPassword()
	{
		return password;
	}

	@Column
	public String getUsername()
	{
		return username;
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
