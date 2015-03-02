/**
 * @author Hemanth B
 * 
 *	
 * Model sign in form
 **/

window.SignOut = Backbone.Model.extend({
	url : function() {
		return BASEURL_API + "account/sign_out";
	},

	/**
	 * Send post data to server for authorization. Set to cookie auth information.
	 **/
	sync : function(method, model, options) {
		options.type = "POST";
		options.async = false;
		return Backbone.sync(method, model, options);
	},

	parse : function(response) {
		if (response.status != "ok") {
			TextHelper.findMessage(response);
			return;
		}
		$.cookie("sess", null);
		window.sess = undefined;

		$.cookie("TesterInputSess", null);
		window.TesterInputSess = new Object();

		$.cookie("TesterFileSess", null);
		var TesterFileSess = new Object();

		$.cookie("TesterFileTypeSess", null);
		var TesterFileTypeSess = new Object();

		$.cookie("TesterFileContentSess", null);
		var TesterFileContentSess = new Object();

		TextHelper.findMessage(response);
	}

});