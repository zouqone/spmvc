/**
 * 
 */
package com.mc.sys.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mc.sys.model.User;
import com.mc.sys.service.IUserService;

/**
 * @author zouqone
 * @date 2015年4月18日 下午5:46:04
 */
@Controller  //表现层
@Scope("prototype") //表示将Action的范围声明为原型，默认为 singleton
public class LoginController {

	private IUserService userService;
	
	public IUserService getUserService() {
		return userService;
	}

	@Resource(name="userService")
	public void setUserService(IUserService userService) {
		this.userService = userService;
	}

	@RequestMapping(value = "/Login",method = RequestMethod.POST)
	public String login(String username,String password,String checkcode,Model model,HttpSession session){
		
		User user = userService.login(username, password);
		if(user!=null){
			session.setAttribute("loginUser", username);
			session.setAttribute("isAuth", "1");
			session.setAttribute("user", user);
			return "redirect:/jsp/index.jsp";
			
		}else{
			session.setAttribute("isAuth", "0");
			String message = "登录失败！";
			model.addAttribute("message",message);
			return "login/login";
		}
	}
	
	@RequestMapping(value = "/index",method = RequestMethod.GET)
	public String login(Model model,HttpSession session){
		String isAuth = (String) session.getAttribute("isAuth");
		if("1".equals(isAuth)){
			return "index";
		}else{
			return "login/login";
		}
	}
	
}
