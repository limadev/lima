/**
 * @author Hemanth B
 * 
 **/

/*
 * Helper for text. Titles, errors, messages
 */
var TextHelper = {
	/**
	 * Helper for errors, put message for errors
	 * @param Object errors
	 **/
	showErrors: function(errors) {
		_.each(errors, function(message, id) {
			$("#" + id + "_danger").html(message);
			$("#" + id + "_group").addClass("has-error");
		});
	},

	hideErrors: function() {
		$(".text-danger").html("");
		$(".form-group").removeClass("has-error");
	},
	
	clearErrors: function() {
		$(".label_name_error").html("");
		$(".dp_value_error").html("");
		$(".form-group").removeClass("has-error");
		$(".input-append").removeClass("has-error");
	},

	hideResponse: function(){
		app.messages = [];
		$("#messages").hide();
	},
	
	/**
	 * Show messages in page
	 */
	showMessages: function() {
		$("#messages").removeClass().addClass("alert").empty();
		if (TextHelper.isStringEmpty(app.statusMessage)) {
			$("#messages").hide();
			return ;
		}
		var className = "";
		if (app.statusMessage == "success") {
			className = "alert-success";
		} else if(app.statusMessage == "info") {
			className = "alert-info";
		}else {
			className = "alert-danger";
		}
		$("#messages").addClass(className);
		_.each(app.messages, function(message) {
			$("#messages").append("<div>" + message + "</div>");
		});
		$("#messages").show();
		if (app.deleteMessages) {
			app.statusMessage = "";
			app.messages = [];
		} else {
			app.deleteMessages = true;	
		}
	},
	
	/**
	 * Find message field in response
	 * @param Object response
	 */
	findMessage: function(response) {
		if (_.isUndefined(response.message)) {
			return;
		}

		if (app.statusMessage == response.status) {
			app.messages.push(response.message);
			return ;
		}
		app.statusMessage = response.status;
		if ((response.status != "success") && (app.statusMessage != "success")) {
			app.messages.push(response.message);
			return ;
		}

		
		app.messages = [response.message];
		return ;
	},

	/*
	 * Function for check, if string is empty
	 */
	isStringEmpty: function(string) {
		if (_.isUndefined(string) || _.isNull(string) || (string == ""))
			return true;
		return false;
	},

	setTitle: function(string) {
		$("#header").html(string);
		$("title").html(string);
	},
	
	/**
	 * Show response in specified area
	 */
	showResponse: function(messageDiv) {

		$("#"+messageDiv).removeClass().addClass("alert").empty();
		if (TextHelper.isStringEmpty(app.statusMessage)) {
			$("#"+messageDiv).hide();
			return ;
		}
		var className = "";
		if (app.statusMessage == "success") {
			className = "alert-success";
		} else {
			className = "alert-danger";
		}
		$("#"+messageDiv).addClass(className);
		_.each(app.messages, function(message) {
			$("#"+messageDiv).append("<div>" + message + "</div>");
		});
		$("#"+messageDiv).show();
		if (app.deleteMessages) {
			app.statusMessage = "";
			app.messages = [];
		} else {
			app.deleteMessages = true;	
		}
	},
	/**
	 * add Message 
	 */
	addMessage : function(messgae,type){
		app.deleteMessages = true;	
		app.messages = [];
		var response = new Object();
		if(_.isUndefined(type)){
			response.status = "info";			
		}else{
			response.status = type;
		}
		response.message = messgae; 
		TextHelper.findMessage(response);
	}
};
