/**
 * Category Collection
 */

window.CategoryCollection = Backbone.Collection.extend({
	url: function() {
		return BASEURL_API  +"getcategories"; 
	},
	methodToURL : {
		'read'   : 'getcategories'
	},
	sync: function(method, model, options){  
		options.url = BASEURL_API + model.methodToURL[method.toLowerCase()];
		return Backbone.sync(method, model, options);  
	},
	initialize: function(options){
	},
	parse: function(response) {
		if (response.status == 'success') {
			return response.categories;
		}
		
		return response;
		 
	},
	comparator: function (model) {
       // return model.get('item_name');
    }

});