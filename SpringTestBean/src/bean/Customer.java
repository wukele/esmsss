package bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "customer")
public class Customer
{
	private String	address;
	private String	comment;
	private String	email;
	private Integer	id;
	private Integer	mobilePhone;
	private String	name;
	private Integer	phone;
	private User2	user = new User2();

	public Customer()
	{
		super();
	}

	@Column
	public String getAddress()
	{
		return address;
	}

	@Column
	public String getComment()
	{
		return comment;
	}

	@Column
	public String getEmail()
	{
		return email;
	}

	@Id
	@GeneratedValue
	public Integer getId()
	{
		return id;
	}

	@Column
	public Integer getMobilePhone()
	{
		return mobilePhone;
	}

	@Column(name = "name", nullable = false)
	public String getName()
	{
		return name;
	}

	@Column
	public Integer getPhone()
	{
		return phone;
	}
	@ManyToOne
	@JoinColumn(name="user_id")
	public User2 getUser()
	{
		return user;
	}

	public void setAddress(String address)
	{
		this.address = address;
	}

	public void setComment(String comment)
	{
		this.comment = comment;
	}

	public void setEmail(String email)
	{
		this.email = email;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	public void setMobilePhone(Integer mobilePhone)
	{
		this.mobilePhone = mobilePhone;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public void setPhone(Integer phone)
	{
		this.phone = phone;
	}

	public void setUser(User2 user)
	{
		this.user = user;
	}

}
