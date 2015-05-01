/**
 * 
 */
package com.mc.framework.base.core.exception;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;


/**
 * @author zouqone
 * @date 2015年5月1日 下午3:08:56
 */
public class BaseHandlerExceptionResolver implements 
		HandlerExceptionResolver {

	/**
	 * 
	 */
	public BaseHandlerExceptionResolver() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		// TODO Auto-generated method stub
		
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("exceptionMessage", ex);
		
		// 根据不同错误转向不同页面
		if(ex instanceof BusinessException){
			return new ModelAndView("error-business",model);
		}else if(ex instanceof ParameterException){
			return new ModelAndView("error-parameter",model);
		}
		
		return new ModelAndView("error",model);
	}

}
