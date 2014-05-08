define(['underscore', 'Backbone', 'text!views/test/TestNestedView.html', 'views/test/TestNestedSecondView'],
    function (_, Backbone, TestNestedTemplate, TestNestedSecondView) {

		var TestNestedView = Backbone.View.extend({

			tagName: 'li',
			className: 'list-menu-item',
			template: _.template(TestNestedTemplate),
            
			events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				window.myrouter.gotoRoute($(event.currentTarget).attr('href').substring(1));
				return(false);
            },
			initialize: function() {
				console.log('initializing TestNestedView');
				$(this.el).undelegate('a', 'click');
				this.fetch();
			},
			fetch: function() {
				console.log('fetching TestNestedView');
			},
			render: function() {
				console.log('rendering/appending list item in TestNestedView');
				var $el = $(this.el), self = this;
				$el.append(this.template);
				return this;
			}
		});

        return TestNestedView;

    }

);