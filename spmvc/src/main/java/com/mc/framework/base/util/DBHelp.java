/**
 * 
 */
package com.mc.framework.base.util;

/**
 * @author zouqone
 * @date 2014年5月28日 下午10:52:16
 */
public class DBHelp {

	/**
	 * 增加查询条件
	 * @param condition
	 * @param another
	 * @return
	 */
	public static String AddCondition(String condition , String another){
		if(condition == null || condition.trim().equals("")){
			condition = another;
		}else{
			if(another != null && !another.trim().equals("")){
				condition +=" AND "+another;
			}
		}
		return condition;
	}
	
	public static String addWhereCondition(String select , String condition){
		if(condition != null && !condition.trim().equals("")){
			select += " where "+ condition;
		}
		return select;
	}
	
	/**
	 * 增加查询条件  condition+" AND "+column+" "+optType+" "+opt1+value+opt2+" "
	 * @param condition 
	 * @param column 字段名称
	 * @param value 值
	 * @param optType 操作符类型 = <= >= != 
	 * @param opt1 值左侧符号 ',"
	 * @param opt2 值右侧符号 ',"
	 * @return
	 */
	public static String AddCondition(String condition,String column , String value,
			String optType,String opt1,String opt2){
		if(optType == null){
			optType = "=";
		}
		if(opt1 == null||opt2 == null){
			opt1 = "";
			opt2 = "";
		}
		
		String another = null;
		if(column != null && !column.trim().equals("")){
			another = " "+column+" "+optType+" "+opt1+value+opt2+" ";
		}
		condition = AddCondition(condition, another);
		return condition;
	}
	
	/**
	 * 增加非连接条件
	 * @param condition
	 * @param another
	 * @return
	 */
	public static String AddString(String condition,String another){
		if(condition == null || condition.trim().equals("")){
			condition = another;
		}else{
			if(another != null && !another.trim().equals("")){
				condition +=" "+another;
			}
		}
		return condition;
	}
}
