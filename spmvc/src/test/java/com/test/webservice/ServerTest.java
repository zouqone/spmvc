/**
 * 
 */
package com.test.webservice;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * @author zouqone
 * @date 2015年5月2日 下午11:33:28
 */
public class ServerTest {

	/**
	 * 
	 */
	public ServerTest() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		new ServerTest().startServer();
	}
	
	public void startServer(){
		try {
			ServerSocket server = new ServerSocket(1212);
			
			while (true) {
				Socket client = server.accept();
				InputStream in = client.getInputStream();
				BufferedReader br = new BufferedReader(new InputStreamReader(in));
				String ret = br.readLine();
				
				System.out.println(" client : "+ret);
				
				br.close();
				in.close();
				client.close();
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
