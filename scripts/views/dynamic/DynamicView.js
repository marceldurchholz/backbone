define(['underscore', 'Backbone'], // , 'text!views/dynamic/DynamicView.html'
    function (_, Backbone) { // DynamicViewTemplate

        var DynamicViewVar = Backbone.View.extend({

			// template: _.template(LoginViewTemplate),
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize:function() {
				$(this.el).undelegate('a', 'click');
				console.log(this.options);
			},
            render:function () {
                // this.$el.html(_.template(DynamicViewTemplate));
				alert('rendering dynamic router');
				return this;
            }

        });

        return DynamicViewVar;
    });