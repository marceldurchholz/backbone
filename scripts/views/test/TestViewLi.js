define(['underscore', 'Backbone', 'views/test/TestViewHref', 'text!views/test/TestViewHref.html'],
    function (_, Backbone, TestViewHref, TestViewHrefTemplate) {

		var TestViewLiVar = Backbone.View.extend({

			// el: "",
			tagName: 'ul',
			className: 'NO_UL_CLASS',
			template: _.template(TestViewHrefTemplate),
			
			
			events:{
                'click a':'a_clickHandler',
                'click button':'button_clickHandler',
            },
            a_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
            button_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
			initialize: function() {
				$(this.el).undelegate('a', 'click');
			},
			fetch: function() {
				// console.log('fetching UL');
			},
			render: function() {
				var _this = this;
				var $el = $(this.el);
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
				$el.prepend('<li data-mini="true" data-icon="arrow-l"><a data-ajax="true" class="ui-btn ui-btn-icon-left ui-icon-carat-l" href="#panel_left" data-rel="close">Menü schließen</a></li>');
				$el.attr('data-role','listview').listview().listview("refresh");
				return this;
			}
		});

        return TestViewLiVar;

    }

);