/**
 * @author Hemanth B
 * 
 **/

window.AccountView = Backbone.View.extend({ 
	template:  _.template($("#account-view").html()),

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
 
	events: {
		"click #edit": "showForm"
	},

	showForm: function() {
		app.accountEditView = new AccountEditView({model: this.model});
		$("#main-area").html(app.accountEditView.render().el);
	}
});