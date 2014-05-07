define(['underscore', 'Backbone', 'text!views/login/LoginView.html'],
    function (_, Backbone, LoginViewTemplate) {

        var LoginView = Backbone.View.extend({

			template: _.template(LoginViewTemplate),
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize:function() {
				this.$el.undelegate('a', 'click');
				var that = this;
				this._donutViews = [];
				that._donutViews.push(this.template(this.options));
			},
            render:function () {
				var that = this;
				$(this.el).empty();
				// this.$el.html();
				_(this._donutViews).each(function(dv) {
					// console.log(dv);
					that.$el.append(dv);
				});
				return that;
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