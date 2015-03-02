/**
 * @author Hemanth B
 * 
 */

window.RegisterFormView = Backbone.View.extend({
			template : _.template($("#register-form-view").html()),

			render : function() {
				$(this.el).html(this.template(this.model.toJSON()));
				return this;
			},

			events : {
				"submit #register-form" : "register"
			},

			/**
			 * Event click #register-button // updates
			 */
			register : function() {
				TextHelper.hideErrors();
				this.model.set({
					username : $("#username").val(),
					user_email : $("#user_email").val(),
					user_role : $("#roles").val(),
					user_password : $("#user_password").val(),
					confirm_password : $("#confirm_password").val(),
					user_mobile : $("#user_mobile").val()
				});
				console.log(JSON.stringify(this.model));
				this.model.save(null, {	async : false });

				hasNoErrors = _.isUndefined(this.model.get("errors"));
				if (hasNoErrors && this.model.get("status") == "success") {

					if (app.hash === "") {

						MainHelper.navigate("");
						TextHelper.addMessage("Thank you for registering. Please SignIn to Continue");
						TextHelper.showMessages();

					} else {

						var signIn = new SignIn({
							username : this.model.get("username"),
							user_password : this.model.get("user_password")
						});
						signIn.fetch({
							async : false
						});
					}
					return;
				} else {
					TextHelper.showErrors(this.model.get("errors"));
					this.model.unset("errors");
				}

				if (this.model.get("status") != "success") {
					TextHelper.showMessages();
					
				}

			}

		});