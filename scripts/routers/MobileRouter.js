alert('mobile router');

define(['domReady', 'collections/sidemenusCollection', 'views/test/TestView', 'views/home/HomeView', 'views/template/TemplateView', 'views/login/LoginView', 'jqm'],
        
    function(domReady, sidemenusCollection, testView, homeView, templateView, loginView) {

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
			
			collection: new sidemenusCollection(),
			
			initialize: function() {
				var _this = this;
				window.myrouter = _this;
				_this.ghostView = new Object();
				// console.log(_this.ghostView);
				alert('initializing...');
				// _this.initRouter();
				Backbone.history.start({
					// silent:true,
					pushState: false,
					hashChange: false
				});
			},

            routes: {
				"": "startRouter",
				"login": "loginRouter",
				"noaccess": "noaccessRouter",
				"*path": "initRouter"
			},
			startRouter: function() {
				_this = this;
				alert('silence is golden...');
				_this.initRouter();
			},
            loginRouter: function() {
				alert('doing loginRouter');
				$.mobile.jqmNavigator.pushView(new loginView());
            },
			dynamicRouter: function() {
				alert('doing dynamicRouter');
				// $.mobile.jqmNavigator.pushView(new dynamicView().render());
			},
            noaccessRouter: function() {
				alert('doing noaccessRouter');
				// $.mobile.jqmNavigator.pushView(new noaccessView().render());
            },

			initRouter: function() {
				_this = this;
				alert('innniting...');
				this.collection.fetch({ 
					// silent:true,
					success: function(response){
						_this.collection = response;
						// _this.bindEvents();
						_this.recreateSidemenu();
						// window['sidemenuView'] = 
						// new testView({collection:_this.collection});
						alert(queryRoute);
						var queryRoute = window.location.hash;
						if (queryRoute=='') queryRoute = '#login';
						alert(_this.routes['login']);
						
						_this.loginRouter();
						
						// var pageObject = {};
						// var viewName = _this.routes['login'];
						// _this.newView = (new (eval(viewName))(pageObject)).render();
						// $.mobile.jqmNavigator.pushView(_this.newView);
						
						// _this.gotoRoute(queryRoute);
					}
				});
			},
			recreateSidemenu: function(e,a) {
				alert('recreateSidemenu');
				var _this = this;
				_this.routes = [];
				this.collection.each(function(row) {
					var _row = row;
					var userfriendly = _row.get('urloffline');
					_this.routes[userfriendly] = userfriendly+'Router';
				});
				// _this.routes['dynamic'] = 'dynamicRouter';
				_this.routes[''] = "startRouter";
				_this.routes['noaccess'] = 'noaccessRouter';
				_this.routes['*path'] = 'initRouter';
				
			},
			/*
			bindEvents: function() {
				var _this = this;
				alert('binding events');
				// this.collection.on("add", this.recreateSidemenu, this);
				// this.collection.on("remove", this.recreateSidemenu, this);
				this.collection.on("reset", _this.recreateSidemenu, this);
				// $(window).on("beforeunload", _this.beforeUnload);
				// this.recreateSidemenu();
			},
			
			checkLink: function(e) {
				console.log('checkLink');
				var _this = this;
				var href = $(e.currentTarget).attr('href');
				var data_href = $(e.currentTarget).attr('href');
				var is_ajax = $(e.currentTarget).attr('data-ajax');
				if (is_ajax=='true') {
					console.log(href+' has >> data-ajax=true');
					if (e.preventDefault) e.preventDefault();
					return(false);
				}
				else if (href!='#' && href!='undefined' && href!='' && href!=undefined) {
					// console.log(href+' has no >> data-ajax=true');
					if (e.preventDefault) e.preventDefault();
					_this.gotoRoute(href);
					return(false);
				}
				else {
					if (e.preventDefault) e.preventDefault();
					// console.log('undefinierte aktion in MobileRouter.js: eventuell ein realler <a href="#bla">foo</a> link ?!?');
					console.log('wahrscheinlich ein link, der durch eine globale function in myfunctions.js definiert sein sollte/ist...');
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
							// console.log(model);
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
					console.log('KEIN FEHLER');
					console.log(viewName);
					console.log(pageObject);
					_this.newView = (new (eval(viewName))(pageObject)).render();
					// console.log(_this.newView);
				} catch (e) {
					console.log('folgend wird hier ein fehler gemeldet der mit absicht durch ein try() debugged wird');
					console.log(e);
					console.log('switching to dynamicView (error on function call for '+viewName+')');
					// pageObject.template = route;
					// pageObject.collection = _this.collection;
					// new dynamicView({collection:_this.collection});
					// pushView.template = 'dynamicView';
					// _this.newView = new dynamicView(pageObject);
					// $.mobile.jqmNavigator.pushView(_this.newView);
					_this.newView = (new dynamicView(pageObject)).render();
				} finally {
					$.mobile.jqmNavigator.pushView(_this.newView);
					// $.mobile.jqmNavigator.pushView((new (eval(viewName))(pageObject)));
					// console.log(_this.ghostView);
						
				}
			},
			
			
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
			}			
			*/
			
						
        });
		
		return MobileRouter;

    }

);
