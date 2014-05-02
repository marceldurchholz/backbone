/**
 * Created by Piotr Walczyszyn (@pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:20 AM
 */

require.config({
    paths:{
        // RequireJS plugin
        text:'libs/require/text',
        // RequireJS plugin
        domReady:'libs/require/domReady',
        // underscore library
        underscore:'libs/underscore/underscore',
        // Backbone.js library
        Backbone:'libs/backbone/backbone',
        // jQuery
        // jquery:'libs/jquery/jquery-1.8.2',
        jquery:'libs/jquery/jquery-2.0.3',
        // jQuery Mobile framework
        // jqm:'libs/jquery.mobile/jquery.mobile-1.2.0',
        // jqm:'libs/jquery.mobile/jquery.mobile-1.3.2',
		jqm:'libs/jquery.mobile/jquery.mobile-1.4.2',
        // jQuery Mobile plugin for Backbone views navigation
        jqmNavigator:'libs/jquery.mobile/jqmNavigator',
		fastclick:'libs/jquery.mobile/fastclick',
		transit:'libs/jquery.mobile/transit',
		// touchwipe:'libs/jquery.mobile/touchwipe/touchwipe',
		myfunctions:'libs/jquery.mobile/myfunctions',
		sidr:'libs/jquery.mobile/sidr/sidr',
		preventLinks:'libs/jquery.mobile/preventLinks/preventLinks',
		deployd: "http://dominik-lohmann.de:5000/dpd",

    },
    shim:{
        Backbone:{
            deps:['underscore', 'jquery'],
            exports:'Backbone'
        },
        underscore:{
            exports:'_'
        },
        jqm:{
            deps:['jquery', 'jqmNavigator', 'fastclick', 'myfunctions', 'transit', 'sidr', 'preventLinks', 'deployd']
        }
    }
});

require(['domReady', 'routers/MobileRouter', 'jqm'],
    function (domReady, MobileRouter) {

        // domReady is RequireJS plugin that triggers when DOM is ready
        domReady(function () {

            function onDeviceReady(desktop) {
                if (desktop !== true) {
					// Hiding splash screen when app is loaded
                    cordova.exec(null, null, 'SplashScreen', 'hide', []);
					if (navigator.userAgent.match(/(iPad|iPhone)/)) {
						StatusBar.hide();
						document.body.style.marginTop = "0px";
						$("#body").css('top', "0px");
						// alert('FastClick.attach');
						// console.log(document.body.innerHTML);
						FastClick.attach(document.body);
					}
				}

                // Setting jQM pageContainer to #container div, this solves some jQM flickers & jumps
                // I covered it here: http://outof.me/fixing-flickers-jumps-of-jquery-mobile-transitions-in-phonegap-apps/
                $.mobile.pageContainer = $('#container');

                // Setting default transition to slide
                $.mobile.defaultPageTransition = 'slide';

                // Pushing MainView
                // $.mobile.jqmNavigator.pushView(new HomeView());
				
				/* new integrated router */
				// new MobileRouter();
				window.myrouter = new MobileRouter();
				
            }

            if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                // This is running on a device so waiting for deviceready event
                document.addEventListener('deviceready', onDeviceReady, false);
            } else {
                // On desktop don't have to wait for anything
                onDeviceReady(true);
            }

        });

    });