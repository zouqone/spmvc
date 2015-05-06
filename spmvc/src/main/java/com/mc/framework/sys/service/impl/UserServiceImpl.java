/**
 * 
 */
package com.mc.framework.sys.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.mc.framework.base.model.Pager;
import com.mc.framework.base.util.GerneralUtils;
import com.mc.framework.sys.dao.IUserDao;
import com.mc.framework.sys.model.User;
import com.mc.framework.sys.service.IUserService;

/**
 * @author zouqone
 * @date 2015年4月19日 下午12:57:47
 */
@Transactional
@Service("userService") //业务层
public class UserServiceImpl implements IUserService {

	@Resource(name="userDao")
	private IUserDao userDao;

	public UserServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public User addUser(User user) {
		// TODO Auto-generated method stub
		String userid = user.getUserid();
		if(StringUtils.isEmpty(userid)){
			userid = GerneralUtils.getUUID();
			user.setUserid(userid);
		}
		user = userDao.addUser(user);
		//int k = 1/0;
		return user;
	}


	@Override
	public User updateUser(User user) {
		// TODO Auto-generated method stub
		return userDao.updateUser(user);
	}

	@Override
	public void deleteUser(String id) {
		// TODO Auto-generated method stub
		userDao.delete(id);
	}

	@Override
	public Pager<User> queryUserByPager() {
		// TODO Auto-generated method stub
		return userDao.queryUserByPager();
	}

	@Override
	public Pager<User> queryUserByPager(String Condition) {
		// TODO Auto-generated method stub
		return userDao.queryUserByPager(Condition);
	}

	@Override
	public List<User> queryUser(String Condition) {
		// TODO Auto-generated method stub
		return userDao.queryUser(Condition);
	}

	@Override
	public User findUser(String id) {
		// TODO Auto-generated method stub
		return userDao.findUser(id);
	}

	@Override
	public User findUserByUsername(String username) {
		// TODO Auto-generated method stub
		return userDao.findUserByUsername(username);
	}

	/* (non-Javadoc)
	 * @see com.mc.sys.service.IUserService#login(java.lang.String, java.lang.String)
	 */
	@Override
	public User login(String username, String password) {
		// TODO Auto-generated method stub
		User user = null;
		try {
			user = userDao.findUserByUsername(username);
			if(user==null){
				throw new RuntimeException("用户名不存在");
			}
			String dbPassword = user.getPassword();
			if(dbPassword!=null&&!dbPassword.equals(password)){
				throw new RuntimeException("用户名或者密码不正确");
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return user;
	}

	
}
