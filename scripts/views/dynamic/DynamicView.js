define(['underscore', 'Backbone', 'text!views/dynamic/DynamicView.html'],
    function (_, Backbone, DynamicViewTemplate) {

        var DynamicViewVar = Backbone.View.extend({

			events:{
                'click a':'a_clickHandler',
                'click button':'button_clickHandler',
            },
            a_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
            button_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
			initialize:function() {
				$(this.el).undelegate('a', 'click');
			},
            render:function () {
                this.$el.html(_.template(DynamicViewTemplate));
				return this;
            }

        });

        return DynamicViewVar;
    });