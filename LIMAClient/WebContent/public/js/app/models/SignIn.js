/**
 * @author Hemanth B
 * 
 */
window.SignIn = Backbone.Model.extend({

	defaults : {
		username : "",
		password : ""
	},

	url : function() {
		return BASEURL_API + "userlogin";
	},

	/**
	 * Send post data to server for authorization. Set to cookie auth
	 * information.
	 */
	sync : function(method, model, options) {
		options.type = "GET";
		options.data = {
			username : this.get("username"),
			password : this.get("password")
		};
		options.async = false;
		return Backbone.sync(method, model, options);
	},

	/**
	 * Get information about auth
	 */
	parse : function(response) {
		$(".dropdown-menu").parent().removeClass('open');
		TextHelper.findMessage(response);

		if (response.status != "success") {
			console.log(JSON.stringify(response));
			if (app.hash === "") {

				MainHelper.navigate("sign-in");
				TextHelper.addMessage(response.message);
				TextHelper.showMessages();

			} else {
				MainHelper.redirectSignIn();
				TextHelper.showMessages();
			}
			if (!_.isUndefined(response.errors)) {
				TextHelper.showErrors(response.errors);
			}
			return;

		}
		window.sess = response.user;
		console.log(JSON.stringify(window.sess));
	//	window.sess.stoken = response.stoken;
		$.cookie("sess", JSON.stringify(window.sess));
		//MainHelper.navigate("itemList");
		MainHelper.navigate("");
	}

});