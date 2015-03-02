/**
 * @author Hemanth B
 * 
 */
var AppRouter = Backbone.Router.extend({
	statusMessage : "",
	relocationHash : "",
	messages : [],
	deleteMessages : true,
	hash : "",
	members : [],
	routes : {

		"" : "home",
		"account" : "account",
		"forgot" : "forgotPassword",
		"pw-reset/:user_id/:confirmation_code" : "forgotPasswordReset",
		"sign-up" : "signUp",
		"confirm/:user_id/:email/:confirmation_code" : "confirm",
		"sign-out" : "signOut",
		"sign-in" : "signIn",
		"product" : "product",
		"add-category" : "addCategory",
		"categorylist" : "categorylist"
	},

	/**
	 * call for every Route
	 */
	go : function() {
		app.userInfoView = new UserInfoView();
		$("#user-info").html(app.userInfoView.render().el);
		TextHelper.showMessages();
	},

	/**
	 * Route: account
	 */
	account : function() {
		app.hash = "";
		if (!MainHelper.checkRegister())
			return false;
		MainHelper.showMenus();
		document.title = "Account settings";

		app.account = new Account();
		app.account.set({
			user_id : window.sess.userid,
			user_email : window.sess.user_email,
			user_first_name : window.sess.user_first_name,
			user_last_name : window.sess.user_last_name,
			username : window.sess.Username
		});

		app.accountView = new AccountView({
			model : app.account
		});
		$("#main-area").html(app.accountView.render().el);
	},

	/**
	 * Route: ""
	 */
	home : function() {
		if (MainHelper.isSinged()) {
			MainHelper.showMenus();
		}
		app.hash = "";
		document.title = "Home";

		app.view = new HomeView();
		$("#main-area").html(app.view.render().el);

	},

	/**
	 * Route: forgot
	 */
	forgotPassword : function() {
		app.hash = "";
		document.title = "Forgot Password";
		this.breadcrumbStock = [];
		this.breadcrumbStock.push("home");
		MainHelper.hideMenus();
		var fPassword = new ForgotPassword({
			username : $("#username").val(),
			user_password : $("#user_email").val()
		});

		app.forgotPasswordView = new ForgotPasswordView({
			model : fPassword
		});
		$("#main-area").html(app.forgotPasswordView.render().el);
	},

	/**
	 * Route: forgot-reset
	 */
	forgotPasswordReset : function(user_id, confirmation_code) {
		app.hash = "";
		MainHelper.showMenus();
		document.title = "New Password Reset";

		var passwordReset = new PasswordReset({
			user_id : user_id,
			confirmation_code : confirmation_code
		});
		passwordReset.fetch({
			async : false
		});
		app.forgotPasswordResetView = new ForgotPasswordResetView({
			model : passwordReset
		});
		$("#main-area").html(app.forgotPasswordResetView.render().el);
	},

	forgotPasswordSteps : function() {
		app.forgotPasswordStepsView = new ForgotPasswordStepsView();
		$("#main-area").html(app.forgotPasswordStepsView.render().el);
	},

	/**
	 * Route: sign-up
	 */
	signUp : function() {
		app.hash = "";
		document.title = "Sign up";
		MainHelper.hideMenus();

		app.registerFormView = new RegisterFormView({
			model : new User()
		});
		$("#main-area").empty().append(app.registerFormView.render().el);
	},

	/**
	 * Route: sign-in
	 */
	signIn : function() {
		app.hash = "";
		document.title = "Sign in";

		MainHelper.hideMenus();

		var signin = new SignIn({
			username : $("#username_head").val(),
			password : $("#password_head").val()
		});

		app.signInView = new SignInView({
			model : signin
		});
		$("#main-area").html(app.signInView.render().el);
	},

	/**
	 * Route: sign-out
	 */
	signOut : function() {

		/*var signOut = new SignOut();
		signOut.fetch();
		app.deleteMessages = false;
		app.hash = "";*/
		if ($.cookie("sess")) {
			$.cookie("sess", null);
			window.sess = undefined;
		}
		$("#main-menu").empty();
		app.hash = "";
		MainHelper.navigate(app.hash);
		MainHelper.hideMenus();
	},
	
	product : function(){
		if (MainHelper.isSinged()) {
			MainHelper.showMenus({
				active : "product"
			});
	
			var product = new ProductView({
				model : new Product()
			});

			$("#main-area").html(product.render().el);
			
			// Get the Categories
			app.categories = new CategoryCollection();
			app.categories.fetch({
				async : false
			});
			TextHelper.hideResponse();
			// clear drop-down
			$('#categories').empty();
			// Add Item names to drop down list
			var _options = "";
			_.each(app.categories.models, function(category) {
				_options += "<option value='" + category.get("category_id") + "'>"
						+ category.get("name") + "</option>";
			});
			$("#categories").html(_options);
			
			// Get the Categories
			app.products = new ProductCollection();
			app.products.fetch({
				async : false
			});
			TextHelper.hideResponse();
			// clear drop-down
			$('#products').empty();
			// Add Item names to drop down list
			var _options = "";
			_.each(app.products.models, function(product) {
				_options += "<option value='" + product.get("product_id") + "'>"
						+ product.get("name") + "</option>";
			});
			$("#products").html(_options);

		} else {
			TextHelper.addMessage("Please sign in to continue.");
			MainHelper.redirectSignIn();
		}
	},
	
	addProduct : function(){
		if (MainHelper.isSinged()) {
			MainHelper.showMenus({
				active : "product"
			});
			
			var product = new ProductView({
				model : new Product()
			});

			$("#main-area").html(product.render().el);

		} else {
			TextHelper.addMessage("Please sign in to continue.");
			MainHelper.redirectSignIn();
		}
	},
	addCategory : function(){
		if (MainHelper.isSinged()) {
			MainHelper.showMenus({
				active : "product"
			});
			
			var category = new CategoryView({
				model : new Category()
			});

			$("#main-area").html(category.render().el);

		} else {
			TextHelper.addMessage("Please sign in to continue.");
			MainHelper.redirectSignIn();
		}
	},
	
	/**
	 * Route: "categorylist"
	 */
	categorylist : function() {

		app.hash = "";
		document.title = "Category List";

		if (MainHelper.isSinged()) {
			MainHelper.showMenus({
				active : "product"
			});
			var categories = new CategoryCollection();
			categories.fetch({
				async : false
			});
			app.categoryListView = new CategoryListView({
				model : categories
			});

			$("#main-area").html(app.categoryListView.render().el);

		} else {
			TextHelper.addMessage("Please sign in to continue.");
			MainHelper.redirectSignIn();
		}
	}

});
