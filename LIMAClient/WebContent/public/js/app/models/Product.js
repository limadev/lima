/**
 *  @author : Hemanth
 */

window.Product = Backbone.Model.extend({


	idAttribute : "product_id",
	url : function() {
		return BASEURL_API + "selectitem";
	},
	methodToURL : {
		'read' : 'selectproduct',
		'create' : 'createproduct',
		'update' : 'updateproduct',
		'delete' : 'deleteproduct'
	},
	defaults : {
		product_id :null,
		product_name : "",
		product_description : "",
		product_code : "",
		product_category : "",
		product_quantity : "",
		product_mrp : "",
		product_selling_proct : "",
		product_tax : ""
	},
	sync : function(method, model, options) {
		options.url = BASEURL_API + model.methodToURL[method.toLowerCase()];
		if (method == "read" ) {
			options.type = "GET";
			
		}
		if (method == "delete" ) {
			
		}
		if (method === "update") {
			
		}
		 
		return Backbone.sync(method, model, options);
	},
	
	initialize : function(options) {
		
	},
	parse : function(response) {
		TextHelper.findMessage(response);
		if (_.isUndefined(response[this.idAttribute])) {
			if (response.status == 'success') {
			
				return response;
			}
		}
		return response;
	},
	toString : function() {
		return JSON.stringify(this.toJSON());
	}

});