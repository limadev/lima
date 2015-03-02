/**
 * @author Hemanth B
 * 
 **/

window.ForgotPasswordResetView = Backbone.View.extend({

	template: _.template($("#forgot-password-reset-view").html()),

	render: function(eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});