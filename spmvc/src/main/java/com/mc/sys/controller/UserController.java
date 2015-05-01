/**
 * 
 */
package com.mc.sys.controller;

import java.sql.SQLException;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mc.framework.base.controller.BaseController;
import com.mc.sys.model.User;
import com.mc.sys.service.IUserService;

/**
 * @author zouqone
 * @date 2015年4月18日 下午5:46:04
 */
@Controller  //表现层
@Scope("prototype") //表示将Action的范围声明为原型，默认为 singleton
@RequestMapping(value = "/UserAction")
public class UserController extends BaseController{

	@Resource(name="userService")
	private IUserService userService;

	@SuppressWarnings("finally")
	@RequestMapping(value = "/Add",method = RequestMethod.POST)
	public String add(@ModelAttribute("userForm") User user,String checkcode,Model model,HttpSession session){
		String message = null;
		Logger logger = Logger.getLogger(userService.getClass());
		try {
			logger.info("insert user ");
			user = userService.addUser(user);
			message = "保存成功";
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			message = "保存失败";
		}finally{
			model.addAttribute("message", message);
			model.addAttribute("user", user);
			logger.info(message);
			return "sys/user/user";
		}
	}
	
	@RequestMapping(value = "/Edit",method = RequestMethod.POST)
	public String edit(String username,String password,String checkcode,Model model,HttpSession session){
		
		return "sys/user/user";
	}
	
	
}
