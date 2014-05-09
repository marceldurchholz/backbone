define(['underscore', 'Backbone', 'text!views/dynamic/DynamicView.html'],
    function (_, Backbone, DynamicViewTemplate) {

        var DynamicView = Backbone.View.extend({

			template: _.template(DynamicViewTemplate),
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize:function() {
				$(this.el).undelegate('a', 'click');
			},
            render:function () {
				this.$el.html(this.template(this.options));
				return this;
            }

        });

        return DynamicView;
    });