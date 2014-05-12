define(['underscore', 'Backbone', 'text!views/panelright/PanelrightView.html'],
    function (_, Backbone, PanelrightViewTemplate) {

        var PanelrightViewVar = Backbone.View.extend({

			el: "#panel_right",
			template: _.template(PanelrightViewTemplate),
			
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
				// $el.panel();
				$el.html(this.template({}));
				$el.trigger("create");
				return this;
            }

        });

        return PanelrightViewVar;
    });