// alert('mobile router');

define(['domReady', 'collections/sidemenusCollection', 'views/test/TestView', 'views/home/HomeView', 'views/next/NextView', 'views/login/LoginView', 'views/test/TestView', 'views/dashboard/DashboardView', 'views/noaccess/NoaccessView', 'views/dynamic/DynamicView', 'jqm'],
        
    function(domReady, sidemenusCollection, TestView, HomeView, NextViewTemplate, LoginView, TestViewTemplate, DashboardView, NoaccessView, DynamicView) {

		var MobileRouter = Backbone.Router.extend({

			collection: new sidemenusCollection(),
			
			initialize: function() {
			
				var _thisRouter = this;
				
				this.collection.fetch();
				// this.collection.on("add", this.sidemenusAll, this);
				// this.collection.on("remove", this.sidemenusAll, this);
				this.collection.on("reset", this.start, this);
				console.log('initializing MobileRouter');
				$(window).bind('hashchange', function(){
					console.log('ATTENTION !!!! hashchanged to: '+window.location.hash);
					_thisRouter.gotoRoute(window.location.hash);
				});
            },
			start: function(e,o) {
				var _this = this;
				$(document).off( "pageinit" ).on( "pageinit", function( event ) {				
					new TestView({});
				});
				Backbone.history.start({
					pushState: false
					, hashChange: false
					// , silent: true
				});
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
					return(false);
				}
			},
			
			gotoRoute: function(route) {
				console.log('gotoRoute: '+route);
				if (route!='' && route!='#') {
					var router = this.routes[route.substring(1)];
					if (router!=undefined) {
						var checkroute = route.substring(1);
						var model = this.collection.find(
							function(model) {
								return (model.get('urloffline')).toLowerCase() == checkroute;
							}
						);
						if (!model) {
							console.log('requested navmobile not existing');
							this.noaccessRouter();
							return(false);							
						}
						var show = checkRoles(model.get('roles'));
						if (show==true) this.setRouter(router);
						else this.noaccessRouter();
					}
					else {
						this.dynamicRouter();
						return(false);
					}
				}
				else {
				}
			},
			
			setRouter: function(router){
				var pageObject = new Object({
					'header_vars':new Object({title:"this is my page title"}, {subtitle:"and now a subtitle"}),
					'footer_vars':new Object({copyright:"MCD 2014"}, {version:"1.0.1 beta"})
				}, {variable:'page_vars'});
				if (router=='dashboardRouter') $.mobile.jqmNavigator.pushView(new DashboardView(pageObject));
				if (router=='homeRouter') $.mobile.jqmNavigator.pushView(new HomeView(pageObject));
				if (router=='nextRouter') $.mobile.jqmNavigator.pushView(new HomeView(pageObject));
				if (router=='loginRouter') $.mobile.jqmNavigator.pushView(new LoginView(pageObject));
			},
			
            // All of your Backbone Routes (add more)
            routes: {
				"": "homeRouter",
                "home": "homeRouter",
                "next": "nextRouter",
				"login" : "loginRouter",
				"test" : "testRouter",
				"dashboard" : "dashboardRouter",
				'*path':  'dynamicRouter',
            },
			dynamicRouter: function() {
				console.log('route not setted in MobileRouter.js');
				$.mobile.jqmNavigator.pushView(new DynamicView());
			},
            noaccessRouter: function() {
				console.log('no access to route via MobileRouter.js');
				$.mobile.jqmNavigator.pushView(new NoaccessView());
            },
			homeRouter: function() {
				this.gotoRoute('#home');
            },
			nextRouter: function() {
				this.gotoRoute('#next');
            },
            loginRouter: function() {
				this.gotoRoute('#login');
            },
            dashboardRouter: function() {
				this.gotoRoute('#dashboard');
            },
            testRouter: function() {
				this.gotoRoute('#test');
            }
        });
		
		return MobileRouter;

    }

);