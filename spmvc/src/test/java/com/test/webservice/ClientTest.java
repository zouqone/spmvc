/**
 * 
 */
package com.test.webservice;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.Socket;

/**
 * @author zouqone
 * @date 2015年5月2日 下午11:34:16
 */
public class ClientTest {

	/**
	 * 
	 */
	public ClientTest() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		new ClientTest().startClient();
		
	}
	
	public void startClient(){
		try {
			Socket s = new Socket("localhost",1212);
			OutputStream os = s.getOutputStream();
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(os));
			bw.write("hello");
			bw.close();
			os.close();
			s.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
