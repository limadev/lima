/**
 * @authorHemanth B
 * 
 **/

window.PasswordReset = Backbone.Model.extend({
	urlRoot : BASEURL_API + "account/reset-password",

	sync : function(method, model, options) {
		options.data = {
			user_id : this.get("user_id"),
			code : this.get("confirmation_code")
		};
		return Backbone.sync(method, model, options);
	},

	parse : function(response) {
		TextHelper.findMessage(response);
		if (response.status == 'ok') {
			if (response.rec) {
				return response.rec;
			}
			return response.recs[0];
		}
		return response;
	}
});