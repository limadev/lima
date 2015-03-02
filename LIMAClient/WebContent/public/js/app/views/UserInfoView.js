/**
 * @author Hemanth B
 * 
 **/
window.UserInfoView = Backbone.View.extend({

	template_signed: _.template($("#user-info-signed").html()),
	template_unsigned: _.template($("#user-info-unsigned").html()),
	events: {
		"submit #sign-in": "signIn"
	},

	render: function(eventName) {
		if (MainHelper.isSinged()) {
			$(this.el).html(this.template_signed());
			var menu = new MenuView({"menu": "user"});
			$(this.el).find("#user-menu").html($(menu.render().el));	
			$(this.el).find("#user-menu").html($(this.el).find(".nav").html());	
		} else {
			
			$(this.el).html(this.template_unsigned());
			$(this.el).find('.dropdown-menu').click(function(e) {
			    e.stopPropagation();
			});
			this.model = new SignIn();
		}
		
		return this;
	},

	/**
	 * Event submit #sign-in
	 **/
	signIn: function (){
		app.hash = "";
		 
		this.model.set({
			username: $("#username_head").val(),
			password: $("#password_head").val()
		});
		this.model.fetch();
		return false;
	}
});