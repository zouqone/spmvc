/**
 * 
 */
package com.mc.framework.file.controller;

import java.io.File;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.mc.framework.base.controller.BaseController;
import com.mc.framework.file.model.FileInfo;
import com.mc.framework.file.service.IFileService;

/**
 * @author zouqone
 * @date 2015年5月5日 下午10:14:14
 */
@Controller  //表现层
@Scope("prototype") //表示将Action的范围声明为原型，默认为 singleton
@RequestMapping(value = "/FileAction")
public class FileInfoController extends BaseController {

	@Resource(name="fileService")
	private IFileService fileService;
	
	@RequestMapping(value="/uploadFile.do",method=RequestMethod.POST)
	public String uploadFile(MultipartHttpServletRequest request,Model model){
		List<MultipartFile> files = request.getFiles("file");
		String path = "/spmvcinfo/file";
		for (MultipartFile multipartFile : files) {
			if(multipartFile.isEmpty()){
				continue;
			}
			MultipartFile file = multipartFile;
			FileInfo fileInfo = new FileInfo();
			String fileName = file.getOriginalFilename();
			String fileType = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
			fileInfo.setFileName(fileName);
			fileInfo.setFileSize(""+file.getSize());
			fileInfo.setFileType(fileType);
			fileInfo.setFilePath(path);
			fileInfo.setFilegroup("");
			fileInfo = fileService.addFileInfo(fileInfo , multipartFile);
			System.out.println(fileName);
		}
		
		//fileInfo = fileService.addFileInfo(fileInfo , files.get(0));
		//model.addAttribute("fileInfo", fileInfo);
		return "/test/upload";
	}
	
	@RequestMapping(value="/uploadSingleFile.do",method=RequestMethod.POST)
	public String uploadFile(@RequestParam(value = "file", required = false) MultipartFile file,Model model){
		System.out.println("开始");  
        String path = "/spmvcinfo/file";  
        String fileName = file.getOriginalFilename();  
//        String fileName = new Date().getTime()+".jpg";  
        System.out.println(path);  
        File targetFile = new File(path, fileName);  
        if(!targetFile.exists()){  
            targetFile.mkdirs();  
        }  
  
        //保存  
        try {  
            file.transferTo(targetFile);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
		return "/test/filetest";
	}
	
}
