/**
 * 
 */
package com.mc.framework.base.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ExceptionHandler;

import com.mc.framework.base.core.exception.BusinessException;
import com.mc.framework.base.core.exception.ParameterException;

/**
 * @author zouqone
 * @date 2015年4月26日 下午10:04:56
 * 异常处理
 */
public abstract class BaseController {

	/**
	 * 异常处理
	 * @param request
	 * @param e
	 * @return
	 */
	@ExceptionHandler
	public String exception(HttpServletRequest request,Exception ex){
		
		//添加自己的异常处理逻辑，如日志记录
		request.setAttribute("exceptionMessage", ex.getMessage());
		
		// 根据不同的异常类型进行不同处理
		if(ex instanceof BusinessException){
			return "error/business";
		}else if(ex instanceof ParameterException ){
			return "error/parameter";
		}
		
		return "error/error";
	}
}
