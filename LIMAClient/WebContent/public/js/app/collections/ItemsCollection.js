/**
 * Items Collection
 */

window.ItemsCollection = Backbone.Collection.extend({
	model: window.Item,
	item_id : null,
	url: function() {
		return BASEURL_API  +"selectitem"; 
	},
	methodToURL : {
		'read'   : 'selectitem',
		'create' : 'additem',
		'update' : 'updateitem',
		'delete' : 'deleteitem'
	},
	sync: function(method, model, options){  
		options.url = BASEURL_API + model.methodToURL[method.toLowerCase()];
		if(MainHelper.isSinged()){
			options.data = {
				item_id : this.item_id,
				stoken : window.sess.stoken
			};
		}
		return Backbone.sync(method, model, options);  
	},
	initialize: function(options){
		if(!_.isUndefined(options)){
			this.item_id = options.item_id;
		}
	},
	parse: function(response) {
		if (response.status == 'success') {
			return response.Itemslist;
		}
		
		return response;
		 
	},
	comparator: function (model) {
       // return model.get('item_name');
    }

});