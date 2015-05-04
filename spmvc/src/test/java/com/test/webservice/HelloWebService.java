/**
 * 
 */
package com.test.webservice;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.xml.ws.Endpoint;

/**
 * @author zouqone
 * @date 2015年5月3日 上午12:52:11
 */
@WebService(targetNamespace="http://test.ws.com/",serviceName="myService")
public class HelloWebService {

	/**
	 * 
	 */
	public HelloWebService() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Endpoint.publish("http://localhost:1212/hello", new HelloWebService());
		System.out.println("Server started ... ");
	}
	
	//http://localhost:1212/hello?wsdl
	//wsimport -s . http://localhost:1212/hello?wsdl
	@WebMethod(operationName="sayHello")
	public String sayHello(String name){
		System.out.println("sayHello()..."+name);
		return "hello "+name;
	}
	
	@WebMethod(exclude=false,operationName="sayTests")
	public String sayTest(String msg){
		System.out.println("message : "+msg);
		return "success";
	}
	
	@WebMethod(operationName="getPerson")
	public PersonTestVo getPerson(String id){
		PersonTestVo person = new PersonTestVo();
		person.setId(id);
		person.setName("xiaowang");
		person.setAddress("changping");
		return person;
	}

}
