/**
 * 
 */
package com.mc.framework.sys.model;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

/**
 * @author zouqone
 * @date 2015年4月19日 下午12:00:38
 * 用户
 */
@Entity
@Table(name="sys_user")
@Cacheable 
public class User {

	/*=======================属性=========================*/
	/**
	 * 主键  (主键生成策略十三种  
	 * native,hilo,uuid,assigned
	 * ,identity,select,sequence,seqhilo
	 * ,increment,foreign,guid,uuid.hex
	 * ,sequence-identity
	 * )
	 */
	@Id
	@Column(name="id")
	@GeneratedValue(generator = "paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "assigned")
	
	private String userid;
	
	/**
	 * 用户登录名称
	 */
	private String username;
	
	/**
	 * 用户的中文名称
	 */
	private String fullname;
	
	/**
	 * 用户登录密码
	 */
	private String password;
	
	/**
	 * 登录时间
	 */
	private String logintime;
	
	/**
	 * 创建时间
	 */
	private String createtime;
	
	/**
	 * 上一次登录时间
	 */
	private String prelogintime;
	
	/**
	 * 登录次数
	 */
	private Long logincount;
	
	/**
	 * 人员信息
	 */
	private String person;
	
	
	
	/*=====================构造函数=========================*/
	/**
	 * 
	 */
	public User() {
		// TODO Auto-generated constructor stub
	}

	public User(String userid, String username, String fullname, String password,
			String logintime, String createtime, String prelogintime,
			Long logincount, String person) {
		super();
		this.userid = userid;
		this.username = username;
		this.fullname = fullname;
		this.password = password;
		this.logintime = logintime;
		this.createtime = createtime;
		this.prelogintime = prelogintime;
		this.logincount = logincount;
		this.person = person;
	}


	
	/*=======================set and get==========================*/
	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	@NotNull(message="用户名不能为空")
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@NotNull(message="用户中文名不能为空")
	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	@NotNull(message="用密码不能为空")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLogintime() {
		return logintime;
	}

	public void setLogintime(String logintime) {
		this.logintime = logintime;
	}

	public String getCreatetime() {
		return createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}

	public String getPrelogintime() {
		return prelogintime;
	}

	public void setPrelogintime(String prelogintime) {
		this.prelogintime = prelogintime;
	}

	public Long getLogincount() {
		return logincount;
	}

	public void setLogincount(Long logincount) {
		this.logincount = logincount;
	}

	public String getPerson() {
		return person;
	}

	public void setPerson(String person) {
		this.person = person;
	}
	
}
