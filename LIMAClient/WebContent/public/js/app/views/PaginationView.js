/**
 * @author Hemanth B
 * 
 **/

window.PaginationView = Backbone.View.extend({
	template: _.template($("#pagination-view").html()),
	link: "",
	page_count: null,
	page_active: null,
	page_show: 10,
	attributes: {
		"class": "pagination"
	},
  
	initialize: function(param) {
		this.link = param.link;
		this.page_count = param.page_count;
		if (this.page_count <= this.page_show) {
			this.page_show = this.page_count;
		}
		this.page_active = param.page_active;
	},

	render: function(eventName) {
		
		var range = Math.floor(this.page_show / 2);
		var nav_begin = this.page_active - range;
		var nav_end = this.page_active + range;
	  
		var left_dots = true;
		var right_dots = true;
		

		if (nav_begin <= 2) {
			nav_end = this.page_show;
			if (nav_begin == 2) nav_end++; 
			nav_begin = 1;
			left_dots = false;
		}
		
		if (nav_end >= this.page_count - 1 ) {
			nav_begin = this.page_count - this.page_show + 1;
			if (nav_end == this.page_count - 1) nav_begin--;
			nav_end = this.page_count;
			right_dots = false;
		}
		
		$(this.el).html( this.template({
			link: this.link,
			page_count: this.page_count,
			page_active: this.page_active,
			nav_begin: nav_begin,
			nav_end: nav_end,
			left_dots: left_dots,
			right_dots: right_dots
		}) );
	 
		return this;
	}
});