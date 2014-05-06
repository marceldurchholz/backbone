define(['underscore', 'Backbone', 'text!views/login/LoginView.html'],
    function (_, Backbone, LoginViewTemplate) {

        var LoginView = Backbone.View.extend({

			template: _.template(LoginViewTemplate),
            events:{
                'click a':'a_clickHandler',
                'click button':'button_clickHandler'
            },
            a_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
            button_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
            render:function () {
				this.$el.html(this.template(this.options));
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

        return LoginView;
    });