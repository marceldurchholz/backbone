define(['underscore', 'Backbone', 'views/test/TestViewLi', 'text!views/test/TestViewUl.html'],
    function (_, Backbone, TestViewLi, TestViewUlTemplate) {

		var TestViewUlVar = Backbone.View.extend({

			// el: "",
			tagName: 'div',
			className: 'NO_SIDEBAR_CLASS',
			template: _.template(TestViewUlTemplate),
			
			
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
				var _this = this;
				var $el = $(this.el);
				var contentObject = new Object({
					item: {
						'ulHTML':(new TestViewLi({collection:this.collection}).render().el).outerHTML
					}
				},{variable: 'item'});
				$el.append(this.template(contentObject));
				
				return this;
			}
		});

        return TestViewUlVar;

    }

);