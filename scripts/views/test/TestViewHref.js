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
				console.log('initializing LI');
				$(this.el).undelegate('a', 'click');
			},
			fetch: function() {
				console.log('fetching LI');
			},
			render: function() {
				console.log('rendering/appending list item in LI');
				/*
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
				*/
				// var $el = $(this.el);
				// $el.append('buffdataaa');
				var $el = $(this.el);
				$el.data('listId', this.model.get('id'));
				$el.html(this.template( { sideitem: this.model.toJSON() } ));
				return(this);
			}
		});

        return TestViewHrefVar;

    }

);