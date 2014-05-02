define(['domReady', 'views/test/TestView', 'views/home/HomeView', 'views/next/NextView', 'views/login/LoginView', 'views/test/TestView', 'jqm'],
        
    function(domReady, TestView, HomeViewTemplate, NextViewTemplate, LoginViewTemplate, TestViewTemplate) {

		var MobileRouter = Backbone.Router.extend({

			initialize: function() {
			
				var _thisRouter = this;
				$(document).off( "pageinit" ).on( "pageinit", function( event ) {				
					// alert( 'This page was just enhanced by jQuery Mobile!' );
					$('.sidr_left').sidr({
						name: 'sidr-left',
						source: function(name) {
							// return '<h1>' + name + ' menu</h1><p>Yes! You can use a callback too ;)</p>';
							return new TestView({}).$el.html();
						}
					});
					
					return(false);
				});
				
                // Backbone.history.start();
				Backbone.history.start({ pushState: false });
		
				$(document).ready(function() {
					$(document).off( "swiperight", "#container").on( "swiperight", "#container", function( e ) {
						// Backbone.history.back();
						// window.myrouter.gotoRoute('next');
						alert('aaa');
						// $.mobile.back();
					});
					// alert('document.ready');
				});
				// console.log(document.body.innerHTML);
            },

			gotoRoute: function(route) {
				console.log(route);
				if (route!='' && route!='#') {
					var router = this.routes[route];
					console.log(router);
					if (router!=undefined) {
						this[router]();
					}
				}
			},
			
            // All of your Backbone Routes (add more)
            routes: {
                "": "homeRouter",
				"home": "homeRouter",
                "next": "nextRouter",
				"login" : "loginRouter",
				"test" : "testRouter",
            },
			homeRouter: function() {
				$.mobile.jqmNavigator.pushView(new HomeViewTemplate());
				// alert('homeRouter');
            },
			nextRouter: function() {
				$.mobile.jqmNavigator.pushView(new NextViewTemplate());
				// alert('nextRouter');
            },
            loginRouter: function() {
				// alert('loginRouter');
				$.mobile.jqmNavigator.pushView(new LoginViewTemplate());
				// this.changePage(LoginView, {});
            },
            testRouter: function() {
				$.mobile.jqmNavigator.pushView(new TestViewTemplate());
            }
        });
		
		window.myrouter = MobileRouter;
		
		return MobileRouter;

    }

);