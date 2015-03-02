package com.lima.database;

public class DBQueries {

	public static final String REGISTERUSER = "{call register_user(?,?,?,?,?,?)}";
	public static final String LOGINUSER = "{call authenticate_user(?,?)}";

	public static final String FORGOTPASSWORD = "{call forgot_password(?)}";
	public static final String VALIDATEEXPENSE = null;
	public static final String INSERTFTOKEN = "{call ftoken(?,?)}";
	
	public static final String GET_CATEGORIES = "{call get_categories()}";
	public static final String GET_PRODUCTS= "{call get_products()}";
	
}
