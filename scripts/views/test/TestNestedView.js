define(['underscore', 'Backbone', 'text!views/test/TestNestedView.html'],
    function (_, Backbone, NextViewTemplate) {

		var TestNestedView = Backbone.View.extend({
			el: "#sidr-left",
            events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				console.log('clicked on navi href');
				var href = $(event.currentTarget).attr('href');
				window.myrouter.gotoRoute(href.substring(1));
				// return false; 
            },
			initialize: function() {
                $(this.el).undelegate('a', 'click');
			},
			render: function() {
				var htmlContent = "testcontent";
				htmlContent = _.template(NextViewTemplate);
				console.log(this);
				this.$el.append(htmlContent);
				return this;
			}
		});

        return TestNestedView;

    }

);