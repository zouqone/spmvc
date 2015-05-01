/**
 * 
 */
package com.mc.framework.base.core.exception;

/**
 * @author zouqone
 * @date 2015年5月1日 下午3:19:19
 * 参数异常
 */
public class ParameterException extends RuntimeException {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 6838888564897789378L;

	/**
	 * 
	 */
	public ParameterException() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 */
	public ParameterException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param cause
	 */
	public ParameterException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 * @param cause
	 */
	public ParameterException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 * @param cause
	 * @param enableSuppression
	 * @param writableStackTrace
	 */
	public ParameterException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

}
