define(['underscore', 'Backbone', 'text!views/support/SupportView.html'],
    function (_, Backbone, LoginViewTemplate) {

        var SupportViewVar = Backbone.View.extend({

			template: _.template(SupportViewTemplate),
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
            render:function () {
				this.$el.html(this.template(this.options));
				return this;
            }

        });

        return SupportViewVar;
    });