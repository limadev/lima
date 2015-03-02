/**
 * @author Hemanth B
 * 
 **/

var files = [
	"config/config-development.js",
	"Router.js",
	
	//helpers
	"helpers/MainHelper.js",
	"helpers/TextHelper.js",
	"helpers/DateHelper.js",
	"helpers/Utilities.js",
	//models
	"models/SignIn.js",
	"models/SignOut.js",
	"models/ForgotPassword.js",
	"models/PasswordReset.js",
	"models/Account.js",
	"models/User.js",
	"models/Product.js",
	//collections
	"collections/ItemsCollection.js",
	"collections/CategoryCollection.js",
	"collections/ProductCollection.js",
	//views
	"views/MenuView.js",
	"views/PaginationView.js",
	"views/UserInfoView.js",
	"views/SignInView.js",
	"views/HomeView.js",
	"views/ForgotPasswordView.js",
	"views/ForgotPasswordStepsView.js",
	"views/ForgotPasswordResetView.js",
	"views/AccountView.js",
	"views/AccountEditView.js",
	"views/RegisterFormView.js",
	"views/ProductView.js",
	"views/CategoryListView.js"
	];

var templates = [
	"menu-view",
	"user-info-signed",  
	"user-info-unsigned",  
	"sign-in-view",
	"home-view",
 	"forgot-password-view",
	"forgot-password-steps-view",
	"forgot-password-reset-view",
	"account-view",
	"account-edit-view",
	"register-form-view",
	"pagination-view",
	"product",
	"category-list"
];

/*
 * Include one JavaScript file to head
 * @param string filename 
 */
var allFiles = "";
function includeFile(filename) {
 	$("head").append("<script type=\"text/javascript\" src=\"js/app/"+ filename +"\" />");
}

/*
 * Include all files in array
 * @param array Array with filenames
 */
function includeFiles(array) {
 	$.each(array, function(index, value) {
		includeFile(value);
	});	
}

/*
 * Include template
 * @param string id 
 * @param string filename
 */
function includeTemplate(filename) {
	$.ajax({
		async: false,
		url: "js/app/templates/"+filename+".html", 
		dataType : "html",
		success: function(data) {
			$("head").append("<script type=\"text/template\" id=\""+ filename +"\">"+data+"</script>");
		}
	});
	
	
}

/*
 * Include all files in array
 * @param array array Array with filenames
 */
function includeTemplates(array) {
	$.each(array, function(index, value) {
		includeTemplate(value);
	});	
}