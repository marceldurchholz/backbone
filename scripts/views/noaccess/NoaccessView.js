define(['underscore', 'Backbone', 'text!views/noaccess/NoaccessView.html'],
    function (_, Backbone, NoaccessViewTemplate) {

        var NoaccessView = Backbone.View.extend({

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

        return NoaccessView;
    });