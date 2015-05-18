/**
 * 
 */
package com.test.spider;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.zip.GZIPInputStream;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.SimpleHttpConnectionManager;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpConnectionManagerParams;
import org.apache.commons.httpclient.params.HttpMethodParams;

/**
 * @author zouqone
 * @date 2015年5月18日 下午11:34:15
 */
public class HttpClientHelper {

	/**
	 * HttpClient 连接超时、读取数据超时时间设置(单位：毫秒)
	 */
	public static final int HTTPCLIENT_CONNECTION_TIMEOUT = 30000;
	public static final int HTTPCLIENT_SO_TIMEOUT = 120000;
	public static final int HTTPMETHOD_SO_TIMEOUT = 5000;

	// 让connectionmanager管理httpclientconnection时是否关闭连接
	private static boolean alwaysClose = false;
	private static String defaultEncode = "UTF-8";

	private static final DateFormat DATE_FORMAT = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	/**
	 * 获取HttpClient连接，并设置相关参数
	 * 
	 * @return
	 */
	public static HttpClient getHttpClient() {
		HttpClient client = new HttpClient(new SimpleHttpConnectionManager(
				alwaysClose));
		HttpConnectionManagerParams managerParams = client
				.getHttpConnectionManager().getParams();
		// 设置连接超时时间(单位毫秒)
		managerParams.setConnectionTimeout(HTTPCLIENT_CONNECTION_TIMEOUT);
		// 设置读数据超时时间(单位毫秒)
		managerParams.setSoTimeout(HTTPCLIENT_SO_TIMEOUT);
		return client;
	}

	/**
	 * 获取HttpClient连接，并设置相关参数
	 * 
	 * @param logonSite
	 * @param logonPort
	 * @param protocol
	 * @return
	 */
	public static HttpClient getHttpClient(final String logonSite,
			final int logonPort, final String protocol) {
		HttpClient client = new HttpClient(new SimpleHttpConnectionManager(
				alwaysClose));
		client.getHostConfiguration().setHost(logonSite, logonPort, protocol);
		HttpConnectionManagerParams managerParams = client
				.getHttpConnectionManager().getParams();
		// 设置连接超时时间(单位毫秒)
		managerParams.setConnectionTimeout(HTTPCLIENT_CONNECTION_TIMEOUT);
		// 设置读数据超时时间(单位毫秒)
		managerParams.setSoTimeout(HTTPCLIENT_SO_TIMEOUT);
		return client;
	}

	private static List<Header> getHeaders(Map<String, String> header) {
		List<Header> headers = new ArrayList<Header>();
		boolean includeUserAgent = false;
		if (null != header && false == header.isEmpty()) {
			Set<Entry<String, String>> entrySet = header.entrySet();
			for (Entry<String, String> entry : entrySet) {
				if (false == includeUserAgent
						&& "User-Agent".equals(entry.getKey())) {
					includeUserAgent = true;
				}
				headers.add(new Header(entry.getKey(), entry.getValue()));
			}
		}

		if (false == includeUserAgent) {
			headers.add(new Header(
					"User-Agent",
					"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; GTB5; .NET CLR 1.1.4322; .NET CLR 2.0.50727; Alexa Toolbar; MAXTHON 2.0)"));
		}
		return headers;
	}

	private static NameValuePair[] getPairs(Map<String, String> postData) {
		if (null == postData || postData.isEmpty()) {
			return null;
		}

		Set<Entry<String, String>> entrySet = postData.entrySet();
		int dataLength = entrySet.size();
		NameValuePair[] pairs = new NameValuePair[dataLength];
		int i = 0;
		for (Entry<String, String> entry : entrySet) {
			pairs[i++] = new NameValuePair(entry.getKey(), entry.getValue());
		}
		return pairs;
	}

	/**
	 * 请求网页内容信息
	 * 
	 * @param httpClient
	 * @param reqUrl
	 * @param header
	 * @param postData
	 * @param encode
	 * @return
	 */
	public static String doRequest(HttpClient httpClient, String reqUrl,
			Map<String, String> header, Map<String, String> postData,
			String encode) {
		String htmlContent = null;
		if (null == httpClient) {
			return htmlContent;
		}

		// 请求编码设置
		encode = (null == encode ? defaultEncode : encode);

		// 头部请求信息
		List<Header> headers = getHeaders(header);

		System.out.println("[ " + DATE_FORMAT.format(new Date())
				+ " ] -- doRequest -- " + reqUrl);

		// post方式
		if (null != postData) {
			PostMethod postMethod = new EncodePostMethod(reqUrl, encode);
			for (Header tempHeader : headers) {
				postMethod.setRequestHeader(tempHeader);
			}

			// post参数设置
			NameValuePair[] params = getPairs(postData);
			if (null != params) {
				postMethod.setRequestBody(params);
			}

			// 提取网页内容
			htmlContent = executeMethod(httpClient, postMethod, encode,
					getWebSite(reqUrl));
		} else {
			GetMethod getMethod = new GetMethod(reqUrl);
			for (Header tempHeader : headers) {
				getMethod.setRequestHeader(tempHeader);
			}

			// 提取网页内容
			htmlContent = executeMethod(httpClient, getMethod, encode, null);
		}
		return htmlContent;
	}

	private static String getWebSite(String reqUrl) {
		String website = null;
		if (null == reqUrl || reqUrl.isEmpty()) {
			return website;
		}

		String prefix = "http://";
		if (reqUrl.startsWith(prefix)) {
			int index = reqUrl.substring(prefix.length()).indexOf("/")
					+ prefix.length();
			website = reqUrl.substring(0, index);
		}
		return website;
	}

	/**
	 * 通过HttpMethod 获取网页内容
	 * 
	 * @param httpClient
	 * @param requestMethod
	 * @param encode
	 * @param website
	 * @return
	 */
	private static String executeMethod(HttpClient httpClient,
			HttpMethod requestMethod, String encode, String website) {
		String responseContent = null;
		if (null == httpClient) {
			return responseContent;
		}

		// 判断是否请求加密数据
		boolean dataEncrypt = false;
		Header acceptEncoding = requestMethod
				.getRequestHeader("accept-encoding");
		if (null != acceptEncoding
				&& acceptEncoding.getValue().contains("gzip")) {
			dataEncrypt = true;
		}

		InputStream responseStream = null;
		try {
			int status = httpClient.executeMethod(requestMethod);
			if (HttpStatus.SC_OK == status) {
				responseStream = requestMethod.getResponseBodyAsStream();
				responseContent = getContentByStream(
						dataEncrypt ? new GZIPInputStream(responseStream)
								: responseStream, encode);
				responseStream.close();
			}
			// 返回代码为301,302,303,307时，表示页面己经重定向，则重新请求location的url，这在一些登录授权取cookie时很重要
			else if (HttpStatus.SC_MOVED_PERMANENTLY == status
					|| HttpStatus.SC_MOVED_TEMPORARILY == status
					|| HttpStatus.SC_SEE_OTHER == status
					|| HttpStatus.SC_TEMPORARY_REDIRECT == status) {
				// 读取新的URL地址
				Header header = requestMethod.getResponseHeader("location");
				if (header != null) {
					String redirectUrl = header.getValue();
					if (null != redirectUrl && false == redirectUrl.isEmpty()) {
						responseContent = null;
						if (null == redirectUrl || redirectUrl.isEmpty()) {
							redirectUrl = "/";
						}

						if (false == redirectUrl.startsWith("http://")
								&& null != website) {
							if (website.startsWith("/")) {
								redirectUrl = website + redirectUrl;
							} else {
								redirectUrl = website + "/" + redirectUrl;
							}
						}

						GetMethod redirect = new GetMethod(redirectUrl);
						Header referer = requestMethod
								.getRequestHeader("Referer");
						if (null != referer) {
							redirect.addRequestHeader(referer);
						}
						Header cookie = requestMethod
								.getRequestHeader("Cookie");
						if (null != cookie) {
							redirect.addRequestHeader(cookie);
						}
						status = httpClient.executeMethod(redirect);
						if (HttpStatus.SC_OK == status) {
							responseStream = redirect.getResponseBodyAsStream();
							responseContent = getContentByStream(
									responseStream, encode);
							responseStream.close();
						}
					}

				} // end-headers

			} // end-status

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (requestMethod != null) {
				requestMethod.releaseConnection();
			}
		}
		return responseContent;
	}

	/**
	 * 按照指定编码从流中读取信息
	 * 
	 * @param inStream
	 * @param encode
	 * @return
	 * @throws IOException
	 */
	public static String getContentByStream(InputStream inStream, String encode)
			throws IOException {
		if (null == inStream) {
			return null;
		}

		StringBuilder content = new StringBuilder();
		// 采用指定编码格式读取流内容
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				inStream, encode));
		String message = null;
		while (null != (message = reader.readLine())) {
			content.append(message);
			content.append("/r/n");
		}
		// 关闭读取器，释放资源
		reader.close();
		return (content.toString());
	}

	/**
	 * 内部类，继承于PostMethod，用来指定Post请求编码格式
	 */
	public static class EncodePostMethod extends PostMethod {
		private String encode = null;

		public EncodePostMethod(String url, String encode) {
			super(url);
			this.encode = encode;
		}

		@Override
		public String getRequestCharSet() {
			// TODO Auto-generated method stub
			return (this.encode);
		}

	}

	/**
	 * 测试
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		// System.setProperty("http.proxyHost", "165.228.128.10");
		// System.setProperty("http.proxyPort", "3128");
		// System.setProperty("http.proxySet", "true");

		String filePath = "D:/temp/news39.com.html";
		String reqUrl = "http://www.hao123.com/";
		//reqUrl = "http://news.39.net/a/2010722/1404231.html";
		//reqUrl = "http://www.sina.com.cn/";
		
		String encode = "gbk";
		encode = "utf-8";
		
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Accept-Encoding", "gzip,deflate");

		HttpClient httpClient = getHttpClient();
		String htmlContent = doRequest(httpClient, reqUrl, headers, null, encode);
		System.out.println(htmlContent);
		
		
		SpiderUtil.saveHtml(filePath, htmlContent,encode);

	}
}
