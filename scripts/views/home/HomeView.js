define(['jquery', 'underscore', 'Backbone', 'views/next/NextView', 'text!views/home/HomeView.html'],
    function ($, _, Backbone, NextViewTemplate, HomeViewTemplate) {
        var HomeView = Backbone.View.extend({

			template: _.template(HomeViewTemplate),
            events:{
                'click a':'a_clickHandler',
                'click button':'button_clickHandler',
                'click #btnNextView':'btnNextView_clickHandler'
            },
            a_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
            button_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
            btnNextView_clickHandler:function (event) {
                $.mobile.jqmNavigator.pushView(new NextViewTemplate);
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