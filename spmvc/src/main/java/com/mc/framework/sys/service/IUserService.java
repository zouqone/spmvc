/**
 * 
 */
package com.mc.framework.sys.service;

import java.util.List;

import com.mc.framework.base.model.Pager;
import com.mc.framework.sys.model.User;

/**
 * @author zouqone
 * @date 2015年4月19日 下午12:55:05
 */
public interface IUserService {

	/**
	 * 新增用户
	 * @param user
	 */
	public User addUser(User user);
	
	/**
	 * 修改用户
	 * @param user
	 */
	public User updateUser(User user);
	
	/**
	 * 删除用户
	 * @param id
	 */
	public void deleteUser(String id);
	
	/**
	 * 分页查询
	 * @return
	 */
	public Pager<User> queryUserByPager();
	
	/**
	 * 分页查询
	 * @return
	 */
	public Pager<User> queryUserByPager(String Condition);
	
	/**
	 * 查询用户
	 * @param Condition
	 * @return
	 */
	public List<User> queryUser(String Condition);
	
	/**
	 * 查询用户
	 * @param id
	 * @return
	 */
	public User findUser(String id);
	
	/**
	 * 查询用户
	 * @param id
	 * @return
	 */
	public User findUserByUsername(String username);
	
	/**
	 * 用户登录
	 * @param username
	 * @param password
	 * @return
	 */
	public User login(String username, String password);
}
