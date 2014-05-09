// alert('mobile router');

define(['domReady', 'views/noaccess/noaccessView', 'jqm'],
        
    function(domReady, loginView) {

		var MobileRouter = Backbone.Router.extend({

			/***** TODOs *****/
			//  http://demoinfinite.appspot.com/
			//      Responsive Infinite Scroll (DEMO SITE)
			//  https://github.com/spacenick/backbone-deployd/blob/master/backbone-deployd.js
			//      Simple Backbone.sync override to use dpd JavaScript SDK; so you don't have to care about your API url (dpd.js resolves it by itself) and the query syntax is improved.
			//  http://prinzhorn.github.io/skrollr/
			//       parallax scrolling for the masses
			//  https://github.com/yckart/Transe.js
			//      jQuery Element Animations / Transformable scroll elements
			

			initialize: function() {
				var _this = this;

			},

            routes: {
				"": "loginRouter"
			},
            loginRouter: function() {
				// this.gotoRoute('#login');
				alert('doing loginrouter');
				$.mobile.jqmNavigator.pushView(new loginView());
            }
						
        });
		
		return MobileRouter;

    }

);
