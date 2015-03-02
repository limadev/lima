package com.lima.util;

import org.joda.time.DateTime;
import org.joda.time.Hours;
import org.joda.time.Minutes;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class makerandom {
private static final String ALPHA_NUM = "0123456789";
	
	public 	static String generatePassword(int length,String email) 
	{
		
		String md=email.substring(0, 4);
		StringBuffer sb = new StringBuffer(length);  
	       for (int i=0;  i<length;  i++) {  
	          int ndx = (int)(Math.random()*ALPHA_NUM.length());  
	          sb.append(ALPHA_NUM.charAt(ndx));  
	       }  
	       return md.concat(sb.toString());
	      
	}
	
	public static void main(String args[])
	{
		String datetime1 = "2014-09-10 05:22:34";
		String datetime2 = "2014-09-11 05:23:28";

		DateTimeFormatter format = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");
		DateTime time1 = format.parseDateTime(datetime1);
		DateTime time2 = format.parseDateTime(datetime2);
		Minutes Interval = Minutes.minutesBetween(time1, time2);
		Minutes minInterval = Minutes.minutes(20);
		Hours hrs=Hours.hoursBetween(time1, time2);
		Hours minhrs=Hours.hours(12);
		if(hrs.isGreaterThan(minhrs))
		{
			System.out.println(hrs);
		}
		else 
		{
			System.out.println(false);

		}
		if(Interval.isGreaterThan(minInterval)){
		  System.out.println("true");
		}
		else{
			  System.out.println("true");
		}
	}
}
