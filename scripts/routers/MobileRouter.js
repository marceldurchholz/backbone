define(['domReady', 'views/test/TestView', 'views/home/HomeView', 'views/next/NextView', 'views/login/LoginView', 'views/test/TestView', 'jqm'],
        
    function(domReady, TestView, HomeViewTemplate, NextViewTemplate, LoginViewTemplate, TestViewTemplate) {

		var MobileRouter = Backbone.Router.extend({

			initialize: function() {
                Backbone.history.start();
				$(document).ready(function() {
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
				$.mobile.jqmNavigator.pushView(new LoginViewTemplate());
				// this.changePage(LoginView, {});
				// alert('loginRouter');
            },
            testRouter: function() {
				$.mobile.jqmNavigator.pushView(new TestViewTemplate());
            }
        });
		
		return MobileRouter;

    }

);