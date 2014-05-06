// alert('mobile router');

define(['domReady', 'collections/sidemenusCollection', 'views/test/TestView', 'views/home/HomeView', 'views/next/NextView', 'views/login/LoginView', 'views/dashboard/DashboardView', 'views/noaccess/NoaccessView', 'views/dynamic/DynamicView', 'jqm'],
        
    function(domReady, sidemenusCollection, testView, homeView, nextView, loginView, dashboardView, noaccessView, dynamicView) {

		var MobileRouter = Backbone.Router.extend({

			collection: new sidemenusCollection(),
			
			filterCollection: function (filter,collection, attribute, value) {
				if (filter=='>') {
					var models = collection.select(function (model) {
						return model.get(attribute) > value;
					});
				}
				if (filter=='<') {
					var models = collection.select(function (model) {
						return model.get(attribute) < value;
					});
				}
				if (filter=='==') {
					var models = collection.select(function (model) {
						return model.get(attribute) == value;
					});
				}
				if (filter=='!=') {
					var models = collection.select(function (model) {
						return model.get(attribute) != value;
					});
				}
				if (filter=='has_role') {
					var models = collection.select(function (model) {
						return ($.inArray(value, model.get(attribute))=='-1' ? false : true);
					});
				}
				if (filter=='has_not_role') {
					var models = collection.select(function (model) {
						return ($.inArray(value, model.get(attribute))=='-1' ? true : false);
					});
				}
				return new collection.constructor(models);
			},
			
			initialize: function() {
				var _this = this;
				console.log('initializing MobileRouter');
				$(window).bind('hashchange', function(){
					alert('ATTENTION !!!! hashchanged to: '+window.location.hash);
					_this.gotoRoute(window.location.hash);
				});
				$(document).off( "pagebeforecreate" ).on( "pagebeforecreate", function( event ) {	
					// console.log('pagebeforecreate');
					// console.log(window['sidemenuView'])
				});
				$(document).off( "pagecreate" ).on( "pagecreate", function( event ) {				
					// console.log('pagecreate');
				});
				$(document).off( "pageinit" ).on( "pageinit", function( event ) {	
					// console.log(window['sidemenuView']);
					// console.log('pageinit');
					// this.collection = new sidemenusCollection();
				});
				$(document).off( "pagehide" ).on( "pagehide", function( event ) {	
					// console.log('pagehide');
					// console.log(window['sidemenuView']);
					// window['sidemenuView'].el.remove();
					$.mobile.defaultPageTransition = 'slidefade';
				});
				
				this.collection.fetch({ 
					silent:true,
					success: function(response){
					_this.collection = response;
					_this.bindEvents();
					_this.recreateSidemenu();
					window['sidemenuView'] = new testView({collection:_this.collection});
					// console.log(window['sidemenuView']);
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
			recreateSidemenu: function(e,a) {
				// alert('recreateSidemenu');
				var _this = this;
				_this.routes = [];
				_this.routes['dynamic'] = 'dynamicRouter';
				_this.routes[''] = "loginRouter";
				_this.routes['*path'] = 'dynamicRouter';
				this.collection.each(function(row) {				
					var _row = row;
					var userfriendly = _row.get('urloffline');
					_this.routes[userfriendly] = userfriendly+'Router';
				});
			},
			
			bindEvents: function() {
				var _this = this;
				// this.collection.on("add", this.recreateSidemenu, this);
				// this.collection.on("remove", this.recreateSidemenu, this);
				this.collection.on("reset", _this.recreateSidemenu, this);
				Backbone.history.start({
					// silent:true,
					pushState: false,
					hashChange: false
				});

				// this.recreateSidemenu();
			},

            routes: {
				"": "loginRouter"
			},
			dynamicRouter: function() {
				console.log('doing dynamicRouter');
				$.mobile.jqmNavigator.pushView(new dynamicView());
			},
            noaccessRouter: function() {
				console.log('doing noaccessRouter');
				$.mobile.jqmNavigator.pushView(new noaccessView());
            },
            loginRouter: function() {
				this.gotoRoute('#login');
            },
			
			checkLink: function(event) {
				console.log('checkLink');
				var _this = this;
				var href = $(event.currentTarget).attr('href');
				var data_href = $(event.currentTarget).attr('href');
				var is_ajax = $(event.currentTarget).attr('data-ajax');
				if (is_ajax=='true') {
					console.log(href+' has >> data-ajax=true');
					if (event.preventDefault) event.preventDefault();
					return(false);
				}
				else if (href!='#' && href!='undefined' && href!='' && href!=undefined) {
					// console.log(href+' has no >> data-ajax=true');
					if (event.preventDefault) event.preventDefault();
					_this.gotoRoute(href);
					return(false);
				}
				else {
					if (event.preventDefault) event.preventDefault();
					console.log('undefinierte aktion in MobileRouter.js');
					return(false);
				}
			},
			
			gotoRoute: function(route) {
				var _this = this;
				console.log('gotoRoute: '+route);
				_this.collection.fetch({ 
					success: function(response){
					_this.collection = response;
					if (route!='' && route!='#') {
						var router = _this.routes[route.substring(1)];
						if (router!=undefined) {
							var checkroute = route.substring(1);
							console.log(route);
							var model = _this.collection.find(
								function(model) {
									return (model.get('urloffline')).toLowerCase() == checkroute;
								}
							);
							if (!model) {
								console.log('requested navmobile NOT existing');
								_this.noaccessRouter();
								return(false);							
							}
							console.log('requested navmobile IS existing');
							console.log(model);
							var show = checkRoles(model.get('roles'));
							if (show==true) _this.execRouterByRoute(route,model);
							else _this.noaccessRouter();
						}
						else {
							// alert('router function not existing');
							console.log('hash eventually not pulled via navmobile=true (router function not created/existing)');
							_this.noaccessRouter();
							// _this.dynamicRouter();
							return(false);
						}
					}
					else {
					}
				}});
			},
			execRouterByRoute: function(route,model){
				var _this = this;
				var hash = route.substring(1); 
				var viewName = hash+'View';
				console.log('execRouterByRoute '+route);
				var pageObject = new Object({
					'header_vars':new Object({title:model.get('userfriendly')}, {subtitle:model.get('slogan')}),
					'footer_vars':new Object({copyright:model.get('companyname')}, {kdnr:model.get('kdnr')}),
					'me':window.me,
					'collection':_this.collection,
					'model':model,
					'viewName':viewName,
					'route':route,
					'hash':hash
				}, {variable:'page_vars'});
				try {
					$.mobile.jqmNavigator.pushView((new (eval(viewName))(pageObject)));
				} catch (e) {
					console.log('switching to dynamicView (files not found)');
					// pageObject.template = route;
					// pageObject.collection = _this.collection;
					// new dynamicView({collection:_this.collection});
					// pushView.template = 'dynamicView';
					$.mobile.jqmNavigator.pushView(new dynamicView(pageObject));
				} finally {
					// $.mobile.jqmNavigator.pushView((new (eval(viewName))(pageObject)));
				}
			}
						
        });
		
		return MobileRouter;

    }

);