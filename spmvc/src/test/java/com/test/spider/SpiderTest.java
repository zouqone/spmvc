package com.test.spider;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class SpiderTest {

	
	public static void main(String[] args){
		new SpiderTest().testdata();
	}
	
	public void testdata(){
		
		String filePath = "D:/temp/hao123.html";
		String urlStr = "http://www.hao123.com/";
		URL url = null;
		try {
			url = new URL(urlStr);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String charset = "utf-8";
		int sec_cont = 1000;
		try{
			URLConnection conn = url.openConnection();
			conn.setDoOutput(true);
			conn.setReadTimeout(10*sec_cont);
			conn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)");
			
			InputStream in = conn.getInputStream();
			String str = SpiderUtil.Inputstream2String(in,charset);
			SpiderUtil.saveHtml(filePath,str);
		}catch(IOException e){
			e.printStackTrace();
		}
		
	}

	
}
