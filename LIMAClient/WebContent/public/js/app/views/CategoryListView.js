/**
 * 
 */
window.CategoryListView = Backbone.View.extend({
	template : _.template($("#category-list").html()),
	initialize : function(params) {
console.log(JSON.stringify(this.model));
	},

	events : {
		"click .updatecategory" : "updatecategory",
		 "click #delete_category" : "deletecategory" ,
		"click .delete" :"deletePopup"
	},

	updatecategory : function(e) {
		
		var id;
		if (!e)
			var e = window.event;
		id = e.target.id;

		
		var stock = this.model.get(id);
		var view = new StockView({
			model : stock
		});
		
		$("#itemBody").html(view.render().el);
		
		app.items = new ItemsCollection();
		app.items.fetch({
			async : false
		});
		var _options = "";
		_.each(app.items.models,function(item) {
			_options += "<option value='"+item.get("item_id")+"'>"+item.get("item_name")+"</option>";
		});
		$("#names").html(_options);
		
		// Get all Suppiers
		app.suppliers = new SuppliersCollection();
		app.suppliers.fetch({
			async : false
		});
		
		//clean drop-down
		
		$('#suppliers').empty();
		
		//Getting all the suppliers into drop-down
		
		var _options ="";
		_.each(app.suppliers.models,function(supplier){
			_options +="<option value='"+supplier.get("supplier_id")+"'>" + supplier.get("supplier_name") +"</option>"
		});
		$("#suppliers").html(_options);
		$("#suppliers").val(stock.get("supplier_id"));
		
		$("#update").modal("show");
		 
		
	},

	deletePopup : function(e) {
	
		if (!e)
			var e = window.event;
		id = e.target.id;
		var stock = new Stock({
			inventory_id : id
		});

		$("#delete-stock-popup").modal("show");
	},

	deletecategory : function() {
		
		var stock = new Stock({
			inventory_id : id
		});
		stock.destroy({
			success : function(model, response) {
				TextHelper.findMessage(response);
				if (response.status != "success") {
					TextHelper.addMessage("not able to delete stock");
					TextHelper.showMessages();
				} else {
					$("#delete-stock-popup").modal("hide");
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					MainHelper.navigate("#stockList");
					TextHelper.addMessage("Stock Deleted Successfully");
					TextHelper.showMessages();
				}
			}
		});
	},
	
	render : function(eventName) {

		$(this.el).html(this.template({
			categorylist : this.model.toJSON()
		}));
		return this;
	}

});