define(['underscore', 'Backbone', 'text!views/next/NextView.html'],
    function (_, Backbone, NextViewTemplate) {

        var NextView = Backbone.View.extend({

            events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
            render:function () {
                this.$el.html(_.template(NextViewTemplate));
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

        return NextView;
    });