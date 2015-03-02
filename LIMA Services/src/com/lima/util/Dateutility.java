package com.lima.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Dateutility {
	public static java.sql.Date xmlDateChange(String xmldate) {
		// SimpleDateFormat formatDateJava1 = new
		// SimpleDateFormat("yyyy-MM-dd");

		SimpleDateFormat formatDateJava = new SimpleDateFormat("dd/MM/yyyy");
		Date dt = null;
		try {
			dt = formatDateJava.parse(xmldate);

		} catch (ParseException e) {

		}
		// return dt;
		return (new java.sql.Date(dt.getTime()));
	}
}
