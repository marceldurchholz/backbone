// alert('mobile router');

define(['domReady', 'collections/sidemenusCollection', 'views/test/TestView', 'views/home/HomeView', 'views/next/NextView', 'views/login/LoginView', 'views/dashboard/DashboardView', 'views/noaccess/NoaccessView', 'views/dynamic/DynamicView', 'jqm'],
        
    function(domReady, sidemenusCollection, testView, homeView, nextView, loginView, dashboardView, noaccessView, dynamicView) {

		var MobileRouter = Backbone.Router.extend({

			collection: new sidemenusCollection(),
			
			initialize: function() {
				var _this = this;
				console.log('initializing MobileRouter');
				$(window).bind('hashchange', function(){
					alert('ATTENTION !!!! hashchanged to: '+window.location.hash);
					_this.gotoRoute(window.location.hash);
				});
				$(document).off( "pagebeforecreate" ).on( "pagebeforecreate", function( event ) {	
					// _this.collection.fetch();
					// alert('pagebeforecreate');
					new testView({});
				});
				$(document).off( "pagecreate" ).on( "pagecreate", function( event ) {				
					// alert('pagecreate');
				});
				$(document).off( "pageinit" ).on( "pageinit", function( event ) {				
					// alert('pageinit');
					// _this.collection.fetch();
					// this.collection = new sidemenusCollection();
				});
				
				this.collection.fetch({ 
					silent:true,
					success: function(response){
					_this.collection = response;
					console.log(_this.collection);
					_this.bindEvents();
					// _this.recreateSidemenu();
				}});

				},
			addSidemenu: function(e,a) {
				console.log('addSidemenu');
				console.log(e);
				console.log(a);
				console.log(this.collection);
			},
			removeSidemenu: function(e,a) {
				console.log('removeSidemenu');
				console.log(e);
				console.log(a);
				console.log(this.collection);
			},
            routes: {
				"": "loginRouter",
				'*path':  'dynamicRouter'
			},
			recreateSidemenu: function(e,a) {
				// alert('recreateSidemenu');
				var _this = this;
				_this.routes = [];
				this.collection.each(function(row) {				
					var _row = row;
					var userfriendly = _row.get('urloffline');
					_this.routes[userfriendly] = userfriendly+'Router';
				});
			},
			bindEvents: function() {
				// this.collection.on("add", this.recreateSidemenu, this);
				// this.collection.on("remove", this.recreateSidemenu, this);
				var _this = this;
				// _this.recreateSidemenu();
				this.collection.on("reset", this.recreateSidemenu, this);
				_this.collection.trigger('reset');
				Backbone.history.start({
					// silent:true,
					pushState: false,
					hashChange: false
				});

				// this.recreateSidemenu();
			},

			checkLink: function(event) {
				console.log('checkLink');
				var _this = this;
				var href = $(event.currentTarget).attr('href');
				var is_ajax = $(event.currentTarget).attr('data-ajax');
				if (is_ajax=='true') {
					console.log(href+' has >> data-ajax=true');
				}
				else if (href!='#' && href!='undefined' && href!='' && href!=undefined) {
					console.log(href+' has no >> data-ajax=true');
					if (event.preventDefault) event.preventDefault();
					_this.gotoRoute(href);
					return(false);
				}
				else {
					// console.log('undefinierte aktion in MobileRouter.js');
					return(false);
				}
			},
			
			gotoRoute: function(route) {
				var _this = this;
				this.collection.fetch({ 
					success: function(response){
					_this.collection = response;
				}});
				
				// console.log('gotoRoute: '+route);
				// alert(route);
				// if (route!='') this.recreateSidemenu();
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
						if (show==true) this.execRouterByRoute(route);
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
			callFunc: function(funcName,val) {
				// console.log(new Object(funcName))
				// console.log(new [funcName](val));
				// String.prototype.toElement = function(){
				// 	return t.getElementsByTagName("*")[0];
				// }
				// console.log(bla);
				// var bla = new Object();
				// return();
			},
			execRouterByRoute: function(route){
				console.log('setted route '+route);
				var pageObject = new Object({
					'header_vars':new Object({title:"this is my page title"}, {subtitle:"and now a subtitle"}),
					'footer_vars':new Object({copyright:"MCD 2014"}, {version:"1.0.1 beta"})
				}, {variable:'page_vars'});
				// var notsettedRouter = 'notsettedRouter';
				// switch
				var hash = route.substring(1); 
				var viewName = hash+'View';

					  try {
						$.mobile.jqmNavigator.pushView((new (eval(viewName))(pageObject)));
					  } catch (e) {
						$.mobile.jqmNavigator.pushView((new noaccessView(pageObject)));
					  } finally {
						// $.mobile.jqmNavigator.pushView((new (eval(viewName))(pageObject)));
					  }
					  
				/*
				if (hash=='dashboard') $.mobile.jqmNavigator.pushView(new dashboardView(pageObject));
				if (hash=='home') {
					// var testvar = new homeView(pageObject);
					// $.mobile.jqmNavigator.pushView(new homeView(pageObject))
					// this.callFunc(viewName,pageObject);
					// var b = (new (eval(viewName))(pageObject));
					// console.log(b);
					// console.log(new viewName);
					// console.log((this[viewName]));
					// console.log(this[viewName](pageObject)); // console.log(viewName); // $.mobile.jqmNavigator.pushView(new homeView(pageObject));
					if (hash=='home') $.mobile.jqmNavigator.pushView(new homeView(pageObject));
					}
				if (hash=='next') $.mobile.jqmNavigator.pushView(new nextView(pageObject));
				if (hash=='login') $.mobile.jqmNavigator.pushView(new loginView(pageObject));
				*/
			},
			
			dynamicRouter: function() {
				console.log('route not setted in MobileRouter.js');
				$.mobile.jqmNavigator.pushView(new dynamicView());
			},
            noaccessRouter: function() {
				console.log('no access to route via MobileRouter.js');
				$.mobile.jqmNavigator.pushView(new noaccessView());
            },
			homeRouter: function() {
				this.gotoRoute('#home');
            },
            loginRouter: function() {
				console.log('doing loginRouter');
				this.gotoRoute('#login');
            },
            dashboardRouter: function() {
				this.gotoRoute('#dashboard');
            },
            cardsRouter: function() {
				this.gotoRoute('#cards');
            }
			
			/*
			nextRouter: function() {
				this.gotoRoute('#next');
            },
			*/
        });
		
		return MobileRouter;

    }

);