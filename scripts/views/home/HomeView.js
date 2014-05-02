define(['jquery', 'underscore', 'Backbone', 'views/next/NextView', 'text!views/home/HomeView.html'],
    function ($, _, Backbone, NextViewTemplate, HomeViewTemplate) {
        var HomeView = Backbone.View.extend({

			// el: "#container",
            events:{
                'click a':'a_clickHandler',
                'click #btnNextView':'btnNextView_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				console.log('clicked on a href');
				var href = $(event.currentTarget).attr('href');
				console.log(href);
				window.myrouter.gotoRoute(href.substring(1));
				return(false);
            },
            btnNextView_clickHandler:function (event) {
                $.mobile.jqmNavigator.pushView(new NextViewTemplate);
            },

			initialize:function() {
			},
			
            render:function () {
                this.$el.html(_.template(HomeViewTemplate));
				return this;
            }

        });
        return HomeView;
    });