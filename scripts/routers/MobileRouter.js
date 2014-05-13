define(['domReady', 'collections/sidemenusCollection', 'views/panelright/PanelrightView', 'views/panelfunctions/PanelfunctionsView', 'views/test/TestView', 'views/template/TemplateView', 'views/noaccess/NoaccessView', 'views/login/LoginView', 'jqm'],

    function(domReady, sidemenusCollection, panelrightView, panelfunctionsView, testView, templateView, noaccessView, loginView) {

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
				_this.query_vars = new Object();
				_this.ghostView = new Object();
				_this.bindEvents();
				// console.log(_this.ghostView);
				// console('initializing...');
				// _this.initRouter();
				// _this.route("", "", _this.startRouter);
				_this.route("*path", "vars", _this.initRouter);
				_this.route("videos/details/view/:id", "id", _this.videodetailsRouter);
				
				Backbone.history.start({
					// silent:true,
					// pushState: true,
					// hashChange: true
				});
				// window.location.hash="home";
			},

			/*
			startRouter: function() {
				_this = this;
				// alert('silence is golden...');
				_this.initRouter();
			},
			templateRouter: function() {
				// console('doing templateRouter');
				// $.mobile.jqmNavigator.pushView(new templateView().render());
			},
			*/

			videodetailsRouter: function(id) {
				_this = this;
				// alert('doing.... '+id);
				_this.query_vars = new Object();
				_this.query_vars.urloffline_route = '#videodetails';
				_this.query_vars.id = id;
				_this.initRouter();
			},
			
			initRouter: function() {
				_this = this;
				// alert('dynamic page getter...');
				console.log(_this.query_vars);
				if (_this.query_vars.urloffline_route) _this.query_vars.open_route = _this.query_vars.urloffline_route;
				else _this.query_vars.open_route = window.location.hash;
				
				// Backbone.history.navigate(_this.query_vars.open_route.substring(1), {trigger: false, replace:true});
				

				/*
				if (_this.query_vars!=undefined && (_this.query_vars.open_route=='' || _this.query_vars.open_route==undefined || _this.query_vars.open_route=='undefined')) _this.query_vars.open_route = _this.query_vars.query_vars.open_route;
				else _this.query_vars.open_route = window.location.hash;
				if (_this.query_vars.open_route=='') _this.query_vars.open_route='#login';
				alert(_this.query_vars.open_route);
				*/
				
				// alert(_this.query_vars.open_route);
				this.collection.fetch({ 
					success: function(response){
						_this.collection = response;
						// _this.bindEvents();
						// _this.recreateSidemenu();
						var xbla = new panelrightView({me:window.system.me,collection:_this.collection});
						var zbla = new panelfunctionsView({me:window.system.me,collection:_this.collection});
						var ybla = new testView({me:window.system.me,collection:_this.collection});
						// alert(window.location.hash);
						// if (window.location.hash=='') window.location.hash='#login';
						if (_this.query_vars.open_route=='') _this.query_vars.open_route='#login';
						// alert('going to route: '+_this.query_vars.open_route);
						_this.gotoRoute(_this.query_vars.open_route);
					}
				});
			},
            routes: {
			},
			recreateSidemenu: function(e,a) {
				console.log('recreateSidemenu');
				var _this = this;
				_this.routes = [];
				_this.route("*path", "vars", _this.initRouter);
				_this.collection.each(function(row) {
					var _row = row;
					var userfriendly = _row.get('urloffline');
					_this.routes[userfriendly] = userfriendly+'Router';
				});
				
				_this.route("videos/details/view/:id", "id", _this.videodetailsRouter);
				
				// _this.route("", "", _this.startRouter);
				// _this.route("videos/details/view/:id", "id", _this.videodetailsRouter);
				// _this.route("*path", "vars", _this.initRouter);
				
				// _this.routes[''] = "startRouter";
				// _this.routes['videos/details/view/:id'] = 'videodetailsRouter';
				// _this.routes['*path'] = 'initRouter';
				
				
			},
			bindEvents: function() {
				var _this = this;
				// alert('binding events');
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
					if (e.preventDefault) e.preventDefault();
					_this.gotoRoute(href);
					return(false);
				}
				else {
					if (e.preventDefault) e.preventDefault();
					console.log('wahrscheinlich ein link, der durch eine globale function in myfunctions.js definiert sein sollte/ist...');
					return(false);
				}
			},
			gotoRoute: function(route) {
				var _this = this;				
				console.log('gotoRoute: '+route);
				Backbone.history.navigate('', {trigger: false, replace:true});
				_this.collection.fetch({ 
					success: function(response){
					_this.collection = response;
					console.log(_this.collection);
					if (route!='' && route!='#') {
						console.log(_this.routes);
						var router = _this.routes[route.substring(1)];
						if (router!=undefined) {
							var checkroute = route.substring(1);
							console.log(route);
							var model = _this.collection.find(
								function(model) {
									return (model.get('urloffline')).toLowerCase() == checkroute;
								}
							);
							console.log(model);
							if (!model) {
								console.log('requested navmobile NOT existing');
								// _this.noaccessRouter();
								$.mobile.jqmNavigator.pushView(new noaccessView());
								return(false);							
							}
							console.log('requested navmobile IS existing');
							// console.log(model);
							var show = checkRoles(model.get('roles'));
							if (show==true) _this.execRouterByRoute(route,model);
							else $.mobile.jqmNavigator.pushView(new noaccessView()); // _this.noaccessRouter();
						}
						else {
							console.log('router '+router+' is undefined / hash '+checkroute+' eventually not pulled via navmobile=true (router function not created/existing)');
							$.mobile.jqmNavigator.pushView(new noaccessView());
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
				// var data_depencies = new Array();
				// data_depencies = ["videos"];
				var pageObject = new Object({
					// 'data_depencies':data_depencies,
					'query_vars':_this.query_vars,
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
					// return(false);
					_this.newView = (new (eval(viewName))(pageObject)).render(); // wothout render() ??????
					$.mobile.jqmNavigator.pushView(_this.newView);
					// console.log(_this.newView);
				} catch (e) {
					console.log('folgend wird hier ein fehler gemeldet der mit absicht durch ein try() debugged wird');
					console.log(e);
					console.log('switching to templateView (error on function call for '+viewName+')');
					_this.newView = (new templateView(pageObject));
					$.mobile.jqmNavigator.pushView(_this.newView);
				} finally {
					// $.mobile.jqmNavigator.pushView(_this.newView);
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
			
						
        });
		
		return MobileRouter;

    }

);
