package dao.user;

import java.util.List;
import java.util.Map;

import bean.User;

public interface UserDaoInterface
{
	void save(User user);
	void delete(Integer userId);
	List<User> get(Map<String,Object> map);
	Integer count(Map<String,Object>map);
}
