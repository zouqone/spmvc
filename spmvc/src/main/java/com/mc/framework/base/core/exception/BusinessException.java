/**
 * 
 */
package com.mc.framework.base.core.exception;

/**
 * @author zouqone
 * @date 2015年5月1日 下午2:35:32
 * 系统业务异常
 */
public class BusinessException extends RuntimeException {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 5705880878969669853L;
	
	private String code;

	/**
	 * 
	 */
	public BusinessException() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 */
	public BusinessException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	/**
	 * 
	 * @param code
	 * @param message
	 */
	public BusinessException(String code,String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * @param cause
	 */
	public BusinessException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 * @param cause
	 */
	public BusinessException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 
	 * @param code
	 * @param message
	 * @param cause
	 */
	public BusinessException(String code ,String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
		this.code = code;
	}

	/**
	 * @param message
	 * @param cause
	 * @param enableSuppression
	 * @param writableStackTrace
	 */
	public BusinessException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
	

}
