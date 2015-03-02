/**
 * @author Hemanth B
 * 
 **/

window.ForgotPasswordStepsView = Backbone.View.extend({

	template: _.template($("#forgot-password-steps-view").html()),

	render: function(eventName) {
		$(this.el).html(this.template());
		return this;
	}
});