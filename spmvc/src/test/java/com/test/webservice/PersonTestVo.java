/**
 * 
 */
package com.test.webservice;

/**
 * @author zouqone
 * @date 2015年5月3日 下午11:52:25
 */
public class PersonTestVo {

	private String id;
	private String name;
	private String address;
	
	/**
	 * 
	 */
	public PersonTestVo() {
		// TODO Auto-generated constructor stub
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "PersonTestVo [id=" + id + ", name=" + name + ", address="
				+ address + "]";
	}
	
	

}
