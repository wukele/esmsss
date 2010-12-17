package bean;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Account
{

	private Integer	id;
	private Integer	bankNum;
	private String	bankName;
	private Float	amount;
	
	public Account()
	{
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue
	public Integer getId()
	{
		return id;
	}

	public Integer getBankNum()
	{
		return bankNum;
	}

	public String getBankName()
	{
		return bankName;
	}

	public Float getAmount()
	{
		return amount;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	public void setBankNum(Integer bankNum)
	{
		this.bankNum = bankNum;
	}

	public void setBankName(String bankName)
	{
		this.bankName = bankName;
	}

	public void setAmount(Float amount)
	{
		this.amount = amount;
	}

}
