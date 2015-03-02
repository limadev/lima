/**
 * @author Hemanth B
 * @author Madhu B
 *
 * Model user
 * @param 
 **/
window.User = Backbone.Model.extend({
	url : function() {
		return BASEURL_API + "usersignup";
	},

	idAttribute : "user_id",
	defaults : {
		"user_id" : null,
		"username" : "",
		"user_role" : "",
		"user_email" : "",
		"user_password" : "",
		//"confirm_password" : "",
		"user_mobile" : "",
	},

	/*
	 * Get info about user
	 */
	sync : function(method, model, options) {
		
		if (method == "create") {
			options.type = "POST";
			
		}
		if (method == "update") {
			options.type = "PUT";
			options.url = BASEURL_API + "resetpassword";
		}
		return Backbone.sync(method, model, options);
	},

	/**
	 * Get information about auth
	 **/
	parse : function(response) {
		TextHelper.findMessage(response);
		if (_.isUndefined(response.recs)) {
			return response;
		}
		if (_.isArray(response.recs)) {
			return response.recs[0];
		}
		return response;
	}

});