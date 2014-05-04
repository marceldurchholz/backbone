define(['underscore', 'Backbone', 'views/test/TestViewHref'],
    function (_, Backbone, TestViewHref) {

		var TestViewLiVar = Backbone.View.extend({

			tagName: 'li',
			className: 'list-menu-item',
			// template: _.template(TestNestedTemplate),
            
			events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				window.myrouter.gotoRoute($(event.currentTarget).attr('href').substring(1));
				return(false);
            },
			initialize: function() {
				// console.log('initializing LI');
				$(this.el).undelegate('a', 'click');
			},
			fetch: function() {
				// console.log('fetching LI');
			},
			render: function() {
				console.log('rendering/appending list item in LI');
				var $el = $(this.el);
				this.collection.each(function(list) {
					var item = new TestViewHref({ model: list });
					$el.append(item.render().el);
				});
				return(this);
			}
		});

        return TestViewLiVar;

    }

);