define(['domReady', 'views/test/TestView', 'views/home/HomeView', 'views/next/NextView', 'views/login/LoginView', 'views/test/TestView', 'views/dashboard/DashboardView', 'jqm'],
        
    function(domReady, TestView, HomeViewTemplate, NextViewTemplate, LoginViewTemplate, TestViewTemplate, DashboardViewTemplate) {

		var MobileRouter = Backbone.Router.extend({

			initialize: function() {
			
				var _thisRouter = this;
				// $('div[data-role="page"]').on('pagehide', function (event, ui) {
				
				/*
				$( document ).on( 'pagehide',function(event, ui){
					alert( 'This page was just hidden: '+ ui.prevPage);
					alert( 'This page was just shown: '+ ui.nextPage);
				});
				$(document).off( "pagehide" ).on( "pagehide", function( event ) {				
					alert('pagehide');
					console.log(event);
					$(event.currentTarget).remove();
				});
				$(document).off( "pageinit" ).on( "pageinit", function( event ) {				
					alert( 'pageinit' );
					$(this.el).remove();
					$('.sidr_left').sidr({
						name: 'sidr-left',
						source: function(name) {
							return new TestView({}).$el.html();
						}
					});
					return(false);
				});
				*/
				
				$(document).off( "pageinit" ).on( "pageinit", function( event ) {				
					// alert( 'This page was just enhanced by jQuery Mobile!' );
					$('.sidr_left').sidr({
						name: 'sidr-left',
						source: function(name) {
							return new TestView({}).$el.html();
						}
					});
					return(false);
				});
				
                // Backbone.history.start();
				// Backbone.history.start({ pushState: false });
				Backbone.history.start({
					pushState: false,
					hashChange: false
				});
		
				/*
				// extend in myfinctions.js !!!
				$(document).ready(function() {
				});
				*/
            },

			checkLink: function(event) {
				if (event.preventDefault) event.preventDefault();
				console.log('clicked on a href');
				var href = $(event.currentTarget).attr('href');
				console.log(href);
				if (href!='#' && href!='undefined' && href!='' && href!=undefined) {
					console.log(href);
					window.myrouter.gotoRoute(href.substring(1));
					return(false);
				}
				else {
				}
			},
			gotoRoute: function(route) {
				console.log(route);
				if (route!='' && route!='#') {
					var router = this.routes[route];
					console.log(router);
					if (router!=undefined) {
						this[router]();
					}
					else {
						console.log(route);
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
				"dashboard" : "dashboardRouter",
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
            dashboardRouter: function() {
				$.mobile.jqmNavigator.pushView(new DashboardViewTemplate());
            },
            testRouter: function() {
				$.mobile.jqmNavigator.pushView(new TestViewTemplate());
            }
        });
		
		window.myrouter = MobileRouter;
		
		return MobileRouter;

    }

);