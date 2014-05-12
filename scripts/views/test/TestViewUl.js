define(['underscore', 'Backbone', 'views/test/TestViewLi', 'text!views/test/TestViewUl.html'],
    function (_, Backbone, TestViewLi, TestViewUlTemplate) {

		var TestViewUlVar = Backbone.View.extend({

			// el: "",
			tagName: 'div',
			className: 'NO_SIDEBAR_CLASS',
			template: _.template(TestViewUlTemplate),
			
			
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
            button_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
			initialize: function() {
				var _this = this;
				$(this.el).undelegate('a', 'click');
			},
			fetch: function() {
				// console.log('fetching UL');
			},
			render: function() {
				// alert('rendering UL');
				var _this = this;
				var $el = $(this.el);
				var contentObject = new Object({
					item: {
						'ulHTML':(new TestViewLi({collection:this.collection}).render().el).outerHTML
					}
				},{variable: 'item'});
				// $el.attr('data-theme','d').listview().listview("refresh");
				$el.append(this.template(contentObject));
				return this;
			}
		});

        return TestViewUlVar;

    }

);