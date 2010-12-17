package bean;

import java.io.Serializable;

public class User3 implements Serializable
{
	/**
	 * 
	 */
	private static final long	serialVersionUID	= 1L;
	private Integer	id;
	private String	username;

	public User3()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	public Integer getId()
	{
		return id;
	}

	public String getUsername()
	{
		return username;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}



}
