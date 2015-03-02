/**
 * @author Hemanth B
 * 
 **/

var MainHelper = {

	navigate: function(hash) {
		if (hash == window.location.hash) {
			app.navigate("#reload", false);
		}
 		app.navigate(hash, true);
	},
		
	checkRegister: function() {
		if (!MainHelper.isSinged()) {
			app.hash = window.location.hash;
			app.navigate("sign-in", true);
			app.deleteMessages = false;

			TextHelper.findMessage({status: "error", message: "Please sign in to continue."});

			return false;
		}
		return true;
	},
	
	isSinged: function() {
		if ( ! window.sess || _.isUndefined(window.sess)) {
			return false;
		}
		return true;
	},
	
	isManager: function() {
		if ( ! window.sess || _.isUndefined(window.sess)) {
			if(wi)
			return false;
		}
		return true;
	},
	
	isAdmin: function() {
		if ( ! window.sess || _.isUndefined(window.sess)) {
			return false;
		}
		return true;
	},
	
	
	showMenus: function(params) {
		if (_.isUndefined(params)) {
			params = {};
		}

		if (_.isUndefined(params.active)) {
			params.active = "";
		}

		if (_.isUndefined(params.menus)) {
			params.menus = [
				{
					name: "main",
					place: "main-menu"

				}
				
			];
		}
		_.each(params.menus, function(item) {
			var menu = new MenuView({"menu": item.name, "active": params.active});
			$("#"+item.place).html(menu.render().el);
		});
	},
	
	showreportMenus: function(params) {
		if (_.isUndefined(params)) {
			params = {};
		}

		if (_.isUndefined(params.active)) {
			params.active = "";
		}

		if (_.isUndefined(params.menus)) {
			params.menus = [
				{
					name: "reports",
					place: "reports-menu"

				}
				
			];
		}
		_.each(params.menus, function(item) {
			var menu = new MenuView({"menu": item.name, "active": params.active});
			$("#"+item.place).html(menu.render().el);
		});
	},
	showLeftMenus: function(params) {
		if (_.isUndefined(params)) {
			params = {};
		}

		if (_.isUndefined(params.active)) {
			params.active = "";
		}

		if (_.isUndefined(params.menus)) {
			params.menus = [
				{
					name: "left",
					place: "left-menu"

				}
				
			];
		}
		_.each(params.menus, function(item) {
			var menu = new MenuView({"menu": item.name, "active": params.active});
			$("#"+item.place).html(menu.render().el);
		});
	},
	hideMenus : function() {
		$('#main-menu').empty();
	},
	hidereportMenus : function() {
		$('#reports-menu').empty();
	},
	hideLeftMenus : function() {
		$('#left').empty();
	},
	redirectSignIn : function (){
		app.hash = window.location.hash;
		document.title = "Sign In";
		app.signInView = new SignInView({model: new SignIn()});
		$("#main-area").html(app.signInView.render().el);
	},
	
};
