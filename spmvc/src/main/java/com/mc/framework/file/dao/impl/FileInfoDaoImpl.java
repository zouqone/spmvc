/**
 * 
 */
package com.mc.framework.file.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mc.framework.base.dao.impl.HibernateBaseDaoImpl;
import com.mc.framework.base.util.DBHelp;
import com.mc.framework.file.dao.IFileDao;
import com.mc.framework.file.model.FileInfo;

/**
 * @author zouqone
 * @date 2015年5月5日 下午9:51:41
 */
@Repository("fileInfoDao") //数据访问层
public class FileInfoDaoImpl  extends HibernateBaseDaoImpl<FileInfo> implements IFileDao{

	@Override
	public FileInfo addFileInfo(FileInfo fileInfo) {
		// TODO Auto-generated method stub
		return this.add(fileInfo);
	}

	@Override
	public FileInfo updateFileInfo(FileInfo fileInfo) {
		// TODO Auto-generated method stub
		return this.update(fileInfo);
	}

	@Override
	public FileInfo findFileInfoById(String id) {
		// TODO Auto-generated method stub
		String hql = "select u from FileInfo u where u.fileid=?";
		
		return (FileInfo) this.queryObject(hql);
	}

	@Override
	public void deleteFileInfo(String id) {
		// TODO Auto-generated method stub
		this.delete(id);
	}

	@Override
	public List<FileInfo> queryFileInfoByCondition(String condition) {
		// TODO Auto-generated method stub
		String hql = "select u from User u where 1=1"+"";
		hql = DBHelp.AddCondition(hql, condition);
		return this.list(hql);
	}

	@Override
	public List<FileInfo> queryFileInfoByPager(String condition) {
		// TODO Auto-generated method stub
		String hql = "select u from User u where 1=1"+"";
		hql = DBHelp.AddCondition(hql, condition);
		return this.find(hql).getDatas();
	}

	
}
