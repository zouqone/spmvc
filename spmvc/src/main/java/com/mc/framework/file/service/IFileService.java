/**
 * 
 */
package com.mc.framework.file.service;

import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.mc.framework.file.model.FileInfo;

/**
 * @author zouqone
 * @date 2015年5月5日 下午8:46:20
 * 文件服务
 */
public interface IFileService {
	/**
	 * 新增文件
	 * @param fileInfo
	 * @param file
	 * @return
	 */
	public FileInfo addFileInfo(FileInfo fileInfo ,MultipartFile file );
	
	/**
	 * 修改文件
	 * @param fileInfo
	 * @param file
	 * @return
	 */
	public FileInfo updateFileInfo(FileInfo fileInfo ,MultipartFile file);
	
	/**
	 * 删除文件
	 * @param fileInfo
	 * @return
	 */
	public FileInfo deleteFileInfo(FileInfo fileInfo);
	
	/**
	 * 通过ID查询文件信息
	 * @param id
	 * @return
	 */
	public FileInfo queryFileInfoById(String id);
	
	/**
	 * 通过文件组查询文件信息
	 * @param fileGroup
	 * @return
	 */
	public List<FileInfo> queryFileInfoByFileGroup(String fileGroup);
	
	/**
	 * 查询所有文件信息
	 * @return
	 */
	public List<FileInfo> queryFileInfo();
	
	/**
	 * 获取文件输入流
	 * @param fileId
	 * @return
	 */
	public InputStream getFileByFileId(String fileId);
	
	
	
}
