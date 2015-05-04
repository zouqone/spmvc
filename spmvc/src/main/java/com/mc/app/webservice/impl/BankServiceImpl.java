/**
 * 
 */
package com.mc.app.webservice.impl;

import com.mc.app.webservice.IBankService;

/**
 * @author zouqone
 * @date 2015年5月5日 上午1:20:35
 */
public class BankServiceImpl implements IBankService {

	@Override
	public String getMoney(String money) {
		// TODO Auto-generated method stub
		System.out.println("money = "+money);
		return "money = "+money;
	}

}
