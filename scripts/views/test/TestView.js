define(['underscore', 'Backbone', 'collections/sidemenusCollection', 'views/test/TestViewUl', 'text!views/test/TestView.html'],
    function (_, Backbone, sidemenusCollection, TestViewUl, TestViewTemplate) {

        var TestViewVar = Backbone.View.extend({

			el: "#panel_left",
			// tagName: '',
			// className: '',
			template: _.template(TestViewTemplate),
			collection: new sidemenusCollection(),
			
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
				this.collection.fetch();
				// this.collection.on("add", this.sidemenusAll, this);
				// this.collection.on("remove", this.sidemenusAll, this);
				this.collection.on("reset", this.render, this);
			},
			fetch: function(a,b) {
                // this.render();
			},
            render: function () {
				var _this = this;
				var $el = $(this.el);
				$el.panel();
				var sidebarHTML = (new TestViewUl({collection:this.collection}).render().el).outerHTML;
				var contentObject = new Object({
					item: {
						'sidebarHTML':sidebarHTML
					}
				},{variable: 'item'});
				$el.html(this.template(contentObject));
				$el.trigger("create");
				return this;
            }

        });

        return TestViewVar;
    });