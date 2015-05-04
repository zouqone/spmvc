/**
 * 
 */
package com.mc.app.webservice;

import javax.jws.WebService;

/**
 * @author zouqone
 * @date 2015年5月5日 上午1:03:59
 */
@WebService
public class FootService {

	public String getFootInfo(String name){
		System.out.println("Foot()..." + name);
		return "name = "+name;
	}

}
