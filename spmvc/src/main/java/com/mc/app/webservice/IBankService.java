/**
 * 
 */
package com.mc.app.webservice;

import javax.jws.WebService;

/**
 * @author zouqone
 * @date 2015年5月5日 上午1:19:17
 */
@WebService
public interface IBankService {

	public String getMoney(String money);
	

}
