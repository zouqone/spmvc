/**
 * 
 */
package com.mc.framework.file.service.impl;

import java.io.File;
import java.io.InputStream;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.mc.framework.base.util.GerneralUtils;
import com.mc.framework.file.dao.IFileDao;
import com.mc.framework.file.model.FileInfo;
import com.mc.framework.file.service.IFileService;

/**
 * @author zouqone
 * @date 2015年5月5日 下午9:45:14
 */
@Transactional
@Service("fileService") //业务层
public class FileInfoServiceImpl implements IFileService{

	@Resource(name="fileInfoDao")
	private IFileDao fileDao;

	@Override
	public FileInfo addFileInfo(FileInfo fileInfo, MultipartFile file) {
		// TODO Auto-generated method stub
		String id = fileInfo.getFileId();
		if(StringUtils.isEmpty(id)){
			id = GerneralUtils.getUUID();
			fileInfo.setFileId(id);
		}
		fileInfo = fileDao.addFileInfo(fileInfo);
		File targetFile = new File(fileInfo.getFilePath(), fileInfo.getFileId()+fileInfo.getFileType());  
        if(!targetFile.exists()){  
            targetFile.mkdirs();  
        }  
  
        //保存  
        try {  
            file.transferTo(targetFile);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }
		return fileInfo;
	}

	@Override
	public FileInfo updateFileInfo(FileInfo fileInfo, MultipartFile file) {
		// TODO Auto-generated method stub
		fileInfo = fileDao.updateFileInfo(fileInfo);
		
		return fileInfo;
	}

	@Override
	public FileInfo deleteFileInfo(FileInfo fileInfo) {
		// TODO Auto-generated method stub
		
		fileDao.deleteFileInfo(fileInfo.getFileId());
		
		return fileInfo;
	}

	@Override
	public FileInfo queryFileInfoById(String id) {
		// TODO Auto-generated method stub
		return fileDao.findFileInfoById(id);
	}

	@Override
	public List<FileInfo> queryFileInfoByFileGroup(String fileGroup) {
		// TODO Auto-generated method stub
		String condition = "";
		return fileDao.queryFileInfoByCondition(condition);
	}

	@Override
	public List<FileInfo> queryFileInfo() {
		// TODO Auto-generated method stub
		return fileDao.queryFileInfoByCondition(null);
	}

	@Override
	public InputStream getFileByFileId(String fileId) {
		// TODO Auto-generated method stub
		InputStream in = null;
		
		return in;
	}
	
	
	
}
