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
				console.log('initializing MobileRouter');
				$(window).bind('hashchange', function(){
					console.log('ATTENTION !!!! hashchanged to: '+window.location.hash);
					
					// _thisRouter[router]();
					_thisRouter.gotoRoute(window.location.hash);
					// console.log(_thisRouter.collection);
					// $.sidr('close', 'sidr-left');
					// return(false);
				});
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
					// console.log($.mobile.jqmNavigator._getPageContainerViews({}));
					alert( 'Reloading Navi' );
					// $(this.el).remove();
					new TestView({});
					// new TestView({}).$el.html();
					/*
					$('.sidr_left').sidr({
						name: 'sidr-left',
						source: function(name) {
							return new TestView({}).$el.html();
						}
					});
					*/
					// $(function() { $( "body>[data-role='panel']" ).trigger( "create" ).trigger( "updatelayout" ).panel(); });
					
					// return(false);
				});
				
                // Backbone.history.start();
				// Backbone.history.start({ pushState: false });
				Backbone.history.start({
					pushState: false
					, hashChange: false
					// , silent: true
				});

		
				/*
				// extend in myfinctions.js !!!
				$(document).ready(function() {
				});
				*/
			},

			checkLink: function(event) {
				console.log('checkLink');
				var _thisRouter = this;
				var href = $(event.currentTarget).attr('href');
				var is_ajax = $(event.currentTarget).attr('data-ajax');
				if (is_ajax=='true') {
					console.log(href+' has >> data-ajax=true');
				}
				else if (href!='#' && href!='undefined' && href!='' && href!=undefined) {
					console.log(href+' has no >> data-ajax=true');
					if (event.preventDefault) event.preventDefault();
					_thisRouter.gotoRoute(href);
					return(false);
				}
				else {
					console.log('undefinierte aktion in MobileRouter.js');
					// console.log(event);
					// _thisRouter.gotoRoute(event);
					return(false);
				}
			},
			
			gotoRoute: function(route) {
				console.log('gotoRoute');
				console.log(route);
				if (route!='' && route!='#') {
					// is a potential route
					var router = this.routes[route.substring(1)];
					if (router!=undefined) {
						var checkroute = route.substring(1); // 'login';
						console.log('checking route: '+checkroute);
						// console.log(this.collection);
						var model = this.collection.find(
							function(model) {
								return (model.get('urloffline')).toLowerCase() == checkroute;
							}
						);
						// console.log(model);
						if (!model) {
							alert('requested urloffline not existing');
							this.noaccessRouter();
							return(false);							
						}
						// console.log(model.get('roles'));
						var roles = model.get('roles');
						// console.log(roles);
						var show = checkRoles(roles);
						// console.log('show');
						// console.log(show);
						// alert(show);
						// return(false);
						// if (checkroute!=route.substring(1)) {
						// 	show = true;
						// }
						if (show==true) {
							this[router]();
						}
						else {
							this.noaccessRouter();
						}
					}
					else {
						// console.log(route.substring(1));
						alert('requested route not setted');
						this.noaccessRouter();
						return(false);							
						// $.sidr('close', 'sidr-left');
						// $( "#panel_left" ).panel( "close" );
					}
				}
			},
			
            // All of your Backbone Routes (add more)
            routes: {
				"": "initRouter",
                "home": "homeRouter",
                "next": "nextRouter",
				"login" : "loginRouter",
				"test" : "testRouter",
				"dashboard" : "dashboardRouter",
				"noaccess" : "noaccessRouter",
				'*path':  'defaultPathRouter',
				// '*actions':  'defaultActionsRouter'
            },
			defaultActionsRouter: function() {
				alert('default actions Router');
			},
			defaultPathRouter: function() {
				alert('default path Router');
				console.log('route not setted in MobileRouter.js');
			},
			initRouter: function() {
				alert('initRouter');
				// $.mobile.jqmNavigator.pushView(new HomeViewTemplate());
				window.location.hash = '#home';
			},
			homeRouter: function() {
				console.log($.mobile.jqmNavigator._getPageContainerViews({}));
				console.log(Backbone.history.fragment);
				/*
				var model = this.collection.find(
					function(model) {
						return (model.get('userfriendly')).toLowerCase() == checkroute;
					}
				);
				*/
				$.mobile.jqmNavigator.pushView(new HomeViewTemplate({
						'header_vars':new Object({title:"this is my page title"}, {subtitle:"and now a subtitle"}),
						// 'footer_vars':new Object({copyright:"MCD 2014"}, {version:"1.0.1 beta"})
				}, {variable:'page_vars'}));
				// alert('homeRouter');
            },
			nextRouter: function() {
				alert('calling nextRouter from MobileRouter');
				// console.log($.mobile.jqmNavigator._getPageContainerViews({}));
				// console.log(Backbone.history.fragment);
				$.mobile.jqmNavigator.pushView(new NextViewTemplate());
				// $.mobile.jqmNavigator.pushView(new NextViewTemplate());
				// alert('nextRouter');
            },
            loginRouter: function() {
				alert('calling loginRouter from MobileRouter');
				// alert('loginRouter');
				$.mobile.jqmNavigator.pushView(new LoginViewTemplate());
				// this.changePage(LoginView, {});
            },
            dashboardRouter: function() {
				// $.mobile.jqmNavigator.pushView(new DashboardViewTemplate());
				this.gotoRoute('#dashboard');
            },
            noaccessRouter: function() {
				$.mobile.jqmNavigator.pushView(new NoaccessView());
            },
            testRouter: function() {
				$.mobile.jqmNavigator.pushView(new TestViewTemplate());
            }
        });
		
		return MobileRouter;

    }

);