// alert('mobile router');

define(['domReady', 'collections/sidemenusCollection', 'views/test/TestView', 'views/home/HomeView', 'views/next/NextView', 'views/login/LoginView', 'views/test/TestView', 'views/dashboard/DashboardView', 'views/noaccess/NoaccessView', 'jqm'],
        
    function(domReady, sidemenusCollection, TestView, HomeViewTemplate, NextViewTemplate, LoginViewTemplate, TestViewTemplate, DashboardViewTemplate, NoaccessView) {

		var MobileRouter = Backbone.Router.extend({

			collection: new sidemenusCollection(),
			
			initialize: function() {
			
				var _thisRouter = this;
				
				this.collection.fetch();
				// this.collection.on("add", this.sidemenusAll, this);
				// this.collection.on("remove", this.sidemenusAll, this);
				this.collection.on("reset", this.start, this);
				// this.start();
            },
			start: function(e,o) {
				console.log(e);
				console.log(o);
				
				// return(false);

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
				*/
				
				$(document).off( "pageinit" ).on( "pageinit", function( event ) {				
					// alert( 'This page was just enhanced by jQuery Mobile!' );
					// $(this.el).remove();
					new TestView({}).$el.html();
					/*
					$('.sidr_left').sidr({
						name: 'sidr-left',
						source: function(name) {
							return new TestView({}).$el.html();
						}
					});
					*/
					// $(function() { $( "body>[data-role='panel']" ).trigger( "create" ).trigger( "updatelayout" ).panel(); });
					
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
				var is_ajax = $(event.currentTarget).attr('data-ajax');
				if (is_ajax=='true') {
					console.log(href+' has >> data-ajax=true');
				}
				else if (href!='#' && href!='undefined' && href!='' && href!=undefined) {
					console.log(href);
					window.myrouter.gotoRoute(href.substring(1));
					return(false);
				}
				else {
					console.log(href);
				}
			},
			
			gotoRoute: function(route) {
				console.log('clicked on a href');
				console.log(route);
				if (route!='' && route!='#') {
					// is a potential route
					var router = this.routes[route];
					if (router!=undefined) {
						var checkroute = 'dashboard';
						var model = this.collection.find(
							function(model) {
								return (model.get('userfriendly')).toLowerCase() == checkroute;
							}
						);
						var roles = model.get('roles');
						var show = checkRoles(roles);
						if (route!=checkroute) {
							show = true;
						}
						if (show==true) {
							this[router]();
						}
						else {
							this.noaccessRouter();
						}
					}
					else {
						console.log(route);
						// $.sidr('close', 'sidr-left');
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
		
		// window.myrouter = MobileRouter;
		
		return MobileRouter;

    }

);