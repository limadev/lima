/**
 * @author Hemanth B
 * 
 **/

window.AccountEditView = Backbone.View.extend({ 
	template:  _.template($("#account-edit-view").html()),

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
 
	events: {
		"submit #account-form": "save"
	},

	/**
	 * Event click #save-button
	 **/
	save: function (){
		TextHelper.hideErrors();
		
		this.model.set({
			user_email: $("#user_email").val(),
			user_old_password: $("#user_old_password").val(),
			user_password: $("#user_password").val(),
			confirm_password: $("#confirm_password").val(),
			user_first_name: $("#user_first_name").val(),
			user_last_name: $("#user_last_name").val()
		});
		Backbone.emulateHTTP = true;
		/*Backbone.emulateJSON = true;*/
		this.model.save(null, {async: false});
		

		if (!_.isUndefined(this.model.get("errors"))) {
			TextHelper.showErrors(this.model.get("errors"));
			this.model.unset("errors");
		}

		if (this.model.get("status") != "ok") {
			TextHelper.showMessages();
		} else {
			window.sess.user_first_name = $("#user_first_name").val();
			window.sess.user_last_name = $("#user_last_name").val();
			window.sess.user_email = $("#user_email").val();
			MainHelper.navigate("#account");
		}
	}

});