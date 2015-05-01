/**
 * 
 */
package com.mc.framework.base.model;

import java.util.List;

/**
 * @author zouqone
 * @date 2015年4月19日 上午1:59:13
 */
public class Pager<T> {

	/**
	 * 分页的大小
	 */
	private int size;
	
	/**
	 * 分页的起始页
	 */
	private int offset;
	
	/**
	 * 总记录数
	 */
	private long total;
	
	/**
	 * 分页的数据
	 */
	private List<T> datas;

	/**
	 * @return the size
	 */
	public int getSize() {
		return size;
	}

	/**
	 * @param size the size to set
	 */
	public void setSize(int size) {
		this.size = size;
	}

	/**
	 * @return the offset
	 */
	public int getOffset() {
		return offset;
	}

	/**
	 * @param offset the offset to set
	 */
	public void setOffset(int offset) {
		this.offset = offset;
	}

	/**
	 * @return the total
	 */
	public long getTotal() {
		return total;
	}

	/**
	 * @param total the total to set
	 */
	public void setTotal(long total) {
		this.total = total;
	}

	/**
	 * @return the datas
	 */
	public List<T> getDatas() {
		return datas;
	}

	/**
	 * @param datas the datas to set
	 */
	public void setDatas(List<T> datas) {
		this.datas = datas;
	}

	
}
