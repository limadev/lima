/**
 * @author Hemanth B
 * 
 **/

window.ForgotPasswordView = Backbone.View.extend({

	template: _.template($("#forgot-password-view").html()),

	events: {
		"submit #forgot-password-form": "newPassword"
	},
	
	render: function(eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	
	
	newPassword: function() {
		this.model.set("user_email", $("#user_email").val());
		this.model.set("username", $("#username").val());
		this.model.fetch();
	}
	
	
});