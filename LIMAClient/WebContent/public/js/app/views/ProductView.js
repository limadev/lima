/**
 *  @author Hemanth
 */

window.ProductView = Backbone.View.extend({

	template : _.template($("#product").html()),
	
	events : {
		"click #add_product" : "create"
	},
	
	 
	create : function(){
		
	},
	
	render : function(eventName) {
		$(this.el).html(this.template());
		return this;
	}
});