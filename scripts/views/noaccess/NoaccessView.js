define(['underscore', 'Backbone', 'text!views/noaccess/NoaccessView.html'],
    function (_, Backbone, NoaccessViewTemplate) {

        var NoaccessViewVar = Backbone.View.extend({

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

        });

        return NoaccessViewVar;
    });