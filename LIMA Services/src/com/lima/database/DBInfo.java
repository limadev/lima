
package com.lima.database;


import java.util.ResourceBundle;

import com.lima.logging.LogWrapper;
/**
 * DBInfo Class to obtain database related connection parameters from properties file
 * These parameters will be used by DBManagerIMPL class to establish connection with database.
 * Parameters Specified are:
@author Madhu
 */

public class DBInfo {
	/**
	 * Parameter related variables declaration 
	 */
	 private static DBInfo _instance = null;
     public String port = null;
     public String database = null;
     public String ip = null;
     public String user = null;
     public String pass = null;
     public String jdbc = null;
     public String driver = null;
     /**
 	 * Constructor to obtain parameters from properties file
 	 */
     LogWrapper Log=new LogWrapper(this.getClass().getSimpleName());

    protected DBInfo(){
    	
    try{
    	//resouce bundle to read string's specified in properties file
    	ResourceBundle propsBundle=ResourceBundle.getBundle("limadb");
        
        port = propsBundle.getString("PORT");
        ip = propsBundle.getString("IP");
        database = propsBundle.getString("DATABASE");
        user = propsBundle.getString("USER");
        pass = propsBundle.getString("PASS");
        jdbc = propsBundle.getString("JDBC");
        driver = propsBundle.getString("DRIVERNAME");
       
       } 
    catch(Exception e){
        //System.out.println("error" + e);
    	Log.error(this.getClass().getSimpleName()+e);
       }	 
    }
   
	/**
 	 * getinstance() method to return single instance of DBInfo Class
 	 * @return DBInfo
 	 */
    static public DBInfo getinstance(){
        if (_instance == null) {
        	
            _instance = new DBInfo();
            return _instance;
        }
        
        return _instance;
    }

}
