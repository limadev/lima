/**
 * @author Hemanth B
 * 
 **/

window.SignInView = Backbone.View.extend({ 
template:  _.template($("#sign-in-view").html()),
	
	render: function(eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	
	events: {
		"submit #sign-in-form": "signIn"
	},
	
	/**
	 * Event submit #sign-in
	 **/
	signIn: function (){
		TextHelper.hideErrors();
		this.model.set({
			username: $("#username").val(),
			password: $("#password").val()
		});
		this.model.fetch();
		
		return false;
	}


});