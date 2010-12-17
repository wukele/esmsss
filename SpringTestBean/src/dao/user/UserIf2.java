package dao.user;

import java.util.List;
import java.util.Map;

import bean.User2;

public interface UserIf2
{
	void save(User2 user);
	void update(User2 user);
	void delete(Integer userId);
	User2 get(Integer userId);
	List<User2> list(Map<String,Object> cond);
	Integer count(Map<String,Object> cond);
}
