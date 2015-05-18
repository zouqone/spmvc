package com.test.spider;

import java.io.IOException;
import java.io.InputStream;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

public class SpiderHttpClient {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		String filePath = "D:/temp/hao123.com.html";
		String urlStr = "http://www.hao123.com/";
		String charset = "utf-8";
		new SpiderHttpClient().test(filePath,urlStr,charset);
	}
	
	public String getHao123Data(String url,String type){
		String text = null;
		String html = null;
		try {
			html = SpiderUtil.getHtmlStringByUrl(url);
			if(html != null){
				html = html.substring(html.indexOf(type));
				html = html.substring(0,html.indexOf("</d1>"));
				html = html.replace("</td><dd>", "");
				html = html.replace("</dd>", "");
				html = html.replace("</td><dd>", "");
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return text;
	}

	public void test(String filePath, String urlStr, String charset){
		HttpClient httpClient = new DefaultHttpClient();
		HttpGet httpGet = new HttpGet(urlStr);
		try {
			HttpResponse httpResponse = httpClient.execute(httpGet);
			HttpEntity httpEntity = httpResponse.getEntity();
			
			InputStream in = null;
			if(httpEntity!=null){
				System.out.println(httpEntity.getContentLength());
				in = httpEntity.getContent();
				SpiderTest st = new SpiderTest();
				String str = SpiderUtil.Inputstream2String(in, charset);
				SpiderUtil.saveHtml(filePath, str);
			}
			
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
