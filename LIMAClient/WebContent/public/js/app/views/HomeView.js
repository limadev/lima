/**
 * @author Gidon Wise
 * 
 */

window.HomeView = Backbone.View.extend({

	template : _.template($("#home-view").html()),
	events : {
		"click #sign-up" : "registerUser"
	},
	registerUser : function() {
		TextHelper.hideErrors();
		var account = new User();
		account.set({
			username : $("#user_name").val(),
			user_email : $("#user_email").val(),
			confirm_email : $("#user_email").val(),
			user_password : $("#user_password").val(),
			confirm_password : $("#user_password").val(),
			user_first_name : "User",
			user_last_name : "User"
		});
		Backbone.emulateHTTP = true;
		account.save(null, {
			async : false
		});
		hasNoErrors = _.isUndefined(account.get("errors"));

		if (hasNoErrors) {
			$("#home_page_signup")[0].reset();
			TextHelper.addMessage("Thank you for registering. Please verify your email to activate your account.","ok");			TextHelper.showMessages();
			return;
		} else {
			TextHelper.showErrors(account.get("errors"));
			account.unset("errors");
		}

		if (account.get("status") != "ok") {
			TextHelper.showMessages();
		}
	},
	render : function(eventName) {
		$(this.el).html(this.template());
		return this;
	}
});