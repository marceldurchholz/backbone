define(['underscore', 'Backbone', 'text!views/template/DashboardView.html'],
    function (_, Backbone, DashboardViewTemplate) {

        var DashboardView = Backbone.View.extend({

			template: _.template(DashboardViewTemplate),
			
            events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
            render:function () {
				console.log('rendering');
				this.$el.html(this.template(this.options));
				return this;
            }

        });

        return DashboardView;
    });