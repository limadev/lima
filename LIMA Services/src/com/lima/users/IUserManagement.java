package com.lima.users;

import org.json.simple.JSONObject;



public interface IUserManagement {
	JSONObject registerUser(JSONObject registerData);

	JSONObject authenticateUser(String user_name, String password);
	

	JSONObject forgotpassword(String email);
	JSONObject resetpassword(int uid,String ftoken,String newpassword);

}
