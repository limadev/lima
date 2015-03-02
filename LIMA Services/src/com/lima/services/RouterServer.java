/**
 * @author Hemanth
 */
package com.lima.services;

import javax.print.attribute.standard.Media;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.simple.JSONObject;

import com.lima.products.IProductManagement;
import com.lima.products.ProductManagementImpl;
import com.lima.users.IUserManagement;
import com.lima.users.UserManagementImpl;

@Path("/services")
public class RouterServer {
	
	IUserManagement userObj=new UserManagementImpl();
	IProductManagement productObj = new ProductManagementImpl();
	/*
	@GET
	@Path("/usersignup")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	
	public JSONObject registerUser(@QueryParam("empno")String empno,@QueryParam("password")String password,@QueryParam("email")String email)
	{

		return userObj.registerUser(empno, password, email);
		
	}*/
	
	@POST
	@Path("/usersignup") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject registerUser(final JSONObject registertData){
		
		return userObj.registerUser(registertData);

	 }
	
	@GET
	@Path("/userlogin")
	//@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject loginUser(@QueryParam("username")String username,@QueryParam("password")String password)
	{
		System.out.println("username ::"+username +"apssword ::"+password);
		return userObj.authenticateUser(username, password);
		
	}
	@GET
	@Path("/forgotpassword")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)

	public JSONObject ForgotUserPassword(@QueryParam("email")String email)
	{

		return  userObj.forgotpassword(email);
		
	}
	@GET
	@Path("/resetpassword")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)

	public JSONObject resetpassword(@QueryParam("uid")int uid,@QueryParam("ftoken")String ftoken,@QueryParam("newpassword")String newpassword)
	{

		return  userObj.resetpassword(uid,ftoken,newpassword);
		
	}
	
	@GET
	@Path("/femailconform")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)

	public JSONObject ForgotPasswordConformlink(@QueryParam("email")String email)
	{

		return  userObj.forgotpassword(email);
		
	}
	
	
	@GET
	@Path("getcategories")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject getCategories(){
		
		return productObj.getCategories();
		
	}
	
	@GET
	@Path("getproducts")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject getProducts(){
		
		return productObj.getProducts();
		
	}
	
}
