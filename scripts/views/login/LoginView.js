define(['underscore', 'Backbone', 'text!views/login/LoginView.html'],
    function (_, Backbone, LoginViewTemplate) {

		(function($){
		
        var LoginView = Backbone.View.extend({

			template: _.template(LoginViewTemplate),
			events:{
                // 'click a':global_a_clickHandler,
                // 'click button':global_button_clickHandler,
            },
			initialize:function() {
				$(this.el).undelegate('a', 'click');
			},
            render:function () {
				this.$el.html(this.template(this.options));
				this.$el.trigger("create");
				return this;
            }

            /*
			btnBack_clickHandler:function (event) {
				event.preventDefault();
                $.mobile.jqmNavigator.popView();
				return(false);
            }
			*/

        });
		})(jQuery);

        return LoginView;
    });