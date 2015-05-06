/**
 * 
 */
package com.mc.framework.sys.dao.impl;

import java.util.List;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.mc.framework.base.dao.impl.HibernateBaseDaoImpl;
import com.mc.framework.base.model.Pager;
import com.mc.framework.sys.dao.IUserDao;
import com.mc.framework.sys.model.User;

/**
 * @author zouqone
 * @date 2015年4月19日 下午12:35:57
 */
@Repository("userDao") //数据访问层
public class UserDaoImpl extends HibernateBaseDaoImpl<User> implements IUserDao{

	@Override
	public User addUser(User user) {
		// TODO Auto-generated method stub
		return this.add(user);
	}

	@Override
	public User updateUser(User user) {
		// TODO Auto-generated method stub
		return this.update(user);
	}

	@Override
	public void deleteUser(String id) {
		// TODO Auto-generated method stub
		this.delete(id);
	}

	@Override
	public Pager<User> queryUserByPager() {
		// TODO Auto-generated method stub
		
		return queryUserByPager(null);
	}

	@Override
	public Pager<User> queryUserByPager(String Condition) {
		// TODO Auto-generated method stub
		String hql = "select u from User u where 1=1"+"";
		Pager<User> userPager = this.find(hql);
		return userPager;
	}

	@Override
	public List<User> queryUser(String Condition) {
		// TODO Auto-generated method stub
		String hql = "select u from User u where 1=1"+"";
		return this.list(hql);
	}

	@Override
	public User findUser(String id) {
		// TODO Auto-generated method stub
		String hql = "select u from User u where u.id=?";
		return (User) this.queryObject(hql,id);
	}

	@Override
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)  
	public User findUserByUsername(String username) {
		// TODO Auto-generated method stub
		String hql = "select u from User u where u.username=?";
		return (User) this.queryObject(hql,username);
	}

	

	

}
