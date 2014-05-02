define(['underscore', 'Backbone', 'text!views/test/TestNestedView.html'],
    function (_, Backbone, NextViewTemplate) {

		var TestNestedView = Backbone.View.extend({
			render: function() {
				var htmlContent = "testcontent";
				htmlContent = _.template(NextViewTemplate);
				console.log(this);
				this.$el.html(htmlContent);
				return this;
			}
		});

        return TestNestedView;

    }

);