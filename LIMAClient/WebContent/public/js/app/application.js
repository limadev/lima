/**
 * 
 * @author Hemanth B
 **/

var app;
var sess = false;
if ($.cookie("sess")) {
	sess = JSON.parse($.cookie("sess"));
}

var dispatcher = _.clone(Backbone.Events);

$(document).ready(function() {
	app = new AppRouter();
	Backbone.history.on("route", function(params, name, callback) {
		app.go();
	});
	Backbone.history.start();
});
