alert('mobile router');

define(['domReady', 'views/test/TestView', 'views/home/HomeView', 'views/next/NextView', 'views/login/LoginView', 'views/test/TestView', 'views/dashboard/DashboardView', 'views/noaccess/NoaccessView', 'jqm'],
        
    function(domReady, TestView, HomeViewTemplate, NextViewTemplate, LoginViewTemplate, TestViewTemplate, DashboardViewTemplate, NoaccessView) {

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
					// is a potential route
					var router = this.routes[route];
					console.log(router);
					if (router!=undefined) {
						// is an existing route
						/*
						console.log(window.me);
						console.log(window.me.id);
						console.log(window.me.length);
						*/
						// if (window.me.length==0 || window.me.length=='undefined' || window.me.length==undefined) { // 'undefined' || window.me.id=='' || window.me.id=='undefined'
						// console.log(window.me.roles);
						// if (window.me.roles && window.me.roles!='undefined' && window.me.roles.length>0) {
							// console.log(window.me.roles);
							// if (window.me.roles && !(window.me && window.me.roles.indexOf("provider") !== -1)) {
								// cancel("You must be a provider to create a blog post", 401);
								/*
								dpd.users.me(function(me,err) {
									console.log('You must be a provider to create a blog post');
									alert('dashboardRouter access');
									// window.myrouter.gotoRoute(href.substring(1));
									router = "noaccessRouter";
								});
								*/
							// }
							// else {
							// }
						// }
						var show = checkRole('provider');
						console.log(show);
						
						if (route!='dashboard') {
							show = true;
						}
						if (show==true) {
							console.log('sdkjfhskjf');
							console.log('now moving to router: '+router);
							this[router]();
						}
						else {
							this.noaccessRouter();
						}
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
				"noaccess" : "noaccessRouter",
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
            noaccessRouter: function() {
				$.mobile.jqmNavigator.pushView(new NoaccessView());
            },
            testRouter: function() {
				$.mobile.jqmNavigator.pushView(new TestViewTemplate());
            }
        });
		
		window.myrouter = MobileRouter;
		
		return MobileRouter;

    }

);