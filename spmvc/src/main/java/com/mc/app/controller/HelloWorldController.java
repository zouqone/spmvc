/**
 * 
 */
package com.mc.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 
 * @author zouqone
 * @date 2015年4月18日 上午3:55:06
 */
@Controller

public class HelloWorldController {

	/**
	 * 
	 */
	@RequestMapping(value = "/Hello",method = RequestMethod.GET)
	public String printWelcome(@RequestParam("message")String user , ModelMap model) {
		// TODO Auto-generated constructor stub
		String message = "Hi, my name is "+user+"\r\n,this is my first spring mvc project!";
		System.out.println(message);
		model.addAttribute("message",message );
		
		return "HelloWorld";
	}

}
