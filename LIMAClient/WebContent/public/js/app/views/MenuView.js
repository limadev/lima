/**
 * @author Hemanth B
 * 
 */

window.MenuView = Backbone.View.extend({
	tagName : "div",
	template : _.template($("#menu-view").html()),
	active : "",
	menu : "",
	menus : {
		"main" : "mainMenu",
		"left" : "leftMenu",
		"reports" : "reportsMenu",
		"user" : "userMenu"
	},

	attributes : {
		"class" : "ql",
		"style" : "margin-top:10px"
	},
	userMenu : function() {
		//$(this.$el).addClass("dropdown-menu");

		var items = [
		          /*   {
			"name" : "account",
			"title" : "Account",
			"link" : "#account"
		},*/

		
		{
			"name" : "sign-out",
			"title" : "Sign Out",
			"link" : "#sign-out"
		} ];
		return items;
	},
	mainMenu : function() {
		$(this.$el).addClass("");
		// $(this.$el).addClass("pull-right");
		$(this.$el).css("margin-bottom", 0);
		/* $(this.$el).css("width",600); */

		var items = [ {
			"name" : "product",
			"title" : "Product Management",
			"link" : "#product",
			"icon" : "inventory"
		},

		{
			"name" : "sales",
			"title" : "Inventory Management",
			"link" : "#",
			"icon" : "book"
		},

		{
			"name" : "salesorders",
			"title" : "Daily Entry",
			"link" : "#",
			"icon" : "tags"
		},

		{
			"name" : "purchases",
			"title" : "Indent Management",
			"link" : "#",
			"icon" : "road"
		},

		{
			"name" : "purchaseorders",
			"title" : "Expense Management",
			"link" : "#",
			"icon" : "road"
		},

		{
			"name" : "reports",
			"title" : "Cash Management",
			"link" : "#",
			"icon" : "road"

		},
		{
			"name" : "reports",
			"title" : "Payment",
			"link" : "#",
			"icon" : "road"

		}

		];
		return items;
	},
	reportsMenu : function() {
		$(this.$el).addClass("nav");
		// $(this.$el).addClass("pull-right");
		$(this.$el).css("margin-bottom", 0);
		/* $(this.$el).css("width",600); */

		var items = [ {
			"name" : "inventoryreports",
			"title" : "Inventory Reports",
			"link" : "#inventoryreports",
			"icon" : "move"
		},

		{
			"name" : "salesreports",
			"title" : "Sales Reports",
			"link" : "#salesreports",
			"icon" : "book"
		},

		{
			"name" : "purchaseorders",
			"title" : "Purchase Orders",
			"link" : "#purchaseorders",
			"icon" : "tags"
		}

		];
		return items;
	},

	leftMenu : function() {
		$(this.$el).addClass("nav-list");
		var items = [

		{
			"name" : "additem",
			"title" : "Add Item",
			"link" : "#additem",
			"icon" : "qrcode"
		},

		{
			"name" : "addstock",
			"title" : "Add Stock",
			"link" : "#addstock",
			"icon" : "move"
		},

		{
			"name" : "addshop",
			"title" : "Add Shop",
			"link" : "#addshop",
			"icon" : "envelope"
		},

		{
			"name" : "addsupplier",
			"title" : "Add Supplier",
			"link" : "#addsupplier",
			"icon" : "road"
		} ];
		return items;
	},
	initialize : function(params) {
		this.menu = params.menu;
		if (!_.isNull(params.active) && !_.isUndefined(params.active)) {
			this.active = params.active;
		}
	},

	render : function(eventName) {

		var winW = $(window).width();

		var items = this[this.menus[this.menu]].apply(this);
		var el = this.template({
			items : items,
			active : this.active
		});
		$(this.el).html(el);
		return this;
	}

});