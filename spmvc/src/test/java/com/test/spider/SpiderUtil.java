package com.test.spider;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

public class SpiderUtil {

	public static void saveHtml(String filePath, String str){
		saveHtml(filePath, str, null);
	}
	
	public static void saveHtml(String filePath, String str,String encode) {
		// TODO Auto-generated method stub
		if(encode == null){
			encode = "utf-8";
		}
		try {
			File file = new File(filePath);
			if(file.exists()){
				file.delete();
			}
			OutputStreamWriter out =new OutputStreamWriter(new FileOutputStream(filePath,true),encode);
			out.write(str);
			System.out.println(str);
			out.close();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	public static String Inputstream2String(InputStream in, String charset) throws IOException {
		// TODO Auto-generated method stub
		BufferedReader buff = new BufferedReader(new InputStreamReader(in, charset));
		StringBuffer res = new StringBuffer();
		String line = "";
		while ((line = buff.readLine())!=null) {
			res.append(line);
		}
		
		return res.toString();
	}
	
	public static HttpResponse getResponseByUrl(String url){
		HttpClient httpClient = new DefaultHttpClient();
		HttpGet httpGet = new HttpGet(url);
		HttpResponse httpResponse = null;
		try {
			httpResponse = httpClient.execute(httpGet);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return httpResponse;
	}
	
	public static InputStream getInputStreamByUrl(String url){
		HttpResponse httpResponse = getResponseByUrl(url);
		HttpEntity httpEntity = httpResponse.getEntity();
		InputStream in = null;
		if(httpEntity!=null){ 
			try {
				in = httpEntity.getContent();
			} catch (UnsupportedOperationException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return in;
	}
	
	public static String getHtmlStringByUrl(String url,String charset) throws IOException{
		InputStream in = getInputStreamByUrl(url);
		if(charset == null){
			charset = "utf-8";
		}
		return SpiderUtil.Inputstream2String(in, charset);
	}

	public static String getHtmlStringByUrl(String url) throws IOException{
		return getHtmlStringByUrl(url, null);
	}
}
