define(['underscore', 'Backbone', 'text!views/next/NextView.html'],
    function (_, Backbone, NextViewTemplate) {

        var NextViewVar = Backbone.View.extend({

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
                this.$el.html(_.template(NextViewTemplate));
				return this;
            }

        });

        return NextViewVar;
    });