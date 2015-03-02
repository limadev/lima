package com.lima.users;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.util.ResourceBundle;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.lima.database.DBManagerIMPL;
import com.lima.database.DBManagerResourceRelease;
import com.lima.database.DBQueries;
import com.lima.encryptionservice.EncryptionIMPL;
import com.lima.encryptionservice.RandomPassword;
import com.lima.mailerservice.MailerService;
import com.lima.util.makerandom;


public class UserManagementImpl implements IUserManagement {

	DBManagerIMPL databaseObj=new DBManagerIMPL();
	Connection dbConnection;
	
	public JSONObject registerUser(JSONObject registerData) {
		
		CallableStatement insertUsersQ=null;
		ResultSet insertUsersRS=null;
		JSONObject AckObj=new JSONObject();
		
		ResourceBundle bundle = ResourceBundle.getBundle("limarb");

		EncryptionIMPL implobj = new EncryptionIMPL(bundle.getString("passPhrase"));
		
		String encryptedpassword = null;
		String encryptedconfirmpassword = null;
		
		encryptedpassword = implobj.encrypt((String)registerData.get("user_password"));
		
		encryptedconfirmpassword = implobj.encrypt((String)registerData.get("confirm_password"));
		try {
			dbConnection=databaseObj.getDatabaseConnection();
			//1.check for previous existance of user
			//2.if exists return user already registered
			//3.or else register user and ackn
			insertUsersQ=dbConnection.prepareCall(DBQueries.REGISTERUSER);

			insertUsersQ.setString(1, (String)registerData.get("username"));
			insertUsersQ.setInt(2, Integer.parseInt( (String) registerData.get("user_role")));
			insertUsersQ.setString(3,  (String)registerData.get("user_email"));
			insertUsersQ.setString(4,  encryptedpassword);
			insertUsersQ.setString(5,  encryptedconfirmpassword);
			insertUsersQ.setString(6, (String) registerData.get("user_mobile"));
			insertUsersRS=insertUsersQ.executeQuery();
			if(insertUsersRS.next()){
				if(insertUsersRS.getString("resp").equalsIgnoreCase("registered")){	
					AckObj.put("status", "success");					
					AckObj.put("User name", (String)registerData.get("username"));
					AckObj.put("msg", "Successfully Registered:Please Login");	
					return AckObj;
				}else{
					AckObj.put("status", "failure");					
					AckObj.put("user name", (String)registerData.get("username"));
					AckObj.put("msg", "Already Registered:Please Login");	
					return AckObj;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			AckObj.put("status", "fail");
			
			AckObj.put("msg", "database not connected");
		}finally
		{
			DBManagerResourceRelease.close(insertUsersRS, insertUsersQ, dbConnection);
		}
		
		return AckObj;
	}
	@Override
	public JSONObject authenticateUser(String username, String password) {
		CallableStatement chkLoginUsersQ=null;
		ResultSet chkLoginUsersRS=null;
		JSONObject AckObj=new JSONObject();
		JSONObject AckObj1=new JSONObject();
		ResourceBundle bundle = ResourceBundle.getBundle("limarb");
		
		EncryptionIMPL implobj = new EncryptionIMPL(bundle.getString("passPhrase"));
		
		String encryptedpassword = null;
		
		try {
			if(username.isEmpty() ||password.isEmpty())
			{
				AckObj.put("status", "errors");					
				AckObj.put("message", "No Inputs are Specified ");	
			}else{
			encryptedpassword = implobj.encrypt(password);
			
			dbConnection=databaseObj.getDatabaseConnection();
			//1.check for previous existance of user
			//2.if exists return user already registered
			//3.or else register user and ackn
			chkLoginUsersQ=dbConnection.prepareCall(DBQueries.LOGINUSER);
			chkLoginUsersQ.setString(1,username);
			chkLoginUsersQ.setString(2,encryptedpassword);
			chkLoginUsersRS=chkLoginUsersQ.executeQuery();
			if(chkLoginUsersRS.next())
			{
				
				AckObj1.put("Username", username);
				AckObj1.put("userid", chkLoginUsersRS.getString("User_Id"));
				AckObj1.put("roleid", chkLoginUsersRS.getString("role_id"));
				AckObj1.put("role_name", chkLoginUsersRS.getString("role_name"));
					
					AckObj.put("status", "success");					
					AckObj.put("message", "User Authentication Success");	
					/*AckObj.put("Username", username);
					AckObj.put("userid", chkLoginUsersRS.getString("User_Id"));
					AckObj.put("roleid", chkLoginUsersRS.getString("role_id"));*/
					AckObj.put("user", AckObj1);
					return AckObj;
				}
				else
				{
					AckObj.put("status", "failure");					
					AckObj.put("Username", username);
					AckObj.put("message", "Invalid Login Details");	
					return AckObj;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			AckObj.put("status", "fail");
			
			AckObj.put("message", "database not connected");
		}finally
		{
			DBManagerResourceRelease.close(chkLoginUsersRS, chkLoginUsersQ, dbConnection);
		}
		
		return AckObj;
				
	}
	
	
	public JSONObject forgotpassword(String email) {
		CallableStatement chkLoginUsersQ=null;
		ResultSet chkLoginUsersRS=null;
		JSONObject AckObj=new JSONObject();
		
		
		
		try {
			dbConnection=databaseObj.getDatabaseConnection();
			//1.Create a link for forgo
			//2.if exists return user already registered
			//3.or else register user and ackn
			chkLoginUsersQ=dbConnection.prepareCall(DBQueries.FORGOTPASSWORD);
			chkLoginUsersQ.setString(1,email);
			
			chkLoginUsersRS=chkLoginUsersQ.executeQuery();
			if(chkLoginUsersRS.next())
			{
				//get uid and store for update
				int uid=chkLoginUsersRS.getInt("Uid");
				
				//email exist now get first 4letter of email and generate a random 4digit number concatenate  and then send as email
				
				//1.generate token and insert in usertable with datenow
				String ftoken=makerandom.generatePassword(4, email);
				
				CallableStatement insertQ=null;
				ResultSet insertRS=null;
				
				insertQ=dbConnection.prepareCall(DBQueries.INSERTFTOKEN);
				insertQ.setString(1, ftoken);
				insertQ.setInt(2,uid);
				insertRS=insertQ.executeQuery();
				if(insertRS.next())
				{
					if(insertRS.getString("resp").equalsIgnoreCase("tokenadded"))
					{
						
						//put code to send email
						//send mail
						MailerService mailerService=new MailerService();
						// to address to send mail
						String toEmailAddress = email;
						
						String emailSubject = "Lima:User Assistance";
						String emailMessage = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'/><title>Welcome To Lima </title></head>"
								+ "<body>"
								+ "<table width='1000' border='0' align='center' cellpadding='15' cellspacing='0' style='font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12pt; color:#5a5a5a;'>"
								+ "<tr>"
								+ "<td align='left'>"
								+ "<table align='center' bgcolor='#333333' cellpadding='0' cellspacing='0' width='65%' border='0' style='padding-bottom:10px; padding-top:10px'>"
								+ "<br />"
								+ "<tr>"
								+ "<td bgcolor='#333333' style=' font-weight:bold;' width='33%'>"
								+ "<!-- Image tag-->"
								+ "</td>"
								+ "</tr>"
								+ "<tr>"
								+ "<td align='left' bgcolor='#FFFFFF'>		<!-- Information Tag-->"
								+ "<p>Hi "+toEmailAddress+",<br/>"
								+"<br/>Greetings from Lima"
								+"<br/>"
								+ "<p align='left'>This is Temporary Password .</p>"
								+ "<p align='left'>"
								+ "<font>EmpNo: "
								+ "</font>"
								+ "<br/><font>Temporary Password : "
								+ ftoken
								+ "</font></p>"
								+ "<p>Regards,<br/>Lima<br/>Registration Division<br /></p>"
								+ "<p><br /><br />PLEASE DO NOT REPLY.<br/> THIS IS AN AUTOMATED MESSAGE;  </p>"
								+ "</td>"
								+ "</tr>"
								+ "</table>							<!-- Table 2 End-->"
								+ "</td></tr>"
								+ "</table>"
								+ "</body>"
								+ "</html>";

						
							String mailResp=mailerService.sendMail(toEmailAddress, emailSubject, emailMessage);
							if(mailResp.equalsIgnoreCase("Mail Sent Success"))
							{
								AckObj.put("mailmsg","MAILSENTSUCCESS");
								AckObj.put("status", "success");	
								AckObj.put("Uid", uid);
								AckObj.put("ftoken", ftoken);
							}else{
								AckObj.put("mailmsg","MAILSENTFAILURE");
							}
						
						return AckObj;
					}
					else
					{
						AckObj.put("status", "failure");					
						AckObj.put("Uid", uid);
						return AckObj;
					}
				}	
				else
				{
					AckObj.put("status", "failure");					
					AckObj.put("Uid", uid);
					return AckObj;
				}
									}
				else
				{
					AckObj.put("status", "failure");					
					AckObj.put("msg", "Invalid Email Details");	
					return AckObj;
				}
			
			
		} catch (Exception e) {
			AckObj.put("status", "fail");
			e.printStackTrace();
			AckObj.put("msg", "database not connected");
		}finally
		{
			DBManagerResourceRelease.close(chkLoginUsersRS, chkLoginUsersQ, dbConnection);
		}
		
		return AckObj;
	}
	@Override
	public JSONObject resetpassword(int uid,String ftoken, String newpassword) {
		//1.get token and password
		//2.validate token with db token saved and validate with 12hrs time against time in db
		//3.if token is same and time is less that 12hrs
		//4.allow to reset password
		//5.if time is more than 12hrs or token is not same 
		
		return null;
	}
		
	
}
