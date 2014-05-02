define(['underscore', 'Backbone', 'text!views/test/TestNestedView.html'],
    function (_, Backbone, NextViewTemplate) {

		var TestNestedView = Backbone.View.extend({

			el: "#sidr-left",
            events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				window.myrouter.gotoRoute($(event.currentTarget).attr('href').substring(1));
				return(false);
            },
			initialize: function() {
                $(this.el).undelegate('a', 'click');
			},
			render: function() {
				var htmlContent = _.template(NextViewTemplate);
				console.log(this);
				this.$el.append(htmlContent);
				return this;
			}
		});

        return TestNestedView;

    }

);