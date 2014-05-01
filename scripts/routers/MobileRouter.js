// MobileRouter.js
// ---------------
define(['domReady', 'views/home/HomeView', 'views/next/NextView', 'jqm'],
        
    function(domReady, HomeView, NextView) {

		var MobileRouter = Backbone.Router.extend({

			initialize: function() {
				alert('bla');
                Backbone.history.start();
            },

            // All of your Backbone Routes (add more)
            routes: {
                "": "homeRouter",
				"home": "homeRouter",
                "next": "nextRouter",
            },
			homeRouter: function() {
				$.mobile.jqmNavigator.pushView(new HomeView());
				alert('homeRouter');
            },
			nextRouter: function() {
				$.mobile.jqmNavigator.pushView(new NextView());
				alert('nextRouter');
            }
        });
		
		return MobileRouter;

    }

);