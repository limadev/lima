package com.lima.util;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class DateUtil {
	
	public static String timezonedat(String urdate) throws ParseException
	{
		//04/30/2014 11:25 PM
		//2004-10-19 10:23:54+02
		//Date date = new Date();
		SimpleDateFormat formatdbtoDate = new SimpleDateFormat("MM/dd/yyyy hh:mm a");
		
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS Z");
		dateFormat.setTimeZone(TimeZone.getDefault());
		//String formattedDateTime = dateFormat.format(urdate);
		//return formattedDateTime;
		
		return dateFormat.format(formatdbtoDate.parse(urdate));
		
	}
	public static String makeDateNow() {
		DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy hh:mm a z");
		Date date = new Date();
		String formattedDateTime = dateFormat.format(date);
		return formattedDateTime;
	}

	public static String formatDate(String dbDate) throws ParseException {
		SimpleDateFormat formatdbtoDate = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat formatDateJava = new SimpleDateFormat("dd/MM/yyyy");

		return formatDateJava.format(formatdbtoDate.parse(dbDate));
	}

	public static String getDate(long milliSeconds) {
		// Create a DateFormatter object for displaying date in specified
		// format.
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy hh:mm a z");
		// Create a calendar object that will convert the date and time value in
		// milliseconds to date.
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(milliSeconds);
		return formatter.format(calendar.getTime());
	}

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

	public static String responseDate(String dbDate) throws ParseException {
		SimpleDateFormat formatdbtoDate = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat formatDateJava = new SimpleDateFormat("MM-dd-yyyy");
		return formatDateJava.format(formatdbtoDate.parse(dbDate));
	}

	public static String durationTime(String time) {
		DateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		Date date = null;
		try {
			date = sdf.parse(time);
		} catch (ParseException e) {

		}

		return sdf.format(date);

	}

	public static Date getJavaScriptDate(String dbDate) {
		// Create a DateFormatter object for displaying date in specified
		// format.
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		// Create a calendar object that will convert the date and time value in
		// milliseconds to date.
		Date date = null;
		try {									//Tue Oct 01 2013 00:00:00
			date = formatter.parse(dbDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
}
