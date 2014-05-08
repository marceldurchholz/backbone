define(['underscore', 'Backbone', 'views/test/TestViewHref', 'views/test/TestViewLi'],
    function (_, Backbone, TestViewHref, TestViewLi) {

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
				console.log('initializing LI');
				$(this.el).undelegate('a', 'click');
			},
			fetch: function() {
				console.log('fetching LI');
			},
			render: function() {
				console.log('rendering/appending list item in LI');
				console.log(this.collection);
				
				var $el = $(this.el);
				this.collection.each(function(list) {
					var item, sidebarItem;
					item = new TestViewHref({ model: list });
					$el.append(item.render().el);
				});
				
				var parentitemB;
				// var $el = $(this.el);
				// var self = this;
				// $el.append(this.template);
				// console.log($el);
				// $(this.el).append = 'buffdataaa';
				return(this);
			}
		});

        return TestViewLiVar;

    }

);