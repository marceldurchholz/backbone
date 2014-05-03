define(['underscore', 'Backbone', 'views/test/TestViewLi'],
    function (_, Backbone, TestViewLi) {

		var TestViewUlVar = Backbone.View.extend({

			tagName: 'ul',
			className: 'nav nav-list lists-nav',
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
				console.log('initializing UL');
				$(this.el).undelegate('a', 'click');
			},
			fetch: function() {
				console.log('fetching UL');
			},
			render: function() {
				console.log('rendering/appending list item in UL');
				var $el = $(this.el);
				var parentitemB;
				// parentitem = new TestViewTemplate({ model: list });
				// parentitemB = new TestViewLi({collection:this.collection});
				// $el.append(parentitemB.render().el);
				
				console.log(this.collection);
				parentitemB = new TestViewLi({collection:this.collection});
				this.$el.html(parentitemB.render().el);
				
				console.log(this.$el);
				return this;
				/*
				var $el = $(this.el);
				var self = this;
				// $el.append(this.template);
				console.log($el);
				$(this.el).append = 'buffdataaa';
				return this;
				*/
			}
		});

        return TestViewUlVar;

    }

);