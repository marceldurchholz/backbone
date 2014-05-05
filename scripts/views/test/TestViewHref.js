define(['underscore', 'Backbone', 'text!views/test/TestViewHref.html'],
    function (_, Backbone, TestViewHrefTemplate) {

		var TestViewHrefVar = Backbone.View.extend({

			// el: "",
			tagName: 'li',
			className: 'NO_LI_CLASS',
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
				// console.log('fetching LI');
			},
			render: function() {
				var _this = this;
				var $el = $(this.el);
				$el.append(_this.template({
					sideitem: this.model.toJSON()
				}));
				return(this);
			}
		});

        return TestViewHrefVar;

    }

);