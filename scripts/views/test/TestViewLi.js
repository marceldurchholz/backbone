define(['underscore', 'Backbone', 'views/test/TestViewHref', 'text!views/test/TestViewHref.html'],
    function (_, Backbone, TestViewHref, TestViewHrefTemplate) {

		var TestViewLiVar = Backbone.View.extend({

			// el: "",
			tagName: 'ul',
			className: 'NO_UL_CLASS',
			template: _.template(TestViewHrefTemplate),
			
			
			events:{
                // 'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				window.myrouter.gotoRoute($(event.currentTarget).attr('href').substring(1));
				return(false);
            },
			initialize: function() {
				$(this.el).undelegate('a', 'click');
			},
			fetch: function() {
				// console.log('fetching UL');
			},
			render: function() {
				var $el = $(this.el);
				_this = this;
				this.collection.each(function(row) {				
					var _row = row;
					$el.data('listId', _row.get('id'));
					var contentObject = new Object({
						item: {
							'liHTML':(new TestViewHref({model:_row}).render().el).outerHTML
						}
					},{variable: 'item'});
					$el.append(contentObject.item.liHTML);
				});
				$el.prepend('<li data-icon="delete"><a href="#" data-rel="close">Close menu</a></li>');
				$el.attr('data-role','listview').listview();
				return this;
			}
		});

        return TestViewLiVar;

    }

);