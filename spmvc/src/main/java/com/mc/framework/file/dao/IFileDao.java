/**
 * 
 */
package com.mc.framework.file.dao;

import java.util.List;

import com.mc.framework.file.model.FileInfo;

/**
 * @author zouqone
 * @date 2015年5月5日 下午9:46:30
 */
public interface IFileDao {

	public FileInfo addFileInfo(FileInfo fileInfo);
	
	public FileInfo updateFileInfo(FileInfo fileInfo);
	
	public FileInfo findFileInfoById(String id);
	
	public void deleteFileInfo(String id);
	
	public List<FileInfo> queryFileInfoByCondition(String condition);
	
	public List<FileInfo> queryFileInfoByPager(String condition);
	
	
}
