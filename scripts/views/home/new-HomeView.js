define(['jquery', 'underscore', 'Backbone', 'text!views/home/HomeView.html'],
    function ($, _, Backbone, HomeViewTemplate) {
        var HomeView = Backbone.View.extend({

			template: _.template(HomeViewTemplate),
			events:{
                // 'click a':global_a_clickHandler,
                // 'click button':global_button_clickHandler,
            },

			initialize:function() {
				$(this.el).undelegate('a', 'click');
				// $(this.el).undelegate('button', 'click');
			},
			
            render:function () {
				var _this = this;
				this.$el.html(this.template(this.options));
				return this;
            }

        });
        return HomeView;
    });