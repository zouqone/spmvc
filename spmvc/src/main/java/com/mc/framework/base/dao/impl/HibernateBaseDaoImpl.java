/**
 * 
 */
package com.mc.framework.base.dao.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.math.BigInteger;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.mc.framework.base.dao.IBaseDao;
import com.mc.framework.base.model.Pager;
import com.mc.framework.base.model.SystemContext;

/**
 * @author zouqone
 * @date 2015年4月19日 上午1:24:20
 */
@SuppressWarnings("unchecked")
@Component
public class HibernateBaseDaoImpl<T> implements IBaseDao<T> {

	/**
	 * hibernate Session工厂
	 */
	private SessionFactory sessionFactory;
	
	/**
	 * 实体泛型
	 */
	private Class<?> clz;
	
	/**
	 * 获取泛型的Class对象
	 * @return
	 */
	public Class<?> getClz(){
		if(clz==null){
			ParameterizedType parameterizedType = (ParameterizedType)(this.getClass().getGenericSuperclass());
			clz = (Class<?>) parameterizedType.getActualTypeArguments()[0];
		}
		return clz;
	}
	
	
	public HibernateBaseDaoImpl() {
		super();
		// TODO Auto-generated constructor stub
		//this.clz = getClz();
		
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	
	@Autowired
    @Qualifier("sessionFactory")
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	/**
	 * 获取当前Session
	 * @return
	 */
	protected Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
	/* (non-Javadoc)
	 * @see com.mc.framework.base.dao.IBaseDao#add(java.lang.Object)
	 */
	@Override
	public T add(T t) {
		// TODO Auto-generated method stub
		Session session = getSession();
		session.save(t);
		return t;
	}

	/* (non-Javadoc)
	 * @see com.mc.framework.base.dao.IBaseDao#update(java.lang.Object)
	 */
	@Override
	public T update(T t) {
		// TODO Auto-generated method stub
		getSession().update(t);
		return t;
	}

	/* (non-Javadoc)
	 * @see com.mc.framework.base.dao.IBaseDao#delete(java.lang.Object)
	 */
	@Override
	public void delete(Object id) {
		// TODO Auto-generated method stub
		T t = this.load(id);
		getSession().delete(t);
	}

	/* (non-Javadoc)
	 * @see com.mc.framework.base.dao.IBaseDao#load(java.lang.Object)
	 */
	@Override
	public T load(Object id) {
		// TODO Auto-generated method stub
		T t = (T) getSession().load(getClz(), (Serializable) id);
		return t;
	}

	/*======================tool============================*/
	private String initSort(String hql) {
		String order = SystemContext.getOrder();
		String sort = SystemContext.getSort();
		if(sort!=null&&!"".equals(sort.trim())) {
			hql+=" order by "+sort;
			if(!"desc".equals(order)) hql+=" asc";
			else hql+=" desc";
		}
		return hql;
	}
	
	/**
	 * 设置引用参数
	 * @param query
	 * @param alias
	 */
	@SuppressWarnings("rawtypes")
	private void setAliasParameter(Query query,Map<String,Object> alias) {
		if(alias!=null) {
			Set<String> keys = alias.keySet();
			for(String key:keys) {
				Object val = alias.get(key);
				if(val instanceof Collection) {
					//查询条件是列表
					query.setParameterList(key, (Collection)val);
				} else {
					query.setParameter(key, val);
				}
			}
		}
	}
	
	/**
	 * 设置参数
	 * @param query
	 * @param args
	 */
	private void setParameter(Query query,Object[] args) {
		if(args!=null&&args.length>0) {
			int index = 0;
			for(Object arg:args) {
				query.setParameter(index++, arg);
			}
		}
	}
	
	/**
	 * 设置分页查询条件
	 * @param query
	 * @param pages
	 */
	@SuppressWarnings("rawtypes")
	private void setPagers(Query query,Pager pages) {
		Integer pageSize = SystemContext.getPageSize();
		Integer pageOffset = SystemContext.getPageOffset();
		if(pageOffset==null||pageOffset<0) pageOffset = 0;
		if(pageSize==null||pageSize<0) pageSize = 15;
		pages.setOffset(pageOffset);
		pages.setSize(pageSize);
		query.setFirstResult(pageOffset).setMaxResults(pageSize);
	}
	
	/**
	 * 同hql获取查询数量的sql
	 * @param hql
	 * @param isHql
	 * @return
	 */
	private String getCountHql(String hql,boolean isHql) {
		String e = hql.substring(hql.indexOf("from"));
		String c = "select count(*) "+e;
		if(isHql)
			c = c.replaceAll("fetch", "");
		return c;
	}
	
	
	
	/*=======================query list by hql==========================*/
	/**
	 * 通过hql、参数、引用查询列表
	 * @param hql
	 * @param args
	 * @param alias
	 * @return
	 */
	public List<T> list(String hql, Object[] args, Map<String, Object> alias){
		hql = initSort(hql);
		Query query = getSession().createQuery(hql);
		setAliasParameter(query, alias);
		setParameter(query, args);
		return query.list();
	}
	
	/**
	 * 通过hql、引用查询列表
	 * @param hql
	 * @param alias
	 * @return
	 */
	public List<T> listByAlias(String hql, Map<String, Object> alias) {
		return this.list(hql, null, alias);
	}
	
	/**
	 * 通过hql、参数查询列表
	 * @param hql
	 * @param args
	 * @return
	 */
	public List<T> list(String hql, Object[] args) {
		return this.list(hql, args, null);
	}
	
	/**
	 * 通过hql、单个参数查询列表
	 * @param hql
	 * @param arg
	 * @return
	 */
	public List<T> list(String hql, Object arg) {
		return this.list(hql, new Object[]{arg});
	}
	
	/**
	 * 通过hql查询列表
	 * @param hql
	 * @return
	 */
	public List<T> list(String hql) {
		return this.list(hql,null);
	}
	
	
	
	/*========================find pager by hql ===========================*/
	
	/**
	 * 通过hql、参数、引用查询分页
	 * @param hql
	 * @param args
	 * @param alias
	 * @return
	 */
	public Pager<T> find(String hql, Object[] args, Map<String, Object> alias) {
		hql = initSort(hql);
		String cq = getCountHql(hql,true);
		Query cquery = getSession().createQuery(cq);
		Query query = getSession().createQuery(hql);
		//设置别名参数
		setAliasParameter(query, alias);
		setAliasParameter(cquery, alias);
		//设置参数
		setParameter(query, args);
		setParameter(cquery, args);
		Pager<T> pages = new Pager<T>();
		setPagers(query,pages);
		List<T> datas = query.list();
		pages.setDatas(datas);
		long total = (Long)cquery.uniqueResult();
		pages.setTotal(total);
		return pages;
	}
	
	/**
	 * 通过hql、引用查询分页
	 * @param hql
	 * @param alias
	 * @return
	 */
	public Pager<T> findByAlias(String hql, Map<String, Object> alias) {
		return this.find(hql,null, alias);
	}
	
	/**
	 * 通过hql、参数查询分页
	 * @param hql
	 * @param args
	 * @return
	 */
	public Pager<T> find(String hql, Object[] args) {
		return this.find(hql, args, null);
	}
	
	/**
	 * 通过hql、单个参数查询分页
	 * @param hql
	 * @param arg
	 * @return
	 */
	public Pager<T> find(String hql, Object arg) {
		return this.find(hql, new Object[]{arg});
	}
	
	/**
	 * 通过hql查询分页
	 * @param hql
	 * @return
	 */
	public Pager<T> find(String hql) {
		return this.find(hql,null);
	}
	
	
	/*========================query object by hql===========================*/
	
	/**
	 * 通过hql、参数、引用查询对象
	 */
	public Object queryObject(String hql, Object[] args,
			Map<String, Object> alias) {
		Query query = getSession().createQuery(hql);
		setAliasParameter(query, alias);
		setParameter(query, args);
		return query.uniqueResult();
	}
	
	/**
	 * 通过hql、引用查询对象
	 * @param hql
	 * @param alias
	 * @return
	 */
	public Object queryObjectByAlias(String hql, Map<String, Object> alias) {
		return this.queryObject(hql,null,alias);
	}
	
	/**
	 * 通过hql、参数查询对象
	 */
	public Object queryObject(String hql, Object[] args) {
		return this.queryObject(hql, args,null);
	}
	
	/**
	 * 通过hql、单个参数查询对象
	 */
	public Object queryObject(String hql, Object arg) {
		return this.queryObject(hql, new Object[]{arg});
	}
	
	/**
	 * 通过hql查询对象
	 */
	public Object queryObject(String hql) {
		return this.queryObject(hql,null);
	}
	
	
	/*========================query list by sql===========================*/
	
	/**
	 * 通过sql、参数、引用、类、是否包含实体查询列表
	 * @param sql
	 * @param args
	 * @param alias
	 * @param clz
	 * @param hasEntity
	 * @return
	 */
	public <N extends Object>List<N> listBySql(String sql, Object[] args,
			Map<String, Object> alias, Class<?> clz, boolean hasEntity) {
		sql = initSort(sql);
		SQLQuery sq = getSession().createSQLQuery(sql);
		setAliasParameter(sq, alias);
		setParameter(sq, args);
		if(hasEntity) {
			sq.addEntity(clz);
		} else 
			sq.setResultTransformer(Transformers.aliasToBean(clz));
		return sq.list();
	}
	
	/**
	 * 通过sql、引用、类、是否包含实体查询列表
	 * @param sql
	 * @param alias
	 * @param clz
	 * @param hasEntity
	 * @return
	 */
	public <N extends Object>List<N> listByAliasSql(String sql, Map<String, Object> alias,
			Class<?> clz, boolean hasEntity) {
		return this.listBySql(sql, null, alias, clz, hasEntity);
	}
	
	/**
	 * 通过sql、类、是否包含实体查询列表
	 * @param sql
	 * @param clz
	 * @param hasEntity
	 * @return
	 */
	public <N extends Object>List<N> listBySql(String sql, Class<?> clz, boolean hasEntity) {
		return this.listBySql(sql, null, clz, hasEntity);
	}
	
	/**
	 * 通过sql、参数、类、是否包含实体查询列表
	 * @param sql
	 * @param arg
	 * @param clz
	 * @param hasEntity
	 * @return
	 */
	public <N extends Object>List<N> listBySql(String sql, Object arg, Class<?> clz,
			boolean hasEntity) {
		return this.listBySql(sql, new Object[]{arg}, clz, hasEntity);
	}
	
	/**
	 * 通过sql、单个参数、类、是否包含实体查询列表
	 * @param sql
	 * @param args
	 * @param clz
	 * @param hasEntity
	 * @return
	 */
	public <N extends Object>List<N> listBySql(String sql, Object[] args, Class<?> clz,
			boolean hasEntity) {
		return this.listBySql(sql, args, null, clz, hasEntity);
	}
	
	
	/*========================find pager by sql===========================*/
	
	/**
	 * 通过sql、参数、引用、类、是否包含实体查询分页
	 * @param sql
	 * @param args
	 * @param alias
	 * @param clz
	 * @param hasEntity
	 * @return
	 */
	public <N extends Object>Pager<N> findBySql(String sql, Object[] args,
			Map<String, Object> alias, Class<?> clz, boolean hasEntity) {
		sql = initSort(sql);
		String cq = getCountHql(sql,false);
		SQLQuery sq = getSession().createSQLQuery(sql);
		SQLQuery cquery = getSession().createSQLQuery(cq);
		setAliasParameter(sq, alias);
		setAliasParameter(cquery, alias);
		setParameter(sq, args);
		setParameter(cquery, args);
		Pager<N> pages = new Pager<N>();
		setPagers(sq, pages);
		if(hasEntity) {
			sq.addEntity(clz);
		} else {
			sq.setResultTransformer(Transformers.aliasToBean(clz));
		}
		List<N> datas = sq.list();
		pages.setDatas(datas);
		long total = ((BigInteger)cquery.uniqueResult()).longValue();
		pages.setTotal(total);
		return pages;
	}
	
	/**
	 * 通过sql、引用、类、是否包含实体查询分
	 * @param sql
	 * @param alias
	 * @param clz
	 * @param hasEntity
	 * @return
	 */
	public <N extends Object>Pager<N> findByAliasSql(String sql, Map<String, Object> alias,
			Class<?> clz, boolean hasEntity) {
		return this.findBySql(sql, null, alias, clz, hasEntity);
	}
	
	/**
	 * 通过sql、参数、类、是否包含实体查询分页
	 * @param sql
	 * @param args
	 * @param clz
	 * @param hasEntity
	 * @return
	 */
	public <N extends Object>Pager<N> findBySql(String sql, Object[] args, Class<?> clz,
			boolean hasEntity) {
		return this.findBySql(sql, args, null, clz, hasEntity);
	}
	
	/**
	 * 通过sql、单个参数、类、是否包含实体查询分页
	 * @param sql
	 * @param arg
	 * @param clz
	 * @param hasEntity
	 * @return
	 */
	public <N extends Object>Pager<N> findBySql(String sql, Object arg, Class<?> clz,
			boolean hasEntity) {
		return this.findBySql(sql, new Object[]{arg}, clz, hasEntity);
	}
	
	/**
	 * 通过sql、类、是否包含实体查询分页
	 * @param sql
	 * @param clz
	 * @param hasEntity
	 * @return
	 */
	public <N extends Object>Pager<N> findBySql(String sql, Class<?> clz, boolean hasEntity) {
		return this.findBySql(sql, null, clz, hasEntity);
	}
	
	
	/*========================update by hql===========================*/
	
	/**
	 * 通过hql、参数更新数据库
	 * @param hql
	 * @param args
	 */
	public void updateByHql(String hql, Object[] args) {
		Query query = getSession().createQuery(hql);
		setParameter(query, args);
		query.executeUpdate();
	}
	
	/**
	 * 通过hql、单个参数更新数据库
	 * @param hql
	 * @param arg
	 */
	public void updateByHql(String hql, Object arg) {
		this.updateByHql(hql,new Object[]{arg});
	}
	
	/**
	 * 通过hql更新数据库
	 * @param hql
	 */
	public void updateByHql(String hql) {
		this.updateByHql(hql,null);
	}
	
	
	
	
	
	
	
}
