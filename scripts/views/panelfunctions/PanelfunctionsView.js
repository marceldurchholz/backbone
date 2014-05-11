define(['underscore', 'Backbone', 'text!views/panelfunctions/PanelfunctionsView.html'],
    function (_, Backbone, PanelfunctionsViewTemplate) {

        var PanelfunctionsViewVar = Backbone.View.extend({

			el: "#panel_functions",
			template: _.template(PanelfunctionsViewTemplate),
			
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize: function() {
				$(this.el).undelegate('a', 'click');
				this.collection.on("reset", this.render, this);
			},
            render: function () {
				var _this = this;
				var $el = $(this.el);
				$el.panel();
				$el.html(this.template({}));
				$el.trigger("create");
				return this;
            }

        });

        return PanelfunctionsViewVar;
    });