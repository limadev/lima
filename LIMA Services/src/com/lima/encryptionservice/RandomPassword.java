package com.lima.encryptionservice;



public class RandomPassword {

	private static final String ALPHA_NUM = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	
	public 	static String generatePassword(int length) 
	{
		StringBuffer sb = new StringBuffer(length);  
	       for (int i=0;  i<length;  i++) {  
	          int ndx = (int)(Math.random()*ALPHA_NUM.length());  
	          sb.append(ALPHA_NUM.charAt(ndx));  
	       }  
	       return sb.toString();  
	}
}
