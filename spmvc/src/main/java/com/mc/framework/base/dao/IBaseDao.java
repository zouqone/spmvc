/**
 * 
 */
package com.mc.framework.base.dao;

/**
 * @author zouqone
 * @date 2015年4月19日 上午1:16:29
 * 增删改查
 */
public interface IBaseDao<T> {

	/**
	 * 新增
	 * @param t
	 * @return
	 */
	public T add(T t);
	
	/**
	 * 修改
	 * @param t
	 */
	public T update(T t);
	
	/**
	 * 删除
	 * @param id
	 */
	public void delete(Object id);
	
	/**
	 * 加载
	 * @param id
	 * @return
	 */
	public T load(Object id);
}
