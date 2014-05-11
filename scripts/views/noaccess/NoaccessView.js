define(['underscore', 'Backbone', 'text!views/template/NoaccessView.html'],
    function (_, Backbone, NoaccessViewTemplate) {

        var NoaccessViewVar = Backbone.View.extend({

			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize:function() {
				_this = this;
				$(this.el).undelegate('a', 'click');
			},
            render:function () {
                this.$el.html(_.template(NoaccessViewTemplate));
				return this;
            }

        });

        return NoaccessViewVar;
    });