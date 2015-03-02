/**
 * Products Collection
 */

window.ProductCollection = Backbone.Collection.extend({
	url: function() {
		return BASEURL_API  +"getproducts"; 
	},
	methodToURL : {
		'read'   : 'getproducts'
	},
	sync: function(method, model, options){  
		options.url = BASEURL_API + model.methodToURL[method.toLowerCase()];
		return Backbone.sync(method, model, options);  
	},
	initialize: function(options){
	},
	parse: function(response) {
		if (response.status == 'success') {
			return response.products;
		}
		
		return response;
		 
	},
	comparator: function (model) {
       // return model.get('item_name');
    }

});