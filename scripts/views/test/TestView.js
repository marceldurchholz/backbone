define(['underscore', 'Backbone', 'collections/sidemenusCollection', 'text!views/test/TestView.html', 'views/test/TestViewUl'],
    function (_, Backbone, sidemenusCollection, TestViewUlTemplate, TestView) {

        var TestViewVar = Backbone.View.extend({

			el: "#panel_left",
			// tagName: '',
			// className: '',
			template: _.template(TestViewUlTemplate),
			collection: new sidemenusCollection(),
			
			events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				window.myrouter.gotoRoute($(event.currentTarget).attr('href').substring(1));
				return(false);
            },
			initialize:function() {
				$(this.el).undelegate('a', 'click');
				this.collection.fetch();
				// this.collection.on("add", this.sidemenusAll, this);
				// this.collection.on("remove", this.sidemenusAll, this);
				this.collection.on("reset", this.render, this);
			},
			fetch:function(a,b) {
                // this.render();
			},
            render:function () {
				console.log('rendering TestView');
				var $el = $(this.el);
				$el.panel();
				var contentObject = new Object({
					item: {
						'sidebarHTML':(new TestView({collection:this.collection}).render().el).outerHTML
					}
				},{variable: 'item'});
				$el.append(this.template(contentObject));
				$el.trigger("create");
				return this;
            }

        });

        return TestViewVar;
    });