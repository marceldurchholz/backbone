define(['domReady', 'views/test/TestView', 'views/home/HomeView', 'views/next/NextView', 'views/login/LoginView', 'views/test/TestView', 'jqm'],
        
    function(domReady, TestView, HomeViewTemplate, NextViewTemplate, LoginViewTemplate, TestViewTemplate) {

		var MobileRouter = Backbone.Router.extend({

			initialize: function() {
			
				var _thisRouter = this;
				// $(document).bind('pageinit', function(event){
				$(document).off( "pageinit" ).on( "pageinit", function( event ) {
					alert( 'This page was just enhanced by jQuery Mobile!' );
					$('a').off( "click" ).on( "click", function( e ) {
					// $('a').click(function(e){
						e.preventDefault();
						var href = $(this).attr('href');
						console.log(href);
						if (href=='undefined') return(false);
						
						var href = href.replace("#", "");
						console.log(href);
						// var route = _thisRouter.routes
						console.log(_thisRouter.routes);
						var route = _thisRouter.routes[href];
						if (href!='') {
							console.log(route);
							console.log(_thisRouter[route]);
							_thisRouter[route]();
							alert('Click! '+href);
							// return(false);
						}
						// return(false);
					});
					return(false);
				});
				
                Backbone.history.start();
		
				$(document).ready(function() {
					$('#body').off( "swiperight", "#container").on( "swiperight", "#container", function( e ) {
						alert('aaa');
						$.mobile.back();
					});
					alert('document.ready');
					$('.sidr_left').sidr({
						name: 'sidr-left',
						source: function(name) {
							// var bla = "bla empty";
							// return '<h1>'+bla+' >> ' + name + ' menu</h1><p>Yes! You can use a callback too ;)</p>';
							return new TestView({}).$el.html();
						}
					});
				});
				// console.log(document.body.innerHTML);
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
				alert('loginRouter');
				$.mobile.jqmNavigator.pushView(new LoginViewTemplate());
				// this.changePage(LoginView, {});
            },
            testRouter: function() {
				$.mobile.jqmNavigator.pushView(new TestViewTemplate());
            }
        });
		
		return MobileRouter;

    }

);