/**
 * @author Hemanth B
 * 
 **/

window.ForgotPassword = Backbone.Model.extend({

	initialize : function() {
		/* this.locationHash = window.location.hash;*/
	},
	defaults : {
		username : "",
		user_email : ""
	},
	url : function() {
		return BASEURL_API + "account/forgot";
	},

	/**
	 * Send post data to server for authorization. Set to cookie auth information.
	 **/
	sync : function(method, model, options) {
		options.type = "POST";
		options.data = {};
		if (!TextHelper.isStringEmpty(this.get("username"))) {
			options.data.username = this.get("username");
		}else{
			options.data.user_email = this.get("user_email");
		} 
		options.async = false;
		return Backbone.sync(method, model, options);
	},

	parse : function(response) {
		TextHelper.findMessage(response);
		if (response.status != "ok") {
			MainHelper.navigate("#forgot");
			
			if(!_.isUndefined(response.errors)){
				TextHelper.showErrors(response.errors);
			}
			
			return;
		}
		
		
		
		app.forgotPasswordSteps();
		TextHelper.showMessages();
	}

});