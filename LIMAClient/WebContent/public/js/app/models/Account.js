/**
 * @author Hemanth B
 * 
 *
 * Model user
 * @param 
 **/
window.Account = Backbone.Model.extend({
	url : function() {
		return BASEURL_API + "user/select";
	},

	idAttribute : "user_id",
	defaults : {
		"user_id" : null,
		"username" : "",
		"user_email" : "",
		"confirm_email" : "",
		"user_password" : "",
		"confirm_password" : "",
		"user_first_name" : "",
		"user_last_name" : ""
	},

	/*
	 * Get info about user
	 */
	sync : function(method, model, options) {
		if (method == "read") {
			options.data = {
				submit : 1,
				zuser_id : this.get("user_id")
			};
		} else if(method == "update") {
			options.type = "PUT";
			options.url = BASEURL_API + "account/edit_user?stoken=" + window.sess.stoken;
		}
		options.async = false;
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