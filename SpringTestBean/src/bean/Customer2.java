package bean;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Customer2
{
	private Integer	id;
	private String	name;
	private String	sex;
	private String	email;
	private String	address;
	private Integer	phone;
	private String	comment;
	
	public Customer2()
	{
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue
	public Integer getId()
	{
		return id;
	}

	public String getName()
	{
		return name;
	}

	public String getSex()
	{
		return sex;
	}

	public String getEmail()
	{
		return email;
	}

	public String getAddress()
	{
		return address;
	}

	public Integer getPhone()
	{
		return phone;
	}

	public String getComment()
	{
		return comment;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public void setSex(String sex)
	{
		this.sex = sex;
	}

	public void setEmail(String email)
	{
		this.email = email;
	}

	public void setAddress(String address)
	{
		this.address = address;
	}

	public void setPhone(Integer phone)
	{
		this.phone = phone;
	}

	public void setComment(String comment)
	{
		this.comment = comment;
	}

}
