/**
 * 
 */
package com.lima.products;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ResourceBundle;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.lima.database.DBManagerIMPL;
import com.lima.database.DBManagerResourceRelease;
import com.lima.database.DBQueries;
import com.lima.encryptionservice.EncryptionIMPL;

/**
 * @author Hemanth
 *
 */
public class ProductManagementImpl implements IProductManagement{

	DBManagerIMPL databaseObj=new DBManagerIMPL();
	Connection dbConnection;
	
	@Override
	public JSONObject getCategories() {
		
		CallableStatement getCategoriesQ=null;
		ResultSet getCategoriesRS=null;
		JSONObject AckObj=new JSONObject();
		JSONArray categoryList=new JSONArray();
		JSONObject categories=new JSONObject();
		
		ResourceBundle bundle = ResourceBundle.getBundle("limarb");
		
		try {
			dbConnection=databaseObj.getDatabaseConnection();
			getCategoriesQ=dbConnection.prepareCall(DBQueries.GET_CATEGORIES);
			getCategoriesRS=getCategoriesQ.executeQuery();
			while(getCategoriesRS.next())
			{
				JSONObject ackobj=new JSONObject();
				ackobj.put("category_id", getCategoriesRS.getString("category_id"));
				ackobj.put("name", getCategoriesRS.getString("name"));
				ackobj.put("code", getCategoriesRS.getString("code"));
				ackobj.put("description",getCategoriesRS.getString("description"));
				ackobj.put("created",getCategoriesRS.getString("created"));
				
				categoryList.add(ackobj);
				
			}
			if(categoryList.isEmpty())
			{
				//no tasks for user
				categories.put("status", "success");
				categories.put("message", "No category List");
			}
			else{
				
				categories.put("status", "success");
				categories.put("categories", categoryList);
			}
			
		} catch (Exception e) {
			categories.put("status", "fail");
			e.printStackTrace();
			categories.put("message", "database not connected");
		}finally
		{
			DBManagerResourceRelease.close(getCategoriesRS, getCategoriesQ, dbConnection);
		}
		
		return categories;
	}

	@Override
	public JSONObject getProducts() {
		
		CallableStatement getProductsQ=null;
		ResultSet getProductsRS=null;
		JSONObject AckObj=new JSONObject();
		JSONArray productList=new JSONArray();
		JSONObject products=new JSONObject();
		
		ResourceBundle bundle = ResourceBundle.getBundle("limarb");
		
		try {
			dbConnection=databaseObj.getDatabaseConnection();
			getProductsQ=dbConnection.prepareCall(DBQueries.GET_PRODUCTS);
			getProductsRS=getProductsQ.executeQuery();
			while(getProductsRS.next())
			{
				JSONObject ackobj=new JSONObject();
				ackobj.put("category_id", getProductsRS.getInt("category_id"));
				ackobj.put("name", getProductsRS.getString("name"));
				ackobj.put("product_id", getProductsRS.getInt("products_id"));
				ackobj.put("description",getProductsRS.getString("description"));
				ackobj.put("created",getProductsRS.getString("created"));
				
				productList.add(ackobj);
				
			}
			if(productList.isEmpty())
			{
				//no tasks for user
				products.put("status", "success");
				products.put("message", "No products List");
			}
			else{
				
				products.put("status", "success");
				products.put("products", productList);
			}
			
		} catch (Exception e) {
			products.put("status", "fail");
			e.printStackTrace();
			products.put("message", "database not connected");
		}finally
		{
			DBManagerResourceRelease.close(getProductsRS, getProductsQ, dbConnection);
		}
		
		return products;
	}


}
