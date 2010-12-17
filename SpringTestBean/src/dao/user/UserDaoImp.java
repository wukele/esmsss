package dao.user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import bean.User;

public class UserDaoImp implements UserDaoInterface
{

	private DataSource dataSource;
	private Connection conn;
	@Override
	public void save(User user)
	{
		String sql = "insert into testbeans2 values(?,?)";
		try
		{
			conn = dataSource.getConnection();
			PreparedStatement save = conn.prepareStatement(sql);
			save.setInt(1,1);
			save.setString(2, "test_firefoxmmx");
			save.executeUpdate();
			conn.commit();
		}
		catch (SQLException e)
		{
			e.printStackTrace();
			try
			{
				conn.rollback();
			}
			catch (SQLException e1)
			{
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		finally
		{
			try
			{
				conn.close();
			}
			catch (SQLException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		System.out.println("user "+user.getUsername()+" is saved");
	}

	@Override
	public void delete(Integer userId)
	{
		String sql = "delete from testbeans2 where id=?";
		
		try
		{
			conn = dataSource.getConnection();
			PreparedStatement deleteHandler = conn.prepareStatement(sql);
			deleteHandler.setInt(1, userId);
			deleteHandler.executeUpdate();
			conn.commit();
		}
		catch (SQLException e)
		{
			try
			{
				conn.rollback();
			}
			catch (SQLException e1)
			{
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		finally
		{
			try
			{
				conn.close();
			}
			catch (SQLException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		System.out.println("user that id is "+userId+" is deleted");
	}

	
	public DataSource getDataSource()
	{
		return dataSource;
	}

	public void setDataSource(DataSource dataSource)
	{
		this.dataSource = dataSource;
	}

	@Override
	public List<User> get(Map<String,Object> map)
	{
		
		return null;
	}

	@Override
	public Integer count(Map<String,Object> map)
	{
		
		return null;
	}

}
