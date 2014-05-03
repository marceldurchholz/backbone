define(['underscore', 'Backbone', 'text!views/noaccess/NoaccessView.html'],
    function (_, Backbone, NoaccessViewTemplate) {

        var NoaccessView = Backbone.View.extend({

            events:{
                'click a':'a_clickHandler',
                'click button':'button_clickHandler'
            },
            a_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
            button_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
            render:function () {
                this.$el.html(_.template(NoaccessViewTemplate));
				return this;
            }

            /*
			btnBack_clickHandler:function (event) {
				event.preventDefault();
                $.mobile.jqmNavigator.popView();
				return(false);
            }
			*/

        });

        return NoaccessView;
    });