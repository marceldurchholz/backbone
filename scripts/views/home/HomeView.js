define(['jquery', 'underscore', 'Backbone', 'views/next/NextView', 'text!views/home/HomeView.html'],
    function ($, _, Backbone, NextViewTemplate, HomeViewTemplate) {
        var HomeView = Backbone.View.extend({

			initialize:function() {
			},
			
            events:{
                'click #btnNextView':'btnNextView_clickHandler'
            },

            render:function () {
                this.$el.html(_.template(HomeViewTemplate));
				console.log($.mobile);
                return this;
            },

            btnNextView_clickHandler:function (event) {
                $.mobile.jqmNavigator.pushView(new NextViewTemplate);
            }

        });
        return HomeView;
    });