define(['underscore', 'Backbone', 'text!views/test/TestViewHrefTemplate.html'],
    function (_, Backbone, TestViewHrefTemplate) {

		var TestViewHrefVar = Backbone.View.extend({

			tagName: 'span',
			className: 'my-span',
			template: _.template(TestViewHrefTemplate),
            
			events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				window.myrouter.gotoRoute($(event.currentTarget).attr('href').substring(1));
				return(false);
            },
			initialize: function() {
				// console.log('initializing HREF');
				$(this.el).undelegate('a', 'click');
			},
			fetch: function() {
				// console.log('fetching HREF');
			},
			render: function() {
				console.log('rendering/appending list item in HREF');
				var $el = $(this.el);
				$el.data('listId', this.model.get('id'));
				$el.html(this.template({
					sideitem: this.model.toJSON() 
				}));
				return(this);
			}
		});

        return TestViewHrefVar;

    }

);