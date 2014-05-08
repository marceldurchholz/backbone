define(['underscore', 'Backbone', 'text!views/test/TestNestedSecondView.html'],
    function (_, Backbone, TestNestedSecondTemplate) {

		var TestNestedSecondView = Backbone.View.extend({

			tagName: 'li',
			className: 'list-menu-item',
			template: _.template(TestNestedSecondTemplate),
            
			events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				window.myrouter.gotoRoute($(event.currentTarget).attr('href').substring(1));
				return(false);
            },
			initialize: function() {
				console.log('initializing TestNestedSecondView');
				$(this.el).undelegate('a', 'click');
				this.fetch();
			},
			fetch: function() {
				console.log('fetching TestNestedSecondView');
			},
			render: function() {
				console.log('rendering/appending list item in TestNestedSecondView');
				var $el = $(this.el), self = this;
				$el.append(this.template);
				return this;
			}
		});

        return TestNestedSecondView;

    }

);